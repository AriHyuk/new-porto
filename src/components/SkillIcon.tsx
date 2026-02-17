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
  SiSvelte, SiVuedotjs, SiAngular, SiBootstrap, SiJquery, SiWordpress
} from 'react-icons/si';

const icons: Record<string, React.ElementType> = {
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
  photoshop: SiAdobephotoshop,
  premiere: SiAdobepremierepro,
  lightroom: SiAdobelightroom,
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
