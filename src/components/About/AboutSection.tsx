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

      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={entryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="text-blue-500 font-black text-[9px] md:text-[10px] uppercase tracking-[0.5em] mb-4 md:mb-6 block">Biography Phase</span>
          <h2 className="text-4xl md:text-7xl font-black mb-6 md:mb-8 bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-300 dark:to-gray-600 bg-clip-text text-transparent tracking-tighter leading-[0.9]">
            The Engineer <br className="md:hidden" /> <span className="text-blue-600 dark:text-blue-500">Behind</span>
          </h2>
        </motion.div>

        {/* Dashboard Grid Integration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Block: Profile & Contact (Sticky on Desktop) */}
          <div className="lg:col-span-4 h-full">
            <div className="lg:sticky lg:top-32 h-full">
              <ProfileCard />
            </div>
          </div>

          {/* Right Block: Stats & Tabs */}
          <motion.div 
            className="lg:col-span-8 space-y-6 lg:space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Integrated Stats Card */}
            <div className="bg-white/40 dark:bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] border border-gray-100 dark:border-white/5 p-2 lg:p-3 shadow-sm">
              <AboutStats />
            </div>

            {/* Content Card */}
            <div className="bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] border border-gray-100 dark:border-white/5 p-4 lg:p-8 shadow-sm flex flex-col min-h-[600px]">
              {/* Tabs Navigation - Premium Glass */}
              <div className="bg-gray-100/50 dark:bg-black/40 backdrop-blur-xl p-1.5 md:p-2 rounded-[2rem] border border-gray-200 dark:border-white/5 flex flex-wrap gap-1.5 md:gap-2 mb-8 md:mb-10 w-full lg:max-w-2xl">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-3 md:py-4 px-4 md:px-6 rounded-[1.5rem] font-black text-[8px] md:text-[10px] uppercase tracking-[0.3em] transition-all relative ${
                      activeTab === tab.id
                        ? 'text-blue-600 dark:text-white'
                        : 'text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white dark:bg-blue-600/20 border border-blue-500/20 dark:border-blue-500/30 rounded-[1.5rem] shadow-xl"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content Area */}
              <div className="flex-1">
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
