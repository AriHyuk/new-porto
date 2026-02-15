"use client";

import { Experience } from "@/types/experience";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteExperience } from "@/app/admin/experiences/actions";
import { useTransition } from "react";
import toast from "react-hot-toast";

interface ExperienceListProps {
  experiences: Experience[];
}

export default function ExperienceList({ experiences }: ExperienceListProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    startTransition(async () => {
      try {
        await deleteExperience(id);
        toast.success("Experience deleted successfully");
      } catch (error) {
        toast.error("Failed to delete experience");
        console.error(error);
      }
    });
  };

  if (experiences.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-neutral-900 rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
        <p className="text-gray-500 dark:text-gray-400">No experiences found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Position</th>
              <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Company</th>
              <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Period</th>
              <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center">Sort</th>
              <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {experiences.map((experience) => (
              <tr 
                key={experience.id} 
                className="group hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {experience.position}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {experience.company}
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                  <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
                    {experience.period}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-center font-mono">
                  {experience.sort_order}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      href={`/admin/experiences/${experience.id}/edit`}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/20 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FaEdit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(experience.id)}
                      disabled={isPending}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50"
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
