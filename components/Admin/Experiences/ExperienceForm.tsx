"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createExperience, updateExperience, type ActionState } from "@/app/admin/experiences/actions";
import Link from "next/link";
import { Experience } from "@/types/experience";
import { motion } from "framer-motion";
import { FaSave, FaTimes, FaBriefcase, FaCalendarAlt, FaSortAmountDown, FaAlignLeft, FaBuilding } from "react-icons/fa";

interface ExperienceFormProps {
  experience?: Experience;
  mode: "create" | "edit";
}

const initialState: ActionState = {
  success: false,
  message: "",
  errors: {},
};

export default function ExperienceForm({ experience, mode }: ExperienceFormProps) {
  const action = mode === "create" ? createExperience : updateExperience.bind(null, experience?.id || "");
  const [state, formAction] = useActionState(action, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        router.push("/admin/experiences");
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl"
    >
      <form action={formAction} className="space-y-8">
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-100/20 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <FaBriefcase className="text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Professional Chapter</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Document a significant period in your career journey.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Position */}
            <div className="space-y-2">
              <label htmlFor="position" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                <FaBriefcase className="text-indigo-500/50" /> Position / Role
              </label>
              <input
                type="text"
                id="position"
                name="position"
                defaultValue={experience?.position}
                placeholder="e.g. Lead Software Architect"
                className="w-full px-4 py-3 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                required
              />
              {state.errors?.position && (
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{state.errors.position[0]}</p>
              )}
            </div>

            {/* Company */}
            <div className="space-y-2">
              <label htmlFor="company" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                <FaBuilding className="text-indigo-500/50" /> Organization
              </label>
              <input
                type="text"
                id="company"
                name="company"
                defaultValue={experience?.company}
                placeholder="e.g. Tech Global Inc."
                className="w-full px-4 py-3 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                required
              />
              {state.errors?.company && (
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{state.errors.company[0]}</p>
              )}
            </div>

            {/* Period */}
            <div className="space-y-2">
              <label htmlFor="period" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                <FaCalendarAlt className="text-indigo-500/50" /> Tenure / Period
              </label>
              <input
                type="text"
                id="period"
                name="period"
                defaultValue={experience?.period}
                placeholder="e.g. Aug 2021 — Present"
                className="w-full px-4 py-3 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                required
              />
              {state.errors?.period && (
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{state.errors.period[0]}</p>
              )}
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <label htmlFor="sort_order" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                <FaSortAmountDown className="text-indigo-500/50" /> Display Priority
              </label>
              <input
                type="number"
                id="sort_order"
                name="sort_order"
                defaultValue={experience?.sort_order || 0}
                placeholder="0"
                className="w-full px-4 py-3 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
              />
              {state.errors?.sort_order && (
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{state.errors.sort_order[0]}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 space-y-2">
            <label htmlFor="description" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
              <FaAlignLeft className="text-indigo-500/50" /> Achievement Summary
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={experience?.description}
              rows={6}
              placeholder="Detail your impact and core responsibilities..."
              className="w-full px-4 py-3 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium resize-none"
              required
            />
            {state.errors?.description && (
              <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{state.errors.description[0]}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/experiences"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-zinc-800"
          >
            <FaTimes className="text-xs" /> Discard
          </Link>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-black text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            <FaSave className="text-xs" /> {mode === "create" ? "Save Experience" : "Refine Entry"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
