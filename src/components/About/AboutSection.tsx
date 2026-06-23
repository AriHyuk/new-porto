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
    <section id="about" className="py-20 md:py-32 relative overflow-hidden bg-[#F5F0E8] dark:bg-[#0F1117] border-t-2 border-black dark:border-white transition-colors duration-500">
      <MouseFollower />

      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={entryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="bg-[#CCFF00] text-black inline-block px-4 py-2 mb-6 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rotate-[-2deg]">
             <span className="font-black text-xs md:text-sm uppercase tracking-widest">Biography Phase</span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-black mb-6 md:mb-8 text-black dark:text-white tracking-tighter leading-[0.9] uppercase">
            The Engineer <br className="md:hidden" /> <span className="text-[#2B5CE6] dark:text-[#5b82ff]">Behind</span>
          </h2>
        </motion.div>

        {/* Dashboard Grid Integration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: Profile & Contact (Sticky on Desktop) */}
          <div className="lg:col-span-4 h-full">
            <div className="lg:sticky lg:top-32 h-full">
              <ProfileCard />
            </div>
          </div>

          {/* Right Block: Stats & Tabs */}
          <motion.div 
            className="lg:col-span-8 space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Integrated Stats Card */}
            <div className="bg-white dark:bg-black border-2 border-black dark:border-white p-2 lg:p-3 shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.2)]">
              <AboutStats />
            </div>

            {/* Content Card */}
            <div className="bg-white dark:bg-black border-2 border-black dark:border-white p-4 lg:p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.2)] flex flex-col min-h-[600px]">
              {/* Tabs Navigation - Brutalist */}
              <div className="flex flex-wrap gap-3 mb-8 md:mb-10 w-full">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-3 md:py-4 px-4 md:px-6 border-2 border-black dark:border-white font-black text-xs md:text-sm uppercase tracking-widest transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#2B5CE6] text-white shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.8)] -translate-y-1 -translate-x-1'
                        : 'bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_rgba(255,255,255,0.5)]'
                    }`}
                  >
                    {tab.label}
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
