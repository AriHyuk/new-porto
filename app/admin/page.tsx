/**
 * Admin Dashboard Home Page
 * Displays an overview of the portfolio statistics and quick actions.
 */
import Link from 'next/link';
import { 
  FaBriefcase, 
  FaCode, 
  FaAward, 
  FaProjectDiagram, 
  FaPlus, 
  FaArrowRight 
} from 'react-icons/fa';
import { getProjects } from '@/app/admin/projects/actions';
import { getAdminSkills } from '@/app/admin/skills/actions';
import { getAdminExperiences } from '@/app/admin/experiences/actions';
import { getAdminCertificates } from '@/app/admin/certificates/actions';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  // Fetch data in parallel
  const [projects, skills, experiences, certificates] = await Promise.all([
    getProjects(),
    getAdminSkills(),
    getAdminExperiences(),
    getAdminCertificates(),
  ]);

  const stats = [
    {
      label: 'Projects',
      value: projects.length,
      icon: FaProjectDiagram,
      href: '/admin/projects',
      color: 'text-blue-600',
      bg: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      label: 'Skills',
      value: skills.length,
      icon: FaCode,
      href: '/admin/skills',
      color: 'text-emerald-600',
      bg: 'bg-emerald-100 dark:bg-emerald-900/20',
    },
    {
      label: 'Experiences',
      value: experiences.length,
      icon: FaBriefcase,
      href: '/admin/experiences',
      color: 'text-purple-600',
      bg: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
      label: 'Certificates',
      value: certificates.length,
      icon: FaAward,
      href: '/admin/certificates',
      color: 'text-amber-600',
      bg: 'bg-amber-100 dark:bg-amber-900/20',
    },
  ];

  const quickActions = [
    { label: 'New Project', href: '/admin/projects/new', icon: FaProjectDiagram },
    { label: 'New Skill', href: '/admin/skills/new', icon: FaCode },
    { label: 'New Experience', href: '/admin/experiences/new', icon: FaBriefcase },
    { label: 'New Certificate', href: '/admin/certificates/new', icon: FaAward },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome back! Here&apos;s what&apos;s happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`rounded-lg p-3 ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm font-medium text-gray-500 transition-colors group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400">
              Manage {stat.label}
              <FaArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center transition-colors hover:border-blue-500 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:border-blue-500 dark:hover:bg-blue-900/10"
            >
              <div className="mb-3 rounded-full bg-white p-3 shadow-sm dark:bg-zinc-700">
                <FaPlus className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
