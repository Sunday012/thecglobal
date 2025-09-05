import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/app/(school)/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check if user is authenticated and is admin
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (!profile || profile.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Update all profiles that don't have a role set to 'student'
    const { data: updatedProfiles, error: updateError } = await supabase
      .from("profiles")
      .update({ role: 'student' })
      .is('role', null)
      .select()

    if (updateError) {
      console.error("Error updating profiles:", updateError)
      return NextResponse.json(
        { error: "Failed to update profiles" },
        { status: 500 }
      )
    }

    // Get count of profiles by role
    const { data: roleCounts } = await supabase
      .from("profiles")
      .select("role")
    
    const counts = roleCounts?.reduce((acc: any, profile: any) => {
      acc[profile.role || 'null'] = (acc[profile.role || 'null'] || 0) + 1
      return acc
    }, {}) || {}

    return NextResponse.json({
      success: true,
      updatedCount: updatedProfiles?.length || 0,
      roleCounts: counts
    })
  } catch (error) {
    console.error("Error in fix roles API:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
