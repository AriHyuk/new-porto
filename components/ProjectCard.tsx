'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaFigma, FaDocker, FaAws, FaGitAlt, FaPython, FaJava, FaPhp, FaDatabase, FaCode } from 'react-icons/fa';
import { 
  SiNextdotjs, SiTailwindcss, SiTypescript, SiJavascript, SiSupabase, SiPostgresql, SiMongodb, SiFirebase, 
  SiAdobephotoshop, SiAdobeillustrator, SiExpress, SiPrisma, SiVercel, SiNetlify, SiHeroku, SiDigitalocean,
  SiGooglecloud, SiGo, SiRust, SiKotlin, SiSwift, SiDart, SiFlutter, SiAndroid, SiIos,
  SiBootstrap, SiSass, SiLess, SiChakraui, SiMui, SiRadixui, SiShadcnui, SiFramer, SiThreedotjs, SiGreensock,
  SiStripe, SiClerk, SiAuth0, SiRedux, SiRecoil, SiReactquery, SiAxios, SiGraphql, SiApollographql,
  SiMysql, SiSqlite, SiRedis, SiPlanetscale, SiDrizzle, SiSanity, SiStrapi, SiWordpress, SiShopify
} from 'react-icons/si';
import { TbBrandFramer, TbBrandVscode, TbSdk, TbBrandAzure } from 'react-icons/tb';
import clsx from 'clsx';
import Link from 'next/link';
import type { Project } from '@/types';
import { itemVariants, buttonVariants } from '@/utils/animation';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
  layoutId?: string;
}

// Icon Helper
const getTechIcon = (tech: string) => {
  // Normalize: lowercase, remove spaces/dots, remove version numbers (digits)
  const normalized = tech.toLowerCase().replace(/[\s\.]/g, '').replace(/\d+/g, '');
  
  const iconMap: { [key: string]: React.ReactNode } = {
    // Frontend
    react: <FaReact className="text-[#61DAFB]" />,
    reactjs: <FaReact className="text-[#61DAFB]" />,
    next: <SiNextdotjs className="text-black dark:text-white" />,
    nextjs: <SiNextdotjs className="text-black dark:text-white" />,
    vue: <span className="text-green-500 font-bold text-xs">Vue</span>,
    vuejs: <span className="text-green-500 font-bold text-xs">Vue</span>,
    angular: <span className="text-red-500 font-bold text-xs">NG</span>,
    svelte: <span className="text-orange-500 font-bold text-xs">Svelte</span>,
    tailwind: <SiTailwindcss className="text-[#38B2AC]" />,
    tailwindcss: <SiTailwindcss className="text-[#38B2AC]" />,
    bootstrap: <SiBootstrap className="text-[#7952B3]" />,
    sass: <SiSass className="text-[#CC6699]" />,
    less: <SiLess className="text-[#1d365d]" />,
    chakraui: <SiChakraui className="text-[#319795]" />,
    materialui: <SiMui className="text-[#007FFF]" />,
    mui: <SiMui className="text-[#007FFF]" />,
    radix: <SiRadixui className="text-[#161618] dark:text-white" />,
    radixui: <SiRadixui className="text-[#161618] dark:text-white" />,
    shadcn: <SiShadcnui className="text-black dark:text-white" />,
    shadcnui: <SiShadcnui className="text-black dark:text-white" />,
    framer: <TbBrandFramer className="text-black dark:text-white" />,
    framermotion: <TbBrandFramer className="text-black dark:text-white" />,
    threejs: <SiThreedotjs className="text-black dark:text-white" />,
    gsap: <SiGreensock className="text-[#88CE02]" />,

    // Languages
    typescript: <SiTypescript className="text-[#3178C6]" />,
    ts: <SiTypescript className="text-[#3178C6]" />,
    javascript: <SiJavascript className="text-[#F7DF1E]" />,
    js: <SiJavascript className="text-[#F7DF1E]" />,
    html: <FaHtml5 className="text-[#E34F26]" />,
    html5: <FaHtml5 className="text-[#E34F26]" />,
    css: <FaCss3Alt className="text-[#1572B6]" />,
    css3: <FaCss3Alt className="text-[#1572B6]" />,
    python: <FaPython className="text-[#3776AB]" />,
    java: <FaJava className="text-[#007396]" />,
    php: <FaPhp className="text-[#777BB4]" />,
    go: <SiGo className="text-[#00ADD8]" />,
    golang: <SiGo className="text-[#00ADD8]" />,
    rust: <SiRust className="text-[#000000] dark:text-white" />,
    kotlin: <SiKotlin className="text-[#7F52FF]" />,
    swift: <SiSwift className="text-[#F05138]" />,
    dart: <SiDart className="text-[#0175C2]" />,
    flutter: <SiFlutter className="text-[#02569B]" />,

    // Backend & CMS
    node: <FaNodeJs className="text-[#339933]" />,
    nodejs: <FaNodeJs className="text-[#339933]" />,
    express: <SiExpress className="text-black dark:text-white" />,
    expressjs: <SiExpress className="text-black dark:text-white" />,
    wordpress: <SiWordpress className="text-[#21759B]" />,
    shopify: <SiShopify className="text-[#96BF48]" />,
    sanity: <SiSanity className="text-[#F03E2F]" />,
    strapi: <SiStrapi className="text-[#2F2E8F]" />,

    // Database & BAAS
    supabase: <SiSupabase className="text-[#3ECF8E]" />,
    firebase: <SiFirebase className="text-[#FFCA28]" />,
    postgresql: <SiPostgresql className="text-[#336791]" />,
    postgres: <SiPostgresql className="text-[#336791]" />,
    sql: <FaDatabase className="text-gray-500" />,
    mysql: <SiMysql className="text-[#4479A1]" />,
    sqlite: <SiSqlite className="text-[#003B57]" />,
    mongodb: <SiMongodb className="text-[#47A248]" />,
    mongo: <SiMongodb className="text-[#47A248]" />,
    redis: <SiRedis className="text-[#DC382D]" />,
    planetscale: <SiPlanetscale className="text-black dark:text-white" />,
    prisma: <SiPrisma className="text-[#0C344B] dark:text-white" />,
    drizzle: <SiDrizzle className="text-[#C5F74F]" />,
    drizzleorm: <SiDrizzle className="text-[#C5F74F]" />,

    // Auth & Payments
    auth0: <SiAuth0 className="text-[#EB5424]" />,
    clerk: <SiClerk className="text-[#6C47FF]" />,
    nextauth: <FaCode className="text-gray-500" />, // Generic code for now
    stripe: <SiStripe className="text-[#008CDD]" />,

    // Tools & Platforms
    git: <FaGitAlt className="text-[#F05032]" />,
    github: <FaGithub className="text-black dark:text-white" />,
    docker: <FaDocker className="text-[#2496ED]" />,
    aws: <FaAws className="text-[#232F3E] dark:text-white" />,
    googlecloud: <SiGooglecloud className="text-[#4285F4]" />,
    gcp: <SiGooglecloud className="text-[#4285F4]" />,
    azure: <TbBrandAzure className="text-[#0078D4]" />,
    vercel: <SiVercel className="text-black dark:text-white" />,
    netlify: <SiNetlify className="text-[#00C7B7]" />,
    heroku: <SiHeroku className="text-[#430098]" />,
    
    // Design
    figma: <FaFigma className="text-[#F24E1E]" />,
    photoshop: <SiAdobephotoshop className="text-[#31A8FF]" />,
    illustrator: <SiAdobeillustrator className="text-[#FF9A00]" />,
  };

  return iconMap[normalized] || (
    <div className="flex items-center gap-1" title={tech}>
        <TbSdk className="text-gray-400" />
    </div>
  );
};

export default function ProjectCard({ project, onClick, layoutId }: ProjectCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
  };

  if (!project) return null;

  return (
    <motion.div
      layoutId={layoutId}
      className="group relative h-full flex flex-col cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
      variants={itemVariants}
      onClick={handleClick}
      role="article"
    >
      {/* Image Container - Top Half */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
        <Image
          src={project.image_url || '/images/projects/placeholder.png'}
          alt={project.title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        
        {/* Overlay for Dark Mode Only */}
        <div className="absolute inset-0 bg-black/0 dark:bg-black/20 transition-colors" />

        {/* Category Badge - Always Visible */}
        <div className="absolute top-4 left-4 z-20">
           <span className="px-3 py-1.5 rounded-lg bg-white/90 dark:bg-black/60 backdrop-blur-md text-gray-900 dark:text-white text-xs font-bold uppercase tracking-wider shadow-sm border border-gray-100 dark:border-white/10">
              {project.tech_stack?.[0] || 'Project'}
           </span>
        </div>
      </div>

      {/* Content - Bottom Half */}
      <div className="flex flex-col flex-grow p-6 sm:p-8 bg-white dark:bg-[#111] z-20">
        <div className="mb-auto">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            {project.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 md:line-clamp-3 mb-6">
            {project.description}
          </p>
        </div>

        <div className="pt-6 mt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
            {/* Tech Stack Icons */}
            <div className="flex items-center gap-3">
               {project.tech_stack?.slice(0, 5).map((tech, i) => (
                 <div key={i} className="text-xl hover:scale-125 transition-transform duration-300" title={tech}>
                    {getTechIcon(tech)}
                 </div>
               ))}
               {project.tech_stack && project.tech_stack.length > 5 && (
                 <span className="text-xs font-medium text-gray-400">+{project.tech_stack.length - 5}</span>
               )}
            </div>

            {/* View Button */}
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform">
               Open Case <span className="text-blue-600 dark:text-blue-400">→</span>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
