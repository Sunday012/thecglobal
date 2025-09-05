// app/(school)/dashboard/page.tsx

import { redirect } from "next/navigation";
import DashboardClient from "../../components/dashboard-client";
import { createClient } from "../../lib/supabase/server";


export default async function DashboardPage() {
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

  // Fetch user enrollments with course details
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select(`
      *,
      courses (*)
    `)
    .eq("student_id", user.id)
    .order("enrollment_date", { ascending: false })

  const { data: recentAttempts } = await supabase
    .from("assessment_attempts")
    .select(`
      *,
      assessments (
        title,
        course_id,
        courses (title)
      )
    `)
    .eq("student_id", user.id)
    .order("completed_at", { ascending: false })
    .limit(5)

  const activeEnrollments = enrollments?.filter((e: any) => e.status === "active") || []
  const completedEnrollments = enrollments?.filter((e: any) => e.status === "completed") || []

  const activeCourseIds = activeEnrollments.map((e: any) => e.course_id)
  const { data: availableAssessments } =
    activeCourseIds.length > 0
      ? await supabase
          .from("assessments")
          .select(`
      *,
      courses (title)
    `)
          .in("course_id", activeCourseIds)
          .limit(3)
      : { data: [] }

  const completedAssessmentIds = recentAttempts?.map((attempt: any) => attempt.assessment_id) || []
  const upcomingAssessments =
    availableAssessments?.filter((assessment: any) => !completedAssessmentIds.includes(assessment.id)) || []

  return (
    <DashboardClient
      profile={profile || []}
      activeEnrollments={activeEnrollments || []}
      completedEnrollments={completedEnrollments || []}
      recentAttempts={recentAttempts || []}
      upcomingAssessments={upcomingAssessments || []}
    />
  );
}
