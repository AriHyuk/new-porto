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

const tabs = [
  { id: 'skills', label: 'Skills', component: SkillsTab },
  { id: 'experience', label: 'Experience', component: ExperienceTab },
  { id: 'services', label: 'Services', component: ServicesTab },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('skills');

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-gray-50/50 dark:bg-gray-900/50">
      <MouseFollower />
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={entryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            About <span className="text-blue-600 dark:text-blue-400">Me</span>
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-8" />
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            I am a passionate Full-Stack Developer dedicated to building high-quality web applications. 
            My journey in tech is driven by curiosity and a commitment to continuous learning and innovation.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
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
            <div className="mb-12">
              <AboutStats />
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-2 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-wrap gap-2 mb-8 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all relative ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/30"
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
                  {(() => {
                    const ActiveComponent = tabs.find((t) => t.id === activeTab)?.component;
                    return ActiveComponent ? <ActiveComponent /> : null;
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
