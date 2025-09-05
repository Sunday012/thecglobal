import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/app/(school)/lib/supabase/server"

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; moduleId: string }> }
) {
  try {
    const supabase = await createClient()
    
    // Await the params since they're now a Promise in Next.js 15
    const { id, moduleId } = await params
    
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
    const { title, description, content, order_index } = body

    // Validate required fields
    if (!title || !content || !order_index) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Update module
    const { data: module, error } = await supabase
      .from("course_modules")
      .update({
        title,
        description: description || null,
        content,
        order_index: parseInt(order_index)
      })
      .eq("id", moduleId)
      .eq("course_id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating module:", error)
      return NextResponse.json(
        { error: "Failed to update module" },
        { status: 500 }
      )
    }

    return NextResponse.json(module)
  } catch (error) {
    console.error("Error in module update API:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; moduleId: string }> }
) {
  try {
    const supabase = await createClient()
    
    // Await the params since they're now a Promise in Next.js 15
    const { id, moduleId } = await params
    
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

    // Delete module
    const { error } = await supabase
      .from("course_modules")
      .delete()
      .eq("id", moduleId)
      .eq("course_id", id)

    if (error) {
      console.error("Error deleting module:", error)
      return NextResponse.json(
        { error: "Failed to delete module" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in module deletion API:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}