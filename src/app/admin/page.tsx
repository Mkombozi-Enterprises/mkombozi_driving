import { redirect } from "next/navigation";
import { isCmsAuthenticated } from "@/lib/cms/auth";
import { loadContent } from "@/lib/cms/store";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isCmsAuthenticated())) {
    redirect("/admin/login");
  }
  const content = await loadContent();
  return <AdminDashboard initial={content} />;
}
