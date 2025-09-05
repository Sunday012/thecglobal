import { notFound } from "next/navigation"
import { requireAdmin } from "@/app/(school)/lib/admin-auth"
import { createClient } from "@/app/(school)/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BookOpen, ArrowLeft, Plus, Edit, GripVertical, FileText } from "lucide-react"
import ModuleDeleteButton from "@/app/(school)/components/module-delete-button"

interface CourseModulesPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CourseModulesPage({ params }: CourseModulesPageProps) {
  await requireAdmin()
  const supabase = await createClient()
  
  // Await the params since they're now a Promise in Next.js 15
  const { id } = await params

  // Fetch course details
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single()

  if (courseError || !course) {
    notFound()
  }

  // Fetch course modules
  const { data: modules, error: modulesError } = await supabase
    .from("course_modules")
    .select("*")
    .eq("course_id", id)
    .order("order_index", { ascending: true })

  if (modulesError) {
    console.error("Error fetching modules:", modulesError)
  }

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
              <Link 
                href={`/school/admin/courses/${id}`}
                className="flex items-center text-sm text-gray-600 hover:text-[#0A523B] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Course
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
              <h1 className="text-3xl font-bold text-[#272f31] mb-2">Course Modules</h1>
              <p className="text-lg text-gray-600">
                Manage modules for: <span className="font-semibold text-[#0A523B]">{course.title}</span>
              </p>
            </div>
            <Button asChild className="bg-[#0A523B] hover:bg-[#0A523B]/90 text-white">
              <Link href={`/school/admin/courses/${id}/modules/new`}>
                <Plus className="w-4 h-4 mr-2" />
                Add Module
              </Link>
            </Button>
          </div>
        </div>

        {/* Course Info Card */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-[#0A523B] to-[#0A523B]/90 text-white">
          <CardHeader className="py-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">{course.title}</h2>
                <p className="text-white/80 line-clamp-2">{course.description}</p>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="capitalize bg-white/20 text-white border-white/30">
                  {course.category}
                </Badge>
                <p className="text-sm text-white/80 mt-2">
                  {course.duration_weeks} weeks • {modules?.length || 0} modules
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Modules List */}
        <div className="space-y-6">
          {modules && modules.length > 0 ? (
            modules.map((module: any, index: number) => (
              <Card key={module.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1">
                <CardHeader className="py-5 bg-gradient-to-r from-[#0A523B] to-[#0A523B]/90 text-white rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold">{module.order_index}</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white">{module.title}</CardTitle>
                        <CardDescription className="text-white/80">
                          Module {module.order_index} of {modules.length}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                      >
                        <GripVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {module.description && (
                      <p className="text-gray-600 line-clamp-3">{module.description}</p>
                    )}
                    
                    {module.content && (
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-2 mb-2">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Content Preview</span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {module.content.substring(0, 200)}...
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Created: {new Date(module.created_at).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/school/admin/courses/${id}/modules/${module.id}/edit`}>
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Link>
                        </Button>
                        <ModuleDeleteButton 
                          courseId={id}
                          moduleId={module.id}
                          moduleTitle={module.title}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="text-center py-12 border-2 border-dashed border-gray-300 bg-gray-50/50">
              <CardHeader className="py-5">
                <div className="w-16 h-16 bg-[#0A523B]/10 rounded-full py-5 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-[#0A523B]" />
                </div>
                <CardTitle className="text-xl text-[#272f31]">No Modules Yet</CardTitle>
                <CardDescription className="text-lg">
                  Start building your course by adding the first module.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="bg-[#0A523B] hover:bg-[#0A523B]/90 text-white">
                  <Link href={`/school/admin/courses/${id}/modules/new`}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Module
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