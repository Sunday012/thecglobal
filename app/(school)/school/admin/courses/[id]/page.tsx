import { notFound, redirect } from "next/navigation"
import { requireAdmin } from "@/app/(school)/lib/admin-auth"
import { createClient } from "@/app/(school)/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { BookOpen, ArrowLeft, Save, Trash2, Users, Clock, Award, Edit, Eye, DollarSign } from "lucide-react"
import CourseEditForm from "@/app/(school)/components/course-edit-form"

interface CourseDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  await requireAdmin()
  const supabase = await createClient()
  
  // Await the params since they're now a Promise in Next.js 15
  const { id } = await params

  // Fetch course details
  const { data: course, error } = await supabase
    .from("courses")
    .select(`
      *,
      course_modules (id, title, order_index),
      enrollments (id, status, student_id, profiles (first_name, last_name, email)),
      assessments (id, title, passing_score)
    `)
    .eq("id", id)
    .single()

  if (error || !course) {
    notFound()
  }

  // Calculate stats
  const totalEnrollments = course.enrollments?.length || 0
  const activeEnrollments = course.enrollments?.filter((e: any) => e.status === "active").length || 0
  const completedEnrollments = course.enrollments?.filter((e: any) => e.status === "completed").length || 0
  const moduleCount = course.course_modules?.length || 0
  const assessmentCount = course.assessments?.length || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
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
              <Link 
                href="/school/admin/courses"
                className="flex items-center text-sm text-gray-600 hover:text-[#0A523B] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Courses
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#272f31] mb-2">{course.title}</h1>
              <p className="text-lg text-gray-600">
                Course Management & Details
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button asChild className="bg-[#0A523B] hover:bg-[#0A523B]/90 text-white">
                <Link href={`/school/admin/courses/${id}/modules`}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Manage Modules
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Course Edit Form */}
          <div className="lg:col-span-2">
            <CourseEditForm course={course} />
          </div>

          {/* Course Stats & Info */}
          <div className="space-y-6">
            {/* Course Status */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="py-5 bg-gradient-to-r from-[#0A523B] to-[#0A523B]/90 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center mr-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  Course Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#272f31]">Status</span>
                    <Badge variant={course.is_active ? "default" : "secondary"} className={course.is_active ? "bg-green-500 hover:bg-green-600" : "bg-gray-500"}>
                      {course.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#272f31]">Category</span>
                    <Badge variant="outline" className="capitalize">
                      {course.category}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#272f31]">Created</span>
                    <span className="text-sm text-gray-600">
                      {new Date(course.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Statistics */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="py-5 bg-gradient-to-r from-[#0A523B] to-[#0A523B]/90 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Course Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-900">{totalEnrollments}</div>
                    <div className="text-xs text-blue-600">Total Enrollments</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-900">{activeEnrollments}</div>
                    <div className="text-xs text-green-600">Active Students</div>
                  </div>
                  <div className="text-center p-3 bg-emerald-50 rounded-xl">
                    <div className="text-2xl font-bold text-emerald-900">{completedEnrollments}</div>
                    <div className="text-xs text-emerald-600">Completed</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-xl">
                    <div className="text-2xl font-bold text-orange-900">{moduleCount}</div>
                    <div className="text-xs text-orange-600">Modules</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="py-5 bg-gradient-to-r from-[#0A523B] to-[#0A523B]/90 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Course Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#272f31]">Duration</span>
                  <span className="text-sm text-gray-600">{course.duration_weeks} weeks</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#272f31]">Price</span>
                  <span className="text-sm text-gray-600">
                    {course.price ? `$${course.price}` : "Free"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#272f31]">Assessments</span>
                  <span className="text-sm text-gray-600">{assessmentCount}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="py-5 bg-gradient-to-r from-[#0A523B] to-[#0A523B]/90 text-white rounded-t-lg">
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/school/admin/courses/${id}/modules`}>
                    <BookOpen className="w-4 h-4 mr-3 text-blue-600" />
                    <span className="text-blue-900 font-medium">Manage Modules</span>
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/school/admin/courses/${id}/assessments`}>
                    <Award className="w-4 h-4 mr-3 text-orange-600" />
                    <span className="text-orange-900 font-medium">Manage Assessments</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}