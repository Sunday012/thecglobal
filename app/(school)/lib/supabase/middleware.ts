import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getUser() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    // Get user profile to check role
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    // Redirect admin users away from student areas
    if (profile?.role === "admin") {
      if (
        request.nextUrl.pathname.startsWith("/school/dashboard") ||
        request.nextUrl.pathname.startsWith("/school/courses")
      ) {
        const url = request.nextUrl.clone()
        url.pathname = "/school/admin"
        return NextResponse.redirect(url)
      }
    }

    // Redirect student users away from admin areas (except login)
    if (profile?.role !== "admin") {
      if (
        request.nextUrl.pathname.startsWith("/school/admin") &&
        !request.nextUrl.pathname.startsWith("/school/admin/login")
      ) {
        const url = request.nextUrl.clone()
        url.pathname = "/school/dashboard"
        return NextResponse.redirect(url)
      }
    }
  }

  // Protect dashboard and admin routes
  if (
    !user &&
    (request.nextUrl.pathname.startsWith("/school/dashboard") ||
      (request.nextUrl.pathname.startsWith("/school/admin") &&
        !request.nextUrl.pathname.startsWith("/school/admin/login")))
  ) {
    const url = request.nextUrl.clone()
    url.pathname = "/school/auth/login"
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  return supabaseResponse
}
