
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { createClient } from "@/app/(school)/lib/supabase/server"
import { requireAdmin } from "@/app/(school)/lib/admin-auth"

export default async function AnalyticsPage() {
  await requireAdmin()
  const supabase = await createClient()

  // Fetch analytics data
  const { data: courseStats } = await supabase.from("courses").select(`
      id,
      title,
      category,
      enrollments (
        id,
        status,
        progress,
        enrollment_date,
        completion_date
      )
    `)

  const { data: assessmentStats } = await supabase.from("assessment_attempts").select(`
      id,
      score,
      passed,
      completed_at,
      assessments (
        title,
        courses (title, category)
      )
    `)

  // Calculate completion rates
  const courseAnalytics = courseStats?.map((course: any) => {
    const totalEnrollments = course.enrollments?.length || 0
    const completedEnrollments = course.enrollments?.filter((e: any) => e.status === "completed").length || 0
    const activeEnrollments = course.enrollments?.filter((e: any) => e.status === "active").length || 0
    const completionRate = totalEnrollments > 0 ? Math.round((completedEnrollments / totalEnrollments) * 100) : 0
    const averageProgress =
      activeEnrollments > 0
        ? Math.round(
            course.enrollments
              .filter((e: any) => e.status === "active")
              .reduce((sum: number, e: any) => sum + e.progress, 0) / activeEnrollments,
          )
        : 0

    return {
      ...course,
      totalEnrollments,
      completedEnrollments,
      activeEnrollments,
      completionRate,
      averageProgress,
    }
  })

  // Calculate assessment pass rates
  const assessmentAnalytics = assessmentStats?.reduce((acc: any, attempt: any) => {
    const courseTitle = attempt.assessments.courses.title
    if (!acc[courseTitle]) {
      acc[courseTitle] = {
        title: courseTitle,
        category: attempt.assessments.courses.category,
        totalAttempts: 0,
        passedAttempts: 0,
        averageScore: 0,
        scores: [],
      }
    }
    acc[courseTitle].totalAttempts++
    if (attempt.passed) acc[courseTitle].passedAttempts++
    acc[courseTitle].scores.push(attempt.score || 0)
    return acc
  }, {})

  // Calculate average scores
  Object.values(assessmentAnalytics || {}).forEach((course: any) => {
    course.averageScore = Math.round(
      course.scores.reduce((sum: number, score: number) => sum + score, 0) / course.scores.length,
    )
    course.passRate = Math.round((course.passedAttempts / course.totalAttempts) * 100)
  })

  return (
    <div className="flex min-h-svh flex-col w-full items-center justify-center">
      {/* Header */}
      <header className="border-b px-8 bg-background/95 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-xl font-bold">
              Biblical Studies Institute
            </Link>
            <Badge variant="secondary">Admin</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/admin">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
            <p className="text-muted-foreground">Student progress and course performance insights</p>
          </div>

          <div className="space-y-8">
            {/* Course Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Course Performance</CardTitle>
                <CardDescription>Enrollment and completion statistics by course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {courseAnalytics && courseAnalytics.length > 0 ? (
                    courseAnalytics.map((course: any) => (
                      <div key={course.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-medium">{course.title}</h3>
                            <Badge variant="outline" className="capitalize text-xs">
                              {course.category}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Total Enrollments</p>
                            <p className="text-2xl font-bold">{course.totalEnrollments}</p>
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Active Students</p>
                            <p className="text-lg font-medium">{course.activeEnrollments}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Completed</p>
                            <p className="text-lg font-medium">{course.completedEnrollments}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Completion Rate</p>
                            <p className="text-lg font-medium">{course.completionRate}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Avg Progress</p>
                            <p className="text-lg font-medium">{course.averageProgress}%</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Completion Rate</span>
                            <span>{course.completionRate}%</span>
                          </div>
                          <Progress value={course.completionRate} className="h-2" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No course data available</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Assessment Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Assessment Performance</CardTitle>
                <CardDescription>Pass rates and average scores by course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {assessmentAnalytics && Object.keys(assessmentAnalytics).length > 0 ? (
                    Object.values(assessmentAnalytics).map((course: any) => (
                      <div key={course.title} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-medium">{course.title}</h3>
                            <Badge variant="outline" className="capitalize text-xs">
                              {course.category}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Total Attempts</p>
                            <p className="text-2xl font-bold">{course.totalAttempts}</p>
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Passed</p>
                            <p className="text-lg font-medium">{course.passedAttempts}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Pass Rate</p>
                            <p className="text-lg font-medium">{course.passRate}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Avg Score</p>
                            <p className="text-lg font-medium">{course.averageScore}%</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Pass Rate</span>
                            <span>{course.passRate}%</span>
                          </div>
                          <Progress value={course.passRate} className="h-2" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No assessment data available</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
