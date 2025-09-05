import { requireAdmin } from "../../lib/admin-auth"
import { AdminDashboardClient } from "../../components/admin-dashboard-client"
import { createClient } from "../../lib/supabase/server"
import { createClient as createServiceClient } from '@supabase/supabase-js'

export default async function AdminDashboard() {
  await requireAdmin()
  
  // Create service client for admin operations
  const serviceSupabase = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  // Regular client for operations that don't need admin privileges
  const supabase = await createClient()

  try {
    // Fetch students directly using service client (bypasses RLS)
    const { data: students, error: studentsError } = await serviceSupabase
      .from("profiles")
      .select("*")
      .eq("role", "student")
      .order("created_at", { ascending: false })

    if (studentsError) {
      console.error("Error fetching students:", studentsError)
    }

    // Fetch all data using service client to bypass RLS issues
    const [
      { data: courses },
      { data: activeEnrollments },
      { data: completedEnrollments },
      { data: recentEnrollments },
      { data: recentAssessments }
    ] = await Promise.all([
      serviceSupabase.from("courses").select("id"),
      serviceSupabase.from("enrollments").select("id").eq("status", "active"),
      serviceSupabase.from("enrollments").select("id").eq("status", "completed"),
      serviceSupabase
        .from("enrollments")
        .select(`
          id,
          enrollment_date,
          profiles (first_name, last_name, student_id),
          courses (title, category)
        `)
        .order("enrollment_date", { ascending: false })
        .limit(5),
      serviceSupabase
        .from("assessment_attempts")
        .select(`
          id,
          score,
          passed,
          completed_at,
          profiles (first_name, last_name, student_id),
          assessments (title, courses (title))
        `)
        .order("completed_at", { ascending: false })
        .limit(5)
    ])

    console.log("recentenrollment", recentEnrollments)

    return (
      <AdminDashboardClient
        recentAssessments={recentAssessments ?? []}
        recentEnrollments={recentEnrollments ?? []}
        students={students ?? []}
        courses={courses ?? []}
        activeEnrollments={activeEnrollments ?? []}
        completedEnrollments={completedEnrollments ?? []}
      />
    )
  } catch (error) {
    console.error("Error in admin dashboard:", error)
    
    // Return with empty arrays if there's an error
    return (
      <AdminDashboardClient
        recentAssessments={[]}
        recentEnrollments={[]}
        students={[]}
        courses={[]}
        activeEnrollments={[]}
        completedEnrollments={[]}
      />
    )
  }
}