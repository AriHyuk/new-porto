import ExperienceForm from "@/components/Admin/Experiences/ExperienceForm";

export default function NewExperiencePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Experience</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Add a new role to your professional journey
        </p>
      </div>

      <ExperienceForm mode="create" />
    </div>
  );
}
