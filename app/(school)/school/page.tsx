"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Menu, Search, X, BookOpen, Users, Award, Clock, ChevronRight, Play } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.1
      setIsScrolled(window.scrollY > scrollThreshold)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems = [
    { name: "Courses", href: "/school/courses" },
    { name: "Programs", href: "/school/programs" },
    { name: "About", href: "/school/about" },
    { name: "Contact", href: "/school/contact" },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'animate-slide-down' : ''
      }`}>
        <div className="max-w-7xl mx-auto py-4 px-6 lg:px-8">
          <div className={`flex rounded-4xl px-6 py-4 items-center justify-between transition-all duration-500 ${
            isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200/20" : "bg-transparent"
          }`}>
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="https://res.cloudinary.com/dzckvrvu9/image/upload/v1752759233/Asset_40_wntbch.svg"
                alt="The Encounter Center Church"
                width={150}
                height={150}
                className={`mr-4 transition-all duration-500 ${
                  isScrolled ? '' : 'filter brightness-0 invert'
                }`}
              />
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`hover:text-[#0A523B] font-medium text-sm transition-all duration-300 ${
                    isScrolled ? 'text-[#272f31]' : 'text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                className={`hidden sm:flex transition-all duration-500 hover:bg-[#0A523B]/10 ${
                  isScrolled ? 'text-[#272f31] hover:text-[#0A523B]' : 'text-white hover:text-white hover:bg-white/20'
                }`}
                asChild
              >
                <Link href="/school/auth/login">Sign In</Link>
              </Button>
              <Button
                size="sm"
                className={`transition-all duration-500 font-medium px-4 py-2 rounded-full text-sm tracking-wide ${
                  isScrolled ? 'bg-[#0A523B] hover:bg-[#0A523B]/90 text-white' : 'bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-sm text-white'
                }`}
                asChild
              >
                <Link href="/school/auth/signup">Get Started</Link>
              </Button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 hover:text-[#0A523B] transition-colors ${
                  isScrolled ? 'text-[#272f31]' : 'text-white'
                }`}
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen w-full pt-48 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A523B] via-[#0A523B]/90 to-[#FAE8A1]/30"></div>
          {/* Floating Elements Animation */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FAE8A1]/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1000ms'}}></div>
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/3 rounded-full blur-2xl animate-pulse" style={{animationDelay: '500ms'}}></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <div className="max-w-4xl mx-auto text-center">
              {/* Main Title */}
              <div className="mb-8 space-y-4">
                {/* <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 border border-white/20">
                  <Award className="w-4 h-4 mr-2" />
                  Accredited Biblical Education
                </div> */}
                <h1 className="text-white font-bold text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight">
                  <div className="">Deepen Your Faith.</div>
                  <div className="">Expand Your Knowledge.</div>
                  <div className="bg-gradient-to-r from-white to-[#FAE8A1] bg-clip-text text-transparent">
                    Transform Your Ministry.
                  </div>
                </h1>
              </div>
              
              {/* Description */}
              <p className="text-white/90 text-lg lg:text-xl leading-relaxed mb-12 max-w-3xl mx-auto">
                Join our comprehensive biblical studies program and earn certificates and diplomas in biblical foundations, 
                Christian leadership, and discipleship training from the comfort of your home.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <Button
                  size="lg"
                  className="bg-white text-[#0A523B] hover:bg-white/90 h-14 font-medium px-8 py-4 rounded-full text-base tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl"
                  asChild
                >
                  <Link href="/school/auth/signup">
                    Start Learning Today
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm h-14 text-white font-medium px-8 py-4 rounded-full text-base tracking-wide transition-all duration-300"
                  asChild
                >
                  <Link href="/school/courses">
                    <Play className="mr-2 w-5 h-5" />
                    Browse Courses
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
                  <div className="text-white/70 text-sm">Students Enrolled</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">12</div>
                  <div className="text-white/70 text-sm">Certificate Programs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">6</div>
                  <div className="text-white/70 text-sm">Diploma Programs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">95%</div>
                  <div className="text-white/70 text-sm">Completion Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#272f31] mb-6 tracking-tight">
              Why Choose Our Program?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our biblical studies program is designed for serious students of Scripture who want to grow in their faith, 
              knowledge, and ministry effectiveness.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 mb-16">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-[#0A523B]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#0A523B] group-hover:text-white transition-all duration-300">
                  <Award className="w-6 h-6 text-[#0A523B] group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl font-bold text-[#272f31] group-hover:text-[#0A523B] transition-colors duration-300">
                  Certificate Programs
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Focused courses in biblical foundations, leadership, and discipleship
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Complete specialized certificate programs in 8-12 weeks with comprehensive assessments and practical applications.
                </p>
                <Button variant="ghost" className="text-[#0A523B] hover:bg-[#0A523B]/10 p-0 h-auto font-medium">
                  Learn More <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-[#0A523B]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#0A523B] group-hover:text-white transition-all duration-300">
                  <BookOpen className="w-6 h-6 text-[#0A523B] group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl font-bold text-[#272f31] group-hover:text-[#0A523B] transition-colors duration-300">
                  Diploma Programs
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Advanced studies for ministry preparation and theological depth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Intensive 20-24 week programs covering advanced biblical studies, theology, and ministry leadership.
                </p>
                <Button variant="ghost" className="text-[#0A523B] hover:bg-[#0A523B]/10 p-0 h-auto font-medium">
                  Learn More <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-[#0A523B]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#0A523B] group-hover:text-white transition-all duration-300">
                  <Clock className="w-6 h-6 text-[#0A523B] group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-xl font-bold text-[#272f31] group-hover:text-[#0A523B] transition-colors duration-300">
                  Flexible Learning
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Study at your own pace with comprehensive online resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Access course materials, take assessments, and track your progress through our user-friendly platform.
                </p>
                <Button variant="ghost" className="text-[#0A523B] hover:bg-[#0A523B]/10 p-0 h-auto font-medium">
                  Learn More <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#0A523B] to-[#0A523B]/90 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-50" style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
            }}></div>
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Begin Your Journey?</h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join hundreds of students who are deepening their faith and expanding their ministry impact.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-white text-[#0A523B] hover:bg-white/90 h-12 font-medium px-8 rounded-full transition-all duration-300"
                  asChild
                >
                  <Link href="/school/auth/signup">Enroll Today</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent hover:bg-white/10 border-white/30 text-white h-12 font-medium px-8 rounded-full transition-all duration-300"
                  asChild
                >
                  <Link href="/school/contact">Schedule a Call</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Half-Screen Menu Overlay */}
      <div
        className={`fixed top-0 left-0 right-0 bg-black z-50 transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-y-0" : "-translate-y-[200%]"
        }`}
        style={{ height: "75vh" }}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-6 lg:p-8">
          <div className="flex items-center space-x-8">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <BookOpen size={20} className="text-[#0A523B]" />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search courses..."
                className="bg-transparent border border-gray-600 text-white placeholder:text-gray-400 pl-10 pr-4 py-2 rounded-md w-80"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-[#FAE8A1] font-medium text-sm transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name.toUpperCase()}
                </Link>
              ))}
            </nav>
            <button
              onClick={toggleMenu}
              className="p-2 text-white hover:text-[#FAE8A1] transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Menu Content */}
        <div className="px-6 lg:px-8 py-8 h-[55vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Biblical Studies Institute</h1>
              <p className="text-xl text-gray-300">Equipping Saints. Building Leaders. Advancing the Kingdom.</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-gray-400 text-sm uppercase tracking-wide mb-6">Programs</h3>
                <ul className="space-y-4">
                  <li>
                    <Link href="/school/programs/certificates" className="text-white hover:text-[#FAE8A1] text-lg font-medium transition-colors">
                      Certificate Programs
                    </Link>
                    <p className="text-gray-400 text-sm mt-1">8-12 week focused studies</p>
                  </li>
                  <li>
                    <Link href="/school/programs/diplomas" className="text-white hover:text-[#FAE8A1] text-lg font-medium transition-colors">
                      Diploma Programs  
                    </Link>
                    <p className="text-gray-400 text-sm mt-1">20-24 week advanced studies</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-[#0A523B] to-[#FAE8A1] rounded-2xl p-8">
                <div className="relative z-10">
                  <p className="text-white/80 text-sm uppercase tracking-wide mb-2">New Student</p>
                  <h4 className="text-3xl font-bold text-white mb-4">Spring Enrollment</h4>
                  <p className="text-white/90 text-lg mb-6">Classes begin March 1, 2025</p>
                  <Button className="bg-white text-[#0A523B] hover:bg-white/90 font-medium px-6 py-3 rounded-full text-sm tracking-wide">
                    REGISTER NOW
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </>
  )
}