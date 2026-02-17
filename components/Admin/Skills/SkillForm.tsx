'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createSkill, updateSkill, type ActionState } from '@/app/admin/skills/actions';
import { Skill } from '@/types/skill';
import Link from 'next/link';
import SkillIcon from '@/components/SkillIcon';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaSave, FaTimes, FaLayerGroup, FaTags } from 'react-icons/fa';

interface SkillFormProps {
  skill?: Skill;
  mode: 'create' | 'edit';
}

const initialState: ActionState = {
  success: false,
  message: '',
  errors: {},
};

const ICON_OPTIONS = [
  'react', 'node', 'mongodb', 'express', 'nextjs', 'typescript', 
  'javascript', 'tailwindcss', 'supabase', 'postgresql', 'docker', 
  'go', 'kotlin', 'laravel'
];

export default function SkillForm({ skill, mode }: SkillFormProps) {
  const router = useRouter();
  const action = mode === 'create' ? createSkill : updateSkill.bind(null, skill?.id || '');
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        router.push('/admin/skills');
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl"
    >
      <form action={formAction} className="space-y-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-100/20 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <FaLayerGroup />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Skill Identity</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Define the core attributes of your expertise.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name */}
            <div className="space-y-2">
                <label htmlFor="name" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Skill Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={skill?.name}
                  placeholder="e.g. Next.js"
                  className="w-full px-4 py-3 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-medium"
                />
                {state.errors?.name && (
                  <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{state.errors.name[0]}</p>
                )}
            </div>

            {/* Category */}
            <div className="space-y-2">
                <label htmlFor="category" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                   Category
                </label>
                <select
                    id="category"
                    name="category"
                    defaultValue={skill?.category || ''}
                    className="w-full px-4 py-3 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-medium appearance-none"
                >
                    <option value="" disabled>Select Segment</option>
                    <option value="Frontend">Frontend Development</option>
                    <option value="Backend">Backend Architecture</option>
                    <option value="Database">Database Management</option>
                    <option value="DevOps">Cloud & DevOps</option>
                    <option value="Mobile">Mobile Solutions</option>
                    <option value="Language">Programming Language</option>
                    <option value="Other">Specialities / Others</option>
                </select>
                {state.errors?.category && (
                  <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{state.errors.category[0]}</p>
                )}
            </div>
          </div>

          <div className="mt-10">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
               Visual Signature (Icon)
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-4">
                {ICON_OPTIONS.map((icon) => (
                    <label key={icon} className="group cursor-pointer">
                        <input 
                            type="radio" 
                            name="icon_key" 
                            value={icon} 
                            defaultChecked={skill?.icon_key === icon}
                            className="peer sr-only"
                        />
                        <div className="relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-transparent bg-gray-50 dark:bg-zinc-800/50 text-gray-400 transition-all group-hover:bg-gray-100 dark:group-hover:bg-zinc-800 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-500 peer-checked:shadow-lg peer-checked:shadow-blue-500/30">
                            <SkillIcon iconKey={icon} className="text-2xl mb-1.5" />
                            <span className="text-[8px] font-black uppercase tracking-tighter opacity-70 peer-checked:opacity-100">{icon}</span>
                        </div>
                    </label>
                ))}
            </div>
            {state.errors?.icon_key && (
              <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight mt-4">{state.errors.icon_key[0]}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/admin/skills"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-zinc-800"
          >
            <FaTimes className="text-xs" /> Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-8 py-2.5 text-sm font-black text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            <FaSave className="text-xs" /> {mode === 'create' ? 'Assemble Skill' : 'Commit Changes'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
