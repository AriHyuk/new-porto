import { getAdminExperiences } from "./actions";
import ExperienceList from "@/components/Admin/Experiences/ExperienceList";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default async function AdminExperiencesPage() {
  const experiences = await getAdminExperiences();

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Professional Legacy
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Document your career milestones and achievements.
          </p>
        </div>

        <Link
          href="/admin/experiences/new"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-700 active:scale-95 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          <FaPlus className="text-xs" />
          Record New Chapter
        </Link>
      </div>

      <ExperienceList experiences={experiences} />
    </div>
  );
}
