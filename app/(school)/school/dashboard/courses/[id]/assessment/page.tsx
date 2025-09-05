import { redirect, notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { createClient } from "@/app/(school)/lib/supabase/server"
import { AssessmentInterface } from "@/app/(school)/components/assessment-interface"

interface AssessmentPageProps {
  params: Promise<{ id: string }>
}

export default async function AssessmentPage({ params }: AssessmentPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Check if user is enrolled in this course
  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("*")
    .eq("student_id", user.id)
    .eq("course_id", id)
    .eq("status", "active")
    .single()

  if (!enrollment) {
    redirect("/school/dashboard")
  }

  // Fetch course details
  const { data: course } = await supabase.from("courses").select("*").eq("id", id).single()

  if (!course) {
    notFound()
  }

  // Fetch assessment for this course
  const { data: assessment } = await supabase.from("assessments").select("*").eq("course_id", id).single()

  // Check if user has already attempted this assessment
  const { data: existingAttempt } = await supabase
    .from("assessment_attempts")
    .select("*")
    .eq("assessment_id", assessment?.id)
    .eq("student_id", user.id)
    .order("started_at", { ascending: false })
    .limit(1)
    .single()

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
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/school/dashboard/courses/${id}`}>← Back to Course</Link>
              </Button>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
            <p className="text-muted-foreground">Final Assessment</p>
          </div>

          {assessment ? (
            existingAttempt ? (
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Completed</CardTitle>
                  <CardDescription>You have already completed this assessment.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Score</p>
                      <p className="text-2xl font-bold">{existingAttempt.score}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Result</p>
                      <Badge variant={existingAttempt.passed ? "default" : "destructive"}>
                        {existingAttempt.passed ? "Passed" : "Failed"}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="font-medium">
                        {new Date(existingAttempt.completed_at || existingAttempt.started_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Passing Score</p>
                      <p className="font-medium">{assessment.passing_score}%</p>
                    </div>
                  </div>

                  {existingAttempt.passed && (
                    <div className="pt-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        Congratulations! You have successfully completed this course.
                      </p>
                      <Button asChild>
                        <Link href="/school/dashboard">Return to Dashboard</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{assessment.title}</CardTitle>
                    <CardDescription>{assessment.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Questions</p>
                        <p className="font-medium">{assessment.questions.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Time Limit</p>
                        <p className="font-medium">
                          {assessment.time_limit_minutes ? `${assessment.time_limit_minutes} minutes` : "No limit"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Passing Score</p>
                        <p className="font-medium">{assessment.passing_score}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <AssessmentInterface assessment={assessment} courseId={id} enrollmentId={enrollment.id} />
              </div>
            )
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Assessment Available</CardTitle>
                <CardDescription>This course doesn't have a final assessment yet.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href={`/school/dashboard/courses/${id}`}>Back to Course</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
