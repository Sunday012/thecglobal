"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Users, BookOpen, Trophy, TrendingUp, Calendar } from "lucide-react"
import StudentSearch from "@/app/(school)/components/student-search"
import { toast } from "sonner"

interface Student {
  id: string
  first_name: string
  last_name: string
  email: string
  student_id: string
  created_at: string
  enrollments: Array<{
    id: string
    status: string
    progress: number
    courses: {
      title: string
      category: string
    }
  }>
}

export default function StudentsPageClient() {
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchStudents = useCallback(async (query: string = "") => {
    try {
      setIsLoading(true)
      const url = query 
        ? `/api/admin/students/search?q=${encodeURIComponent(query)}`
        : '/api/admin/students/search'
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error('Failed to fetch students')
      }
      
      const data = await response.json()
      setStudents(data)
    } catch (error) {
      console.error('Error fetching students:', error)
      toast.error("Failed to load students")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    fetchStudents(query)
  }, [fetchStudents])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20 w-full">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#0A523B] rounded-xl flex items-center justify-center">
                <Users size={20} className="text-white" />
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
                <Link href="/school/admin/courses">Courses</Link>
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
              <h1 className="text-3xl font-bold text-[#272f31] mb-2">Student Management</h1>
              <p className="text-lg text-gray-600">
                View and manage student accounts and enrollments
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#0A523B]">{students.length}</div>
              <div className="text-sm text-gray-600">
                {searchQuery ? `Search Results` : `Total Students`}
              </div>
            </div>
          </div>
        </div>

        {/* Search Card */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader className="py-5 bg-gradient-to-r from-[#0A523B] to-[#0A523B]/90 text-white rounded-t-lg">
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Search Students
            </CardTitle>
            <CardDescription className="text-white/80">
              Find students by name, email, or student ID
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <StudentSearch 
              onSearch={handleSearch}
              placeholder="Search students by name, email, or student ID..."
            />
            {searchQuery && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing results for: <span className="font-semibold text-[#0A523B]">"{searchQuery}"</span>
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSearch("")}
                  className="text-gray-600 hover:text-[#0A523B]"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Students List */}
        <div className="grid grid-cols-2 gap-4 space-y-6">
          {isLoading ? (
              [...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="py-5 bg-gray-200 rounded-t-lg">
                    <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid gap-4 md:grid-cols-4 mb-4">
                      {[...Array(4)].map((_, j) => (
                        <div key={j} className="h-16 bg-gray-200 rounded-xl"></div>
                      ))}
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </CardContent>
                </Card>
              ))
          ) : students && students.length > 0 ? (
            students.map((student) => {
              const activeEnrollments = student.enrollments?.filter((e) => e.status === "active") || []
              const completedEnrollments = student.enrollments?.filter((e) => e.status === "completed") || []
              const averageProgress =
                activeEnrollments.length > 0
                  ? Math.round(
                      activeEnrollments.reduce((sum, e) => sum + e.progress, 0) /
                        activeEnrollments.length,
                    )
                  : 0

              return (
                <Card key={student.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1">
                  <CardHeader className="py-5 bg-gradient-to-r from-[#0A523B] to-[#0A523B]/90 text-[#272f31] rounded-t-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-white">
                            {student.first_name} {student.last_name}
                          </CardTitle>
                          <CardDescription className="text-white/80">
                            {student.email} • ID: {student.student_id}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white/80">
                          Joined {new Date(student.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6 space-y-6">
                    {/* Student Stats */}
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-xl">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-xs text-blue-600 font-medium">Active Courses</p>
                          <p className="text-xl font-bold text-blue-900">{activeEnrollments.length}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-xl">
                        <Trophy className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="text-xs text-green-600 font-medium">Completed</p>
                          <p className="text-xl font-bold text-green-900">{completedEnrollments.length}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-xl">
                        <TrendingUp className="w-4 h-4 text-orange-600" />
                        <div>
                          <p className="text-xs text-orange-600 font-medium">Avg Progress</p>
                          <p className="text-xl font-bold text-orange-900">{averageProgress}%</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-xl">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="text-xs text-purple-600 font-medium">Total Enrollments</p>
                          <p className="text-xl font-bold text-purple-900">{student.enrollments?.length || 0}</p>
                        </div>
                      </div>
                    </div>

                    {/* Active Courses */}
                    {activeEnrollments.length > 0 && (
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm font-medium text-[#272f31] mb-3">Active Courses:</p>
                        <div className="flex flex-wrap gap-2">
                          {activeEnrollments.map((enrollment) => (
                            <Badge key={enrollment.id} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {enrollment.courses.title} ({enrollment.progress}%)
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Student since {new Date(student.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild className="border-[#0A523B]/20 hover:bg-[#0A523B]/10 hover:border-[#0A523B]/40">
                          <Link href={`/school/admin/students/${student.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <Card className="text-center py-12 border-2 border-dashed border-gray-300 bg-gray-50/50">
              <CardHeader className="py-5">
                <div className="w-16 h-16 bg-[#0A523B]/10 rounded-full py-5 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#0A523B]" />
                </div>
                <CardTitle className="text-xl text-[#272f31]">
                  {searchQuery ? 'No Students Found' : 'No Students Found'}
                </CardTitle>
                <CardDescription className="text-lg">
                  {searchQuery 
                    ? `No students match your search for "${searchQuery}". Try a different search term.`
                    : 'No students have registered yet. Students will appear here once they sign up.'
                  }
                </CardDescription>
              </CardHeader>
              {searchQuery && (
                <CardContent>
                  <Button 
                    variant="outline"
                    onClick={() => handleSearch("")}
                    className="border-[#0A523B]/20 hover:bg-[#0A523B]/10 hover:border-[#0A523B]/40"
                  >
                    View All Students
                  </Button>
                </CardContent>
              )}
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
