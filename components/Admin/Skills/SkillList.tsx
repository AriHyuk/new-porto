'use client';

import { Skill } from '@/types/skill';
import { deleteSkill } from '@/app/admin/skills/actions';
import Link from 'next/link';
import { useTransition } from 'react';
import { FaEdit, FaTrash, FaGlobe } from 'react-icons/fa';
import SkillIcon from '@/components/SkillIcon';

interface SkillListProps {
  skills: Skill[];
}

export default function SkillList({ skills }: SkillListProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      startTransition(async () => {
        try {
          await deleteSkill(id);
        } catch (error) {
          console.error('Failed to delete skill:', error);
          alert('Failed to delete skill. Please try again.');
        }
      });
    }
  };

  if (!skills.length) {
    return (
      <div className="text-center py-12 bg-white dark:bg-neutral-900 rounded-2xl border border-dashed border-gray-300 dark:border-neutral-800">
        <p className="text-gray-500 dark:text-gray-400">No skills found. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-neutral-800/50 border-b border-gray-100 dark:border-neutral-800">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">Icon</th>
              <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">Name</th>
              <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">Category</th>
              <th className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
            {skills.map((skill) => (
              <tr key={skill.id} className="hover:bg-gray-50/50 dark:hover:bg-neutral-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-neutral-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <SkillIcon iconKey={skill.icon_key} className="text-xl" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900 dark:text-white">{skill.name}</div>
                </td>
                <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        {skill.category}
                    </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/skills/${skill.id}/edit`}
                      className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                      title="Edit"
                    >
                      <FaEdit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      disabled={isPending}
                      className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
