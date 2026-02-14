'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { socialLinks, contactInfo } from '@/constants/about';
import { cardVariants, buttonVariants, profileVariants } from '@/utils/animation';

export default function ProfileCard() {
  return (
    <motion.div
      className="w-full lg:w-1/3"
      variants={cardVariants}
      whileHover="hover"
    >
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 h-full relative overflow-hidden group">
        {/* Glow Effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500" />
        
        {/* Profile Image */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          <motion.div 
            className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 blur-md opacity-40"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 relative z-10 shadow-2xl"
            variants={profileVariants}
            whileHover="hover"
          >
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
              alt="Ari Awaludin"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        <div className="text-center relative z-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-1">
            Ari Awaludin
          </h2>
          <p className="text-blue-600 dark:text-blue-400 font-semibold mb-6 tracking-wide">
            Full Stack Developer
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mb-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-11 h-11 rounded-2xl bg-gray-50 dark:bg-gray-700/50 flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all ${link.color} shadow-sm border border-gray-100 dark:border-gray-600`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                title={link.label}
              >
                <link.icon className="text-xl" />
              </motion.a>
            ))}
          </div>

          {/* Contact Details */}
          <div className="space-y-4 text-left bg-gray-50/50 dark:bg-gray-900/30 p-5 rounded-2xl border border-gray-100/50 dark:border-gray-700/50">
            {contactInfo.map((item, index) => (
              <a 
                key={index}
                href={item.href}
                className="flex items-center space-x-4 group/item cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover/item:scale-110 transition-transform">
                  <item.icon className="text-base" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 group-hover/item:text-blue-500 dark:group-hover/item:text-blue-400 transition-colors">
                  {item.value}
                </span>
              </a>
            ))}
          </div>

          <motion.button
            className="w-full mt-8 py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all relative overflow-hidden group/btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open('/cv_ari_awaludin.pdf', '_blank')}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Download CV <span className="text-xl animate-bounce">↓</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
