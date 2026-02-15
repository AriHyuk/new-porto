import { getAdminCertificates } from "./actions";
import CertificateList from "@/components/Admin/Certificates/CertificateList";
import Link from "next/link";
import { HiPlus } from "react-icons/hi";

export default async function AdminCertificatesPage() {
  const certificates = await getAdminCertificates();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Certificates</h1>
        <Link
          href="/admin/certificates/new"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          <HiPlus className="-ml-1 mr-2 h-5 w-5" />
          Add Certificate
        </Link>
      </div>

      <CertificateList certificates={certificates} />
    </div>
  );
}
