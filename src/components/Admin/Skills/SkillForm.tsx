'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createSkill, updateSkill, type ActionState } from '@/app/admin/skills/actions';
import { Skill } from '@/types/skill';
import Link from 'next/link';
import SkillIcon from '@/components/UI/SkillIcon';
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

const ICON_OPTIONS: Record<string, { label: string; group: string }> = {
  // Core Development
  react: { label: 'React', group: 'Core' },
  nextjs: { label: 'Next.js', group: 'Core' },
  node: { label: 'Node.js', group: 'Core' },
  typescript: { label: 'TypeScript', group: 'Core' },
  javascript: { label: 'JavaScript', group: 'Core' },
  go: { label: 'Go', group: 'Core' },
  laravel: { label: 'Laravel', group: 'Core' },
  python: { label: 'Python', group: 'Core' },
  kotlin: { label: 'Kotlin', group: 'Core' },
  tailwindcss: { label: 'Tailwind CSS', group: 'Core' },
  
  // Database & Backend
  supabase: { label: 'Supabase', group: 'Data' },
  postgresql: { label: 'PostgreSQL', group: 'Data' },
  mongodb: { label: 'MongoDB', group: 'Data' },
  express: { label: 'Express', group: 'Data' },
  mysql: { label: 'MySQL', group: 'Data' },
  redis: { label: 'Redis', group: 'Data' },
  graphql: { label: 'GraphQL', group: 'Data' },

  // Engineering & Testing
  docker: { label: 'Docker', group: 'Eng' },
  testing: { label: 'Testing', group: 'Eng' },
  playwright: { label: 'Playwright', group: 'Eng' },
  cypress: { label: 'Cypress', group: 'Eng' },
  vitest: { label: 'Vitest', group: 'Eng' },
  git: { label: 'Git', group: 'Eng' },
  github: { label: 'GitHub', group: 'Eng' },

  // Management
  agile: { label: 'Agile', group: 'Management' },
  jira: { label: 'Jira', group: 'Management' },
  notion: { label: 'Notion', group: 'Management' },
  trello: { label: 'Trello', group: 'Management' },
  slack: { label: 'Slack', group: 'Management' },
  discord: { label: 'Discord', group: 'Management' },

  // Cloud & Design
  gcp: { label: 'GCP', group: 'Cloud & Design' },
  vercel: { label: 'Vercel', group: 'Cloud & Design' },
  firebase: { label: 'Firebase', group: 'Cloud & Design' },
  s3: { label: 'AWS S3', group: 'Cloud & Design' },
  figma: { label: 'Figma', group: 'Cloud & Design' },
  framer: { label: 'Framer', group: 'Cloud & Design' },
  photoshop: { label: 'Photoshop', group: 'Cloud & Design' },
  premiere: { label: 'Premiere', group: 'Cloud & Design' },
};

const GROUPS = [
    { id: 'Core', label: 'Core Development' },
    { id: 'Data', label: 'Database & Backend' },
    { id: 'Eng', label: 'Engineering & DevOps' },
    { id: 'Management', label: 'Project Management' },
    { id: 'Cloud & Design', label: 'Cloud & Visual Design' },
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
        className="max-w-4xl"
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
                    <option value="Engineering">Engineering & Practices</option>
                    <option value="Management">Management & Agile</option>
                    <option value="Machine Learning">AI & Machine Learning</option>
                    <option value="Tools">Development Tools</option>
                    <option value="Language">Programming Language</option>
                </select>
                {state.errors?.category && (
                  <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">{state.errors.category[0]}</p>
                )}
            </div>
          </div>

          <div className="mt-12 space-y-12">
            {GROUPS.map((group) => (
              <div key={group.id}>
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 dark:text-gray-500 mb-8 border-l-4 border-blue-500 pl-4">
                   {group.label}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {Object.entries(ICON_OPTIONS)
                      .filter(([_, info]) => info.group === group.id)
                      .map(([key, info]) => (
                        <label key={key} className="group cursor-pointer">
                            <input 
                                type="radio" 
                                name="icon_key" 
                                value={key} 
                                defaultChecked={skill?.icon_key === key}
                                className="peer sr-only"
                            />
                            <div className="relative flex flex-col items-center justify-center p-4 rounded-3xl border-2 border-dashed border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-gray-400 transition-all duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-50/30 dark:group-hover:bg-blue-900/10 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 peer-checked:shadow-2xl peer-checked:shadow-blue-500/40 peer-checked:scale-105 peer-checked:border-solid">
                                <SkillIcon iconKey={key} className="text-3xl mb-3 transition-transform duration-500 group-hover:scale-110" />
                                <span className="text-[9px] font-bold uppercase tracking-widest opacity-60 peer-checked:opacity-100 truncate w-full text-center">
                                    {info.label}
                                </span>
                                
                                <div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-blue-500 opacity-0 peer-checked:opacity-100 transition-opacity" />
                            </div>
                        </label>
                    ))}
                </div>
              </div>
            ))}
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
