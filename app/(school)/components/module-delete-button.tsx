"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

interface ModuleDeleteButtonProps {
  courseId: string
  moduleId: string
  moduleTitle: string
}

export default function ModuleDeleteButton({ courseId, moduleId, moduleTitle }: ModuleDeleteButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    // Use toast for confirmation instead of alert
    toast.error(`Delete module "${moduleTitle}"?`, {
      duration: 5000,
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          setIsDeleting(true)
          try {
            const response = await fetch(`/api/courses/${courseId}/modules/${moduleId}`, {
              method: 'DELETE',
            })

            if (!response.ok) {
              throw new Error('Failed to delete module')
            }

            toast.success("Module deleted successfully!")
            router.push(`/school/admin/courses/${courseId}/modules`)
          } catch (error) {
            console.error('Error deleting module:', error)
            toast.error("Failed to delete module. Please try again.")
          } finally {
            setIsDeleting(false)
          }
        }
      }
    })
  }

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
      className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
    >
      {isDeleting ? (
        <>
          <div className="w-3 h-3 border-2 border-red-300 border-t-red-600 rounded-full animate-spin mr-1" />
          Deleting...
        </>
      ) : (
        <>
          <Trash2 className="w-3 h-3 mr-1" />
          Delete
        </>
      )}
    </Button>
  )
}
