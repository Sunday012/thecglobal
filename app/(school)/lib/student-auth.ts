import { redirect } from "next/navigation"
import { createClient } from "./supabase/server"

export async function requireStudent() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/school/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role === "admin") {
    redirect("/school/admin")
  }

  return { user, profile }
}
