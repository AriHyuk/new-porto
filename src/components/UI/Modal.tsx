'use client';

import { Fragment, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import clsx from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'danger' | 'success';
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  isLoading?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  variant = 'default',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  isLoading = false,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/20 bg-white/80 dark:bg-zinc-900/80 p-6 shadow-2xl backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-zinc-800 dark:hover:text-gray-300"
              >
                <FaTimes className="h-4 w-4" />
              </button>

              <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-start gap-4">
                  {variant === 'danger' && (
                    <div className="flex-shrink-0 rounded-full bg-red-100 p-3 dark:bg-red-900/20">
                      <FaExclamationTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                  )}
                  <div className="mt-1">
                    <h3
                      id="modal-title"
                      className="text-lg font-bold leading-6 text-gray-900 dark:text-white"
                    >
                      {title}
                    </h3>
                    {description && (
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Body */}
                {children && <div className="mt-2">{children}</div>}

                {/* Footer (Action Actions) */}
                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    disabled={isLoading}
                    onClick={onClose}
                    className="inline-flex justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700 dark:hover:text-white"
                  >
                    {cancelLabel}
                  </button>
                  {onConfirm && (
                    <button
                      disabled={isLoading}
                      onClick={onConfirm}
                      className={clsx(
                         "inline-flex justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
                         variant === 'danger' 
                           ? "bg-red-600 hover:bg-red-700 focus:ring-red-500 shadow-red-500/20"
                           : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 shadow-blue-500/20"
                      )}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        confirmLabel
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </Fragment>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
