import { checkRole } from "@/lib/roles"
import { redirect } from "next/navigation"

export default async function AdminDashboard() {
  const isAdmin = await checkRole('admin')
  if (!isAdmin) {
    redirect("/overviews")
  }


  return <p>This is the protected admin dashboard restricted to users with the `admin` role.</p>
}