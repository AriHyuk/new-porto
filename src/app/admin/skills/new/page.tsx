import SkillForm from "@/components/Admin/Skills/SkillForm";

export default function NewSkillPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Skill</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Add a new skill to your portfolio
        </p>
      </div>

      <SkillForm mode="create" />
    </div>
  );
}
