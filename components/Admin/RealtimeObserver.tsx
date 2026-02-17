"use client";

import { useEffect, useMemo } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

/**
 * RealtimeObserver Component
 * Handles global real-time notifications for the admin panel.
 * Shows toasts for new messages and triggers page refreshes.
 */
export default function RealtimeObserver() {
  const router = useRouter();
  
  const supabase = useMemo(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ), []);

  useEffect(() => {
    const channel = supabase
      .channel("admin-global-notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "collaborations",
        },
        (payload) => {
          const newMessage = payload.new as { name: string; project_type: string };
          
          // Show Elite Toast
          toast.success(
            (t) => (
              <div className="flex flex-col gap-1">
                <span className="font-bold text-gray-900 dark:text-white">New Message! 🚀</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  From: {newMessage.name} ({newMessage.project_type})
                </span>
              </div>
            ),
            { duration: 5000, position: "top-right" }
          );

          // Refresh the current route to show new data in tables/stats
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return null;
}
