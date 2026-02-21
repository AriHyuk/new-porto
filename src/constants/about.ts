import { IconType } from 'react-icons';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { 
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, 
  SiTailwindcss, SiNodedotjs, SiSupabase, SiPostgresql, 
  SiDocker, SiGo, SiKotlin, SiLaravel, SiGooglecloud,
  SiNotion, SiJira, SiTrello, SiFramer
} from 'react-icons/si';
import { VscBeaker, VscChecklist } from 'react-icons/vsc';
import { TbTestPipe } from 'react-icons/tb';

export interface SocialLink {
  icon: IconType;
  url: string;
  label: string;
  color: string;
}

export interface Skill {
  name: string;
  icon: IconType | any;
  icon_key: string;
  category: 'Frontend' | 'Backend' | 'Language' | 'Database' | 'Cloud & AI' | 'Engineering' | 'Management' | 'Tools';
  color: string;
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
  type: 'Fulltime' | 'Freelance' | 'Project' | 'Academic' | 'Organization';
  brandColor: string;
}

export interface Service {
  title: string;
  description: string;
  iconKey: string;
  features: string[];
}

export const socialLinks: SocialLink[] = [
  {
    icon: FaGithub,
    url: 'https://github.com/AriHyuk',
    label: 'GitHub',
    color: 'hover:text-gray-900 dark:hover:text-white',
  },
  {
    icon: FaLinkedin,
    url: 'https://linkedin.com/in/ari-awaludin',
    label: 'LinkedIn',
    color: 'hover:text-blue-600',
  },
  {
    icon: FaTwitter,
    url: 'https://twitter.com/arihyuk',
    label: 'Twitter',
    color: 'hover:text-blue-400',
  },
];

export const contactInfo = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'ariawl0209@gmail.com',
    href: 'mailto:ariawl0209@gmail.com',
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Location',
    value: 'Serang, Indonesia',
    href: 'https://maps.google.com/?q=Serang,Indonesia',
  },
  {
    icon: FaPhone,
    label: 'Phone',
    value: '+62 858 9370 7918',
    href: 'tel:+6285893707918',
  },
];

export const skills: Skill[] = [
  { name: 'React', icon: SiReact, icon_key: 'react', category: 'Frontend', color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, icon_key: 'nextjs', category: 'Frontend', color: '#ffffff' },
  { name: 'TypeScript', icon: SiTypescript, icon_key: 'typescript', category: 'Language', color: '#3178C6' },
  { name: 'JavaScript', icon: SiJavascript, icon_key: 'javascript', category: 'Language', color: '#F7DF1E' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, icon_key: 'tailwindcss', category: 'Frontend', color: '#06B6D4' },
  { name: 'Framer Motion', icon: SiFramer, icon_key: 'framer', category: 'Frontend', color: '#E91E63' },
  { name: 'Node.js', icon: SiNodedotjs, icon_key: 'node', category: 'Backend', color: '#339933' },
  { name: 'Go', icon: SiGo, icon_key: 'go', category: 'Language', color: '#00ADD8' },
  { name: 'Laravel', icon: SiLaravel, icon_key: 'laravel', category: 'Backend', color: '#FF2D20' },
  { name: 'Supabase', icon: SiSupabase, icon_key: 'supabase', category: 'Database', color: '#3ECF8E' },
  { name: 'PostgreSQL', icon: SiPostgresql, icon_key: 'postgresql', category: 'Database', color: '#4169E1' },
  { name: 'GCP', icon: SiGooglecloud, icon_key: 'gcp', category: 'Cloud & AI', color: '#4285F4' },
  { name: 'Vertex AI', icon: SiGooglecloud, icon_key: 'gcp', category: 'Cloud & AI', color: '#4285F4' },
  { name: 'Agile/Scrum', icon: VscChecklist, icon_key: 'agile', category: 'Engineering', color: '#0052CC' },
  { name: 'Testing', icon: TbTestPipe, icon_key: 'playwright', category: 'Engineering', color: '#2EAD33' },
  { name: 'Docker', icon: SiDocker, icon_key: 'docker', category: 'Tools', color: '#2496ED' },
  { name: 'Management', icon: SiJira, icon_key: 'jira', category: 'Management', color: '#0052CC' },
];

export const experienceData: Experience[] = [
  {
    period: '2025 - Present',
    role: 'Software Engineer (Skripsi)',
    company: 'Universitas Pamulang',
    type: 'Academic',
    brandColor: '#3B82F6',
    description: 'Developing a high-performance Multi-Vendor Marketplace platform with PWA architecture. Focus on decoupled architecture (Laravel API & React.js) and AI integration with Google Vertex AI.',
  },
  {
    period: 'Aug 2025 - Jan 2026',
    role: 'Fullstack Developer (Freelance)',
    company: 'Ecommerce Project',
    type: 'Freelance',
    brandColor: '#10B981',
    description: 'Architecting and building an end-to-end E-Commerce mobile-first application using Laravel. Managing relational database design and large-scale product inventories.',
  },
  {
    period: 'Feb 2024 - Feb 2026',
    role: 'Wakil Kepala Departemen Riset',
    company: 'HIMA TI Unpam',
    type: 'Organization',
    brandColor: '#8B5CF6',
    description: 'Leading research teams to explore emerging technologies and organizing technical workshops to upskill fellow students in modern engineering practices.',
  },
  {
    period: '2024 - Present',
    role: 'Active Member',
    company: 'GDG On Campus',
    type: 'Organization',
    brandColor: '#EA4335',
    description: 'Collaborating in international developer forums and staying at the forefront of Google Cloud and Web Technology advancements.',
  },
  {
    period: '2024 - Present',
    role: 'Member',
    company: 'GDGOC UIN Syarif Hidayatullah Jakarta',
    type: 'Organization',
    brandColor: '#4285F4',
    description: 'Actively participating in intensive weekly classes and specialized bootcamp sessions focusing on modern web development and Google technologies.',
  },
  {
    period: 'Mar 2025 - Jun 2025',
    role: 'Fullstack Developer (Intern)',
    company: 'Company Profile Project',
    type: 'Project',
    brandColor: '#F59E0B',
    description: 'Developed a custom CMS-driven corporate website with optimized SEO and performance metrics for high-speed content delivery.',
  },
];

export const servicesData: Service[] = [
  {
    title: 'High-Scale Web Development',
    description: 'Engineering resilient, lightning-fast web applications using Next.js and high-performance backend systems.',
    iconKey: 'web',
    features: ['Next.js 15 PWA Architecture', 'Decoupled API Design', 'SEO & Core Web Vitals Focus', 'High Scalability'],
  },
  {
    title: 'Cloud & AI Integration',
    description: 'Supercharging products with intelligent AI agents and scalable cloud infrastructure on GCP.',
    iconKey: 'cloud',
    features: ['GCP / Vertex AI Agents', 'Serverless Deployments', 'Cloud Cost Management', 'Infrastructure as Code'],
  },
  {
    title: 'Fullstack Systems',
    description: 'Building end-to-end solutions from complex database schemas to interactive user interfaces.',
    iconKey: 'backend',
    features: ['Laravel / Go Microservices', 'Relational DB Design', 'Secure Auth Ecosystems', 'Real-time Features'],
  },
  {
    title: 'Strategic Mentorship',
    description: 'Leading teams and workshops to bridge the gap between academic learning and industry standards.',
    iconKey: 'design',
    features: ['Technical Workshops', 'Engineering Best Practices', 'Agile Methodologies', 'Leadership & Research'],
  },
];
