import { getProjects } from "@/app/admin/projects/actions";
import DeleteProjectButton from "@/components/Admin/DeleteProjectButton";
import Link from "next/link";
import Image from "next/image";
import { FaPlus, FaEdit, FaExternalLinkAlt, FaGithub, FaLayerGroup } from "react-icons/fa";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Projects Portfolio
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Showcase your best work with high-quality descriptions and live links.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-700 active:scale-95 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          <FaPlus className="text-xs" />
          Add New Project
        </Link>
      </div>

      {/* Projects Grid/Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white/50 backdrop-blur-sm shadow-xl shadow-gray-100/20 dark:border-zinc-800 dark:bg-zinc-900/50 dark:shadow-none">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100 dark:divide-zinc-800">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-zinc-800/50">
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Project Detail
                </th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Tech Stack
                </th>
                <th scope="col" className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Resources
                </th>
                <th scope="col" className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Manage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 rounded-full bg-gray-50 dark:bg-zinc-800 flex items-center justify-center mb-4">
                        <FaLayerGroup className="h-6 w-6 text-gray-300" />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">Empty Portfolio</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Start by adding your first project to inspire the world.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="group transition-colors hover:bg-gray-50/50 dark:hover:bg-zinc-800/30">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative h-14 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
                          {project.image_url ? (
                            <Image
                              src={project.image_url}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              sizes="96px"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-zinc-800 text-[10px] font-bold text-gray-400 uppercase">
                              No Preview
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {project.title}
                          </span>
                          <span className="text-[10px] font-mono text-gray-400 mt-0.5">
                            {project.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-1.5 max-w-[250px]">
                        {project.tech_stack?.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-gray-600 border border-gray-100 dark:bg-zinc-800 dark:text-gray-400 dark:border-zinc-700/50 shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                        {(project.tech_stack?.length || 0) > 4 && (
                          <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-black text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">
                            +{(project.tech_stack?.length || 0) - 4} More
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        {project.demo_url ? (
                          <a 
                            href={project.demo_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="h-8 w-8 flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all dark:bg-emerald-900/10 dark:text-emerald-400 dark:hover:bg-emerald-600 dark:hover:text-white"
                            title="Live Demo"
                          >
                            <FaExternalLinkAlt className="text-xs" />
                          </a>
                        ) : (
                          <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-300 dark:bg-zinc-800 dark:text-zinc-700" title="No Demo">
                            <FaExternalLinkAlt className="text-xs" />
                          </div>
                        )}
                        {project.repo_url ? (
                          <a 
                            href={project.repo_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="h-8 w-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-700 hover:bg-zinc-900 hover:text-white transition-all dark:bg-zinc-800 dark:text-gray-400 dark:hover:bg-white dark:hover:text-black"
                            title="View Repository"
                          >
                            <FaGithub className="text-xs" />
                          </a>
                        ) : (
                          <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-300 dark:bg-zinc-800 dark:text-zinc-700" title="No Repo">
                            <FaGithub className="text-xs" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform">
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="h-9 w-9 flex items-center justify-center rounded-xl bg-white border border-gray-100 text-indigo-600 shadow-sm hover:border-indigo-600 hover:bg-indigo-600 hover:text-white transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:text-indigo-400 dark:hover:bg-indigo-500 dark:hover:border-indigo-500 dark:hover:text-white"
                          title="Edit Project"
                        >
                          <FaEdit className="text-xs" />
                        </Link>
                        <DeleteProjectButton id={project.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
