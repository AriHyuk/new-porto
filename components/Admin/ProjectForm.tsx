"use client";

import { createProject, updateProject } from "@/app/admin/projects/actions";
import { Project } from "@/types";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import toast from "react-hot-toast";
import { useEffect } from "react";

interface ProjectFormProps {
  project?: Project;
  mode: "create" | "edit";
}

const initialState = {
  success: false,
  message: "",
};

function SubmitButton({ mode }: { mode: "create" | "edit" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600"
    >
      {pending ? (mode === "create" ? "Creating..." : "Updating...") : (mode === "create" ? "Create Project" : "Update Project")}
    </button>
  );
}

export default function ProjectForm({ project, mode }: ProjectFormProps) {
  const action = mode === "create" ? createProject : updateProject;
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      {mode === "edit" && <input type="hidden" name="id" value={project?.id} />}
      {mode === "edit" && <input type="hidden" name="existing_image_url" value={project?.image_url || ""} />}

      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            defaultValue={project?.title}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            defaultValue={project?.description || ""}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white sm:text-sm"
          />
        </div>

        <div>
           <label htmlFor="tech_stack" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Tech Stack (comma separated) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="tech_stack"
            id="tech_stack"
            required
            defaultValue={project?.tech_stack?.join(", ")}
            placeholder="Next.js, Tailwind CSS, Supabase"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
            <label htmlFor="demo_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Demo URL
            </label>
            <input
                type="url"
                name="demo_url"
                id="demo_url"
                defaultValue={project?.demo_url || ""}
                placeholder="https://example.com"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white sm:text-sm"
            />
            </div>

            <div>
            <label htmlFor="repo_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Repo URL
            </label>
            <input
                type="url"
                name="repo_url"
                id="repo_url"
                defaultValue={project?.repo_url || ""}
                placeholder="https://github.com/..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white sm:text-sm"
            />
            </div>
        </div>

        <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Project Image
            </label>
            <div className="mt-1 flex items-center space-x-4">
                {project?.image_url && (
                    <img src={project.image_url} alt="Current" className="h-20 w-32 rounded object-cover border dark:border-zinc-700" />
                )}
                <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-zinc-800 dark:file:text-indigo-400"
                />
            </div>
             <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {mode === 'edit' ? "Upload to replace current image. " : ""} 
                Max 5MB. JPG, PNG, WebP.
            </p>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Link
          href="/admin/projects"
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
        >
          Cancel
        </Link>
        <SubmitButton mode={mode} />
      </div>
    </form>
  );
}
