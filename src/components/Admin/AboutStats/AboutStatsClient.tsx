'use client';

import { useState, useTransition } from 'react';
import { toast } from 'react-hot-toast';
import { createAboutStat, updateAboutStat, deleteAboutStat } from '@/app/admin/about/actions';
import { FaPlus, FaTrash, FaSave } from 'react-icons/fa';
import type { AboutStat } from '@/actions/get-about-stats';

interface AboutStatsClientProps {
  initialStats: AboutStat[];
}

export default function AboutStatsClient({ initialStats }: AboutStatsClientProps) {
  const [stats, setStats] = useState(initialStats);
  const [showAdd, setShowAdd] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleUpdate = (id: string, field: keyof AboutStat, value: string) => {
    setStats((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleSave = (stat: AboutStat) => {
    startTransition(async () => {
      try {
        const fd = new FormData();
        fd.append('label', stat.label);
        fd.append('value', stat.value);
        fd.append('suffix', stat.suffix);
        await updateAboutStat(stat.id, fd);
        toast.success('Stat updated!');
      } catch {
        toast.error('Failed to update stat');
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this stat?')) return;
    startTransition(async () => {
      try {
        await deleteAboutStat(id);
        setStats((prev) => prev.filter((s) => s.id !== id));
        toast.success('Stat deleted');
      } catch {
        toast.error('Failed to delete stat');
      }
    });
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await createAboutStat(fd);
        toast.success('Stat added!');
        setShowAdd(false);
        // Re-fetch or optimistic update — for now, reload
        window.location.reload();
      } catch {
        toast.error('Failed to add stat');
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">About Stats</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Edit the stats shown in the About section</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          <FaPlus /> Add Stat
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <form onSubmit={handleCreate} className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">New Stat</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Label</label>
              <input name="label" required placeholder="e.g. Projects" className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-transparent text-sm" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Value</label>
              <input name="value" required placeholder="e.g. 15" className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-transparent text-sm" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Suffix</label>
              <input name="suffix" placeholder="e.g. +" className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-transparent text-sm" />
            </div>
          </div>
          <div className="flex gap-2">
            <button type="submit" disabled={isPending} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">Save</button>
            <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 bg-gray-100 dark:bg-zinc-700 rounded-lg text-sm font-semibold">Cancel</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 space-y-3">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Label</label>
              <input
                value={stat.label}
                onChange={(e) => handleUpdate(stat.id, 'label', e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-transparent text-sm font-semibold"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Value</label>
                <input
                  value={stat.value}
                  onChange={(e) => handleUpdate(stat.id, 'value', e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-transparent text-sm"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Suffix</label>
                <input
                  value={stat.suffix}
                  onChange={(e) => handleUpdate(stat.id, 'suffix', e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-transparent text-sm"
                />
              </div>
            </div>

            {/* Preview */}
            <div className="text-center py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-2xl font-black text-gray-900 dark:text-white">
                {stat.value}<span className="text-xs text-blue-600 ml-0.5">{stat.suffix}</span>
              </span>
              <p className="text-[9px] uppercase tracking-widest text-gray-400 mt-1">{stat.label}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => handleSave(stat)} disabled={isPending} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold">
                <FaSave /> Save
              </button>
              <button onClick={() => handleDelete(stat.id)} disabled={isPending} className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                <FaTrash className="text-xs" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
