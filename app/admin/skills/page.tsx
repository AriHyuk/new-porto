import { getAdminSkills } from '@/app/admin/skills/actions';
import SkillList from '@/components/Admin/Skills/SkillList';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

export default async function AdminSkillsPage() {
  const skills = await getAdminSkills();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Skills</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your technical skills and expertise</p>
        </div>
        <Link
          href="/admin/skills/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
        >
          <FaPlus className="w-4 h-4" />
          <span>Add Skill</span>
        </Link>
      </div>

      <SkillList skills={skills} />
    </div>
  );
}
