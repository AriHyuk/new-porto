import SkillForm from "@/components/Admin/Skills/SkillForm";
import { getSkillById } from "@/app/admin/skills/actions";
import { notFound } from "next/navigation";

interface EditSkillPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditSkillPage({ params }: EditSkillPageProps) {
  const { id } = await params;
  const skill = await getSkillById(id);

  if (!skill) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Skill</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Update skill details
        </p>
      </div>

      <SkillForm mode="edit" skill={skill} />
    </div>
  );
}
