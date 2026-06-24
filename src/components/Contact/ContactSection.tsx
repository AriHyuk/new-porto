'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { entryVariants } from '@/utils/animation';
import ContactInfo from './ContactInfo';

const ContactForm = dynamic(() => import('./ContactForm'), {
  loading: () => <div className="w-full h-[400px] border-4 border-black bg-gray-100 dark:bg-gray-800 animate-pulse" />,
  ssr: false
});

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden bg-[#CCFF00] dark:bg-[#0F1117] border-t-4 border-black dark:border-white transition-colors duration-500">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16 md:mb-24"
          variants={entryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="inline-block bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.5em] text-[10px] md:text-[12px] mb-6 px-4 py-2 border-2 border-transparent shadow-[4px_4px_0px_rgba(255,255,255,0.5)] dark:shadow-[4px_4px_0px_rgba(0,0,0,1)]">Elite Interaction</span>
          <h2 className="text-5xl md:text-8xl font-black mb-8 text-black dark:text-white tracking-tighter leading-[0.9] uppercase drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)] dark:drop-shadow-[4px_4px_0px_rgba(255,255,255,0.2)]">
            Let&apos;s Talk <br className="md:hidden" /> <span className="text-[#2B5CE6]">Business</span>
          </h2>
          <div className="max-w-2xl mx-auto text-black dark:text-black text-base md:text-lg font-bold leading-relaxed p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-white">
            Have a game-changing idea? I&apos;m ready to provide the technical expertise to make it happen. 
            Let&apos;s discuss how we can create something extraordinary together.
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row bg-white dark:bg-black border-4 border-black dark:border-white shadow-[16px_16px_0px_rgba(0,0,0,1)] dark:shadow-[16px_16px_0px_rgba(255,255,255,1)] transition-colors duration-500">
          {/* Visual Side - Elite Presentation */}
          <div className="lg:w-[40%] bg-[#F5F0E8] dark:bg-[#1a1c23] p-8 md:p-12 lg:p-16 flex flex-col justify-center relative group border-b-4 lg:border-b-0 lg:border-r-4 border-black dark:border-white">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-16 h-2 bg-black dark:bg-white mb-8 shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,1)]" />
                <h3 className="text-5xl md:text-6xl font-black mb-8 leading-[1] tracking-tight uppercase text-black dark:text-white">
                  Design. <br />
                  Build. <br />
                  <span className="text-[#FF4D00]">Scale.</span>
                </h3>
                <p className="text-black dark:text-gray-300 text-lg font-bold max-w-sm mb-12 leading-relaxed border-l-4 border-black dark:border-white pl-4">
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
          <div className="lg:w-[60%] p-8 md:p-12 lg:p-20 bg-white dark:bg-black relative transition-colors duration-500">
            <div className="mb-12">
              <div className="inline-block bg-black text-white px-3 py-1 mb-6 border-2 border-black">
                 <span className="font-black text-[10px] uppercase tracking-[0.4em]">Inquiry Phase</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-black uppercase text-black dark:text-white mb-4 tracking-tighter">Collaboration Form</h3>
              <p className="text-black dark:text-gray-300 font-bold text-lg leading-relaxed">I&apos;m currently accepting elit-tier projects for 2026.</p>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
