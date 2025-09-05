import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/app/(school)/lib/supabase/server"

export async function PUT(
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
    
    // Update course
    const { data: course, error } = await supabase
      .from("courses")
      .update({
        title,
        description,
        category,
        duration_weeks: parseInt(duration_weeks),
        price: price ? parseFloat(price) : null,
        is_active: is_active !== false,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single()
    
    if (error) {
      console.error("Error updating course:", error)
      return NextResponse.json(
        { error: "Failed to update course" },
        { status: 500 }
      )
    }
    
    return NextResponse.json(course)
  } catch (error) {
    console.error("Error in course update API:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
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
    
    // Delete course (this will cascade delete related records due to foreign key constraints)
    const { error } = await supabase
      .from("courses")
      .delete()
      .eq("id", id)
    
    if (error) {
      console.error("Error deleting course:", error)
      return NextResponse.json(
        { error: "Failed to delete course" },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in course deletion API:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}