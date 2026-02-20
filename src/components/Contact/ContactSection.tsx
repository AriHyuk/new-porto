'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { entryVariants } from '@/utils/animation';
import ContactInfo from './ContactInfo';

const ContactForm = dynamic(() => import('./ContactForm'), {
  loading: () => <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl" />,
  ssr: false
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

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-20 md:mb-32"
          variants={entryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="text-blue-500 font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">Elite Interaction</span>
          <h2 className="text-4xl md:text-7xl font-black mb-10 bg-gradient-to-b from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-300 dark:to-gray-600 bg-clip-text text-transparent tracking-tighter leading-[0.9]">
            Let&apos;s Talk <br className="md:hidden" /> <span className="text-blue-600 dark:text-blue-500">Business</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400 text-lg font-medium leading-relaxed">
            Have a game-changing idea? I&apos;m ready to provide the technical expertise to make it happen. 
            Let&apos;s discuss how we can create something extraordinary together.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row bg-white dark:bg-[#0A0C10] rounded-[3rem] shadow-2xl dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden border border-gray-100 dark:border-white/5 transition-colors duration-500">
          {/* Visual Side - Elite Presentation */}
          <div className="lg:w-[40%] bg-gradient-to-br from-blue-50 dark:from-blue-900/20 via-white dark:via-[#0A0C10] to-indigo-50 dark:to-indigo-950/20 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-5" />
            
            {/* Mesh Gradient */}
            <motion.div 
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/2 -right-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1)_0%,_transparent_70%)] pointer-events-none"
            />
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-16 h-1 bg-blue-600 rounded-full mb-10" />
                <h3 className="text-5xl md:text-6xl font-black mb-8 leading-[1] tracking-tight text-gray-900 dark:text-white">
                  Design. <br />
                  Build. <br />
                  <span className="text-blue-600 dark:text-blue-400">Scale.</span>
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-lg font-medium max-w-sm mb-12 leading-relaxed">
                  Drop your details and I&apos;ll get back to you with a tailored technical strategy.
                </p>
                
                {/* Contact Info Items moved here for better desktop layout balance */}
                <div className="mt-auto w-full">
                    <ContactInfo />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-[60%] p-8 md:p-12 lg:p-20 bg-gray-50/50 dark:bg-[#0D0F14] relative border-l border-gray-100 dark:border-white/5 transition-colors duration-500">
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-4">
                 <span className="w-10 h-[1px] bg-blue-500/30" />
                 <span className="text-blue-600 dark:text-blue-500 font-black text-[10px] uppercase tracking-[0.4em]">Inquiry Phase</span>
              </div>
              <h3 className="text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">Collaboration Form</h3>
              <p className="text-gray-500 dark:text-gray-500 font-medium text-lg leading-relaxed px-1">I&apos;m currently accepting elit-tier projects for 2026.</p>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
