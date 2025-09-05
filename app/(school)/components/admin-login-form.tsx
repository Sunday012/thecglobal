"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Shield } from "lucide-react"
import { createBrowserClient } from "../lib/supabase/client"

export function AdminLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const supabase = createBrowserClient()
      console.log("[v0] Starting admin login process")

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        console.log("[v0] Auth error:", authError)
        setError(authError.message)
        return
      }

      if (data.user) {
        console.log("[v0] User authenticated, checking admin status for ID:", data.user.id)

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single()

        console.log("[v0] Profile query result:", { profile, profileError })

        if (profileError) {
          console.log("[v0] Profile error details:", profileError)
          setError(`Error checking admin status: ${profileError.message}`)
          return
        }

        if (!profile) {
          console.log("[v0] No profile found for user")
          setError("No profile found. Please contact administrator.")
          return
        }

        console.log("[v0] User role:", profile.role)

        if (profile?.role !== "admin") {
          setError("Access denied. Admin privileges required.")
          await supabase.auth.signOut()
          return
        }

        console.log("[v0] Admin access granted, redirecting...")
        // Redirect to admin dashboard
        window.location.href = "/school/admin"
      }
    } catch (err) {
      console.log("[v0] Unexpected error:", err)
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Admin Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1"
            placeholder="admin@example.com"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1"
            placeholder="••••••••"
          />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5">
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            <Shield className="w-4 h-4 mr-2" />
            Sign in as Admin
          </>
        )}
      </Button>
    </form>
  )
}
