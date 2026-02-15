import CertificateForm from "@/components/Admin/Certificates/CertificateForm";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditCertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: certificate } = await supabase
    .from("certificates")
    .select("*")
    .eq("id", id)
    .single();

  if (!certificate) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Edit Certificate</h1>
      <CertificateForm mode="edit" certificate={certificate} />
    </div>
  );
}
