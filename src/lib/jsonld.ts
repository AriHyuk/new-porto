import type { Project } from '@/types';

const BASE_URL = 'https://ariawaludin.my.id';

/**
 * Root JSON-LD Structured Data (Person, WebSite, ProfilePage)
 * Conforms to Schema.org recommendations for personal engineer portfolios.
 */
export function getRootJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${BASE_URL}/#person`,
        name: 'Ari Awaludin',
        givenName: 'Ari',
        familyName: 'Awaludin',
        jobTitle: 'Fullstack Software Engineer',
        description:
          'Fullstack Software Engineer specializing in scalable web systems, clean architecture, and modern cloud infrastructure.',
        url: BASE_URL,
        image: `${BASE_URL}/og-image.png`,
        email: 'mailto:ariawl0209@gmail.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Serang',
          addressRegion: 'Banten',
          addressCountry: 'ID',
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Universitas Pamulang',
          url: 'https://unpam.ac.id',
        },
        sameAs: [
          'https://github.com/AriHyuk',
          'https://linkedin.com/in/ari-awaludin',
          'https://twitter.com/arihyuk',
        ],
        knowsAbout: [
          'Fullstack Development',
          'Frontend Engineering',
          'Backend Engineering',
          'Cloud Computing',
          'React',
          'Next.js',
          'TypeScript',
          'JavaScript',
          'Node.js',
          'Golang',
          'Laravel',
          'Google Cloud Platform',
          'Docker',
          'Kubernetes',
          'PostgreSQL',
          'MySQL',
          'Tailwind CSS',
          'Clean Architecture',
          'Microservices',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: BASE_URL,
        name: 'Ari Awaludin — Portfolio & Case Studies',
        description:
          'Official portfolio and case study archive of Ari Awaludin, showcasing high-scale web engineering and software solutions.',
        publisher: {
          '@id': `${BASE_URL}/#person`,
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'ProfilePage',
        '@id': `${BASE_URL}/#profilepage`,
        url: BASE_URL,
        name: 'Ari Awaludin — Fullstack Software Engineer Profile',
        mainEntity: {
          '@id': `${BASE_URL}/#person`,
        },
      },
    ],
  };
}

/**
 * Case Study Detail JSON-LD Structured Data
 * Combines TechArticle, SoftwareApplication, and BreadcrumbList.
 */
export function getProjectJsonLd(project: Project) {
  const projectUrl = `${BASE_URL}/projects/${project.slug}`;
  const imageUrl = project.image_url
    ? project.image_url.startsWith('http')
      ? project.image_url
      : `${BASE_URL}${project.image_url.startsWith('/') ? project.image_url : `/${project.image_url}`}`
    : `${BASE_URL}/og-image.png`;

  const techEntities = (project.tech_stack || []).map((tech) => ({
    '@type': 'Thing',
    name: tech,
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${projectUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: BASE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Projects',
            item: `${BASE_URL}/#portfolio`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.title,
            item: projectUrl,
          },
        ],
      },
      {
        '@type': 'TechArticle',
        '@id': `${projectUrl}#article`,
        headline: `${project.title} — Case Study`,
        description: project.summary || project.description || `Case study on ${project.title}`,
        image: imageUrl,
        datePublished: project.created_at || '2025-01-01',
        inLanguage: 'en-US',
        mainEntityOfPage: projectUrl,
        author: {
          '@type': 'Person',
          '@id': `${BASE_URL}/#person`,
          name: 'Ari Awaludin',
          url: BASE_URL,
        },
        publisher: {
          '@type': 'Person',
          '@id': `${BASE_URL}/#person`,
          name: 'Ari Awaludin',
          url: BASE_URL,
        },
        about: techEntities,
        keywords: [
          project.title,
          project.category || 'Software Engineering',
          ...(project.tech_stack || []),
          'Case Study',
          'Software Architecture',
        ].join(', '),
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${projectUrl}#software`,
        name: project.title,
        applicationCategory: project.category === 'Fullstack' ? 'WebApplication' : 'DesignApplication',
        operatingSystem: 'All Modern Web Browsers',
        description: project.description || project.summary || `Software solution for ${project.title}`,
        image: imageUrl,
        url: project.demo_url || project.repo_url || projectUrl,
        author: {
          '@type': 'Person',
          '@id': `${BASE_URL}/#person`,
          name: 'Ari Awaludin',
        },
      },
    ],
  };
}
