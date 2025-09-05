import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/app/(school)/lib/supabase/server"
import { createClient as createServiceClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  try {
    // Regular client for authentication
    const supabase = await createClient()
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Create service client that bypasses RLS
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

    // Check if current user is admin using service client
    const { data: profile, error: profileError } = await serviceSupabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (profileError) {
      console.error("Error checking admin status:", profileError)
      return NextResponse.json({ error: "Error checking permissions" }, { status: 500 })
    }

    if (!profile || profile.role !== "admin") {
      return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 })
    }

    // Get search query from URL parameters
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query || query.trim() === '') {
      // Return all students using service client (bypasses RLS)
      const { data: students, error } = await serviceSupabase
        .from("profiles")
        .select("*")
        .eq("role", "student")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching students:", error)
        return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 })
      }

      return NextResponse.json(students || [])
    }

    // Search students by name, email, or student_id using service client
    const { data: students, error } = await serviceSupabase
      .from("profiles")
      .select("*")
      .eq("role", "student")
      .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%,student_id.ilike.%${query}%`)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error searching students:", error)
      return NextResponse.json({ error: "Failed to search students" }, { status: 500 })
    }

    return NextResponse.json(students || [])
  } catch (error) {
    console.error("Error in student search API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}