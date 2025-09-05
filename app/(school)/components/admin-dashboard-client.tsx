"use client"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Award, BarChart3, Bell, BookOpen, ChevronRight, GraduationCap, Search, Settings, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { SettingsDropDown } from './settings-drop-down'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'

interface DashboardClientProps {
    students: any
    courses: any
    activeEnrollments: any[]
    completedEnrollments: any[]
    recentAssessments: any[]
    recentEnrollments: any[]
}

export const AdminDashboardClient = (
    {
        students,
        courses,
        activeEnrollments,
        completedEnrollments,
        recentAssessments,
        recentEnrollments,
      }: DashboardClientProps
) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 w-full">
    {/* Header */}
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-40 w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-[#0A523B] rounded-xl flex items-center justify-center">
              <BookOpen size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#272f31]">Admin Dashboard</h1>
              <p className="text-xs text-gray-600">Biblical Studies Institute</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search students, courses..."
                className="pl-10 pr-4 py-2 w-80 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              />
            </div>
            <Button size="sm" variant="ghost" className="relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
                <SettingsDropDown
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
            <h1 className="text-4xl font-bold text-[#272f31] mb-2">Welcome back, Admin</h1>
            <p className="text-lg text-gray-600">Here's what's happening with your institute today</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              System Healthy
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-[#0A523B] hover:bg-[#0A523B]/90 text-white flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Quick Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/school/admin/courses/new" className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-[#0A523B]" />
                    New Course
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/school/admin/students" className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-[#0A523B]" />
                    View Students
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-12">
        <StatCard title="Total Students" value={students?.length || 0} icon={Users} color="blue" />
        <StatCard title="Total Courses" value={courses?.length || 0} icon={BookOpen} color="emerald" />
        <StatCard title="Active Enrollments" value={activeEnrollments?.length || 0} icon={TrendingUp} color="orange" />
        <StatCard title="Completions" value={completedEnrollments?.length || 0} icon={GraduationCap} color="purple" />
      </div>

      <div className="grid gap-8 lg:grid-cols-3 mb-12">
        {/* Recent Enrollments */}
        <Card className="border-0 shadow-lg lg:col-span-2">
          <CardHeader className="bg-gradient-to-r py-5 from-[#0A523B] to-[#0A523B]/90 text-white rounded-t-lg">
            <CardTitle className="text-xl">Recent Enrollments</CardTitle>
            <CardDescription className="text-white/80">Latest student course enrollments</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {recentEnrollments && recentEnrollments.length > 0 ? (
              <div className="space-y-4">
                {recentEnrollments.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="group p-4 border border-gray-100 rounded-xl hover:border-[#0A523B]/20 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-[#272f31]">
                          {enrollment.profiles 
                            ? `${enrollment.profiles.first_name} ${enrollment.profiles.last_name}`
                            : "Unknown Student"}
                        </p>
                        <p className="text-sm text-gray-600">
                          ID: {enrollment.profiles?.student_id || "N/A"}
                        </p>
                        <p className="text-sm font-medium text-[#0A523B]">
                          {enrollment.courses?.title || "Course not found"}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="capitalize mb-2">
                          {enrollment.courses?.category || "N/A"}
                        </Badge>
                        <p className="text-sm text-gray-600">
                          {new Date(enrollment.enrollment_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No recent enrollments</p>
            )}
            <Button variant="ghost" className="w-full mt-4 text-[#0A523B] hover:bg-[#0A523B]/10">
              View All Enrollments <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Recent Assessments */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r py-5 from-gray-700 to-gray-600 text-white rounded-t-lg">
            <CardTitle>Assessment Results</CardTitle>
            <CardDescription className="text-white/80">Latest completions</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {recentAssessments && recentAssessments.length > 0 ? (
              <div className="space-y-4">
                {recentAssessments.map((attempt) => (
                  <div key={attempt.id} className="p-4 border border-gray-100 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold text-sm">
                          {Array.isArray(attempt.profiles) && attempt.profiles.length > 0
                            ? `${attempt.profiles[0].first_name} ${attempt.profiles[0].last_name}`
                            : ""}
                        </p>
                        <p className="text-xs text-gray-600">
                          ID: {Array.isArray(attempt.profiles) && attempt.profiles.length > 0
                            ? attempt.profiles[0].student_id
                            : ""}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#0A523B]">{attempt.score}%</div>
                        <Badge variant={attempt.passed ? "default" : "destructive"} className="text-xs">
                          {attempt.passed ? "Passed" : "Failed"}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 font-medium">
                      {Array.isArray(attempt.assessments) && attempt.assessments.length > 0
                        ? attempt.assessments[0].title
                        : ""}
                    </p>
                    <p className="text-xs text-gray-600">
                      {Array.isArray(attempt.assessments) && attempt.assessments.length > 0 &&
                       Array.isArray(attempt.assessments[0].courses) && attempt.assessments[0].courses.length > 0
                        ? attempt.assessments[0].courses[0].title
                        : ""}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(attempt.completed_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No recent assessments</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r py-5 from-[#0A523B] to-[#0A523B]/90 text-white rounded-t-lg">
          <CardTitle className="text-xl">Quick Actions</CardTitle>
          <CardDescription className="text-white/80">Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <QuickAction href="/school/admin/students" icon={Users} title="Manage Students" desc="View and manage student accounts" color="blue" />
            <QuickAction href="/school/admin/courses" icon={BookOpen} title="Manage Courses" desc="Create and edit course content" color="emerald" />
            <QuickAction href="/school/admin/analytics" icon={BarChart3} title="View Analytics" desc="Student progress and performance" color="orange" />
            {/* <QuickAction href="/school/admin/assessments" icon={Award} title="Assessments" desc="Create and manage assessments" color="purple" />
            <QuickAction href="/school/admin/reports" icon={BarChart3} title="Reports" desc="Generate detailed reports" color="indigo" />
            <QuickAction href="/school/admin/settings" icon={Settings} title="Settings" desc="System configuration" color="rose" /> */}
          </div>
        </CardContent>
      </Card>
    </main>
  </div>
  )
}


function StatCard({ title, value, icon: Icon, color }: any) {
    const colors: Record<string, string> = {
      blue: "from-blue-50 to-blue-100/50 text-blue-900",
      emerald: "from-emerald-50 to-emerald-100/50 text-emerald-900",
      orange: "from-orange-50 to-orange-100/50 text-orange-900",
      purple: "from-purple-50 to-purple-100/50 text-purple-900",
    }
    const bgColors: Record<string, string> = {
      blue: "bg-blue-500",
      emerald: "bg-emerald-500",
      orange: "bg-orange-500",
      purple: "bg-purple-500",
    }
  
    return (
      <Card className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1 bg-gradient-to-br ${colors[color]}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <CardTitle className={`text-sm font-medium`}>{title}</CardTitle>
            <div className="text-3xl font-bold mt-2">{value}</div>
            <p className="text-xs mt-1">—</p>
          </div>
          <div className={`w-12 h-12 ${bgColors[color]} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </CardHeader>
      </Card>
    )
  }
  
  function QuickAction({ href, icon: Icon, title, desc, color }: any) {
    const bgColors: Record<string, string> = {
      blue: "bg-blue-500",
      emerald: "bg-emerald-500",
      orange: "bg-orange-500",
      purple: "bg-purple-500",
      indigo: "bg-indigo-500",
      rose: "bg-rose-500",
    }
    const textColors: Record<string, string> = {
      blue: "text-blue-900",
      emerald: "text-emerald-900",
      orange: "text-orange-900",
      purple: "text-purple-900",
      indigo: "text-indigo-900",
      rose: "text-rose-900",
    }
    const descColors: Record<string, string> = {
      blue: "text-blue-700",
      emerald: "text-emerald-700",
      orange: "text-orange-700",
      purple: "text-purple-700",
      indigo: "text-indigo-700",
      rose: "text-rose-700",
    }
  
    return (
      <Button
        asChild
        className={`group h-auto p-6 flex-col items-start bg-gradient-to-br from-${color}-50 to-${color}-100 hover:from-${color}-100 hover:to-${color}-200 border border-${color}-200 hover:border-${color}-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
        variant="outline"
      >
        <Link href={href}>
          <div className={`w-12 h-12 ${bgColors[color]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <span className={`font-semibold ${textColors[color]} mb-2`}>{title}</span>
          <span className={`text-sm ${descColors[color]}`}>{desc}</span>
        </Link>
      </Button>
    )
  }
  