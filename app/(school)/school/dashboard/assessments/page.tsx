import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { createClient } from "@/app/(school)/lib/supabase/server"

export default async function AssessmentsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch all assessment attempts with course and assessment details
  const { data: attempts } = await supabase
    .from("assessment_attempts")
    .select(`
      *,
      assessments (
        *,
        courses (title, category)
      )
    `)
    .eq("student_id", user.id)
    .order("started_at", { ascending: false })

  // Group attempts by assessment
  const groupedAttempts = attempts?.reduce((acc: any, attempt: any) => {
    const assessmentId = attempt.assessment_id
    if (!acc[assessmentId]) {
      acc[assessmentId] = {
        assessment: attempt.assessments,
        attempts: [],
      }
    }
    acc[assessmentId].attempts.push(attempt)
    return acc
  }, {})

  return (
    <div className="flex min-h-svh flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-xl font-bold">
              Biblical Studies Institute
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/school/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Assessment History</h1>
            <p className="text-muted-foreground">View your assessment attempts and results</p>
          </div>

          {groupedAttempts && Object.keys(groupedAttempts).length > 0 ? (
            <div className="space-y-6">
              {Object.values(groupedAttempts).map((group: any) => {
                const bestAttempt = group.attempts.reduce((best: any, current: any) =>
                  (current.score || 0) > (best.score || 0) ? current : best,
                )
                const latestAttempt = group.attempts[0]

                return (
                  <Card key={group.assessment.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{group.assessment.title}</CardTitle>
                          <CardDescription>
                            {group.assessment.courses.title} • {group.assessment.courses.category}
                          </CardDescription>
                        </div>
                        <Badge variant={bestAttempt.passed ? "default" : "destructive"}>
                          {bestAttempt.passed ? "Passed" : "Failed"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Best Score</p>
                          <p className="text-2xl font-bold">{bestAttempt.score}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Attempts</p>
                          <p className="text-2xl font-bold">{group.attempts.length}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Passing Score</p>
                          <p className="text-2xl font-bold">{group.assessment.passing_score}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Last Attempt</p>
                          <p className="font-medium">
                            {new Date(latestAttempt.completed_at || latestAttempt.started_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" asChild>
                          <Link href={`/school/dashboard/assessments/${group.assessment.id}/results`}>View Results</Link>
                        </Button>
                        {!bestAttempt.passed && (
                          <Button asChild>
                            <Link href={`/school/dashboard/courses/${group.assessment.course_id}/assessment`}>
                              Retake Assessment
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Assessments Yet</CardTitle>
                <CardDescription>
                  You haven't taken any assessments yet. Complete course modules to unlock assessments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/school/dashboard">Back to Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
