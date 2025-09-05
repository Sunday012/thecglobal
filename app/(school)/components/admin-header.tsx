import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AdminLogoutButton } from "./logout-button"

export function AdminHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/school/" className="text-xl font-bold">
            Biblical Studies Institute
          </Link>
          <Badge variant="secondary">Admin</Badge>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/school/admin/students">Students</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/school/admin/courses">Courses</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/school/dashboard">Student View</Link>
          </Button>
          <AdminLogoutButton />
        </div>
      </div>
    </header>
  )
}