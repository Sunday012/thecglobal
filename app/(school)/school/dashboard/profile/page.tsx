import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { createClient } from "@/app/(school)/lib/supabase/server"
import { ProfileForm } from "@/app/(school)/components/profile-form"
import { BookOpen, User, ArrowLeft, Settings, Shield, Mail, Calendar, CreditCard } from "lucide-react"

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/school/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

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
              <Link href="/school/" className="text-xl font-bold text-[#272f31] hover:text-[#0A523B] transition-colors">
                Biblical Studies Institute
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-[#272f31] hover:text-[#0A523B] hover:bg-[#0A523B]/5" asChild>
                <Link href="/school/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full mx-auto px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#272f31] mb-4">Profile Settings</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your personal information and account settings. Keep your profile up to date for the best learning experience.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile Overview Card */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r py-5 from-[#0A523B] to-[#0A523B]/90 text-white rounded-t-lg text-center pb-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/30">
                  <User size={32} className="text-white" />
                </div>
                <CardTitle className="text-xl mb-2">
                  {profile?.first_name} {profile?.last_name}
                </CardTitle>
                <CardDescription className="text-white/80">
                  Student Account
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 text-[#0A523B] mr-2" />
                      <span className="text-sm font-medium text-gray-700">Student ID</span>
                    </div>
                    <Badge variant="outline" className="font-mono text-[#0A523B] bg-[#0A523B]/5 border-[#0A523B]/20">
                      {profile?.student_id || 'Not assigned'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-[#0A523B] mr-2" />
                      <span className="text-sm font-medium text-gray-700">Email</span>
                    </div>
                    <span className="text-sm text-gray-600 truncate max-w-[120px]">
                      {user.email}
                    </span>
                  </div>

                  {profile?.created_at && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-[#0A523B] mr-2" />
                        <span className="text-sm font-medium text-gray-700">Member Since</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {new Date(profile.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-700">Account Status</span>
                    </div>
                    <Badge className="bg-green-500 hover:bg-green-600 text-white">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-[#0A523B]" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Common account management tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200 hover:border-blue-300 transition-all duration-300" asChild>
                  <Link href="/school/dashboard">
                    <ArrowLeft className="w-4 h-4 mr-3 text-blue-600" />
                    <span className="text-blue-900 font-medium">Back to Dashboard</span>
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200 hover:from-emerald-100 hover:to-emerald-200 hover:border-emerald-300 transition-all duration-300" asChild>
                  <Link href="/school/courses">
                    <BookOpen className="w-4 h-4 mr-3 text-emerald-600" />
                    <span className="text-emerald-900 font-medium">Browse Courses</span>
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-200 hover:border-purple-300 transition-all duration-300" asChild>
                  <Link href="/school/contact">
                    <Mail className="w-4 h-4 mr-3 text-purple-600" />
                    <span className="text-purple-900 font-medium">Contact Support</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r py-5 from-gray-700 to-gray-600 text-white rounded-t-lg">
                <CardTitle className="text-xl flex items-center">
                  <User className="w-6 h-6 mr-2" />
                  Personal Information
                </CardTitle>
                <CardDescription className="text-white/80">
                  Update your profile information. Your student ID cannot be changed once assigned.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8">
                <ProfileForm profile={profile} />
              </CardContent>
            </Card>

            {/* Account Security Card */}
            <Card className="border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-[#0A523B]" />
                  Account Security
                </CardTitle>
                <CardDescription>
                  Manage your account security settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-[#272f31] mb-2">Email Verification</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Your email address is verified and secure.
                    </p>
                    <Badge className="bg-green-500 hover:bg-green-600 text-white">
                      ✓ Verified
                    </Badge>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-[#272f31] mb-2">Password Security</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Keep your account secure by using a strong, unique password.
                    </p>
                    <Button variant="outline" className="text-[#0A523B] hover:bg-[#0A523B]/5 hover:border-[#0A523B]/30">
                      Change Password
                    </Button>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2 flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Data Privacy
                    </h4>
                    <p className="text-sm text-yellow-700">
                      Your personal information is securely stored and only used for educational purposes. 
                      We never share your data with third parties.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}