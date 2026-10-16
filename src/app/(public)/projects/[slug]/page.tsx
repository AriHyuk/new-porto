import { getProjectBySlug, getAllProjectSlugs, getAdjacentProjects } from '@/lib/projects';
import { getProjectJsonLd } from '@/lib/jsonld';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import ProjectLinks from '@/components/Projects/ProjectLinks';
import { FaArrowLeft, FaArrowRight, FaRocket, FaLightbulb, FaTools, FaPaperPlane } from 'react-icons/fa';
import { HiLightningBolt } from 'react-icons/hi';

// Full static
export const dynamic = 'force-static';
export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Ari Awaludin Portfolio',
    };
  }

  return {
    title: `${project.title} — Case Study | Ari Awaludin`,
    description: project.summary || project.description || `Details about ${project.title}`,
    openGraph: {
      title: `${project.title} — Case Study | Ari Awaludin`,
      description: project.summary || project.description,
      images: project.image_url ? [project.image_url] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const jsonLd = getProjectJsonLd(project);
  const { prev, next } = getAdjacentProjects(slug);
  const galleryImages = [project.image_url, ...(project.additional_images || [])].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-[#F5F0E8] dark:bg-[#0F1117] pt-28 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto">
        {/* Navigation / Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2.5 px-5 py-3 bg-white dark:bg-black text-black dark:text-white font-black uppercase tracking-widest text-xs border-2 border-black dark:border-white shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.5)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_rgba(255,255,255,0.6)] transition-all active:translate-y-0 active:translate-x-0"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back to Projects</span>
          </Link>

          <span className="px-3 py-1.5 bg-[#CCFF00] text-black border-2 border-black text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Case Study Archive
          </span>
        </div>

        {/* Main Card Container */}
        <article className="border-4 border-black dark:border-white bg-white dark:bg-[#1a1c23] shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.2)] overflow-hidden">
          
          {/* Hero Banner Image */}
          <div className="relative h-72 sm:h-96 md:h-[450px] w-full bg-[#CCFF00] border-b-4 border-black dark:border-white overflow-hidden">
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
                <span className="text-black font-black uppercase text-lg">No Image Available</span>
              </div>
            )}
            
            {/* Top Category Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest border-2 border-white shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                {project.category || 'Showcase'}
              </span>
            </div>
          </div>

          {/* Header Title Section */}
          <div className="p-6 sm:p-8 md:p-12 border-b-4 border-black dark:border-white bg-[#F5F0E8] dark:bg-[#14161f]">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-[11px] font-black uppercase tracking-widest text-black/70 dark:text-white/70">
                Production Project
              </span>
              {project.created_at && (
                <>
                  <span className="text-black dark:text-white font-black">•</span>
                  <span className="text-[11px] font-bold text-black/70 dark:text-white/70">
                    {new Date(project.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-black dark:text-white uppercase tracking-tight leading-tight mb-4">
              {project.title}
            </h1>

            {project.summary && (
              <p className="text-base sm:text-lg text-black dark:text-gray-200 font-bold max-w-3xl leading-relaxed">
                {project.summary}
              </p>
            )}
          </div>

          {/* Body Content Grid */}
          <div className="p-6 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
              
              {/* Left Column: Case Study Narrative */}
              <div className="lg:col-span-2 space-y-10">
                
                {/* Section: Overview */}
                <section>
                  <div className="flex items-center gap-2.5 mb-4">
                    <FaRocket className="text-black dark:text-white text-base" />
                    <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-black dark:text-white border-b-2 border-black dark:border-white inline-block">
                      THE OVERVIEW
                    </h2>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed font-medium">
                    {project.description || project.summary}
                  </p>
                </section>

                {/* Section: The Challenge */}
                {project.challenge && (
                  <section>
                    <div className="p-6 sm:p-8 bg-[#FF4D00] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                      <div className="flex items-center gap-2.5 mb-3">
                        <FaLightbulb className="text-black text-base" />
                        <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-black">
                          THE CHALLENGE
                        </h2>
                      </div>
                      <p className="text-black font-black text-base sm:text-lg uppercase leading-snug">
                        &ldquo;{project.challenge}&rdquo;
                      </p>
                    </div>
                  </section>
                )}

                {/* Section: Contribution */}
                {project.contribution && (
                  <section>
                    <div className="flex items-center gap-2.5 mb-4">
                      <FaTools className="text-black dark:text-white text-base" />
                      <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-black dark:text-white border-b-2 border-black dark:border-white inline-block">
                        MY CONTRIBUTION & ARCHITECTURE
                      </h2>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-base font-medium">
                      {project.contribution}
                    </p>
                  </section>
                )}

                {/* Section: Core Features */}
                {project.key_features && project.key_features.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2.5 mb-5">
                      <HiLightningBolt className="text-black dark:text-white text-base" />
                      <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-black dark:text-white border-b-2 border-black dark:border-white inline-block">
                        CORE CAPABILITIES
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.key_features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-4 bg-[#F5F0E8] dark:bg-black border-2 border-black dark:border-white shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.5)]"
                        >
                          <div className="w-2.5 h-2.5 bg-[#CCFF00] mt-1 shrink-0 border border-black" />
                          <span className="text-sm text-black dark:text-white font-bold">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Section: Image Gallery (If additional images exist) */}
                {galleryImages.length > 1 && (
                  <section className="pt-8 border-t-2 border-black dark:border-white">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-black dark:text-white flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-[#FF4D00] inline-block border border-black dark:border-white" />
                        VISUAL SHOWCASE ({galleryImages.length} SHOTS)
                      </h2>
                      <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.4)]">
                        Production UI
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {galleryImages.map((imgUrl, idx) => (
                        <div
                          key={idx}
                          className={`relative border-2 border-black dark:border-white shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.3)] bg-[#CCFF00] overflow-hidden group ${
                            idx === 0 && galleryImages.length % 2 !== 0 ? 'sm:col-span-2 h-72 sm:h-96' : 'h-64 sm:h-72'
                          }`}
                        >
                          <Image
                            src={imgUrl}
                            alt={`${project.title} screenshot ${idx + 1}`}
                            fill
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute bottom-3 left-3 z-10">
                            <span className="px-2.5 py-1 bg-black/90 text-white text-[10px] font-black uppercase tracking-widest border border-white/60 shadow-[2px_2px_0px_rgba(0,0,0,1)] backdrop-blur-sm">
                              Shot 0{idx + 1}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Right Column: Sidebar (Links, Tech Stack, Metadata) */}
              <aside className="lg:col-span-1 space-y-8">
                
                {/* Action Links Box */}
                <div className="border-2 border-black dark:border-white bg-[#F5F0E8] dark:bg-black p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.3)]">
                  <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-black dark:text-white mb-6 border-b-2 border-black dark:border-white pb-2">
                    PROJECT LINKS
                  </h3>
                  <ProjectLinks
                    repoUrl={project.repo_url}
                    demoUrl={project.demo_url}
                    projectTitle={project.title}
                  />
                </div>

                {/* Tech Stack Box */}
                <div className="border-2 border-black dark:border-white bg-white dark:bg-[#1a1c23] p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.3)]">
                  <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-black dark:text-white mb-5 border-b-2 border-black dark:border-white pb-2">
                    TECH ARSENAL
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {project.tech_stack?.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-white dark:bg-black text-black dark:text-white text-xs font-black uppercase border-2 border-black dark:border-white shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.5)] hover:bg-[#CCFF00] dark:hover:bg-[#CCFF00] hover:text-black dark:hover:text-black transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Info Box */}
                <div className="border-2 border-black dark:border-white bg-[#CCFF00] text-black p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-black mb-4 border-b-2 border-black pb-2">
                    QUICK FACTS
                  </h3>
                  <ul className="space-y-3 text-xs font-bold uppercase tracking-wide">
                    <li className="flex justify-between items-center border-b border-black/30 pb-2">
                      <span className="text-black/70">Category</span>
                      <span className="font-black">{project.category || 'Engineering'}</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-black/30 pb-2">
                      <span className="text-black/70">Platform</span>
                      <span className="font-black">Web Application</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-black/70">Status</span>
                      <span className="font-black px-2 py-0.5 bg-black text-white text-[10px]">Production</span>
                    </li>
                  </ul>
                </div>

              </aside>

            </div>
          </div>
        </article>

        {/* Adjacent Projects Navigation (Prev / Next) */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group p-6 bg-white dark:bg-[#1a1c23] border-4 border-black dark:border-white shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_rgba(255,255,255,0.2)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] dark:hover:shadow-[10px_10px_0px_rgba(255,255,255,0.4)] transition-all flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#FF4D00] mb-3">
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span>Previous Case Study</span>
              </div>
              <h4 className="text-xl font-black text-black dark:text-white uppercase tracking-tight group-hover:text-[#2B5CE6] dark:group-hover:text-[#5b82ff] transition-colors">
                {prev.title}
              </h4>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-bold mt-2">
                {prev.category} Archive
              </span>
            </Link>
          ) : (
            <Link
              href="/#portfolio"
              className="group p-6 bg-[#F5F0E8] dark:bg-[#14161f] border-4 border-black dark:border-white shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_rgba(255,255,255,0.2)] hover:-translate-y-1 hover:-translate-x-1 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/60 dark:text-white/60 mb-3">
                <FaArrowLeft />
                <span>Beginning of Archive</span>
              </div>
              <h4 className="text-xl font-black text-black dark:text-white uppercase tracking-tight">
                Explore All Projects
              </h4>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-bold mt-2">
                Return to Showcase Grid
              </span>
            </Link>
          )}

          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group p-6 bg-white dark:bg-[#1a1c23] border-4 border-black dark:border-white shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_rgba(255,255,255,0.2)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] dark:hover:shadow-[10px_10px_0px_rgba(255,255,255,0.4)] transition-all flex flex-col justify-between text-right"
            >
              <div className="flex items-center justify-end gap-2 text-[10px] font-black uppercase tracking-widest text-[#2B5CE6] dark:text-[#5b82ff] mb-3">
                <span>Next Case Study</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
              <h4 className="text-xl font-black text-black dark:text-white uppercase tracking-tight group-hover:text-[#FF4D00] transition-colors">
                {next.title}
              </h4>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-bold mt-2">
                {next.category} Archive
              </span>
            </Link>
          ) : (
            <Link
              href="/#portfolio"
              className="group p-6 bg-[#F5F0E8] dark:bg-[#14161f] border-4 border-black dark:border-white shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_rgba(255,255,255,0.2)] hover:-translate-y-1 hover:-translate-x-1 transition-all flex flex-col justify-between text-right"
            >
              <div className="flex items-center justify-end gap-2 text-[10px] font-black uppercase tracking-widest text-black/60 dark:text-white/60 mb-3">
                <span>End of Archive</span>
                <FaArrowRight />
              </div>
              <h4 className="text-xl font-black text-black dark:text-white uppercase tracking-tight">
                Explore All Projects
              </h4>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-bold mt-2">
                Return to Showcase Grid
              </span>
            </Link>
          )}
        </section>

        {/* Collaborative Call To Action */}
        <section className="mt-14 p-8 sm:p-12 bg-[#2B5CE6] text-white border-4 border-black dark:border-white shadow-[10px_10px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_rgba(255,255,255,0.3)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 bg-[#CCFF00] text-black font-black uppercase text-[10px] tracking-widest border-2 border-black mb-4">
              COLLABORATION OPPORTUNITY
            </span>
            <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight leading-tight mb-3">
              Need High-Impact Engineering or Architecture?
            </h3>
            <p className="text-sm sm:text-base font-bold text-white/90 leading-relaxed">
              From intuitive frontend interfaces to scalable backend infrastructure — let&apos;s build production-grade solutions together.
            </p>
          </div>

          <Link
            href="/#contact"
            className="shrink-0 px-8 py-5 bg-[#CCFF00] text-black font-black text-xs sm:text-sm uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-3 active:scale-95"
          >
            <FaPaperPlane className="text-xs" />
            <span>Initiate Collaboration</span>
          </Link>
        </section>

      </div>
    </div>
  );
}
