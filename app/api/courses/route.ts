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
    
    // Parse request body
    const body = await request.json()
    const { title, description, category, duration_weeks, price, is_active } = body
    
    // Validate required fields
    if (!title || !description || !category || !duration_weeks) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }
    
    // Validate category
    if (!["certificate", "diploma"].includes(category)) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      )
    }
    
    // Create course
    const { data: course, error } = await supabase
      .from("courses")
      .insert({
        title,
        description,
        category,
        duration_weeks: parseInt(duration_weeks),
        price: price ? parseFloat(price) : null,
        is_active: is_active !== false
      })
      .select()
      .single()
    
    if (error) {
      console.error("Error creating course:", error)
      return NextResponse.json(
        { error: "Failed to create course" },
        { status: 500 }
      )
    }
    
    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    console.error("Error in course creation API:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}