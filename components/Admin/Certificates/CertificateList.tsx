"use client";

import { Certificate } from "@/types/certificate";
import { deleteCertificate } from "@/app/admin/certificates/actions";
import Link from "next/link";
import { FaEdit, FaTrash, FaExternalLinkAlt, FaAward, FaCalendarAlt, FaBuilding } from "react-icons/fa";
import { useTransition, useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/UI/Modal";

interface CertificateListProps {
  certificates: Certificate[];
}

export default function CertificateList({ certificates }: CertificateListProps) {
  const [isPending, startTransition] = useTransition();

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const confirmDelete = async () => {
    if (!deleteId) return;

    startTransition(async () => {
      const result = await deleteCertificate(deleteId);
      if (result.success) {
        toast.success(result.message || "Entry removed.");
        setDeleteId(null);
      } else {
        toast.error(result.message || "Failed to remove entry.");
      }
    });
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  if (certificates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-white/50 dark:bg-zinc-900/50 rounded-3xl border-2 border-dashed border-gray-100 dark:border-zinc-800 backdrop-blur-sm">
        <div className="h-16 w-16 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-4 text-amber-600 dark:text-amber-400">
            <FaAward className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white">Recognition Empty</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-[200px] text-center">Your hard-earned certifications are waiting to be showcased.</p>
        <Link 
            href="/admin/certificates/new"
            className="mt-6 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
            + Archive First Certificate
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white/50 backdrop-blur-sm shadow-xl shadow-gray-100/20 dark:border-zinc-800 dark:bg-zinc-900/50 dark:shadow-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-zinc-800/30">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Identity & Proof</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Issuer</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Issued</th>
              <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">Commands</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-zinc-800">
            {certificates.map((cert) => (
              <tr 
                key={cert.id} 
                className="group transition-all hover:bg-white dark:hover:bg-zinc-800/40"
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-16 overflow-hidden rounded-xl bg-gray-50 dark:bg-zinc-800 border dark:border-zinc-700">
                      <img src={cert.image_url} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {cert.name}
                      </span>
                      {cert.certificate_url && (
                        <a 
                          href={cert.certificate_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 mt-1 text-[10px] text-indigo-500 font-bold hover:underline"
                        >
                          Verify Credential <FaExternalLinkAlt className="text-[8px]" />
                        </a>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                   <div className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                    <FaBuilding className="text-gray-300 dark:text-gray-600" />
                    {cert.issuer}
                  </div>
                </td>
                <td className="px-8 py-6">
                   <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                        <FaCalendarAlt className="text-[10px] opacity-70" />
                        {new Date(cert.issued_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                    <Link
                      href={`/admin/certificates/${cert.id}/edit`}
                      className="h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-indigo-600 hover:text-white transition-all dark:bg-zinc-800 dark:text-gray-400 dark:hover:bg-indigo-500 dark:hover:text-white shadow-sm"
                      title="Edit Records"
                    >
                      <FaEdit className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(cert.id)}
                      disabled={isPending}
                      className="h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-red-600 hover:text-white transition-all dark:bg-zinc-800 dark:text-gray-400 dark:hover:bg-red-500 dark:hover:text-white shadow-sm disabled:opacity-50"
                      title="Purge Record"
                    >
                      <FaTrash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Remove Certificate"
        description="Are you sure you want to remove this achievement from your history? This action cannot be undone."
        variant="danger"
        confirmLabel="Remove Certificate"
        onConfirm={confirmDelete}
        isLoading={isPending}
      />
    </div>
  );
}
