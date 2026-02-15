"use client";

import { createCertificate, updateCertificate } from "@/app/admin/certificates/actions";
import { Certificate } from "@/types/certificate";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600"
    >
      {pending ? (mode === "create" ? "Creating..." : "Updating...") : (mode === "create" ? "Create Certificate" : "Update Certificate")}
    </button>
  );
}

export default function CertificateForm({ certificate, mode }: CertificateFormProps) {
  const action = mode === "create" ? createCertificate : updateCertificate;
  const [state, formAction] = useActionState(action, initialState);
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

  return (
    <form action={formAction} className="space-y-6">
      {mode === "edit" && <input type="hidden" name="id" value={certificate?.id} />}
      {mode === "edit" && <input type="hidden" name="existing_image_url" value={certificate?.image_url || ""} />}

      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Certificate Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            defaultValue={certificate?.name}
            placeholder="e.g. Advanced Switch Engineering"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="issuer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Issuer <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="issuer"
            id="issuer"
            required
            defaultValue={certificate?.issuer}
            placeholder="e.g. Coursera, Udemy"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="issued_at" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Issued Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="issued_at"
            id="issued_at"
            required
            defaultValue={certificate?.issued_at}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white sm:text-sm"
          />
        </div>

        <div>
           <label htmlFor="certificate_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Credential URL
          </label>
          <input
            type="url"
            name="certificate_url"
            id="certificate_url"
            defaultValue={certificate?.certificate_url || ""}
            placeholder="https://example.com/verify/..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white sm:text-sm"
          />
        </div>

        <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Certificate Image
            </label>
            <div className="mt-1 flex items-center space-x-4">
                {certificate?.image_url && (
                    <img src={certificate.image_url} alt="Current" className="h-20 w-32 rounded object-cover border dark:border-zinc-700" />
                )}
                <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    required={mode === "create"}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-zinc-800 dark:file:text-indigo-400"
                />
            </div>
             <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {mode === 'edit' ? "Upload to replace current image. " : ""} 
                Max 5MB. JPG, PNG, WebP.
            </p>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Link
          href="/admin/certificates"
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
        >
          Cancel
        </Link>
        <SubmitButton mode={mode} />
      </div>
    </form>
  );
}
