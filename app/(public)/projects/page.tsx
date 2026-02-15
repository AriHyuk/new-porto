import { getProjects } from "@/app/actions/get-projects";
import ProjectCard from "@/components/ProjectCard";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
  title: "Projects | Ari Hyuk",
  description: "Explore my latest web development projects, featuring full-stack applications, creative coding experiments, and open-source contributions.",
};

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-400 mb-4 animate-fade-in-up">
          Featured Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-12 animate-fade-in-up delay-100">
          A showcase of my technical journey, from full-stack applications to creative frontend experiments.
        </p>

        <Suspense fallback={<Loading />}>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} />
            ))}
           </div>
           {projects.length === 0 && (
             <div className="text-center py-20 text-gray-500 dark:text-gray-400">
               No projects found. Check back soon!
             </div>
           )}
        </Suspense>
      </div>
    </div>
  );
}
