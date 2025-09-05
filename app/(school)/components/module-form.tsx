"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, Save, ArrowLeft, FileText, Hash } from "lucide-react"
import { toast } from "sonner"

interface ModuleFormData {
  title: string
  description: string
  content: string
  order_index: number
}

interface ModuleFormProps {
  courseId: string
  module?: {
    id: string
    title: string
    description: string
    content: string
    order_index: number
  }
  isEdit?: boolean
  defaultOrderIndex?: number
}

export default function ModuleForm({ courseId, module, isEdit = false, defaultOrderIndex }: ModuleFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ModuleFormData>({
    title: module?.title || "",
    description: module?.description || "",
    content: module?.content || "",
    order_index: module?.order_index || defaultOrderIndex || 1
  })

  const handleInputChange = (field: keyof ModuleFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = isEdit 
        ? `/api/courses/${courseId}/modules/${module?.id}`
        : `/api/courses/${courseId}/modules`
      
      const method = isEdit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${isEdit ? 'update' : 'create'} module`)
      }

      toast.success(`Module ${isEdit ? 'updated' : 'created'} successfully!`)
      router.push(`/school/admin/courses/${courseId}/modules`)
    } catch (error) {
      console.error(`Error ${isEdit ? 'updating' : 'creating'} module:`, error)
      toast.error(`Failed to ${isEdit ? 'update' : 'create'} module. Please try again.`)
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
                <CardTitle className="text-2xl">
                  {isEdit ? 'Edit Module' : 'Create New Module'}
                </CardTitle>
                <CardDescription className="text-white/80">
                  {isEdit ? 'Update module information and content' : 'Add a new module to your course'}
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
                <FileText className="w-5 h-5 text-[#0A523B]" />
                <h3 className="text-lg font-semibold text-[#272f31]">Module Information</h3>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium text-[#272f31]">
                    Module Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Introduction to Biblical Studies"
                    className="border-gray-200 focus:border-[#0A523B] focus:ring-[#0A523B]/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order_index" className="text-sm font-medium text-[#272f31]">
                    Module Order *
                  </Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="order_index"
                      type="number"
                      min="1"
                      value={formData.order_index}
                      onChange={(e) => handleInputChange('order_index', parseInt(e.target.value) || 1)}
                      className="pl-10 border-gray-200 focus:border-[#0A523B] focus:ring-[#0A523B]/20"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500">The order this module appears in the course</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-[#272f31]">
                  Module Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Provide a brief description of what students will learn in this module..."
                  className="min-h-[100px] border-gray-200 focus:border-[#0A523B] focus:ring-[#0A523B]/20"
                />
              </div>
            </div>

            {/* Module Content */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <BookOpen className="w-5 h-5 text-[#0A523B]" />
                <h3 className="text-lg font-semibold text-[#272f31]">Module Content</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-sm font-medium text-[#272f31]">
                  Content *
                </Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Enter the main content for this module. You can include lessons, readings, activities, etc..."
                  className="min-h-[300px] border-gray-200 focus:border-[#0A523B] focus:ring-[#0A523B]/20"
                  required
                />
                <p className="text-xs text-gray-500">
                  This is the main content students will see for this module. You can include text, instructions, and learning materials.
                </p>
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
                disabled={isSubmitting || !formData.title || !formData.content}
                className="bg-[#0A523B] hover:bg-[#0A523B]/90 text-white px-8"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    {isEdit ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {isEdit ? 'Update Module' : 'Create Module'}
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
