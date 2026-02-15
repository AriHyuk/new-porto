import { getProjectBySlug } from "@/app/actions/get-project-by-slug";
import { getProjects } from "@/app/actions/get-projects";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Ari Hyuk`,
    description: project.description || `Details about ${project.title}`,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-20 transition-colors">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link
          href="/projects"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8"
        >
          <FaArrowLeft className="mr-2" /> Back to Projects
        </Link>
        
        {/* Project Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-6 animate-fade-in-up delay-100">
            {project.tech_stack && project.tech_stack.map((tech, i) => (
              <span
                key={i}
                className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-fade-in-up delay-200">
            {project.description}
          </p>
        </div>

        {/* Project Image */}
        <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-12 animate-fade-in-up delay-300">
          <Image
            src={project.image_url || "/images/projects/placeholder.png"}
            alt={project.title}
            fill
            className="object-cover"
            priority
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 animate-fade-in-up delay-400">
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <FaExternalLinkAlt className="mr-2" /> Visit Live Demo
            </a>
          )}
          
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-800 dark:bg-zinc-800 text-white rounded-lg flex items-center font-medium hover:bg-gray-700 dark:hover:bg-zinc-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <FaGithub className="mr-2" /> View Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
