import { getProjectBySlug } from '@/app/actions/get-project-by-slug';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import TechStackBadge from '@/components/TechStackBadge';
import ProjectLinks from '@/components/ProjectLinks';
import { FaArrowLeft } from 'react-icons/fa';

// Cache for 1 hour
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | AriHyuk Portfolio`,
    description: project.description || `Details about ${project.title}`,
    openGraph: {
      images: project.image_url ? [project.image_url] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Projects
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header Image */}
          <div className="relative h-64 md:h-96 w-full bg-gray-200 dark:bg-gray-700">
            {project.image_url ? (
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-400">No Image Available</span>
              </div>
            )}
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Title on Image (Mobile/Tablet) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 shadow-sm drop-shadow-md">
                {project.title}
              </h1>
              {project.created_at && (
                <p className="text-gray-200 text-sm md:text-base">
                  Added on {new Date(project.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              )}
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <span className="w-1 h-8 bg-blue-600 rounded-full inline-block"></span>
                    About Project
                  </h2>
                  <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                    <p>{project.description || 'No description provided.'}</p>
                    {/* Future: Add Rich Text rendering here since description might be markdown/html */}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <span className="w-1 h-8 bg-purple-600 rounded-full inline-block"></span>
                    Tech Stack
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {project.tech_stack?.map((tech) => (
                      <TechStackBadge key={tech} tech={tech} className="text-base px-4 py-2" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">
                    Project Links
                  </h3>
                  <ProjectLinks 
                    repoUrl={project.repo_url} 
                    demoUrl={project.demo_url} 
                    projectTitle={project.title}
                  />
                </div>

                {/* Optional: Add "More Projects" or "Similar Projects" here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
