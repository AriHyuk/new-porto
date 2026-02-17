import SkillForm from "@/components/Admin/Skills/SkillForm";
import { getSkillById } from "@/app/admin/skills/actions";
import { notFound } from "next/navigation";

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const skill = await getSkillById(id);

  if (!skill) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
       <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Refine Talent
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Updating the expertise of <span className="font-bold text-blue-500">{skill.name}</span>.
        </p>
      </div>

      <SkillForm mode="edit" skill={skill} />
    </div>
  );
}
