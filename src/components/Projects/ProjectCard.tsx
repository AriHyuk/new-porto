'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaFigma, FaDocker, FaAws, FaGitAlt, FaPython, FaJava, FaPhp, FaDatabase, FaCode } from 'react-icons/fa';
import { 
  SiNextdotjs, SiTailwindcss, SiTypescript, SiJavascript, SiSupabase, SiPostgresql, SiMongodb, SiFirebase, 
  SiAdobephotoshop, SiAdobeillustrator, SiExpress, SiPrisma, SiVercel, SiNetlify, SiHeroku, SiDigitalocean,
  SiGooglecloud, SiGo, SiRust, SiKotlin, SiSwift, SiDart, SiFlutter, SiAndroid, SiIos, SiLaravel,
  SiBootstrap, SiSass, SiLess, SiChakraui, SiMui, SiRadixui, SiShadcnui, SiFramer, SiThreedotjs, SiGreensock,
  SiStripe, SiClerk, SiAuth0, SiRedux, SiRecoil, SiReactquery, SiAxios, SiGraphql, SiApollographql,
  SiMysql, SiSqlite, SiRedis, SiPlanetscale, SiDrizzle, SiSanity, SiStrapi, SiWordpress, SiShopify,
  SiKubernetes, SiTerraform, SiPrometheus, SiGrafana, SiHelm, SiArgo, SiJenkins, SiAnsible, SiNginx, SiApache,
  SiFastapi, SiGooglegemini, SiGooglesearchconsole
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
  const normalized = tech.toLowerCase().replace(/[\s\.]/g, '').replace(/\d+/g, '');
  
  const iconMap: { [key: string]: React.ReactNode } = {
    react: <FaReact className="text-[#61DAFB]" />,
    nextjs: <SiNextdotjs className="text-black dark:text-white" />,
    tailwind: <SiTailwindcss className="text-[#38B2AC]" />,
    typescript: <SiTypescript className="text-[#3178C6]" />,
    javascript: <SiJavascript className="text-[#F7DF1E]" />,
    node: <FaNodeJs className="text-[#339933]" />,
    laravel: <SiLaravel className="text-[#FF2D20]" />,
    supabase: <SiSupabase className="text-[#3ECF8E]" />,
    postgresql: <SiPostgresql className="text-[#336791]" />,
    docker: <FaDocker className="text-[#2496ED]" />,
    gcp: <SiGooglecloud className="text-[#4285F4]" />,
    firebase: <SiFirebase className="text-[#FFCA28]" />,
    mongodb: <SiMongodb className="text-[#47A248]" />,
    python: <FaPython className="text-[#3776AB]" />,
    java: <FaJava className="text-[#007396]" />,
    php: <FaPhp className="text-[#777BB4]" />,
    aws: <FaAws className="text-[#FF9900]" />,
    figma: <FaFigma className="text-[#F24E1E]" />,
    git: <FaGitAlt className="text-[#F05032]" />,
    mysql: <SiMysql className="text-[#4479A1]" />,
    redis: <SiRedis className="text-[#DC382D]" />,
    go: <SiGo className="text-[#00ADD8]" />,
    golang: <SiGo className="text-[#00ADD8]" />,
    rust: <SiRust className="text-[#000000] dark:text-white" />,
    flutter: <SiFlutter className="text-[#02569B]" />,
    dart: <SiDart className="text-[#0175C2]" />,
    android: <SiAndroid className="text-[#3DDC84]" />,
    ios: <SiIos className="text-[#000000] dark:text-white" />,
    prisma: <SiPrisma className="text-[#2D3748] dark:text-white" />,
    vercel: <SiVercel className="text-black dark:text-white" />,
    framer: <SiFramer className="text-[#0055FF]" />,
    threejs: <SiThreedotjs className="text-black dark:text-white" />,
    gsap: <SiGreensock className="text-[#88CE02]" />,
    stripe: <SiStripe className="text-[#008CDD]" />,
    clerk: <SiClerk className="text-[#6C47FF]" />,
    redux: <SiRedux className="text-[#764ABC]" />,
    graphql: <SiGraphql className="text-[#E10098]" />,
    express: <SiExpress className="text-black dark:text-white" />,
    azure: <TbBrandAzure className="text-[#0078D4]" />,
    vscode: <TbBrandVscode className="text-[#007ACC]" />,
    wordpress: <SiWordpress className="text-[#21759B]" />,
    shopify: <SiShopify className="text-[#7AB55C]" />,
    planetscale: <SiPlanetscale className="text-[#000000] dark:text-white" />,
    drizzle: <SiDrizzle className="text-[#C5F74F]" />,
    sanity: <SiSanity className="text-[#F03E2F]" />,
    strapi: <SiStrapi className="text-[#2F2E8B]" />,
    adobephotoshop: <SiAdobephotoshop className="text-[#31A8FF]" />,
    adobeillustrator: <SiAdobeillustrator className="text-[#FF9A00]" />,
    photoshop: <SiAdobephotoshop className="text-[#31A8FF]" />,
    illustrator: <SiAdobeillustrator className="text-[#FF9A00]" />,
    axios: <SiAxios className="text-[#5A29E4]" />,
    reactquery: <SiReactquery className="text-[#FF4154]" />,
    tanstackquery: <SiReactquery className="text-[#FF4154]" />,
    recoil: <SiRecoil className="text-[#3578E5]" />,
    auth0: <SiAuth0 className="text-[#EB5424]" />,
    radix: <SiRadixui className="text-black dark:text-white" />,
    shadcn: <SiShadcnui className="text-black dark:text-white" />,
    mui: <SiMui className="text-[#007FFF]" />,
    chakra: <SiChakraui className="text-[#319795]" />,
    bootstrap: <SiBootstrap className="text-[#7952B3]" />,
    sass: <SiSass className="text-[#CC6699]" />,
    less: <SiLess className="text-[#1D365D]" />,
    kotlin: <SiKotlin className="text-[#7F52FF]" />,
    swift: <SiSwift className="text-[#F05138]" />,
    netlify: <SiNetlify className="text-[#00C7B7]" />,
    heroku: <SiHeroku className="text-[#430098]" />,
    digitalocean: <SiDigitalocean className="text-[#0080FF]" />,
    sqlite: <SiSqlite className="text-[#003B57]" />,
    kubernetes: <SiKubernetes className="text-[#326CE5]" />,
    k8s: <SiKubernetes className="text-[#326CE5]" />,
    terraform: <SiTerraform className="text-[#7B42BC]" />,
    prometheus: <SiPrometheus className="text-[#E6522C]" />,
    grafana: <SiGrafana className="text-[#F46800]" />,
    helm: <SiHelm className="text-[#0F1628] dark:text-white" />,
    argocd: <SiArgo className="text-[#EF7B4D]" />,
    jenkins: <SiJenkins className="text-[#D24939]" />,
    ansible: <SiAnsible className="text-[#EE0000]" />,
    nginx: <SiNginx className="text-[#009639]" />,
    apache: <SiApache className="text-[#D22128]" />,
    // AI & ML
    fastapi: <SiFastapi className="text-[#009688]" />,
    vertexai: <SiGooglegemini className="text-[#886FBF]" />,
    gemini: <SiGooglegemini className="text-[#886FBF]" />,
    geminiflash: <SiGooglegemini className="text-[#886FBF]" />,
    geminipro: <SiGooglegemini className="text-[#886FBF]" />,
    cloudrun: <SiGooglecloud className="text-[#4285F4]" />,
    googlecloudrun: <SiGooglecloud className="text-[#4285F4]" />,
    googlesearchgrounding: <SiGooglesearchconsole className="text-[#EA4335]" />,
    googlesearch: <SiGooglesearchconsole className="text-[#EA4335]" />,
  };

  return iconMap[normalized] || <TbSdk className="text-gray-400" />;
};

export default function ProjectCard({ project, onClick, layoutId }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Set for 3D Tilt
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);

    // Set for Spotlight
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
    cardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!project) return null;

  return (
    <motion.div
      ref={cardRef}
      layoutId={layoutId}
      className="group relative h-full flex flex-col cursor-pointer bg-white dark:bg-[#1a1c23] border-2 border-black dark:border-white transition-all duration-150 overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.2)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_rgba(255,255,255,0.3)]"
      variants={itemVariants}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden border-b-2 border-black dark:border-white bg-[#CCFF00]">
        <Image
          src={project.image_url || 'https://placehold.co/800x600?text=Project'}
          alt={project.title}
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out grayscale hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20">
           <span className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest border-2 border-transparent shadow-[2px_2px_0px_rgba(255,255,255,0.5)] dark:shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              {project.category || 'Showcase'}
           </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6 relative z-20">
        <h3 className="text-xl md:text-2xl font-black text-black dark:text-white mb-2 uppercase tracking-tight">
          {project.title}
        </h3>
        
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-2 md:line-clamp-3 mb-6 font-bold">
          {project.summary || project.description}
        </p>

        <div className="mt-auto pt-6 border-t-2 border-black dark:border-white flex items-center justify-between">
            <div className="flex items-center gap-3">
               {project.tech_stack?.slice(0, 4).map((tech, i) => (
                 <div key={i} className="text-xl grayscale group-hover:grayscale-0 transition-all duration-300" title={tech}>
                    {getTechIcon(tech)}
                 </div>
               ))}
               {project.tech_stack && project.tech_stack.length > 4 && (
                 <span className="text-[10px] font-black text-black tracking-tighter bg-[#CCFF00] border-2 border-black px-1 shadow-[1px_1px_0px_rgba(0,0,0,1)]">+{project.tech_stack.length - 4}</span>
               )}
            </div>

            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF4D00] group-hover:translate-x-1 transition-transform">
               Case Study <span className="text-lg">→</span>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
