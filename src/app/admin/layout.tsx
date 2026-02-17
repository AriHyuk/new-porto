import { ReactNode } from "react";
import Sidebar from "@/components/Admin/Sidebar";
import Topbar from "@/components/Admin/Topbar";
import RealtimeObserver from "@/components/Admin/RealtimeObserver";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Admin Layout Component
 * Wraps all admin routes with the Sidebar and Topbar.
 * Enforces authentication check for server-side protection.
 */
export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-950">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar userEmail={user.email} />
        <RealtimeObserver />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 p-6 dark:bg-zinc-900">
          {children}
        </main>
      </div>
    </div>
  );
}
