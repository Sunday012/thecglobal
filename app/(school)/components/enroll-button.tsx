"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createClient } from "../lib/supabase/client"

interface EnrollButtonProps {
  courseId: string
}

export function EnrollButton({ courseId }: EnrollButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleEnroll = async () => {
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      const { error: enrollError } = await supabase.from("enrollments").insert({
        student_id: user.id,
        course_id: courseId,
        status: "active",
        progress: 0,
      })

      if (enrollError) {
        if (enrollError.code === "23505") {
          // Unique constraint violation
          setError("You are already enrolled in this course")
        } else {
          throw enrollError
        }
      } else {
        router.push("/school/dashboard")
        router.refresh()
      }
    } catch (error: unknown) {
      console.error("Enrollment error:", error)
      setError(error instanceof Error ? error.message : "Failed to enroll")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Button onClick={handleEnroll} disabled={isLoading} className="w-full bg-[#0A523B] hover:bg-[#0A523B]/90 text-white group">
        {isLoading ? "Enrolling..." : "Enroll Now"}
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
