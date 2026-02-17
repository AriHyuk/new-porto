"use client";

import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { logout } from "@/app/auth/actions";

interface TopbarProps {
  userEmail?: string;
}

/**
 * Admin Topbar Component
 * Displays the current user's email and a logout button.
 */
export default function Topbar({ userEmail }: TopbarProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-100 bg-white/80 px-8 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-950/80">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Overview
        </h2>
        <div className="hidden h-5 w-[1px] bg-gray-200 md:block dark:bg-zinc-800" />
        <span className="hidden text-sm text-gray-500 dark:text-gray-400 md:block">
          Welcome back, Sir.
        </span>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 rounded-full border border-gray-100 bg-gray-50/50 px-4 py-2 dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
             <FaUserCircle className="h-4 w-4" />
          </div>
          <span className="hidden text-sm font-medium text-gray-700 dark:text-gray-300 sm:inline">
            {userEmail?.split('@')[0]}
          </span>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600 transition-all hover:bg-red-600 hover:text-white dark:bg-red-900/10 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white"
            title="Sign out"
          >
            <FaSignOutAlt className="h-5 w-5 transition-transform group-hover:rotate-12" />
          </button>
        </form>
      </div>
    </header>
  );
}
