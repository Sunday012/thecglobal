import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { notFound } from "next/navigation"

import { createClient } from "@/app/(school)/lib/supabase/server"
import { CourseModule } from "@/app/(school)/lib/types"
import { EnrollButton } from "@/app/(school)/components/enroll-button"
import { BookOpen } from "lucide-react"

interface CoursePageProps {
  params: Promise<{ id: string }>
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Get user if logged in
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch course details
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single()

  if (courseError || !course) {
    notFound()
  }

  // Fetch course modules
  const { data: modules } = await supabase
    .from("course_modules")
    .select("*")
    .eq("course_id", id)
    .order("order_index", { ascending: true })

  // Check if user is already enrolled
  let isEnrolled = false
  if (user) {
    const { data: enrollment } = await supabase
      .from("enrollments")
      .select("id")
      .eq("student_id", user.id)
      .eq("course_id", id)
      .eq("status", "active")
      .single()

    isEnrolled = !!enrollment
  }

  return (
    <div className="flex min-h-svh flex-col w-full">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#0A523B] rounded-xl flex items-center justify-center">
                <BookOpen size={20} className="text-white" />
              </div>
              <Link href="/school/" className="text-xl font-bold text-[#272f31] hover:text-[#0A523B] transition-colors">
                Biblical Studies Institute
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
            {user ? (
              <Button asChild>
                <Link href="/school/dashboard" className="bg-[#0A523B] hover:bg-[#0A523B]/90 text-white">Back to Dashboard</Link>
              </Button>
            ) : (
              <>
              <Button variant="ghost" className="text-[#272f31] hover:text-[#0A523B] hover:bg-[#0A523B]/5" asChild>
                <Link href="/school/auth/login">Sign In</Link>
              </Button>
              <Button className="bg-[#0A523B] hover:bg-[#0A523B]/90 text-white" asChild>
                <Link href="/school/auth/signup">Register</Link>
              </Button>
              </>
            )}

            </div>
          </div>
        </div>
      </header>

      <main className="py-8 w-full px-8">
        <div className="mx-auto w-full">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/school/courses" className="hover:text-foreground">
                Courses
              </Link>
              <span>/</span>
              <span className="text-foreground">{course.title}</span>
            </div>
          </nav>

          <div className="grid gap-8 lg:grid-cols-2 w-full">
            {/* Main Content */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className="capitalize">
                    {course.category}
                  </Badge>
                  <Badge variant="secondary">{course.duration_weeks} weeks</Badge>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-balance mb-4">{course.title}</h1>
                <p className="text-lg text-muted-foreground text-pretty">{course.description}</p>
              </div>

              {/* Course Modules */}
              {modules && modules.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Course Modules</h2>
                  <div className="space-y-4">
                    {modules.map((module: CourseModule, index: number) => (
                      <Card key={module.id}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                              {index + 1}
                            </span>
                            {module.title}
                          </CardTitle>
                          {module.description && <CardDescription>{module.description}</CardDescription>}
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className=" w-full">
              <Card className="sticky top-8 w-full">
                <CardHeader>
                  <CardTitle>Enroll Now</CardTitle>
                  <CardDescription>Start your biblical studies journey today</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {course.price && (
                    <div>
                      <p className="text-3xl font-bold">${course.price}</p>
                      <p className="text-sm text-muted-foreground">One-time payment</p>
                    </div>
                  )}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Duration:</span>
                      <span className="font-medium">{course.duration_weeks} weeks</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Type:</span>
                      <span className="font-medium capitalize">{course.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Modules:</span>
                      <span className="font-medium">{modules?.length || 0}</span>
                    </div>
                  </div>

                  <Separator />

                  {user ? (
                    isEnrolled ? (
                      <Button className="w-full" asChild>
                        <Link href="/school/dashboard">Go to Dashboard</Link>
                      </Button>
                    ) : (
                      <EnrollButton courseId={course.id} />
                    )
                  ) : (
                    <div className="space-y-2">
                      <Button className="w-full" asChild>
                        <Link href="/auth/signup">Sign Up to Enroll</Link>
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent" asChild>
                        <Link href="/auth/login">Already have an account?</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
