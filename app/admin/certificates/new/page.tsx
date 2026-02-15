import CertificateForm from "@/components/Admin/Certificates/CertificateForm";

export default function NewCertificatePage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Add New Certificate</h1>
      <CertificateForm mode="create" />
    </div>
  );
}
