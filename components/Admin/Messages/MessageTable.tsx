'use client';

import { useState } from 'react';
import { Message } from '@/types/message';
import { markAsRead, deleteMessage } from '@/app/actions/messages';
import { FaTrash, FaCheck, FaEnvelope } from 'react-icons/fa';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

interface MessageTableProps {
  initialMessages: Message[];
}

export default function MessageTable({ initialMessages }: MessageTableProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleMarkAsRead = async (id: string) => {
    setLoadingId(id);
    try {
      await markAsRead(id);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, status: 'read' } : msg))
      );
      router.refresh();
    } catch (error) {
      console.error('Failed to mark as read', error);
      alert('Failed to mark as read');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    setLoadingId(id);
    try {
      await deleteMessage(id);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      router.refresh();
    } catch (error) {
      console.error('Failed to delete message', error);
      alert('Failed to delete message');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
        <thead className="bg-gray-50 dark:bg-zinc-800/50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Sender
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Subject / Category
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Message
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-zinc-800 dark:bg-zinc-900">
          {messages.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                No messages found.
              </td>
            </tr>
          ) : (
            messages.map((msg) => (
              <tr 
                key={msg.id} 
                className={clsx(
                  "transition-colors hover:bg-gray-50 dark:hover:bg-zinc-800/50",
                  msg.status === 'pending' && "bg-blue-50/50 dark:bg-blue-900/10"
                )}
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className={clsx("text-sm font-medium", msg.status === 'pending' ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300")}>
                      {msg.name}
                    </span>
                    <a href={`mailto:${msg.email}`} className="text-xs text-indigo-600 hover:underline dark:text-indigo-400 flex items-center mt-1">
                      <FaEnvelope className="mr-1 h-3 w-3" />
                      {msg.email}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-900 dark:text-white font-medium">{msg.category}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Budget: {msg.budget}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 max-w-xs" title={msg.message}>
                    {msg.message}
                  </p>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {new Date(msg.created_at).toLocaleDateString()}
                  <div className="text-xs opacity-70">
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    {msg.status === 'pending' && (
                      <button
                        onClick={() => handleMarkAsRead(msg.id)}
                        disabled={loadingId === msg.id}
                        className="rounded p-2 text-green-600 hover:bg-green-50 hover:text-green-900 dark:text-green-400 dark:hover:bg-green-900/20 disabled:opacity-50"
                        title="Mark as Read"
                      >
                        <FaCheck />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(msg.id)}
                      disabled={loadingId === msg.id}
                      className="rounded p-2 text-red-600 hover:bg-red-50 hover:text-red-900 dark:text-red-400 dark:hover:bg-red-900/20 disabled:opacity-50"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
