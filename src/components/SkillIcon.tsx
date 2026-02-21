import React from 'react';
import Image from 'next/image';
import { 
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiNextdotjs, 
  SiTypescript, SiJavascript, SiTailwindcss, SiSupabase, 
  SiPostgresql, SiDocker, SiGo, SiKotlin, SiLaravel,
  SiPython, SiFigma, SiGit, SiGithub, SiVercel,
  SiAdobelightroom, SiAdobepremierepro, SiAdobephotoshop,
  SiFirebase, SiMysql, SiRedis, SiGraphql, SiAmazons3,
  SiGooglecloud, SiPostman,
  SiSvelte, SiVuedotjs, SiAngular, SiBootstrap, SiJquery, SiWordpress,
  SiCypress, SiTestinglibrary, SiVitest,
  SiNotion, SiJira, SiTrello, SiFramer, SiSlack, SiDiscord
} from 'react-icons/si';
import { VscBeaker, VscChecklist } from 'react-icons/vsc';
import { TbTestPipe } from 'react-icons/tb';

const icons: Record<string, React.ElementType> = {
  // Languages & Core
  react: SiReact,
  node: SiNodedotjs,
  mongodb: SiMongodb,
  express: SiExpress,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwindcss: SiTailwindcss,
  supabase: SiSupabase,
  postgresql: SiPostgresql,
  docker: SiDocker,
  go: SiGo,
  kotlin: SiKotlin,
  laravel: SiLaravel,
  python: SiPython,
  python_alt: SiPython, // Alias

  // Tools & Platforms
  figma: SiFigma,
  git: SiGit,
  github: SiGithub,
  vercel: SiVercel,
  firebase: SiFirebase,
  mysql: SiMysql,
  redis: SiRedis,
  graphql: SiGraphql,
  s3: SiAmazons3,
  gcp: SiGooglecloud,
  postman: SiPostman,
  framer: SiFramer,

  // Testing
  testing: TbTestPipe,
  playwright: TbTestPipe, // Replaced SiPlaywright with TbTestPipe as it's missing in this version
  cypress: SiCypress,
  vitest: SiVitest,
  'testing-library': SiTestinglibrary,
  beaker: VscBeaker,

  // Management & Productivity
  agile: VscChecklist,
  scrum: VscChecklist,
  notion: SiNotion,
  jira: SiJira,
  trello: SiTrello,
  slack: SiSlack,
  discord: SiDiscord,

  // Design & Media
  photoshop: SiAdobephotoshop,
  premiere: SiAdobepremierepro,
  lightroom: SiAdobelightroom,

  // Other Frameworks
  svelte: SiSvelte,
  vue: SiVuedotjs,
  angular: SiAngular,
  bootstrap: SiBootstrap,
  jquery: SiJquery,
  wordpress: SiWordpress,
};

interface SkillIconProps {
  iconKey: string;
  className?: string;
}

// Brand Colors Mapping
export const skillColors: Record<string, string> = {
  // Core
  react: '#61DAFB',
  nextjs: '#ffffff',
  node: '#339933',
  typescript: '#3178C6',
  javascript: '#F7DF1E',
  tailwindcss: '#06B6D4',
  supabase: '#3ECF8E',
  postgresql: '#4169E1',
  docker: '#2496ED',
  go: '#00ADD8',
  kotlin: '#7F52FF',
  laravel: '#FF2D20',
  python: '#3776AB',
  python_alt: '#3776AB',

  // Tools & Platforms
  figma: '#F24E1E',
  git: '#F05032',
  github: '#181717',
  vercel: '#ffffff',
  firebase: '#FFCA28',
  mysql: '#4479A1',
  redis: '#DC382D',
  graphql: '#E10098',
  s3: '#FF9900',
  gcp: '#4285F4',
  postman: '#FF6C37',
  framer: '#0055FF',

  // Testing
  testing: '#2EAD33',
  playwright: '#2EAD33',
  cypress: '#17202C',
  vitest: '#6E9F18',
  'testing-library': '#E33332',
  beaker: '#9333ea',

  // Management & Productivity
  agile: '#0052CC',
  scrum: '#0052CC',
  notion: '#ffffff',
  jira: '#0052CC',
  trello: '#005EB8',
  slack: '#4A154B',
  discord: '#5865F2',

  // Design & Media
  photoshop: '#31A8FF',
  premiere: '#9999FF',
  lightroom: '#31A8FF',

  // Other Frameworks
  svelte: '#FF3E00',
  vue: '#4FC08D',
  angular: '#DD0031',
  bootstrap: '#7952B3',
  jquery: '#0769AD',
  wordpress: '#21759B',
};

export const getSkillColor = (iconKey: string): string => {
  return skillColors[iconKey.toLowerCase()] || '#3B82F6'; // Default blue
};

const SkillIcon = ({ iconKey, className }: SkillIconProps) => {
  if (!iconKey) return null;

  // Handle URL (Image from Supabase Storage or external)
  if (iconKey.startsWith('http') || iconKey.startsWith('/')) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <Image
          src={iconKey}
          alt="Skill Icon"
          fill
          className="object-contain"
          sizes="48px"
        />
      </div>
    );
  }

  // Handle Emoji
  if (/\p{Emoji}/u.test(iconKey) && iconKey.length <= 4) {
    return <span className={className}>{iconKey}</span>;
  }

  const IconComponent = icons[iconKey.toLowerCase()];
  
  if (!IconComponent) {
    // Return first letter as fallback if icon not found
    return (
      <span className={`${className} font-black uppercase opacity-20`}>
        {iconKey.charAt(0)}
      </span>
    );
  }

  return <IconComponent className={className} />;
};

export default SkillIcon;
