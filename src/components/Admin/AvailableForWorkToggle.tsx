'use client';

import { useState, useTransition } from 'react';
import { toggleAvailableForWork } from '@/actions/update-site-settings';
import { toast } from 'react-hot-toast';

interface AvailableForWorkToggleProps {
  initialValue: boolean;
}

export default function AvailableForWorkToggle({ initialValue }: AvailableForWorkToggleProps) {
  const [isAvailable, setIsAvailable] = useState(initialValue);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      try {
        await toggleAvailableForWork(isAvailable);
        setIsAvailable((prev) => !prev);
        toast.success(isAvailable ? 'Now unavailable for work' : '🟢 Now available for work!');
      } catch {
        toast.error('Failed to update availability');
      }
    });
  };

  return (
    <div className="flex items-center justify-between p-6 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800">
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Available for Work</h3>
        <p className="text-xs text-gray-400 mt-0.5">Shown in Hero section and Footer</p>
      </div>
      <button
        onClick={handleToggle}
        disabled={isPending}
        className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isPending ? 'opacity-50 cursor-not-allowed' : ''} ${isAvailable ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-zinc-600'}`}
        title={isAvailable ? 'Click to set unavailable' : 'Click to set available'}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${isAvailable ? 'translate-x-8' : 'translate-x-1'}`}
        />
      </button>
    </div>
  );
}
