import { notFound } from "next/navigation"
import { requireAdmin } from "@/app/(school)/lib/admin-auth"
import { createClient } from "@/app/(school)/lib/supabase/server"
import ModuleForm from "@/app/(school)/components/module-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EditModulePageProps {
  params: Promise<{
    id: string
    moduleId: string
  }>
}

export default async function EditModulePage({ params }: EditModulePageProps) {
  await requireAdmin()
  const supabase = await createClient()
  
  // Await the params since they're now a Promise in Next.js 15
  const { id, moduleId } = await params

  // Fetch course details
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single()

  if (courseError || !course) {
    notFound()
  }

  // Fetch module details
  const { data: module, error: moduleError } = await supabase
    .from("course_modules")
    .select("*")
    .eq("id", moduleId)
    .eq("course_id", id)
    .single()

  if (moduleError || !module) {
    notFound()
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
                href={`/school/admin/courses/${id}/modules`}
                className="flex items-center text-sm text-gray-600 hover:text-[#0A523B] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Modules
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
              <h1 className="text-3xl font-bold text-[#272f31] mb-2">Edit Module</h1>
              <p className="text-lg text-gray-600">
                Update module: <span className="font-semibold text-[#0A523B]">{module.title}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Course Info Card */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-[#0A523B] to-[#0A523B]/90 text-white">
          <CardContent className="p-6">
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
                  Module {module.order_index} of {course.duration_weeks} weeks
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Module Edit Form */}
        <ModuleForm 
          courseId={id} 
          module={module} 
          isEdit={true} 
        />
      </main>
    </div>
  )
}