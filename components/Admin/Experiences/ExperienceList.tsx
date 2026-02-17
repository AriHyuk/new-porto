"use client";

import { Experience } from "@/types/experience";
import Link from "next/link";
import { FaEdit, FaTrash, FaBriefcase, FaBuilding, FaCalendarAlt } from "react-icons/fa";
import { deleteExperience } from "@/app/admin/experiences/actions";
import { useTransition, useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/UI/Modal";

interface ExperienceListProps {
  experiences: Experience[];
}

export default function ExperienceList({ experiences }: ExperienceListProps) {
  const [isPending, startTransition] = useTransition();

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const confirmDelete = async () => {
    if (!deleteId) return;

    startTransition(async () => {
      const result = await deleteExperience(deleteId);
      if (result.success) {
        toast.success(result.message || "Entry removed.");
        setDeleteId(null);
      } else {
        toast.error(result.message || "Failed to remove entry.");
      }
    });
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  if (experiences.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-white/50 dark:bg-zinc-900/50 rounded-3xl border-2 border-dashed border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
        <div className="h-16 w-16 rounded-2xl bg-gray-50 dark:bg-zinc-800 flex items-center justify-center mb-4">
            <FaBriefcase className="h-6 w-6 text-gray-300" />
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white">Career Path Undefined</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-[200px] text-center">Your professional journey is waiting to be documented.</p>
        <Link 
            href="/admin/experiences/new"
            className="mt-6 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
            + Add First Experience
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
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Position & Journey</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Company</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 text-center">Priority</th>
              <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Commands</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-zinc-800">
            {experiences.map((experience) => (
              <tr 
                key={experience.id} 
                className="group transition-all hover:bg-white dark:hover:bg-zinc-800/40"
              >
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {experience.position}
                    </span>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
                        <FaCalendarAlt className="text-[10px] opacity-70" />
                        {experience.period}
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                    <FaBuilding className="text-gray-300 dark:text-gray-600" />
                    {experience.company}
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                   <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-gray-50 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 border border-gray-100 dark:border-zinc-700">
                     #{experience.sort_order}
                   </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                    <Link
                      href={`/admin/experiences/${experience.id}/edit`}
                      className="h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-indigo-600 hover:text-white transition-all dark:bg-zinc-800 dark:text-gray-400 dark:hover:bg-indigo-500 dark:hover:text-white shadow-sm"
                      title="Edit Entry"
                    >
                      <FaEdit className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(experience.id)}
                      disabled={isPending}
                      className="h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-red-600 hover:text-white transition-all dark:bg-zinc-800 dark:text-gray-400 dark:hover:bg-red-500 dark:hover:text-white shadow-sm disabled:opacity-50"
                      title="Remove Entry"
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
        title="Delete Experience"
        description="Are you sure you want to delete this historical entry? This action cannot be undone."
        variant="danger"
        confirmLabel="Delete Experience"
        onConfirm={confirmDelete}
        isLoading={isPending}
      />
    </div>
  );
}
