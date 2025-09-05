import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ClientLogoutButton } from "./logout-button";

export function StudentHeader() {
    return (
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/school" className="text-xl font-bold">
              Biblical Studies Institute
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/school/courses">Browse Courses</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/school/dashboard/profile">Profile</Link>
            </Button>
            <ClientLogoutButton />
          </div>
        </div>
      </header>
    )
  }