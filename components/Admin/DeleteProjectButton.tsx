"use client";

import { deleteProject } from "@/app/admin/projects/actions";
import { useTransition, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/UI/Modal";

export default function DeleteProjectButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const [showModal, setShowModal] = useState(false);

  const confirmDelete = async () => {
    startTransition(async () => {
      const result = await deleteProject(id);
      if (result?.success) {
        toast.success(result.message);
        setShowModal(false);
      } else {
        toast.error(result?.message || "Failed to delete project");
      }
    });
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-red-500/10 text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-500/20"
      title="Delete Project"
    >
      <AnimatePresence mode="wait">
        {isPending ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 180 }}
          >
            <FaSpinner className="h-4 w-4 animate-spin" />
          </motion.div>
        ) : (
          <motion.div
            key="icon"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="group-hover:animate-bounce"
          >
            <FaTrash className="h-4 w-4" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Premium glow effect on hover */}
      <div className="absolute inset-0 -z-10 bg-red-500/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
    
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Delete Project"
        description="Are you sure you want to delete this project? This action cannot be undone."
        variant="danger"
        confirmLabel="Delete Project"
        onConfirm={confirmDelete}
        isLoading={isPending}
      />
    </button>
  );
}
