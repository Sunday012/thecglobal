import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import type { Course } from "../../lib/types"
import { createClient } from "../../lib/supabase/server"
import { BookOpen, Clock, Users, Award, Search, Filter, ChevronRight, Star, Globe, Play } from "lucide-react"

export default async function CoursesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_active", true)
    .order("category", { ascending: true })
    .order("title", { ascending: true })

  if (error) {
    console.error("Error fetching courses:", error)
    return <div>Error loading courses</div>
  }

  const certificateCourses = courses?.filter((course: Course) => course.category === "certificate") || []
  const diplomaCourses = courses?.filter((course: Course) => course.category === "diploma") || []

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
              <Link href="/school/" className="text-xl font-bold text-[#272f31] hover:text-[#0A523B] transition-colors">
                Biblical Studies Institute
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
            {user ? (
              <Button asChild>
                <Link href="/school/dashboard" className="bg-[#0A523B] hover:bg-[#0A523B]/90 text-white">Back to Dashboard</Link>
              </Button>
            ) : (
              <>
              <Button variant="ghost" className="text-[#272f31] hover:text-[#0A523B] hover:bg-[#0A523B]/5" asChild>
                <Link href="/school/auth/login">Sign In</Link>
              </Button>
              <Button className="bg-[#0A523B] hover:bg-[#0A523B]/90 text-white" asChild>
                <Link href="/school/auth/signup">Register</Link>
              </Button>
              </>
            )}

            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A523B] to-[#0A523B]/90"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#FAE8A1]/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1000ms'}}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/20">
            <Award className="w-4 h-4 mr-2" />
            Accredited Programs Available
          </div>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
            Discover Your 
            <span className="bg-gradient-to-r from-white to-[#FAE8A1] bg-clip-text text-transparent block">
              Biblical Education Path
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Choose from our comprehensive biblical studies programs designed to deepen your faith, expand your knowledge, and prepare you for effective ministry.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Certificate Courses */}
        {certificateCourses.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-[#272f31] mb-2">Certificate Programs</h2>
                <p className="text-lg text-gray-600">Focused studies to build strong biblical foundations</p>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                8-12 weeks
              </Badge>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {certificateCourses.map((course: Course) => (
                <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 overflow-hidden">
                  {/* Course Image */}
                  <div className="relative h-48 bg-gradient-to-br from-[#0A523B] to-[#0A523B]/80 overflow-hidden">
                    <img
                      src="/images/course.jpg"
                      alt={course.title}
                      className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                        Certificate
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">{course.duration_weeks} weeks</span>
                        </div>
                        <div className="text-right">
                          {course.price && <p className="text-2xl font-bold">${course.price}</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl leading-tight text-[#272f31] group-hover:text-[#0A523B] transition-colors duration-300">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-gray-600">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration_weeks} weeks
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Globe className="w-4 h-4 mr-1" />
                        Online
                      </div>
                    </div>
                    
                    <Button className="w-full bg-[#0A523B] hover:bg-[#0A523B]/90 text-white group" asChild>
                      <Link href={`/school/courses/${course.id}`}>
                        <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                        Learn More
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Diploma Courses */}
        {diplomaCourses.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-[#272f31] mb-2">Diploma Programs</h2>
                <p className="text-lg text-gray-600">Advanced studies for ministry preparation and leadership</p>
              </div>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                20-24 weeks
              </Badge>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              {diplomaCourses.map((course: Course) => (
                <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 overflow-hidden">
                  {/* Course Image */}
                  <div className="relative h-56 bg-gradient-to-br from-purple-600 to-purple-800 overflow-hidden">
                    <img
                      src="/images/course.jpg"
                      alt={course.title}
                      className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-purple-500/20 backdrop-blur-sm text-white border-purple-300/30">
                        Diploma
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">{course.duration_weeks} weeks</span>
                        </div>
                        <div className="text-right">
                          {course.price && <p className="text-3xl font-bold">${course.price}</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl leading-tight text-[#272f31] group-hover:text-[#0A523B] transition-colors duration-300">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-gray-600">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration_weeks} weeks
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Globe className="w-4 h-4 mr-1" />
                        Online
                      </div>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-[#0A523B] to-[#0A523B]/90 hover:from-[#0A523B]/90 hover:to-[#0A523B] text-white group h-12" asChild>
                      <Link href={`/school/courses/${course.id}`}>
                        <Award className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                        Learn More
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* No Courses Message */}
        {(!certificateCourses.length && !diplomaCourses.length) && (
          <section className="text-center py-20">
            <div className="w-16 h-16 bg-[#0A523B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-[#0A523B]" />
            </div>
            <h2 className="text-2xl font-bold text-[#272f31] mb-4">No Courses Available</h2>
            <p className="text-gray-600 mb-6">
              We're working on adding new courses. Check back soon for exciting biblical education opportunities.
            </p>
            <Button className="bg-[#0A523B] hover:bg-[#0A523B]/90 text-white" asChild>
              <Link href="/school/contact">Contact Us for Updates</Link>
            </Button>
          </section>
        )}

        {/* CTA Section */}
        {(certificateCourses.length > 0 || diplomaCourses.length > 0) && (
          <section className="mb-16">
            <div className="bg-gradient-to-r from-[#0A523B] to-[#0A523B]/90 rounded-3xl p-12 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
                }}></div>
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/20">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Can't decide which program?
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">Get Personalized Guidance</h3>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Our academic advisors will help you choose the perfect program based on your goals and current knowledge level.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-[#0A523B] hover:bg-white/90 h-12 font-medium px-8 rounded-full transition-all duration-300"
                    asChild
                  >
                    <Link href="/school/contact">Schedule Consultation</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent hover:bg-white/10 border-white/30 text-white h-12 font-medium px-8 rounded-full transition-all duration-300"
                    asChild
                  >
                    <Link href="/school/about">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#272f31] mb-4">Why Choose Our Programs?</h2>
            <p className="text-lg text-gray-600">Designed for busy professionals and ministry leaders</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#272f31] mb-2">Expert Faculty</h3>
              <p className="text-gray-600">Learn from experienced theologians and ministry leaders with decades of experience.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#272f31] mb-2">Online Flexibility</h3>
              <p className="text-gray-600">Study at your own pace from anywhere in the world with our comprehensive online platform.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#272f31] mb-2">Accredited Certificates</h3>
              <p className="text-gray-600">Earn recognized certificates and diplomas that validate your biblical education.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#272f31] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-[#0A523B] rounded-lg flex items-center justify-center">
                  <BookOpen size={16} className="text-white" />
                </div>
                <h3 className="font-bold">Biblical Studies Institute</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Equipping believers with comprehensive biblical education for effective ministry and spiritual growth.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/school/programs/certificates" className="hover:text-white transition-colors">Certificate Programs</Link></li>
                <li><Link href="/school/programs/diplomas" className="hover:text-white transition-colors">Diploma Programs</Link></li>
                <li><Link href="/school/courses" className="hover:text-white transition-colors">All Courses</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/school/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/school/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/school/about" className="hover:text-white transition-colors">About</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/school/auth/login" className="hover:text-white transition-colors">Student Portal</Link></li>
                <li><Link href="/school/admin/login" className="hover:text-white transition-colors">Admin Portal</Link></li>
                <li><Link href="/school/auth/signup" className="hover:text-white transition-colors">Register</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400">
              &copy; 2024 Biblical Studies Institute. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}