"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChartPie, FaProjectDiagram, FaBriefcase, FaCode, FaAward, FaEnvelope } from "react-icons/fa";
import clsx from "clsx";

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
    <aside className="hidden flex-col border-r border-gray-200 bg-white w-64 md:flex dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-zinc-800">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
          Admin Panel
        </span>
      </div>
      <nav className="flex-1 space-y-2 px-4 py-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-150",
                isActive
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-zinc-800"
              )}
            >
              <item.icon className={clsx("mr-3 h-5 w-5", isActive ? "text-blue-700 dark:text-blue-400" : "text-gray-400 group-hover:text-gray-500")} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
