'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { entryVariants } from '@/utils/animation';
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

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={entryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800">
            Let's Build The Future
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent tracking-tighter">
            Turn Your Vision Into <span className="text-blue-600 dark:text-blue-500">Reality</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Have a game-changing idea? I'm ready to provide the technical expertise to make it happen. 
            Let's discuss how we can create something extraordinary together.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl shadow-blue-500/5 overflow-hidden border border-gray-100 dark:border-gray-800/50">
          {/* Visual Side - Elite Presentation */}
          <div className="lg:w-[45%] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 md:p-16 flex flex-col justify-center relative overflow-hidden group">
            {/* Mesh Gradient / Animated Decor */}
            <motion.div 
              animate={{ 
                rotate: [0, 90, 180, 270, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/4 -right-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)] pointer-events-none"
            />
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-125 transition-transform duration-1000" />
            
            <div className="relative z-10 text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl md:text-5xl font-black mb-6 leading-[1.05] tracking-tight">
                  Ready to start a <br />
                  <span className="text-blue-200">New Project?</span>
                </h3>
                <p className="text-blue-100/70 text-lg font-medium max-w-sm mb-12">
                  Drop your details and I&apos;ll get back to you with a tailored technical strategy.
                </p>
                
                {/* 3D Floating Collaboration Visual */}
                <div className="relative w-full aspect-square max-w-[320px] perspective-1000">
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-white/5 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    </motion.div>

                    {/* Floating Component Cards */}
                    <motion.div 
                        animate={{ y: [0, 15, 0], x: [0, 5, 0], rotateX: [5, 15, 5] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-4 -right-4 w-32 md:w-40 p-4 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl"
                    >
                        <div className="w-8 h-1.5 bg-blue-400 rounded-full mb-2" />
                        <div className="w-full h-1 bg-white/10 rounded-full mb-1" />
                        <div className="w-2/3 h-1 bg-white/10 rounded-full" />
                        <p className="text-[10px] font-black text-blue-200 uppercase mt-2">Performance</p>
                    </motion.div>

                    <motion.div 
                        animate={{ y: [0, -15, 0], x: [0, -5, 0], rotateY: [-5, -15, -5] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-10 -left-6 w-36 md:w-44 p-4 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl"
                    >
                        <div className="flex gap-1.5 mb-2">
                             <div className="w-2 h-2 rounded-full bg-red-400" />
                             <div className="w-2 h-2 rounded-full bg-yellow-400" />
                             <div className="w-2 h-2 rounded-full bg-green-400" />
                        </div>
                        <div className="w-full h-8 bg-black/20 rounded-lg flex items-center px-2">
                            <div className="w-1/2 h-1 bg-blue-400/50 rounded-full" />
                        </div>
                        <p className="text-[10px] font-black text-indigo-200 uppercase mt-2">Scalable Systems</p>
                    </motion.div>

                    <motion.div 
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl"
                    >
                       ✨
                    </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-[55%] p-12 md:p-16 bg-white dark:bg-gray-900 relative">
            <div className="mb-12">
              <span className="text-blue-600 font-black text-xs uppercase tracking-widest mb-2 block">Inquiry Phase</span>
              <h3 className="text-4xl font-black dark:text-white mb-2 tracking-tight">Collaboration Form</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">I&apos;m currently accepting new projects for 2026.</p>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
