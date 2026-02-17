import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiPostgresql,
  SiPrisma,
  SiDocker,
  SiGooglecloud,
  SiFramer,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiLaravel,
  SiPhp,
  SiMysql,
  SiRedis,
  SiVercel,
  SiGit,
  SiGithub,
  SiJavascript,
  SiHtml5,
  SiCss3,
} from 'react-icons/si';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  react: SiReact,
  'next.js': SiNextdotjs,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  tailwindcss: SiTailwindcss,
  supabase: SiSupabase,
  postgresql: SiPostgresql,
  prisma: SiPrisma,
  docker: SiDocker,
  'google cloud': SiGooglecloud,
  gcp: SiGooglecloud,
  'framer motion': SiFramer,
  'node.js': SiNodedotjs,
  nodejs: SiNodedotjs,
  mongodb: SiMongodb,
  express: SiExpress,
  laravel: SiLaravel,
  php: SiPhp,
  mysql: SiMysql,
  redis: SiRedis,
  vercel: SiVercel,
  git: SiGit,
  github: SiGithub,
  javascript: SiJavascript,
  html: SiHtml5,
  css: SiCss3,
};

interface TechStackBadgeProps {
  tech: string;
  className?: string;
}

export default function TechStackBadge({ tech, className }: TechStackBadgeProps) {
  const normalizedTech = tech.toLowerCase();
  const Icon = iconMap[normalizedTech];

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm transition-all ${className}`}
    >
      {Icon ? <Icon className="text-lg" /> : null}
      <span className="text-sm font-medium capitalize">{tech}</span>
    </div>
  );
}
