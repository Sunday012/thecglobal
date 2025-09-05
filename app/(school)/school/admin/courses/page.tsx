import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { requireAdmin } from "@/app/(school)/lib/admin-auth"
import { createClient } from "@/app/(school)/lib/supabase/server"
import { BookOpen, Plus, Users, Clock, Award, Edit, Eye, Settings } from "lucide-react"

export default async function AdminCoursesPage() {
  await requireAdmin()
  const supabase = await createClient()

  // Fetch all courses with enrollment counts
  const { data: courses } = await supabase
    .from("courses")
    .select(`
      *,
      course_modules (id),
      enrollments (id, status),
      assessments (id)
    `)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20 w-full">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#0A523B] rounded-xl flex items-center justify-center">
                <BookOpen size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#272f31]">Admin Portal</h1>
                <p className="text-xs text-gray-600">Biblical Studies Institute</p>
              </div>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                Admin
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/school/admin">Dashboard</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/school/admin/students">Students</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#272f31] mb-2">Course Management</h1>
              <p className="text-lg text-gray-600">
                Manage courses, modules, and assessments for the Biblical Studies Institute
              </p>
            </div>
            <Button asChild className="bg-[#0A523B] hover:bg-[#0A523B]/90 text-white">
              <Link href="/school/admin/courses/new">
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Link>
            </Button>
          </div>
        </div>

        {/* Courses List */}
        <div className="space-y-6">
          {courses && courses.length > 0 ? (
            courses.map((course: any) => {
              const totalEnrollments = course.enrollments?.length || 0
              const activeEnrollments = course.enrollments?.filter((e: any) => e.status === "active").length || 0
              const completedEnrollments =
                course.enrollments?.filter((e: any) => e.status === "completed").length || 0
              const moduleCount = course.course_modules?.length || 0
              const assessmentCount = course.assessments?.length || 0

              return (
                <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1">
                  <CardHeader className="bg-gradient-to-r from-[#0A523B] py-5 to-[#0A523B]/90 text-white rounded-t-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl text-white">{course.title}</CardTitle>
                          <Badge variant="secondary" className="capitalize bg-white/20 text-white border-white/30">
                            {course.category}
                          </Badge>
                          <Badge variant={course.is_active ? "default" : "secondary"} className={course.is_active ? "bg-green-500 hover:bg-green-600" : "bg-gray-500"}>
                            {course.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <CardDescription className="text-white/80 line-clamp-2">{course.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white/80">
                          Created {new Date(course.created_at).toLocaleDateString()}
                        </p>
                        {course.price && <p className="font-medium text-white">${course.price}</p>}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6 space-y-6">
                    {/* Course Stats */}
                    <div className="grid gap-4 md:grid-cols-5">
                      <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-xl">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-xs text-blue-600 font-medium">Duration</p>
                          <p className="font-bold text-blue-900">{course.duration_weeks} weeks</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-emerald-50 rounded-xl">
                        <BookOpen className="w-4 h-4 text-emerald-600" />
                        <div>
                          <p className="text-xs text-emerald-600 font-medium">Modules</p>
                          <p className="font-bold text-emerald-900">{moduleCount}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-xl">
                        <Award className="w-4 h-4 text-orange-600" />
                        <div>
                          <p className="text-xs text-orange-600 font-medium">Assessments</p>
                          <p className="font-bold text-orange-900">{assessmentCount}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-xl">
                        <Users className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="text-xs text-purple-600 font-medium">Active Students</p>
                          <p className="font-bold text-purple-900">{activeEnrollments}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-xl">
                        <Award className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="text-xs text-green-600 font-medium">Completions</p>
                          <p className="font-bold text-green-900">{completedEnrollments}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" asChild className="border-[#0A523B]/20 hover:bg-[#0A523B]/10 hover:border-[#0A523B]/40">
                        <Link href={`/school/admin/courses/${course.id}`}>
                          <Edit className="w-3 h-3 mr-1" />
                          Edit Course
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild className="border-blue-200 hover:bg-blue-50 hover:border-blue-300">
                        <Link href={`/school/admin/courses/${course.id}/modules`}>
                          <BookOpen className="w-3 h-3 mr-1" />
                          Manage Modules
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild className="border-orange-200 hover:bg-orange-50 hover:border-orange-300">
                        <Link href={`/school/admin/courses/${course.id}/assessments`}>
                          <Award className="w-3 h-3 mr-1" />
                          Manage Assessments
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <Card className="text-center py-12 border-2 border-dashed border-gray-300 bg-gray-50/50">
              <CardHeader>
                <div className="w-16 h-16 bg-[#0A523B]/10 rounded-full py-5 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-[#0A523B]" />
                </div>
                <CardTitle className="text-xl text-[#272f31]">No Courses Found</CardTitle>
                <CardDescription className="text-lg">
                  Create your first course to get started with the Biblical Studies Institute.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="bg-[#0A523B] hover:bg-[#0A523B]/90 text-white">
                  <Link href="/school/admin/courses/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Course
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
