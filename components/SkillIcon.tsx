import React from 'react';
import { 
  SiReact, 
  SiNodedotjs, 
  SiMongodb, 
  SiExpress, 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss,
  SiSupabase,
  SiPostgresql,
  SiDocker,
  SiGo,
  SiKotlin,
  SiLaravel
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
  laravel: SiLaravel
};

interface SkillIconProps {
  iconKey: string;
  className?: string;
}

const SkillIcon = ({ iconKey, className }: SkillIconProps) => {
  const IconComponent = icons[iconKey.toLowerCase()];
  
  if (!IconComponent) return null;

  return <IconComponent className={className} />;
};

export default SkillIcon;
