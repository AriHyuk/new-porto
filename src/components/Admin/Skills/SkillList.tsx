'use client';

import { Skill } from '@/types/skill';
import { deleteSkill } from '@/app/admin/skills/actions';
import Link from 'next/link';
import { useTransition, useState } from 'react';
import { FaEdit, FaTrash, FaLayerGroup } from 'react-icons/fa';
import SkillIcon from '@/components/SkillIcon';
import toast from 'react-hot-toast';
import Modal from '@/components/UI/Modal';

interface SkillListProps {
  skills: Skill[];
}

export default function SkillList({ skills }: SkillListProps) {
  const [isPending, startTransition] = useTransition();

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const confirmDelete = async () => {
    if (!deleteId) return;

    startTransition(async () => {
      const result = await deleteSkill(deleteId);
      if (result.success) {
        toast.success(result.message || 'Skill removed.');
        setDeleteId(null);
      } else {
        toast.error(result.message || 'Failed to remove skill.');
      }
    });
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  if (!skills.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-white/50 dark:bg-zinc-900/50 rounded-3xl border-2 border-dashed border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
        <div className="h-16 w-16 rounded-2xl bg-gray-50 dark:bg-zinc-800 flex items-center justify-center mb-4">
            <FaLayerGroup className="h-6 w-6 text-gray-300" />
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white">Arsenal Empty</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-[200px] text-center">Your skill set is currently hidden. Add talents to showcase your expertise.</p>
        <Link 
            href="/admin/skills/new"
            className="mt-6 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
            + Register New Skill
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white/50 backdrop-blur-sm shadow-xl shadow-gray-100/20 dark:border-zinc-800 dark:bg-zinc-900/50 dark:shadow-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-zinc-800/30">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Visual Signature</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Talent Identity</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Segment</th>
              <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Commands</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-zinc-800">
            {skills.map((skill) => (
              <tr key={skill.id} className="group transition-all hover:bg-white dark:hover:bg-zinc-800/40">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm border border-gray-100 dark:border-zinc-700 transition-transform group-hover:scale-110">
                      <SkillIcon iconKey={skill.icon_key} className="text-2xl" />
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {skill.name}
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 mt-0.5 uppercase">ID: {skill.id.slice(0, 8)}</div>
                </td>
                <td className="px-8 py-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30">
                        {skill.category}
                    </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                    <Link
                      href={`/admin/skills/${skill.id}/edit`}
                      className="h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-blue-600 hover:text-white transition-all dark:bg-zinc-800 dark:text-gray-400 dark:hover:bg-blue-500 dark:hover:text-white shadow-sm"
                      title="Edit Talent"
                    >
                      <FaEdit className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      disabled={isPending}
                      className="h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-red-600 hover:text-white transition-all dark:bg-zinc-800 dark:text-gray-400 dark:hover:bg-red-500 dark:hover:text-white shadow-sm disabled:opacity-50"
                      title="Retire Talent"
                    >
                      <FaTrash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Retire Skill"
        description="Are you sure you want to retire this skill? It will be removed from your public profile."
        variant="danger"
        confirmLabel="Retire Skill"
        onConfirm={confirmDelete}
        isLoading={isPending}
      />
    </div>
  );
}
