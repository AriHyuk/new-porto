import ExperienceForm from "@/components/Admin/Experiences/ExperienceForm";
import { getExperienceById } from "@/app/admin/experiences/actions";
import { notFound } from "next/navigation";

interface EditExperiencePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditExperiencePage({ params }: EditExperiencePageProps) {
  const { id } = await params;
  const experience = await getExperienceById(id);

  if (!experience) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Experience</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Update your professional experience details
        </p>
      </div>

      <ExperienceForm mode="edit" experience={experience} />
    </div>
  );
}
