'use client';

import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { textVariants, buttonVariants, profileVariants } from '@/utils/animation';
import AnimatedText from './AnimatedText';
import BackgroundShapes from './BackgroundShapes';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-32 min-h-screen overflow-hidden bg-white dark:bg-gray-900 transition-colors"
    >
      {/* Background visual components */}
      <BackgroundShapes />

      {/* Left Section - Content */}
      <div className="md:w-1/2 text-center md:text-left z-10 space-y-6">
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center md:justify-start gap-2"
        >
          <span className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            Hello, I'm Ari
          </span>
          <code className="bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded text-blue-600 dark:text-blue-400 font-mono text-sm">
            &lt;/&gt;
          </code>
        </motion.div>

        {/* Hero Headlines */}
        <div className="space-y-2">
          <AnimatedText 
            text="Full-Stack"
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white"
            delayChildren={0.3}
          />
          <AnimatedText 
            text="Web Developer"
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-blue-600 dark:text-blue-500"
            delayChildren={0.8}
          />
        </div>

        <motion.p 
          className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
        >
          Saya adalah seorang Full-Stack Web Developer yang berfokus pada pembangunan 
          pengalaman web yang modern, performan, dan desain yang memukau.
        </motion.p>
        
        {/* Call to Actions */}
        <div className="pt-6 flex flex-wrap gap-4 justify-center md:justify-start">
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
          >
            <ScrollLink
              to="portfolio"
              smooth={true}
              duration={500}
              offset={-70}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-bold shadow-xl shadow-blue-500/20 flex items-center justify-center cursor-pointer transition-all"
            >
              View My Work
            </ScrollLink>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            transition={{ delay: 0.1 }}
          >
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              offset={-70}
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl font-bold shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-all"
            >
              Contact Me
            </ScrollLink>
          </motion.div>
        </div>
      </div>

      {/* Right Section - Profile Image */}
      <div className="md:w-1/2 mt-20 md:mt-0 flex justify-center md:justify-end z-10">
        <div className="relative">
          {/* Decorative Backglow */}
          <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-500/10 blur-[100px] rounded-full" />
          
          <motion.div 
            className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[2rem] md:rounded-[3rem] p-1 shadow-2xl overflow-hidden"
            variants={profileVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <div className="relative w-full h-full bg-white dark:bg-gray-900 rounded-[1.8rem] md:rounded-[2.8rem] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                alt="Ari Hyuk Profile"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 300px, 450px"
              />
              
              {/* Modern Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
