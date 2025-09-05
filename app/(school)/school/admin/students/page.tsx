import { requireAdmin } from "@/app/(school)/lib/admin-auth"
import StudentsPageClient from "./students-client"

export default async function StudentsPage() {
  await requireAdmin()
  
  return <StudentsPageClient />
}
