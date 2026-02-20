'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileCard from './ProfileCard';
import AboutStats from './AboutStats';
import SkillsTab from './Tabs/SkillsTab';
import ExperienceTab from './Tabs/ExperienceTab';
import ServicesTab from './Tabs/ServicesTab';
import MouseFollower from './MouseFollower';
import { containerVariants, tabVariants, entryVariants } from '@/utils/animation';

interface AboutSectionProps {
  experiences: any[];
  skills: any[];
}

export default function AboutSection({ experiences, skills }: AboutSectionProps) {
  const [activeTab, setActiveTab] = useState('skills');

  const tabs = [
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'services', label: 'Services' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'skills':
        return <SkillsTab skills={skills} />;
      case 'experience':
        return <ExperienceTab experiences={experiences} />;
      case 'services':
        return <ServicesTab />;
      default:
        return null;
    }
  };

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden bg-gray-50/50 dark:bg-[#050608] transition-colors duration-500">
      <MouseFollower />
      {/* Background Decorative Mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.08),_transparent_40%)]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,_rgba(139,92,246,0.08),_transparent_40%)]" 
        />
      </div>

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <motion.div
          className="text-center mb-16 md:mb-24"
          variants={entryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="text-blue-500 font-black text-[9px] md:text-[10px] uppercase tracking-[0.5em] mb-4 md:mb-6 block">Biography Phase</span>
          <h2 className="text-4xl md:text-7xl font-black mb-6 md:mb-8 bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-300 dark:to-gray-600 bg-clip-text text-transparent tracking-tighter leading-[0.9]">
            The Engineer <br className="md:hidden" /> <span className="text-blue-600 dark:text-blue-500">Behind</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-base md:text-lg font-medium leading-relaxed px-4">
            Engineering scalable, high-performance web solutions with a focus on clean architecture and modern developer experience. 
            Expertise in building seamless digital ecosystems from inception to deployment.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 md:gap-12 items-stretch">
          {/* Left: Profile Card */}
          <ProfileCard />

          {/* Right: Content & Tabs */}
          <motion.div 
            className="flex-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Stats Grid */}
            <div className="mb-8 md:mb-10">
              <AboutStats />
            </div>

            {/* Tabs Navigation - Cyber Polish */}
            <div className="bg-gray-100/50 dark:bg-black/40 backdrop-blur-3xl p-1.5 md:p-2 rounded-2xl border border-gray-200 dark:border-white/5 flex flex-wrap gap-1.5 md:gap-2 mb-8 md:mb-10 shadow-2xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 md:py-4 px-4 md:px-6 rounded-xl font-black text-[8px] md:text-[10px] uppercase tracking-[0.3em] transition-all relative ${
                    activeTab === tab.id
                      ? 'text-blue-600 dark:text-white'
                      : 'text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-600/5 dark:bg-blue-600/20 border border-blue-500/20 dark:border-blue-500/30 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full"
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
