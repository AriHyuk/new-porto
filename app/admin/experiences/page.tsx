import { getAdminExperiences } from "./actions";
import ExperienceList from "@/components/Admin/Experiences/ExperienceList";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default async function AdminExperiencesPage() {
  const experiences = await getAdminExperiences();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Experiences</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your professional background
          </p>
        </div>
        <Link
          href="/admin/experiences/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25"
        >
          <FaPlus className="w-4 h-4" />
          <span>Add Experience</span>
        </Link>
      </div>

      <ExperienceList experiences={experiences} />
    </div>
  );
}
