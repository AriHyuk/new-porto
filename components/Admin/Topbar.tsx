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
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="text-lg font-medium text-gray-800 dark:text-gray-200">
        Dashboard
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <FaUserCircle className="h-5 w-5" />
          <span className="hidden sm:inline">{userEmail}</span>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/10"
          >
            <FaSignOutAlt />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </form>
      </div>
    </header>
  );
}
