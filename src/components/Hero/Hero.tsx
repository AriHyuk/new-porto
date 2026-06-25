'use client';

import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { textVariants } from '@/utils/animation';
import AnimatedText from './AnimatedText';
import BackgroundShapes from './BackgroundShapes';
import TechPill from './TechPill';
import ScrollIndicator from './ScrollIndicator';
import { SiGo, SiGooglecloud, SiReact } from 'react-icons/si';
import profileAvatar from '../../../public/images/profile/avatar.jpeg';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center px-4 md:px-0 h-[100dvh] min-h-[600px] max-h-[1080px] overflow-hidden bg-[#F5F0E8] dark:bg-[#0F1117] transition-colors pt-24 md:pt-20"
    >
      {/* Split Background */}
      <BackgroundShapes />

      {/* Main Container */}
      <div className="w-full max-w-none flex flex-col md:flex-row items-stretch h-full z-10">

        {/* ─── LEFT PANEL ─── */}
        <div className="md:w-[52%] flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-24 space-y-6 md:space-y-8 relative">

          {/* Badge pill */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center w-fit"
          >
            <span className="bg-[#2B5CE6] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-4 py-2 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]">
              I BUILD SYSTEMS THAT SCALE &nbsp;&lt;/&gt;
            </span>
          </motion.div>

          {/* ── Headline ── */}
          <div className="flex flex-col relative w-full">
            <AnimatedText
              text="Fullstack"
              className="text-[2.8rem] sm:text-[3.8rem] md:text-[4.2rem] lg:text-[5rem] xl:text-[5.5rem] font-black text-gray-900 dark:text-white tracking-tight leading-[0.9] uppercase whitespace-nowrap pb-2"
            />
            <div className="relative mt-0">
              <motion.p
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                className="text-[2rem] sm:text-[2.8rem] md:text-[3.5rem] lg:text-[4.2rem] xl:text-[5rem] font-black text-[#2B5CE6] dark:text-[#5b82ff] tracking-tight leading-[1.1] uppercase pb-1"
              >
                Software
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' }}
                className="text-[2rem] sm:text-[2.8rem] md:text-[3.5rem] lg:text-[4.2rem] xl:text-[5rem] font-black italic text-[#FF4D00] tracking-tight leading-[1.1] uppercase pb-2"
              >
                Engineer.
              </motion.p>
            </div>
          </div>

          {/* Description */}
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="text-gray-700 dark:text-gray-300 text-sm md:text-base lg:text-lg max-w-md leading-relaxed font-medium border-l-4 border-[#2B5CE6] pl-4"
          >
            Building end-to-end web applications — from intuitive user interfaces
            to scalable backend systems. Architecture-obsessed, detail-oriented.
          </motion.p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 pt-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ y: -3, x: -2 }}
              className="relative"
            >
              <ScrollLink
                to="portfolio"
                href="#portfolio"
                smooth={true}
                duration={500}
                offset={-70}
                className="relative block px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-wider text-sm border-2 border-black shadow-[4px_4px_0px_rgba(43,92,230,1)] hover:shadow-[6px_6px_0px_rgba(43,92,230,1)] transition-shadow duration-200 cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  View My Work
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </ScrollLink>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              whileHover={{ y: -3, x: -2 }}
            >
              <ScrollLink
                to="contact"
                href="#contact"
                smooth={true}
                duration={500}
                offset={-70}
                className="block px-8 py-4 bg-transparent text-gray-900 dark:text-white font-black uppercase tracking-wider text-sm border-2 border-black dark:border-white shadow-[4px_4px_0px_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.4)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.3)] transition-shadow duration-200 cursor-pointer"
              >
                Let's Talk
              </ScrollLink>
            </motion.div>
          </div>
        </div>

        {/* ─── RIGHT PANEL ─── */}
        <div className="md:w-[48%] flex justify-center items-center relative overflow-hidden">
          {/* Profile image wrapper */}
          <div className="relative flex items-center justify-center">
            {/* Tech Pills */}
            <TechPill
              icon={<SiGo />}
              label="Go"
              className="-top-4 -left-6 md:-top-8 md:-left-10 z-20 hidden sm:flex"
              delay={1.5}
              variant="accent"
            />
            <TechPill
              icon={<SiGooglecloud />}
              label="GCP"
              className="top-1/4 -right-4 md:-right-10 z-20 hidden sm:flex"
              delay={1.8}
              variant="dark"
            />
            <TechPill
              icon={<SiReact />}
              label="React"
              className="bottom-8 -left-4 md:bottom-12 md:-left-10 z-20 hidden sm:flex"
              delay={2.1}
              variant="light"
            />

            <ProfileImage />
          </div>

          {/* Bold label bottom-left of right panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute bottom-10 left-8 hidden md:block"
          >
            <div className="bg-[#CCFF00] border-2 border-black px-4 py-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] rotate-[-2deg]">
              <p className="text-black text-xs font-black uppercase tracking-widest">OPEN TO WORK ✓</p>
            </div>
          </motion.div>

          {/* Big decorative text watermark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="absolute bottom-16 right-6 text-white/10 font-black uppercase text-[6rem] leading-none select-none hidden lg:block"
            aria-hidden="true"
          >
            DEV
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}

function ProfileImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
      animate={{ opacity: 1, scale: 1, rotate: 2 }}
      transition={{ delay: 0.6, duration: 0.8, type: 'spring', damping: 15 }}
      whileHover={{ rotate: 0, scale: 1.02 }}
      className="relative w-52 h-64 sm:w-64 sm:h-80 md:w-72 md:h-96 lg:w-80 lg:h-[440px] xl:w-96 xl:h-[500px] bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden"
    >
      <Image
        src={profileAvatar}
        alt="Ari Awaludin Profile"
        fill
        priority
        placeholder="blur"
        className="object-cover object-top"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />

      {/* Bottom label strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-black px-4 py-2">
        <p className="text-white text-xs font-black uppercase tracking-widest text-center">
          Ari Awaludin · Serang 🇮🇩
        </p>
      </div>
    </motion.div>
  );
}
