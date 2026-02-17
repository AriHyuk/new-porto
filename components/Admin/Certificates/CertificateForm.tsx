"use client";

import { createCertificate, updateCertificate } from "@/app/admin/certificates/actions";
import { Certificate } from "@/types/certificate";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaSave, FaTimes, FaAward, FaBuilding, FaCalendarAlt, FaLink, FaCloudUploadAlt } from "react-icons/fa";

interface CertificateFormProps {
  certificate?: Certificate;
  mode: "create" | "edit";
}

const initialState = {
  success: false,
  message: "",
};

function SubmitButton({ mode }: { mode: "create" | "edit" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600"
    >
      {pending ? (
        <span className="flex items-center gap-2 md:w-32 justify-center">
          <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Saving...
        </span>
      ) : (
        <>
          <FaSave className="text-xs" />
          {mode === "create" ? "Archive Certificate" : "Update Records"}
        </>
      )}
    </button>
  );
}

export default function CertificateForm({ certificate, mode }: CertificateFormProps) {
  const action = mode === "create" ? createCertificate : updateCertificate;
  const [state, formAction] = useActionState(action, initialState);
  const [previewImage, setPreviewImage] = useState<string | null>(certificate?.image_url || null);
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        router.push("/admin/certificates");
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-5xl"
    >
      <form action={formAction} className="space-y-8">
        {mode === "edit" && <input type="hidden" name="id" value={certificate?.id} />}
        {mode === "edit" && <input type="hidden" name="existing_image_url" value={certificate?.image_url || ""} />}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-100/20 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
              <div className="flex items-center gap-4 mb-10">
                <div className="h-12 w-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <FaAward className="text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Validation of Excellence</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Archiving your earned credentials and certifications.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    Certificate Title
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    defaultValue={certificate?.name}
                    placeholder="e.g. Meta Front-End Developer Specialization"
                    className="w-full px-4 py-3 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="issuer" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                      <FaBuilding className="text-indigo-500/50" /> Issuing Organization
                    </label>
                    <input
                      type="text"
                      name="issuer"
                      id="issuer"
                      required
                      defaultValue={certificate?.issuer}
                      placeholder="e.g. Coursera / Meta"
                      className="w-full px-4 py-3 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="issued_at" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                      <FaCalendarAlt className="text-indigo-500/50" /> Date of Achievement
                    </label>
                    <input
                      type="date"
                      name="issued_at"
                      id="issued_at"
                      required
                      defaultValue={certificate?.issued_at}
                      className="w-full px-4 py-3 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="certificate_url" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    <FaLink className="text-indigo-500/50" /> Verification Link (Optional)
                  </label>
                  <input
                    type="url"
                    name="certificate_url"
                    id="certificate_url"
                    defaultValue={certificate?.certificate_url || ""}
                    placeholder="https://coursera.org/verify/..."
                    className="w-full px-4 py-3 rounded-xl border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-100/20 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none h-full flex flex-col">
               <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">
                 Credential Snapshot
               </label>
               
               <div className="relative flex-grow min-h-[240px] w-full overflow-hidden rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-800/50 group transition-all hover:border-indigo-400/50">
                 {previewImage ? (
                    <>
                      <img src={previewImage} alt="Preview" className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                         <FaCloudUploadAlt className="text-3xl text-white" />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8 text-center">
                      <FaCloudUploadAlt className="text-4xl mb-4 text-gray-200 dark:text-zinc-700" />
                      <span className="text-xs font-bold uppercase tracking-wider">Upload Reference Image</span>
                      <p className="text-[10px] mt-2 opacity-60">Visual proof of your certificate</p>
                    </div>
                  )}
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    required={mode === "create"}
                    onChange={handleImageChange}
                    className="absolute inset-0 z-10 cursor-pointer opacity-0"
                  />
               </div>

               <div className="mt-6 flex flex-col gap-3">
                 <SubmitButton mode={mode} />
                 <Link
                    href="/admin/certificates"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all rounded-xl border border-transparent hover:border-gray-100 dark:hover:border-zinc-800"
                  >
                    <FaTimes className="text-xs" /> Discard Changes
                  </Link>
               </div>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
