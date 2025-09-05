"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle } from "lucide-react"
import { toast } from "sonner"

export default function FixRolesButton() {
  const [isFixing, setIsFixing] = useState(false)

  const handleFixRoles = async () => {
    setIsFixing(true)
    
    try {
      const response = await fetch('/api/admin/fix-roles', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fix roles')
      }

      toast.success(`Successfully updated ${data.updatedCount} user roles!`, {
        description: `Role distribution: ${JSON.stringify(data.roleCounts)}`,
        duration: 5000
      })

      // Refresh the page to show updated data
      window.location.reload()
    } catch (error) {
      console.error('Error fixing roles:', error)
      toast.error("Failed to fix user roles. Please try again.")
    } finally {
      setIsFixing(false)
    }
  }

  return (
    <Button
      onClick={handleFixRoles}
      disabled={isFixing}
      variant="outline"
      className="border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300"
    >
      {isFixing ? (
        <>
          <div className="w-4 h-4 border-2 border-orange-300 border-t-orange-600 rounded-full animate-spin mr-2" />
          Fixing...
        </>
      ) : (
        <>
          <AlertTriangle className="w-4 h-4 mr-2" />
          Fix User Roles
        </>
      )}
    </Button>
  )
}
