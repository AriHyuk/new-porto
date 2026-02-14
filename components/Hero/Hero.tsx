'use client';

import { Link as ScrollLink } from 'react-scroll';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { textVariants, buttonVariants } from '@/utils/animation';
import AnimatedText from './AnimatedText';
import BackgroundShapes from './BackgroundShapes';
import TechPill from './TechPill';
import ScrollIndicator from './ScrollIndicator';
import { SiNextdotjs, SiReact, SiTypescript} from 'react-icons/si';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col md:flex-row items-center justify-between px-4 md:px-10 h-[100dvh] max-h-[1080px] overflow-hidden bg-white dark:bg-gray-900 transition-colors pt-32 md:pt-20"
    >
      {/* Background visual components */}
      <BackgroundShapes />

      {/* Left Section - Content */}
      <div className="md:w-1/2 text-center md:text-left z-10 space-y-4 md:space-y-6 flex flex-col justify-center h-full">
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-gray-500 dark:text-gray-400 text-lg font-medium flex items-center justify-center md:justify-start gap-2"
        >
          Hello, I'm Ari <code className="bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded text-blue-600 dark:text-blue-400 font-mono text-sm border border-blue-100 dark:border-blue-800">&lt;/&gt;</code>
        </motion.p>

        {/* Hero Headlines */}
        <div className="flex flex-col relative">
          <AnimatedText 
            text="Software"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-black text-gray-900 dark:text-gray-100 tracking-tighter leading-none relative z-10"
          />
          <div className="relative">
             <AnimatedText 
              text="Engineer"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-black bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-transparent bg-clip-text tracking-tighter leading-none pb-2"
            />
            {/* Creative Underline/Decor */}
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8, ease: "circOut" }}
              className="absolute -bottom-2 left-0 w-24 h-2 bg-blue-600 rounded-full hidden md:block" 
            />
          </div>
        </div>

        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-xl mb-8 leading-relaxed mx-auto md:mx-0"
        >
          Engineering scalable, high-performance web solutions with a focus on clean architecture and modern developer experience. 
          Expertise in building seamless digital ecosystems from inception to deployment.
        </motion.p>
        
        {/* Call to Actions */}
        <div className="flex flex-wrap gap-5 justify-center md:justify-start">
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            className="relative group"
          >
            {/* Animated border glow */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 rounded-xl blur-sm opacity-25 group-hover:opacity-100 group-hover:blur-md transition duration-500 animate-shimmer" />
            
            <ScrollLink
              to="portfolio"
              smooth={true}
              duration={500}
              offset={-70}
              className="relative px-8 py-4 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-xl font-black overflow-hidden flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/10 dark:border-black/5 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </span>
            </ScrollLink>
          </motion.div>

        </div>
      </div>

      {/* Right Section - Profile Image */}
      <div className="md:w-1/2 flex justify-center md:justify-end z-10 h-full items-center relative">
        <div className="relative group scale-90 md:scale-100">
          {/* Tech Pills - Positioned relative to the image container */}
          <TechPill 
            icon={<SiNextdotjs />} 
            label="Next.js" 
            className="-top-6 -left-2 md:-top-10 md:-left-12 animate-bounce-slow z-20" 
            delay={1.5}
          />
          <TechPill 
            icon={<SiTypescript />} 
            label="TypeScript" 
            className="top-1/4 -right-6 md:-right-16 animate-bounce-slow delay-700 z-20" 
            delay={1.8}
          />
          <TechPill 
            icon={<SiReact />} 
            label="React" 
            className="bottom-10 -left-6 md:bottom-20 md:-left-16 animate-bounce-slow delay-1000 z-20" 
            delay={2.1}
          />
          
          {/* Decorative Backglow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 blur-[80px] rounded-full animate-pulse-slow scale-110 group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
          
          <ProfileImage />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}

function ProfileImage() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 100, damping: 30 });

  function handleMouse(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div 
      className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-[2.5rem] md:rounded-[3.5rem] p-1 shadow-[0_0_50px_rgba(59,130,246,0.3)] dark:shadow-[0_0_50px_rgba(59,130,246,0.1)] border border-white/20 overflow-hidden cursor-none"
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <div className="relative w-full h-full bg-white dark:bg-gray-950/80 rounded-[2.3rem] md:rounded-[3.3rem] overflow-hidden">
        <Image
          src="/images/profile/avatar.jpeg"
          alt="Ari Hyuk Profile"
          fill
          priority
          className="object-cover scale-105"
          sizes="(max-width: 768px) 300px, 450px"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop";
          }}
        />
        
        {/* Modern Overlay Gradient with more contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-80" />
      </div>
    </motion.div>
  );
}
