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
  type: 'Fulltime' | 'Freelance' | 'Project' | 'Academic';
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
  { name: 'Kotlin', icon: SiKotlin, icon_key: 'kotlin', category: 'Language', color: '#7F52FF' },
  { name: 'Laravel', icon: SiLaravel, icon_key: 'laravel', category: 'Backend', color: '#FF2D20' },
  { name: 'Supabase', icon: SiSupabase, icon_key: 'supabase', category: 'Database', color: '#3ECF8E' },
  { name: 'PostgreSQL', icon: SiPostgresql, icon_key: 'postgresql', category: 'Database', color: '#4169E1' },
  { name: 'GCP', icon: SiGooglecloud, icon_key: 'gcp', category: 'Cloud & AI', color: '#4285F4' },
  { name: 'Vertex AI', icon: SiGooglecloud, icon_key: 'gcp', category: 'Cloud & AI', color: '#4285F4' },
  { name: 'Playwright', icon: TbTestPipe, icon_key: 'playwright', category: 'Engineering', color: '#2EAD33' },
  { name: 'Jest', icon: VscBeaker, icon_key: 'jest', category: 'Engineering', color: '#C21325' },
  { name: 'Notion', icon: SiNotion, icon_key: 'notion', category: 'Management', color: '#ffffff' },
  { name: 'Jira', icon: SiJira, icon_key: 'jira', category: 'Management', color: '#0052CC' },
  { name: 'Trello', icon: SiTrello, icon_key: 'trello', category: 'Management', color: '#0079BF' },
  { name: 'Docker', icon: SiDocker, icon_key: 'docker', category: 'Tools', color: '#2496ED' },
];

export const experienceData: Experience[] = [
  {
    period: '2020 - Present',
    role: 'Software Engineer',
    company: 'Freelance',
    type: 'Freelance',
    brandColor: '#3B82F6',
    description: 'Engineering scalable web solutions and high-performance applications. Focused on clean architecture, seamless user experiences, and modern backend integration.',
  },
  {
    period: '2019 - 2020',
    role: 'Web Developer Intern',
    company: 'Tech Solutions',
    type: 'Fulltime',
    brandColor: '#10B981',
    description: 'Assisted in building responsive websites and implementing UI/UX designs. Gained experience in modern frontend workflows.',
  },
];

export const servicesData: Service[] = [
  {
    title: 'Web Development',
    description: 'Custom website development tailored to your business needs using modern technologies.',
    iconKey: 'web',
    features: ['Next.js 15 App Router', 'Server-Side Rendering', 'SEO Optimization', 'Responsive Design'],
  },
  {
    title: 'UI/UX Design',
    description: 'Designing intuitive and aesthetically pleasing user interfaces that provide great user experiences.',
    iconKey: 'design',
    features: ['Premium Aesthetics', 'Micro-interactions', 'Dark Mode support', 'Mobile First'],
  },
  {
    title: 'Backend Systems',
    description: 'Building robust and scalable backend architectures, APIs, and database solutions.',
    iconKey: 'backend',
    features: ['Go / Node.js APIs', 'Supabase Integration', 'Reliable DB Design', 'High Security'],
  },
  {
    title: 'Cloud & AI Solutions',
    description: 'Leveraging cloud infrastructure and AI to supercharge your applications.',
    iconKey: 'cloud',
    features: ['GCP Deployment', 'Vertex AI Integration', 'Auto Scaling', 'Cost Efficiency'],
  },
];
