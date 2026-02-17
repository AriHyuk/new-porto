import { getProjects } from '@/app/actions/get-projects';
import { getCertificates } from '@/app/actions/get-certificates';
import { getExperiences } from '@/app/actions/get-experiences';
import { getSkills } from '@/app/actions/get-about-data';
import ProjectList from '@/components/ProjectList';
import Hero from '@/components/Hero/Hero';
import AboutSection from '@/components/About/AboutSection';
import CertificateSection from '@/components/Certificates/CertificateSection';
import ContactSection from '@/components/Contact/ContactSection';

import { skills as staticSkills } from '@/constants/about';

// Configure caching: revalidate every 1 hour (3600 seconds)
export const revalidate = 3600;

export default async function Page() {
  const [projects, certificates, experiences, dbSkills] = await Promise.all([
    getProjects(),
    getCertificates(),
    getExperiences(),
    getSkills(),
  ]);

  // Combine or fallback to static skills if DB is empty
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

      {/* Certificates Section */}
      <CertificateSection certificates={certificates} />

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
