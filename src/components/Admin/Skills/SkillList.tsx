'use client';

import { Skill } from '@/types/skill';
import { deleteSkill } from '@/app/admin/skills/actions';
import Link from 'next/link';
import { useTransition, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaLayerGroup } from 'react-icons/fa';
import SkillIcon, { getSkillColor } from '@/components/UI/SkillIcon';
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
        <table className="w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-zinc-800/30">
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-zinc-800">Visual Signature</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-zinc-800">Talent Identity</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-zinc-800">Segment</th>
              <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-zinc-800">Commands</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-zinc-800/50">
            {skills.map((skill, index) => (
              <motion.tr 
                key={skill.id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group transition-all hover:bg-white dark:hover:bg-zinc-800/40"
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm border border-gray-100 dark:border-zinc-700 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl group-hover:shadow-blue-500/10"
                      style={{ color: getSkillColor(skill.icon_key) }}
                    >
                      <SkillIcon iconKey={skill.icon_key} className="text-3xl" />
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="font-black text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-base tracking-tight">
                    {skill.name}
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 mt-1 uppercase tracking-widest opacity-60">REF: {skill.id.slice(0, 8)}</div>
                </td>
                <td className="px-8 py-6">
                    <span 
                      className="inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-blue-50/50 text-blue-700 border border-blue-100/50 dark:bg-blue-900/10 dark:text-blue-400 dark:border-blue-900/20 shadow-sm"
                      style={{
                        backgroundColor: `${getSkillColor(skill.icon_key)}10`,
                        color: getSkillColor(skill.icon_key),
                        borderColor: `${getSkillColor(skill.icon_key)}20`
                      }}
                    >
                        {skill.category}
                    </span>
                </td>
                <td className="px-8 py-6 text-right text-transparent group-hover:text-inherit">
                  <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                    <Link
                      href={`/admin/skills/${skill.id}/edit`}
                      className="h-11 w-11 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-400 hover:bg-blue-600 hover:text-white transition-all dark:bg-zinc-800 dark:text-gray-500 dark:hover:bg-blue-500 dark:hover:text-white shadow-sm ring-1 ring-gray-200/50 dark:ring-zinc-700/50"
                      title="Edit Talent"
                    >
                      <FaEdit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      disabled={isPending}
                      className="h-11 w-11 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-400 hover:bg-red-600 hover:text-white transition-all dark:bg-zinc-800 dark:text-gray-500 dark:hover:bg-red-500 dark:hover:text-white shadow-sm ring-1 ring-gray-200/50 dark:ring-zinc-700/50 disabled:opacity-50"
                      title="Retire Talent"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
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
