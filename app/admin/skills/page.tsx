import { getAdminSkills } from '@/app/admin/skills/actions';
import SkillList from '@/components/Admin/Skills/SkillList';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

export default async function AdminSkillsPage() {
  const skills = await getAdminSkills();

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Technical Arsenal
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your technology stacks and professional expertise.
          </p>
        </div>

        <Link
          href="/admin/skills/new"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-95 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <FaPlus className="text-xs" />
          Register New Talent
        </Link>
      </div>

      <SkillList skills={skills} />
    </div>
  );
}
