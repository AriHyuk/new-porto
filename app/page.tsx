import { getProjects } from '@/app/actions/get-projects';
import ProjectList from '@/components/ProjectList';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';

// Configure caching: revalidate every 1 hour (3600 seconds)
export const revalidate = 3600;

export default async function Page() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Projects Section */}
        <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                My <span className="text-blue-600 dark:text-blue-500">Projects</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                A showcase of my recent work and side projects. Built with modern technologies and best practices.
              </p>
            </div>

            <ProjectList projects={projects} />
          </div>
        </section>

        {/* Other sections like 'about' and 'certifity' can be added here */}
      </main>

      {/* Footer Stats */}
      <footer className="py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ✅ Connected to Supabase | Total Projects: <strong>{projects.length}</strong>
          </p>
        </div>
      </footer>
    </div>
  );
}
