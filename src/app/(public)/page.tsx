import Hero from '@/components/Hero/Hero';
import AboutSection from '@/components/About/AboutSection';
import ProjectList from '@/components/Projects/ProjectList';
import CertificateSection from '@/components/Certificates/CertificateSection';
import ContactSection from '@/components/Contact/ContactSection';

import { projectsData } from '@/constants/projects';
import { certificatesData } from '@/constants/certificates';
import { experienceData } from '@/constants/about';
import { skills as staticSkills } from '@/constants/about';

// Full static — rendered once at build time, zero runtime overhead
export const dynamic = 'force-static';

export default function Page() {
  // Sort projects by sort_order
  const projects = [...projectsData].sort((a, b) => a.sort_order - b.sort_order);

  // Sort certificates newest first
  const certificates = [...certificatesData].sort(
    (a, b) => new Date(b.issued_at).getTime() - new Date(a.issued_at).getTime()
  );

  // Map experience static data
  const experiences = experienceData.map((exp, index) => ({
    id: `static-exp-${index}`,
    position: exp.role,
    company: exp.company,
    period: exp.period,
    description: exp.description,
    type: exp.type,
    brand_color: exp.brandColor,
    sort_order: index + 1,
  }));

  // Map skills static data
  const skills = staticSkills.map((s, idx) => ({
    id: `static-${idx}`,
    name: s.name,
    category: s.category,
    icon_key: s.icon_key,
  }));

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <AboutSection experiences={experiences} skills={skills} />

      {/* Projects Section */}
      <section id="portfolio" className="py-20 md:py-32 relative overflow-hidden bg-white dark:bg-[#1a1c23] border-b-4 border-black dark:border-white transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 md:mb-32">
            <span className="inline-block bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.5em] text-[10px] md:text-[12px] mb-6 px-4 py-2 border-2 border-transparent shadow-[4px_4px_0px_rgba(255,255,255,0.5)] dark:shadow-[4px_4px_0px_rgba(0,0,0,1)]">Production Archive</span>
            <h2 className="text-5xl md:text-8xl font-black mb-8 text-black dark:text-white tracking-tighter leading-[0.9] uppercase drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)] dark:drop-shadow-[4px_4px_0px_rgba(255,255,255,0.2)]">
              Featured <br className="md:hidden" /> <span className="text-[#FF4D00]">Solutions</span>
            </h2>
            <div className="max-w-2xl mx-auto text-black dark:text-white text-base md:text-lg font-bold leading-relaxed p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-[#CCFF00]">
              A showcase of my recent work and side projects. Built with modern technologies and best practices.
            </div>
          </div>

          <ProjectList projects={projects} />
        </div>
      </section>

      {/* Certificates Section */}
      <CertificateSection certificates={certificates} />

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
