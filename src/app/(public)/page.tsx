import { getProjects } from '@/app/actions/get-projects';
import { getCertificates } from '@/app/actions/get-certificates';
import { getExperiences } from '@/app/actions/get-experiences';
import { getSkills } from '@/app/actions/get-about-data';
import ProjectList from '@/components/ProjectList';
import Hero from '@/components/Hero/Hero';
import AboutSection from '@/components/About/AboutSection';
import CertificateSection from '@/components/Certificates/CertificateSection';
import ContactSection from '@/components/Contact/ContactSection';

import { skills as staticSkills, experienceData as staticExperiences } from '@/constants/about';

// Configure caching: Disable long-term cache to show admin updates immediately
export const revalidate = 0;

export default async function Page() {
  const [projects, certificates, dbExperiences, dbSkills] = await Promise.all([
    getProjects(),
    getCertificates(),
    getExperiences(),
    getSkills(),
  ]);

  // Fallback to static data if DB is empty for both skills and experiences
  const experiences = dbExperiences && dbExperiences.length > 0 ? dbExperiences : staticExperiences;
  
  const skills = dbSkills && dbSkills.length > 0 ? dbSkills : staticSkills.map((s, idx) => ({
    id: `static-${idx}`,
    name: s.name,
    category: s.category,
    icon_key: s.name.toLowerCase().replace(/\./g, '') // Normalize key
  }));

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <AboutSection experiences={experiences} skills={skills} />

      {/* Projects Section - Cyber Polish */}
      <section id="portfolio" className="py-20 md:py-32 relative overflow-hidden bg-gray-50/30 dark:bg-[#050608] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 md:mb-32">
            <span className="text-blue-500 font-black uppercase tracking-[0.5em] text-[9px] md:text-[10px] mb-4 md:mb-6 block">Production Archive</span>
            <h2 className="text-4xl md:text-7xl font-black mb-6 md:mb-10 bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-300 dark:to-gray-600 bg-clip-text text-transparent tracking-tighter leading-[0.9]">
              Featured <br className="md:hidden" /> <span className="text-blue-600 dark:text-blue-500">Solutions</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-base md:text-lg font-medium leading-relaxed px-4">
              A showcase of my recent work and side projects. Built with modern technologies and best practices.
            </p>
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
