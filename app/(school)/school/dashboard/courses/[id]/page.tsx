import { redirect, notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { createClient } from "@/app/(school)/lib/supabase/server"
import { ModuleNavigation } from "@/app/(school)/components/module-navigation"
import { BookOpen, ChevronLeft, ChevronRight, Award, Clock, User, PlayCircle, CheckCircle, ArrowLeft } from "lucide-react"

interface CourseStudyPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ module?: string }>
}

export default async function CourseStudyPage({ params, searchParams }: CourseStudyPageProps) {
  const { id } = await params
  const { module: moduleId } = await searchParams
  const supabase = await createClient()
  
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect("/school/auth/login")
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

  // Fetch course modules
  const { data: modules } = await supabase
    .from("course_modules")
    .select("*")
    .eq("course_id", id)
    .order("order_index", { ascending: true })

  // Determine current module
  const currentModule = moduleId ? modules?.find((m) => m.id === moduleId) : modules?.[0]

  if (!currentModule && modules?.length) {
    redirect(`/school/dashboard/courses/${id}?module=${modules[0].id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br w-full from-gray-50 via-white to-blue-50/20">
      {/* Modern Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b w-full border-gray-200/60 sticky top-0 z-40">
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
              <Button variant="ghost" className="text-[#272f31] hover:text-[#0A523B] hover:bg-[#0A523B]/5" asChild>
                <Link href="/school/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Enhanced Sidebar */}
        <aside className="w-80 bg-white/80 backdrop-blur-sm border-r border-gray-200/60 shadow-sm">
          <div className="p-6">
            {/* Course Header */}
            <div className="mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0A523B] to-[#0A523B]/80 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-bold text-lg line-clamp-2 text-[#272f31] mb-3">{course.title}</h2>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize bg-blue-50 text-blue-700 border-blue-200">
                  {course.category}
                </Badge>
                <Badge className="bg-[#0A523B] hover:bg-[#0A523B]/90 text-white">
                  <Clock className="w-3 h-3 mr-1" />
                  {course.duration_weeks} weeks
                </Badge>
              </div>
            </div>

            {/* Enhanced Progress Section */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-[#272f31]">Course Progress</span>
                  <span className="text-lg font-bold text-[#0A523B]">{enrollment.progress}%</span>
                </div>
                <Progress value={enrollment.progress} className="h-3 bg-gray-200">
                  <div 
                    className="h-full bg-gradient-to-r from-[#0A523B] to-[#0A523B]/80 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${enrollment.progress}%` }}
                  />
                </Progress>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                  <span>Started</span>
                  <span>{enrollment.progress === 100 ? 'Completed!' : 'In Progress'}</span>
                </div>
              </div>
            </div>

            {/* Module Navigation */}
            {modules && (
              <div>
                <h3 className="text-sm font-semibold text-[#272f31] mb-4 flex items-center">
                  <PlayCircle className="w-4 h-4 mr-2 text-[#0A523B]" />
                  Course Modules
                </h3>
                <ModuleNavigation
                  modules={modules}
                  currentModuleId={currentModule?.id}
                  courseId={id}
                  enrollment={enrollment}
                />
              </div>
            )}
          </div>
        </aside>

        {/* Enhanced Main Content */}
        <main className="flex-1 overflow-auto">
          {currentModule ? (
            <div className="p-8">
              <div className="mx-auto max-w-4xl">
                {/* Module Header */}
                <div className="mb-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0A523B] to-[#0A523B]/80 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {currentModule.order_index}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                          Module {currentModule.order_index} of {modules?.length}
                        </Badge>
                      </div>
                      <h1 className="text-3xl font-bold text-[#272f31] mb-2">{currentModule.title}</h1>
                      {currentModule.description && (
                        <p className="text-lg text-gray-600 leading-relaxed">{currentModule.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-800">
                          You're making great progress! 
                        </span>
                      </div>
                      <span className="text-sm text-green-700">
                        {currentModule.order_index}/{modules?.length} modules completed
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Card */}
                <Card className="border-0 shadow-lg mb-8">
                  <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center text-xl">
                      <BookOpen className="w-6 h-6 mr-2" />
                      Module Content
                    </CardTitle>
                    <CardDescription className="text-white/80">
                      Study the material below and take notes as needed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="prose prose-slate max-w-none prose-headings:text-[#272f31] prose-links:text-[#0A523B] prose-strong:text-[#272f31]">
                      {currentModule.content ? (
                        <div className="whitespace-pre-wrap leading-relaxed text-gray-700 text-base">
                          {currentModule.content}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-gray-500 text-lg">Module content will be available soon.</p>
                          <p className="text-gray-400 text-sm mt-2">Check back later for updates.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Navigation */}
                <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl p-6 shadow-sm">
                  <div>
                    {modules && currentModule.order_index > 1 && (
                      <Button variant="outline" className="bg-white hover:bg-gray-50 border-gray-300" asChild>
                        <Link href={`/school/dashboard/courses/${id}?module=${modules[currentModule.order_index - 2].id}`}>
                          <ChevronLeft className="w-4 h-4 mr-2" />
                          Previous Module
                        </Link>
                      </Button>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Module Progress</p>
                    <div className="flex items-center space-x-2">
                      {Array.from({ length: modules?.length || 0 }, (_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                            index < (currentModule.order_index - 1) 
                              ? 'bg-green-500' 
                              : index === (currentModule.order_index - 1)
                              ? 'bg-[#0A523B]'
                              : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {modules && currentModule.order_index < modules.length && (
                      <Button className="bg-[#0A523B] hover:bg-[#0A523B]/90 text-white" asChild>
                        <Link href={`/school/dashboard/courses/${id}?module=${modules[currentModule.order_index].id}`}>
                          Next Module
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    )}
                    {modules && currentModule.order_index === modules.length && (
                      <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white" asChild>
                        <Link href={`/school/dashboard/courses/${id}/assessment`}>
                          <Award className="w-4 h-4 mr-2" />
                          Take Final Assessment
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full p-8">
              <Card className="max-w-md mx-auto border-0 shadow-lg text-center">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-gray-400" />
                  </div>
                  <CardTitle className="text-xl text-[#272f31]">No Modules Available</CardTitle>
                  <CardDescription className="text-gray-600">
                    This course doesn't have any modules yet. Check back later for content updates.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="bg-[#0A523B] hover:bg-[#0A523B]/90 text-white" asChild>
                    <Link href="/school/dashboard">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Return to Dashboard
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}