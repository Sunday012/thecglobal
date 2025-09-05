import { requireAdmin } from "@/app/(school)/lib/admin-auth"
import CourseCreationForm from "@/app/(school)/components/course-creation-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function NewCoursePage() {
  await requireAdmin()

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
              <h1 className="text-3xl font-bold text-[#272f31] mb-2">Create New Course</h1>
              <p className="text-lg text-gray-600">
                Add a new course to the Biblical Studies Institute curriculum
              </p>
            </div>
          </div>
        </div>

        {/* Course Creation Form */}
        <CourseCreationForm />
      </main>
    </div>
  )
}
