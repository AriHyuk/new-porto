import ProjectForm from "@/components/Admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Project</h1>
      <ProjectForm mode="create" />
    </div>
  );
}
