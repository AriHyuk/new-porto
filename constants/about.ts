import { IconType } from 'react-icons';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiSupabase, SiPostgresql, SiDocker, SiGo, SiKotlin, SiLaravel } from 'react-icons/si';

export interface SocialLink {
  icon: IconType;
  url: string;
  label: string;
  color: string;
}

export interface Skill {
  name: string;
  icon: IconType;
  category: 'Frontend' | 'Backend' | 'Language' | 'Database' | 'Tools';
  color: string;
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string; // Emoji or Icon name
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
  { name: 'React', icon: SiReact, category: 'Frontend', color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, category: 'Frontend', color: '#000000' },
  { name: 'TypeScript', icon: SiTypescript, category: 'Language', color: '#3178C6' },
  { name: 'JavaScript', icon: SiJavascript, category: 'Language', color: '#F7DF1E' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'Frontend', color: '#06B6D4' },
  { name: 'Node.js', icon: SiNodedotjs, category: 'Backend', color: '#339933' },
  { name: 'Go', icon: SiGo, category: 'Language', color: '#00ADD8' },
  { name: 'Kotlin', icon: SiKotlin, category: 'Language', color: '#7F52FF' },
  { name: 'Laravel', icon: SiLaravel, category: 'Backend', color: '#FF2D20' },
  { name: 'Supabase', icon: SiSupabase, category: 'Database', color: '#3ECF8E' },
  { name: 'PostgreSQL', icon: SiPostgresql, category: 'Database', color: '#4169E1' },
  { name: 'Docker', icon: SiDocker, category: 'Tools', color: '#2496ED' },
];

export const experienceData: Experience[] = [
  {
    period: '2020 - Present',
    role: 'Software Engineer',
    company: 'Freelance',
    description: 'Engineering scalable web solutions and high-performance applications. Focused on clean architecture, seamless user experiences, and modern backend integration.',
  },
  {
    period: '2019 - 2020',
    role: 'Web Developer Intern',
    company: 'Tech Solutions',
    description: 'Assisted in building responsive websites and implementing UI/UX designs. Gained experience in modern frontend workflows.',
  },
];

export const servicesData: Service[] = [
  {
    title: 'Web Development',
    description: 'Custom website development tailored to your business needs using modern technologies.',
    icon: '💻',
  },
  {
    title: 'UI/UX Design',
    description: 'Designing intuitive and aesthetically pleasing user interfaces that provide great user experiences.',
    icon: '🎨',
  },
  {
    title: 'Backend Systems',
    description: 'Building robust and scalable backend architectures, APIs, and database solutions.',
    icon: '⚙️',
  },
  {
    title: 'Performance Optimization',
    description: 'Optimizing existing web applications for speed, SEO, and better core web vitals.',
    icon: '🚀',
  },
];
