"use client";

import { createProject, updateProject } from "@/app/admin/projects/actions";
import { Project } from "@/types";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaSave, FaTimes, FaCloudUploadAlt, FaCode, FaLink, FaGithub, FaHeading, FaAlignLeft } from "react-icons/fa";
import { motion } from "framer-motion";

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
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600"
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          {mode === "create" ? "Creating..." : "Updating..."}
        </span>
      ) : (
        <>
          <FaSave className="text-xs" />
          {mode === "create" ? "Publish Project" : "Save Changes"}
        </>
      )}
    </button>
  );
}

export default function ProjectForm({ project, mode }: ProjectFormProps) {
  const action = mode === "create" ? createProject : updateProject;
  const [state, formAction] = useActionState(action, initialState);
  const [previewImage, setPreviewImage] = useState<string | null>(project?.image_url || null);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      action={formAction} 
      className="space-y-8"
    >
      {mode === "edit" && <input type="hidden" name="id" value={project?.id} />}
      {mode === "edit" && <input type="hidden" name="existing_image_url" value={project?.image_url || ""} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Essential Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 shadow-xl shadow-gray-100/20 dark:shadow-none">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-1 bg-indigo-500 rounded-full" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Project Details</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="title" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                  <FaHeading className="text-indigo-500/50" /> Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  defaultValue={project?.title}
                  placeholder="e.g., E-Commerce Management System"
                  className="w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-zinc-900"
                />
              </div>

              <div>
                <label htmlFor="description" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                  <FaAlignLeft className="text-indigo-500/50" /> Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={6}
                  defaultValue={project?.description || ""}
                  placeholder="Describe your masterpiece..."
                  className="w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-zinc-900"
                />
              </div>

              <div>
                <label htmlFor="tech_stack" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                  <FaCode className="text-indigo-500/50" /> Tech Stack (Comma Separated)
                </label>
                <input
                  type="text"
                  name="tech_stack"
                  id="tech_stack"
                  required
                  defaultValue={project?.tech_stack?.join(", ")}
                  placeholder="Next.js, TypeScript, Tailwind, Supabase"
                  className="w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-zinc-900"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
             <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-1 bg-emerald-500 rounded-full" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Deployment & Source</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="demo_url" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                  <FaLink className="text-emerald-500/50" /> Live Demo URL
                </label>
                <input
                  type="url"
                  name="demo_url"
                  id="demo_url"
                  defaultValue={project?.demo_url || ""}
                  placeholder="https://demo.example.com"
                  className="w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition-all focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-white dark:focus:border-emerald-500 dark:focus:bg-zinc-900"
                />
              </div>

              <div>
                <label htmlFor="repo_url" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                  <FaGithub className="text-emerald-500/50" /> Repository URL
                </label>
                <input
                  type="url"
                  name="repo_url"
                  id="repo_url"
                  defaultValue={project?.repo_url || ""}
                  placeholder="https://github.com/yourname/repo"
                  className="w-full rounded-xl border-gray-200 bg-gray-50/50 px-4 py-3 text-sm transition-all focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-white dark:focus:border-emerald-500 dark:focus:bg-zinc-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Image Preview & Upload */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-1 bg-amber-500 rounded-full" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Cover Image</h2>
            </div>

            <div className="space-y-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-800/50 group transition-all hover:border-indigo-400/50">
                {previewImage ? (
                  <>
                    <img src={previewImage} alt="Preview" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <FaCloudUploadAlt className="text-3xl text-white" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <FaCloudUploadAlt className="text-4xl mb-2" />
                    <span className="text-xs font-medium">No image selected</span>
                  </div>
                )}
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 z-10 cursor-pointer opacity-0"
                />
              </div>
              
              <div className="rounded-xl bg-amber-50/50 p-4 border border-amber-100 dark:bg-amber-900/10 dark:border-amber-900/20">
                <ul className="text-[10px] space-y-1 font-semibold text-amber-700 dark:text-amber-500 uppercase tracking-widest">
                  <li>• Recommendation: 1280x720px</li>
                  <li>• Formats: JPG, PNG, WebP</li>
                  <li>• Size Limit: 5MB</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <SubmitButton mode={mode} />
            <Link
              href="/admin/projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-bold text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-900 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-400 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              <FaTimes className="text-xs" /> Discard
            </Link>
          </div>
        </div>
      </div>
    </motion.form>
  );
}
