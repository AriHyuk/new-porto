'use client';

import { useState } from 'react';
import { Message } from '@/types/message';
import { markAsRead, deleteMessage } from '@/app/actions/messages';
import { FaTrash, FaCheck, FaEnvelope, FaCalendarAlt, FaDollarSign, FaUser, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

import Modal from '@/components/UI/Modal';

interface MessageTableProps {
  initialMessages: Message[];
}

export default function MessageTable({ initialMessages }: MessageTableProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();

  const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingId(id);
    const promise = markAsRead(id);
    
    toast.promise(promise, {
      loading: 'Marking as read...',
      success: 'Message marked as read!',
      error: 'Failed to mark as read.',
    });

    try {
      await promise;
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, status: 'read' } : msg))
      );
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  const confirmDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    // Use a separate loading state for the modal action if desired, 
    // or reuse loadingId, but here we just need to block the button.
    const id = deleteId;
    setLoadingId(id); 

    const promise = deleteMessage(id);

    toast.promise(promise, {
      loading: 'Deleting message...',
      success: 'Message deleted successfully!',
      error: 'Failed to delete message.',
    });

    try {
      await promise;
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      router.refresh();
      setDeleteId(null); // Close modal on success
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {messages.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center p-20 rounded-2xl border-2 border-dashed border-gray-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm"
          >
            <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
              <FaEnvelope className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No messages yet</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Collaborations from your portfolio will appear here.</p>
          </motion.div>
        ) : (
          messages.map((msg, index) => {
            const isPending = msg.status === 'pending';
            const isExpanded = expandedId === msg.id;

            return (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => toggleExpand(msg.id)}
                className={clsx(
                  "group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer",
                  isPending 
                    ? "bg-gradient-to-r from-blue-50/50 to-white dark:from-blue-900/10 dark:to-zinc-950 border-blue-100 dark:border-blue-900/30 ring-1 ring-blue-500/10" 
                    : "bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 hover:border-gray-200 dark:hover:border-zinc-700 shadow-sm"
                )}
              >
                {/* Status Indicator Bar */}
                {isPending && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                )}

                <div className="p-5 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Left: Sender Info */}
                    <div className="flex items-center gap-4">
                      <div className={clsx(
                        "h-12 w-12 rounded-xl flex items-center justify-center text-lg font-bold shadow-inner",
                        isPending 
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400" 
                          : "bg-gray-100 text-gray-400 dark:bg-zinc-800 dark:text-gray-500"
                      )}>
                        {msg.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className={clsx("font-bold text-base", isPending ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400")}>
                            {msg.name}
                          </h4>
                          {isPending && (
                            <span className="inline-flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                          )}
                        </div>
                        <a 
                          href={`mailto:${msg.email}`} 
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                        >
                          {msg.email}
                        </a>
                      </div>
                    </div>

                    {/* Center: Category & Budget */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700/50">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500">Service</span>
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{msg.category}</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20">
                         <FaDollarSign className="h-3 w-3 text-emerald-500" />
                         <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{msg.budget}</span>
                      </div>
                    </div>

                    {/* Right: Date & Expand */}
                    <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-gray-50 dark:border-zinc-800">
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                          <FaCalendarAlt className="h-3 w-3" />
                          {new Date(msg.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono mt-0.5">
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {isExpanded ? <FaChevronUp className="text-gray-300" /> : <FaChevronDown className="text-gray-300" />}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-800">
                          <div className="rounded-xl bg-gray-50/50 dark:bg-zinc-800/50 p-6 border border-gray-100 dark:border-zinc-700/50 backdrop-blur-md">
                            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                              {msg.message}
                            </p>
                          </div>
                          
                          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex gap-2">
                              {isPending && (
                                <button
                                  onClick={(e) => handleMarkAsRead(msg.id, e)}
                                  disabled={loadingId === msg.id}
                                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-50"
                                >
                                  <FaCheck /> Mark as Read
                                </button>
                              )}
                              <button
                                onClick={(e) => confirmDelete(msg.id, e)}
                                disabled={loadingId === msg.id}
                                className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-5 py-2.5 text-sm font-bold text-red-600 transition-all hover:bg-red-600 hover:text-white dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white"
                              >
                                <FaTrash /> Delete
                              </button>
                            </div>
                            
                            <a 
                              href={`mailto:${msg.email}?subject=Re: Portfolio Inquiry - ${msg.category}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
                            >
                              <FaEnvelope /> Reply to Client
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })
        )}
      </AnimatePresence>

      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete Message"
        description="Are you sure you want to permanently delete this message? This action cannot be undone."
        variant="danger"
        confirmLabel="Delete"
        onConfirm={handleDelete}
        isLoading={loadingId === deleteId}
      />
    </div>
  );
}
