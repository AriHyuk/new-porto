"use client";

import { deleteProject } from "@/app/admin/projects/actions";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export default function DeleteProjectButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      return;
    }

    startTransition(async () => {
      const result = await deleteProject(id);
      if (result?.success) {
        toast.success(result.message);
      } else {
        toast.error(result?.message || "Failed to delete project");
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="rounded p-2 text-red-600 hover:bg-red-50 hover:text-red-900 disabled:opacity-50 dark:hover:bg-red-900/20"
      title="Delete Project"
    >
      <FaTrash className={isPending ? "animate-pulse" : ""} />
    </button>
  );
}
