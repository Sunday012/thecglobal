import { redirect, notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { CheckCircle, XCircle, Clock } from "lucide-react"
import { createClient } from "@/app/(school)/lib/supabase/server"

interface AssessmentResultsPageProps {
  params: Promise<{ id: string }>
}

export default async function AssessmentResultsPage({ params }: AssessmentResultsPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch assessment details
  const { data: assessment } = await supabase
    .from("assessments")
    .select(`
      *,
      courses (title, category)
    `)
    .eq("id", id)
    .single()

  if (!assessment) {
    notFound()
  }

  // Fetch all attempts for this assessment by the user
  const { data: attempts } = await supabase
    .from("assessment_attempts")
    .select("*")
    .eq("assessment_id", id)
    .eq("student_id", user.id)
    .order("started_at", { ascending: false })

  if (!attempts || attempts.length === 0) {
    redirect("/school/dashboard/assessments")
  }

  const latestAttempt = attempts[0]
  const bestAttempt = attempts.reduce((best, current) => ((current.score || 0) > (best.score || 0) ? current : best))

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
              <Link href="/school/dashboard/assessments">Assessment History</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/school/dashboard/assessments">← Back to Assessments</Link>
              </Button>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{assessment.title}</h1>
            <p className="text-muted-foreground">{assessment.courses.title} • Assessment Results</p>
          </div>

          <div className="space-y-6">
            {/* Overall Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {bestAttempt.passed ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  Assessment Results
                </CardTitle>
                <CardDescription>Your performance summary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium mb-4">Best Performance</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Score</span>
                          <span>{bestAttempt.score}%</span>
                        </div>
                        <Progress value={bestAttempt.score || 0} className="h-2" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Result</span>
                        <Badge variant={bestAttempt.passed ? "default" : "destructive"}>
                          {bestAttempt.passed ? "Passed" : "Failed"}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Date</span>
                        <span>{new Date(bestAttempt.completed_at || bestAttempt.started_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Assessment Info</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Total Questions</span>
                        <span>{assessment.questions.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Passing Score</span>
                        <span>{assessment.passing_score}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Time Limit</span>
                        <span>
                          {assessment.time_limit_minutes ? `${assessment.time_limit_minutes} min` : "No limit"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Attempts</span>
                        <span>{attempts.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attempt History */}
            <Card>
              <CardHeader>
                <CardTitle>Attempt History</CardTitle>
                <CardDescription>All your attempts for this assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attempts.map((attempt, index) => (
                    <div key={attempt.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Attempt {attempts.length - index}</span>
                          {attempt.id === bestAttempt.id && (
                            <Badge variant="outline" className="text-xs">
                              Best
                            </Badge>
                          )}
                          {attempt.id === latestAttempt.id && (
                            <Badge variant="secondary" className="text-xs">
                              Latest
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {new Date(attempt.completed_at || attempt.started_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{attempt.score}%</span>
                        <Badge variant={attempt.passed ? "default" : "destructive"}>
                          {attempt.passed ? "Passed" : "Failed"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Question Review */}
            <Card>
              <CardHeader>
                <CardTitle>Question Review</CardTitle>
                <CardDescription>Review your answers from the latest attempt</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {assessment.questions.map((question: any, index: number) => {
                    const userAnswer = latestAttempt.answers[question.id]
                    const isCorrect =
                      question.type === "multiple_choice" &&
                      question.correct_answer !== undefined &&
                      userAnswer === question.correct_answer

                    return (
                      <div key={question.id} className="border rounded-lg p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-sm font-medium">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <h4 className="font-medium mb-2">{question.question}</h4>

                            {question.type === "multiple_choice" && (
                              <div className="space-y-2">
                                {question.options?.map((option: string, optionIndex: number) => (
                                  <div
                                    key={optionIndex}
                                    className={`p-2 rounded border ${
                                      optionIndex === question.correct_answer
                                        ? "bg-green-50 border-green-200"
                                        : optionIndex === userAnswer
                                          ? "bg-red-50 border-red-200"
                                          : "bg-muted/50"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2">
                                      {optionIndex === question.correct_answer && (
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                      )}
                                      {optionIndex === userAnswer && optionIndex !== question.correct_answer && (
                                        <XCircle className="h-4 w-4 text-red-600" />
                                      )}
                                      <span className="text-sm">{option}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {question.type === "essay" && (
                              <div className="mt-2">
                                <p className="text-sm text-muted-foreground mb-2">Your answer:</p>
                                <div className="p-3 bg-muted/50 rounded border">
                                  <p className="text-sm whitespace-pre-wrap">{userAnswer || "No answer provided"}</p>
                                </div>
                              </div>
                            )}
                          </div>

                          {question.type === "multiple_choice" && (
                            <Badge variant={isCorrect ? "default" : "destructive"} className="text-xs">
                              {isCorrect ? "Correct" : "Incorrect"}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/school/dashboard">Back to Dashboard</Link>
              </Button>
              {!bestAttempt.passed && (
                <Button variant="outline" asChild>
                  <Link href={`/school/dashboard/courses/${assessment.course_id}/assessment`}>Retake Assessment</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
