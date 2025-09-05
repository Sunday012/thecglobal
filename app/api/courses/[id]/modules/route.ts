import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/app/(school)/lib/supabase/server"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    
    // Await the params since they're now a Promise in Next.js 15
    const { id } = await params
    
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

    // Verify course exists and user has access
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("id")
      .eq("id", id)
      .single()

    if (courseError || !course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Parse request body
    const body = await request.json()
    const { title, description, content, order_index } = body

    // Validate required fields
    if (!title || !content || !order_index) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Create module
    const { data: module, error } = await supabase
      .from("course_modules")
      .insert({
        course_id: id,
        title,
        description: description || null,
        content,
        order_index: parseInt(order_index)
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating module:", error)
      return NextResponse.json(
        { error: "Failed to create module" },
        { status: 500 }
      )
    }

    return NextResponse.json(module, { status: 201 })
  } catch (error) {
    console.error("Error in module creation API:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}