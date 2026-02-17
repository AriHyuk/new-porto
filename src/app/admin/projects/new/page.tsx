import ProjectForm from "@/components/Admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Launch New Project
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Craft a compelling story for your latest work.
        </p>
      </div>
      
      <ProjectForm mode="create" />
    </div>
  );
}
