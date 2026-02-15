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

const icons: Record<string, React.ReactNode> = {
  react: <SiReact />,
  node: <SiNodedotjs />,
  mongodb: <SiMongodb />,
  express: <SiExpress />,
  nextjs: <SiNextdotjs />,
  typescript: <SiTypescript />,
  javascript: <SiJavascript />,
  tailwindcss: <SiTailwindcss />,
  supabase: <SiSupabase />,
  postgresql: <SiPostgresql />,
  docker: <SiDocker />,
  go: <SiGo />,
  kotlin: <SiKotlin />,
  laravel: <SiLaravel />
};

interface SkillIconProps {
  iconKey: string;
  className?: string;
}

const SkillIcon = ({ iconKey, className }: SkillIconProps) => {
  const icon = icons[iconKey.toLowerCase()];
  
  if (!icon) return null;

  return (
    <div className={className}>
      {icon}
    </div>
  );
};

export default SkillIcon;
