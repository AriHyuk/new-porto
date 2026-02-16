'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import ContactInfo from './ContactInfo';
import { entryVariants } from '@/utils/animation';

const ContactForm = dynamic(() => import('./ContactForm'), {
  loading: () => <div className="w-full h-[400px] bg-shimmer rounded-2xl" />,
  ssr: false // Form interaction is client-side only
});

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-white dark:bg-gray-950">
      {/* Dynamic Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-400/10 rounded-full blur-[120px]" 
        />
        
        {/* Floating Icons/Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/4 left-10 text-4xl opacity-20 hidden lg:block"
        >
          🚀
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-1/4 right-10 text-4xl opacity-20 hidden lg:block"
        >
          ✨
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={entryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800">
            Let's Collaborate
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent tracking-tighter">
            Elevate Your <span className="text-blue-600 dark:text-blue-500">Digital Voice</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Ready to build something extraordinary? I'm available for strategic partnerships and high-impact engineering projects.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-0 bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl shadow-blue-500/10 overflow-hidden border border-gray-100 dark:border-gray-800/50 backdrop-blur-3xl">
          {/* Info Sidebar */}
          <div className="lg:w-[42%] bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
            {/* Inner Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-white mb-6 tracking-tight">Expert Engineering</h3>
              <p className="text-blue-100/70 mb-12 text-lg leading-relaxed font-medium">
                Bringing elite technical solutions and architectural excellence to every project.
              </p>
              
              <ContactInfo />
            </div>

            <div className="mt-20 pt-10 border-t border-white/10 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-blue-100/60 text-sm font-bold tracking-wide">
                  Available for new opportunities 🌐
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="lg:w-[58%] p-10 md:p-14 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl">
            <div className="mb-10">
              <h3 className="text-2xl font-black dark:text-white mb-2 tracking-tight">Book a Performance Meeting</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium">Share your vision and I'll handle the complexity.</p>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
