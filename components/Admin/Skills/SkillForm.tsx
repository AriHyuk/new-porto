'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createSkill, updateSkill, type ActionState } from '@/app/admin/skills/actions';
import { Skill } from '@/types/skill';
import Link from 'next/link';
import SkillIcon from '@/components/SkillIcon';

interface SkillFormProps {
  skill?: Skill;
  mode: 'create' | 'edit';
}

const initialState: ActionState = {
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
    if (state.message === '' && !state.errors && mode === 'create') {
        // Handle success if needed, though server action redirects
    }
  }, [state, mode, router]);

  return (
    <form action={formAction} className="space-y-6 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm max-w-2xl">
      
      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Skill Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={skill?.name}
          placeholder="e.g. React"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />
        {state.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Category *
        </label>
        <select
            id="category"
            name="category"
            defaultValue={skill?.category || ''}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        >
            <option value="" disabled>Select a category</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="DevOps">DevOps</option>
            <option value="Mobile">Mobile</option>
            <option value="Language">Language</option>
            <option value="Other">Other</option>
        </select>
        {state.errors?.category && (
          <p className="text-sm text-red-500">{state.errors.category[0]}</p>
        )}
      </div>

      {/* Icon Key */}
      <div className="space-y-2">
        <label htmlFor="icon_key" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Icon *
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {ICON_OPTIONS.map((icon) => (
                <label key={icon} className="cursor-pointer">
                    <input 
                        type="radio" 
                        name="icon_key" 
                        value={icon} 
                        defaultChecked={skill?.icon_key === icon}
                        className="peer sr-only"
                    />
                    <div className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 peer-checked:text-blue-600 transition-all hover:bg-gray-100 dark:hover:bg-zinc-700">
                        <SkillIcon iconKey={icon} className="text-2xl mb-1" />
                        <span className="text-[10px] uppercase font-bold">{icon}</span>
                    </div>
                </label>
            ))}
        </div>
        {state.errors?.icon_key && (
          <p className="text-sm text-red-500">{state.errors.icon_key[0]}</p>
        )}
      </div>

      {state.message && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
          {state.message}
        </div>
      )}

      <div className="flex items-center justify-end gap-4 pt-4">
        <Link
          href="/admin/skills"
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
        >
          {mode === 'create' ? 'Create Skill' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
