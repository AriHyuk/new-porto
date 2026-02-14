import { getProjects } from '@/app/actions/get-projects';
import ProjectList from '@/components/ProjectList';

// Configure caching: revalidate every 1 hour (3600 seconds)
export const revalidate = 3600;

export default async function Page() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            My <span className="text-blue-600 dark:text-blue-400">Projects</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my recent work and side projects. Built with modern technologies and best practices.
          </p>
        </div>

        {/* Projects Grid */}
        <ProjectList projects={projects} />

        {/* Footer Stats */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ✅ Connected to Supabase | Total Projects: <strong>{projects.length}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
