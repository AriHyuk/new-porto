"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createExperience, updateExperience } from "@/app/admin/experiences/actions";
import Link from "next/link";
import { Experience } from "@/types/experience";

interface ExperienceFormProps {
  experience?: Experience;
  mode: "create" | "edit";
}

const initialState = {
  message: "",
  errors: {},
};

export default function ExperienceForm({ experience, mode }: ExperienceFormProps) {
  const action = mode === "create" ? createExperience : updateExperience;
  const [state, formAction] = useActionState(action, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        router.push("/admin/experiences");
      } else if (state.message !== "Validation failed") {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-6 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-xl">
      {mode === "edit" && <input type="hidden" name="id" value={experience?.id} />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Position */}
        <div className="space-y-2">
          <label htmlFor="position" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Position / Role <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="position"
            name="position"
            defaultValue={experience?.position}
            placeholder="e.g. Senior Frontend Engineer"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            required
          />
          {state.errors?.position && (
            <p className="text-sm text-red-500">{state.errors.position[0]}</p>
          )}
        </div>

        {/* Company */}
        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Company <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            defaultValue={experience?.company}
            placeholder="e.g. Google"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            required
          />
          {state.errors?.company && (
            <p className="text-sm text-red-500">{state.errors.company[0]}</p>
          )}
        </div>

        {/* Period */}
        <div className="space-y-2">
          <label htmlFor="period" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Period <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="period"
            name="period"
            defaultValue={experience?.period}
            placeholder="e.g. Jan 2023 - Present"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            required
          />
          {state.errors?.period && (
            <p className="text-sm text-red-500">{state.errors.period[0]}</p>
          )}
        </div>

        {/* Sort Order */}
        <div className="space-y-2">
          <label htmlFor="sort_order" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Sort Order
          </label>
          <input
            type="number"
            id="sort_order"
            name="sort_order"
            defaultValue={experience?.sort_order || 0}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          {state.errors?.sort_order && (
            <p className="text-sm text-red-500">{state.errors.sort_order[0]}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={experience?.description}
          rows={4}
          placeholder="Briefly describe your responsibilities and achievements..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
          required
        />
        {state.errors?.description && (
          <p className="text-sm text-red-500">{state.errors.description[0]}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100 dark:border-white/5">
        <Link
          href="/admin/experiences"
          className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {mode === "create" ? "Create Experience" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
