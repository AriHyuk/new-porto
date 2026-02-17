"use client";

import { useState, useEffect, useMemo } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { getUnreadMessagesCount } from "@/app/actions/messages";
import { motion, AnimatePresence } from "framer-motion";

/**
 * UnreadBadge Component
 * Listen for real-time changes in the collaborations table
 * to update the message count badge automatically.
 */
export default function UnreadBadge() {
  const [count, setCount] = useState<number>(0);
  
  const supabase = useMemo(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ), []);

  useEffect(() => {
    // Initial fetch
    getUnreadMessagesCount().then(setCount);

    // Subscribe to changes in collaborations table
    const channel = supabase
      .channel("sidebar-notifications")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "collaborations",
        },
        () => {
          // Refresh count on any change (new message, or marked as read)
          getUnreadMessagesCount().then(setCount);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  if (count === 0) return null;

  return (
    <AnimatePresence>
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white shadow-sm shadow-red-500/20"
      >
        {count > 9 ? "9+" : count}
      </motion.span>
    </AnimatePresence>
  );
}
