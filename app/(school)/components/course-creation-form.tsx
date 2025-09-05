"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Save, ArrowLeft, DollarSign, Clock, GraduationCap } from "lucide-react"
import { toast } from "sonner"

interface CourseFormData {
  title: string
  description: string
  category: string
  duration_weeks: number
  price: number | null
  is_active: boolean
}

export default function CourseCreationForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    description: "",
    category: "",
    duration_weeks: 1,
    price: null,
    is_active: true
  })

  const handleInputChange = (field: keyof CourseFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to create course')
      }

      const result = await response.json()
      toast.success("Course created successfully!")
      router.push(`/school/admin/courses/${result.id}`)
    } catch (error) {
      console.error('Error creating course:', error)
      toast.error("Failed to create course. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50">
        <CardHeader className="py-5 bg-gradient-to-r from-[#0A523B] to-[#0A523B]/90 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Create New Course</CardTitle>
                <CardDescription className="text-white/80">
                  Add a new course to the Biblical Studies Institute
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <GraduationCap className="w-5 h-5 text-[#0A523B]" />
                <h3 className="text-lg font-semibold text-[#272f31]">Basic Information</h3>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium text-[#272f31]">
                    Course Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Biblical Foundations"
                    className="border-gray-200 focus:border-[#0A523B] focus:ring-[#0A523B]/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium text-[#272f31]">
                    Category *
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="border-gray-200 focus:border-[#0A523B] focus:ring-[#0A523B]/20">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="certificate">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Certificate
                          </Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="diploma">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                            Diploma
                          </Badge>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-[#272f31]">
                  Course Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Provide a detailed description of the course content, objectives, and what students will learn..."
                  className="min-h-[120px] border-gray-200 focus:border-[#0A523B] focus:ring-[#0A523B]/20"
                  required
                />
              </div>
            </div>

            {/* Course Details */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <Clock className="w-5 h-5 text-[#0A523B]" />
                <h3 className="text-lg font-semibold text-[#272f31]">Course Details</h3>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-sm font-medium text-[#272f31]">
                    Duration (weeks) *
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    max="52"
                    value={formData.duration_weeks}
                    onChange={(e) => handleInputChange('duration_weeks', parseInt(e.target.value) || 1)}
                    className="border-gray-200 focus:border-[#0A523B] focus:ring-[#0A523B]/20"
                    required
                  />
                  <p className="text-xs text-gray-500">Enter the course duration in weeks</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium text-[#272f31]">
                    Price (USD)
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price || ""}
                      onChange={(e) => handleInputChange('price', e.target.value ? parseFloat(e.target.value) : null)}
                      placeholder="0.00"
                      className="pl-10 border-gray-200 focus:border-[#0A523B] focus:ring-[#0A523B]/20"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Leave empty for free courses</p>
                </div>
              </div>
            </div>

            {/* Course Status */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-5 h-5 bg-[#0A523B] rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <h3 className="text-lg font-semibold text-[#272f31]">Course Status</h3>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50/50">
                <div>
                  <Label htmlFor="is_active" className="text-sm font-medium text-[#272f31]">
                    Active Course
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">
                    Active courses are visible to students and available for enrollment
                  </p>
                </div>
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => handleInputChange('is_active', checked)}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="border-gray-200 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.title || !formData.description || !formData.category}
                className="bg-[#0A523B] hover:bg-[#0A523B]/90 text-white px-8"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Create Course
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
