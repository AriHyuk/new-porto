"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChartPie, FaProjectDiagram, FaBriefcase, FaCode, FaAward, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import clsx from "clsx";
import UnreadBadge from "./UnreadBadge";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: FaChartPie },
  { href: "/admin/messages", label: "Messages", icon: FaEnvelope },
  { href: "/admin/projects", label: "Projects", icon: FaProjectDiagram },
  { href: "/admin/experiences", label: "Experiences", icon: FaBriefcase },
  { href: "/admin/skills", label: "Skills", icon: FaCode },
  { href: "/admin/certificates", label: "Certificates", icon: FaAward },
];

/**
 * Admin Sidebar Component
 * Renders the navigation menu for the admin panel.
 * Highlights the active route.
 */
export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen flex-col border-r border-gray-200 bg-white/80 backdrop-blur-md w-72 md:flex dark:border-zinc-800/50 dark:bg-zinc-950/80">
      <div className="flex h-20 items-center px-8 border-b border-gray-100 dark:border-zinc-800/50">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
            A
          </div>
          <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-xl font-bold text-transparent dark:from-white dark:to-gray-400">
            AriHyuk
          </span>
        </div>
      </div>
      <nav className="flex-1 space-y-1.5 px-4 py-8 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "group flex items-center rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-zinc-900/50 dark:hover:text-white"
              )}
            >
              <item.icon className={clsx(
                "mr-3.5 h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                isActive ? "text-white" : "text-gray-400 group-hover:text-indigo-500"
              )} />
              {item.label}
              {item.href === "/admin/messages" && <UnreadBadge />}
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="ml-auto h-1.5 w-1.5 rounded-full bg-white shadow-sm"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-6 border-t border-gray-100 dark:border-zinc-800/50">
        <div className="rounded-2xl bg-gray-50 p-4 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800/50">
           <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">System Status</p>
           <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Elite Panel v2.4.0</span>
           </div>
        </div>
      </div>
    </aside>
  );
}
