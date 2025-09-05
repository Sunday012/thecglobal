"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { BookOpen, Trophy, Target, Clock, Play, ChevronRight, Award, Calendar, TrendingUp, User } from "lucide-react"
import { useEffect, useState } from "react"
import { ProfileDropdown } from "./profile-drop-down"

interface DashboardClientProps {
    profile: any
    activeEnrollments: any[]
    completedEnrollments: any[]
    recentAttempts: any[]
    upcomingAssessments: any[]
}

export default function DashboardClient({
    profile,
    activeEnrollments,
    completedEnrollments,
    recentAttempts,
    upcomingAssessments,
  }: DashboardClientProps) {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

    const totalEnrollments = activeEnrollments.length + completedEnrollments.length
    const avgProgress =
      activeEnrollments.length > 0
        ? Math.round(activeEnrollments.reduce((sum, e) => sum + e.progress, 0) / activeEnrollments.length)
        : 0
  
    useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (isProfileDropdownOpen && !event.target.closest(".relative")) {
          setIsProfileDropdownOpen(false)
        }
      }
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }, [isProfileDropdownOpen])
  
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
                <h1 className="text-lg font-bold text-[#272f31]">Student Portal</h1>
                <p className="text-xs text-gray-600">Biblical Studies Institute</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Active Student
              </Badge>
              <ProfileDropdown 
                profile={profile}
                isOpen={isProfileDropdownOpen}
                setIsOpen={setIsProfileDropdownOpen}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-[#272f31] mb-2">Welcome back, {profile.first_name}!</h1>
              <p className="text-lg text-gray-600">
                Student ID: <span className="font-mono font-semibold text-[#0A523B]">{profile.student_id}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Today's Date</p>
              <p className="text-lg font-semibold text-[#272f31]">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-12">
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1 bg-gradient-to-br from-blue-50 to-blue-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-sm font-medium text-blue-700">Active Courses</CardTitle>
                <div className="text-3xl font-bold text-blue-900 mt-2">{activeEnrollments.length}</div>
                <p className="text-xs text-blue-600 mt-1">Currently enrolled</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1 bg-gradient-to-br from-emerald-50 to-emerald-100/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-sm font-medium text-emerald-700">Completed Courses</CardTitle>
                <div className="text-3xl font-bold text-emerald-900 mt-2">{completedEnrollments.length}</div>
                <p className="text-xs text-emerald-600 mt-1">Successfully finished</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Trophy className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1 bg-gradient-to-br">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-sm font-medium ">Total Enrollments</CardTitle>
                <div className="text-3xl font-bold mt-2">{totalEnrollments}</div>
                <p className="text-xs  mt-1">All time</p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Target className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
                <div className="text-3xl font-bold  mt-2">{avgProgress}%</div>
                <p className="text-xs  mt-1">Course completion</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-[2] space-y-8">
            {/* Active Courses */}
            {activeEnrollments.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#272f31]">Your Active Courses</h2>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {activeEnrollments.length} Active
                  </Badge>
                </div>
                <div className="grid gap-6">
                  {activeEnrollments.map((enrollment) => (
                    <Card key={enrollment.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1">
                      <CardHeader className="bg-gradient-to-r from-[#0A523B] py-5 to-[#0A523B]/90 text-white rounded-t-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2">{enrollment.courses.title}</CardTitle>
                            <CardDescription className="text-white/80 line-clamp-2">
                              {enrollment.courses.description}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary" className="capitalize bg-white/20 text-white border-white/30">
                            {enrollment.courses.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6 p-6">
                        <div>
                          <div className="flex justify-between text-sm mb-3">
                            <span className="font-medium text-[#272f31]">Course Progress</span>
                            <span className="font-bold text-[#0A523B]">{enrollment.progress}%</span>
                          </div>
                          <Progress value={enrollment.progress} className="h-3 bg-gray-200">
                            <div 
                              className="h-full bg-gradient-to-r from-[#0A523B] to-[#0A523B]/80 rounded-full transition-all duration-500 ease-out"
                              style={{ width: `${enrollment.progress}%` }}
                            />
                          </Progress>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>Started: {new Date(enrollment.enrollment_date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{enrollment.courses.duration_weeks} weeks</span>
                            </div>
                          </div>
                        </div>
                        <Button asChild className="w-full bg-[#0A523B] hover:bg-[#0A523B]/90 text-white group">
                          <Link href={`/school/dashboard/courses/${enrollment.course_id}`}>
                            <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                            Continue Learning
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Completed Courses */}
            {completedEnrollments.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#272f31]">Completed Courses</h2>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Trophy className="w-3 h-3 mr-1" />
                    {completedEnrollments.length} Completed
                  </Badge>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {completedEnrollments.map((enrollment) => (
                    <Card key={enrollment.id} className="group hover:shadow-lg transition-all duration-300 border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                      <CardHeader className="py-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg text-emerald-900">{enrollment.courses.title}</CardTitle>
                          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                            <Trophy className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <CardDescription className="text-emerald-700">
                          Completed on {new Date(enrollment.completion_date).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge className="w-full justify-center bg-emerald-500 hover:bg-emerald-600 text-white">
                          ✓ Certificate Earned
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* No Courses Message */}
            {activeEnrollments.length === 0 && completedEnrollments.length === 0 && (
              <Card className="text-center py-12 border-2 border-dashed border-gray-300 bg-gray-50/50">
                <CardHeader>
                  <div className="w-16 h-16 bg-[#0A523B]/10 rounded-full py-5 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-[#0A523B]" />
                  </div>
                  <CardTitle className="text-xl text-[#272f31]">No Courses Yet</CardTitle>
                  <CardDescription className="text-lg">
                    You haven't enrolled in any courses yet. Browse our course catalog to get started on your biblical education journey.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="bg-[#0A523B] hover:bg-[#0A523B]/90 text-white">
                    <Link href="/school/courses">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Browse Courses
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            {/* Upcoming Assessments */}
            {upcomingAssessments.length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r py-5 from-orange-500 to-orange-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Upcoming Assessments
                  </CardTitle>
                  <CardDescription className="text-white/80">Complete these to progress in your courses</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {upcomingAssessments.slice(0, 3).map((assessment) => (
                    <div key={assessment.id} className="group p-4 border border-gray-200 rounded-xl hover:border-orange-300 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-[#272f31] line-clamp-1">{assessment.title}</p>
                          <p className="text-xs text-gray-600 line-clamp-1">{assessment.courses.title}</p>
                        </div>
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white" asChild>
                          <Link href={`/school/dashboard/courses/${assessment.course_id}/assessment`}>
                            <Play className="w-3 h-3 mr-1" />
                            Take
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                  {upcomingAssessments.length > 3 && (
                    <Button variant="ghost" className="w-full text-orange-600 hover:bg-orange-50">
                      View All Assessments <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Recent Activity */}
            {recentAttempts && recentAttempts.length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r py-5 from-purple-500 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription className="text-white/80">Your latest assessment results</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {recentAttempts.slice(0, 3).map((attempt) => (
                    <div key={attempt.id} className="p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-[#272f31] line-clamp-1">{attempt.assessments.title}</p>
                          <p className="text-xs text-gray-600 line-clamp-1">{attempt.assessments.courses.title}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(attempt.completed_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#0A523B]">{attempt.score}%</div>
                          <Badge variant={attempt.passed ? "default" : "destructive"} className="text-xs">
                            {attempt.passed ? "✓ Passed" : "✗ Failed"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r py-5 from-[#0A523B] to-[#0A523B]/90 text-white rounded-t-lg">
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription className="text-white/80">Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <Button variant="outline" className="w-full justify-start bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200 hover:border-blue-300 transition-all duration-300" asChild>
                  <Link href="/school/courses">
                    <BookOpen className="w-4 h-4 mr-3 text-blue-600" />
                    <span className="text-blue-900 font-medium">Browse New Courses</span>
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200 hover:from-emerald-100 hover:to-emerald-200 hover:border-emerald-300 transition-all duration-300" asChild>
                  <Link href="/school/dashboard/profile">
                    <User className="w-4 h-4 mr-3 text-emerald-600" />
                    <span className="text-emerald-900 font-medium">Update Profile</span>
                  </Link>
                </Button>
                {activeEnrollments.length > 0 && (
                  <Button variant="outline" className="w-full justify-start bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 hover:from-orange-100 hover:to-orange-200 hover:border-orange-300 transition-all duration-300" asChild>
                    <Link href={`/school/dashboard/courses/${activeEnrollments[0].course_id}`}>
                      <Play className="w-4 h-4 mr-3 text-orange-600" />
                      <span className="text-orange-900 font-medium">Continue Last Course</span>
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}