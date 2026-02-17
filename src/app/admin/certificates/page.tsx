import { getAdminCertificates } from "./actions";
import CertificateList from "@/components/Admin/Certificates/CertificateList";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default async function AdminCertificatesPage() {
  const certificates = await getAdminCertificates();

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Honors & Accolades
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showcase your hard-earned professional credentials.
          </p>
        </div>

        <Link
          href="/admin/certificates/new"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-700 active:scale-95 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          <FaPlus className="text-xs" />
          Archive New Award
        </Link>
      </div>

      <CertificateList certificates={certificates} />
    </div>
  );
}
