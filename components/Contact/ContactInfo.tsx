'use client';

import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const contactInfo = [
  {
    icon: <FaEnvelope />,
    label: 'Email',
    value: 'ariawl0209@gmail.com',
    href: 'mailto:ariawl0209@gmail.com',
  },
  {
    icon: <FaGithub />,
    label: 'GitHub',
    value: 'AriHyuk',
    href: 'https://github.com/AriHyuk',
  },
  {
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    value: 'Ari Awaludin',
    href: 'https://linkedin.com/in/ari-awaludin', // Update with actual if known, or generic
  },
];

const TimeDisplay = () => {
    const [time, setTime] = useState<string>('');
    
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                timeZone: 'Asia/Jakarta', 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
            setTime(timeString);
        };
        updateTime();
        const interval = setInterval(updateTime, 60000); // Update every minute is enough
        return () => clearInterval(interval);
    }, []);

    if (!time) return null;

    return (
        <span className="text-blue-200/60 font-medium text-sm ml-2 tracking-normal normal-case">
            • {time} (WIB)
        </span>
    );
};

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Location with Time */}
      <motion.div
        className="flex items-center gap-6 group p-4 rounded-2xl hover:bg-white/5 transition-all duration-300"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0 }}
        viewport={{ once: true }}
      >
        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-2xl flex items-center justify-center text-2xl text-white group-hover:scale-110 group-hover:bg-blue-500/30 transition-all duration-500 shadow-xl border border-white/10 group-hover:border-blue-400/30">
            <FaMapMarkerAlt />
        </div>
        <div>
            <p className="text-blue-100/50 text-xs font-black uppercase tracking-[0.2em] mb-1.5 flex items-center">
              Location <TimeDisplay />
            </p>
            <p className="text-white font-black text-xl tracking-tight">Jakarta, Indonesia</p>
        </div>
      </motion.div>

      {/* Dynamic List */}
      {contactInfo.map((item, index) => (
        <motion.div
          key={item.label}
          className="flex items-center gap-6 group p-4 rounded-2xl hover:bg-white/5 transition-all duration-300"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: (index + 1) * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-2xl flex items-center justify-center text-2xl text-white group-hover:scale-110 group-hover:bg-blue-500/30 transition-all duration-500 shadow-xl border border-white/10 group-hover:border-blue-400/30">
            {item.icon}
          </div>
          <div>
            <p className="text-blue-100/50 text-xs font-black uppercase tracking-[0.2em] mb-1.5">
              {item.label}
            </p>
            {item.href ? (
              <a 
                href={item.href}
                target={item.label !== 'Email' && item.label !== 'Phone' ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-white font-black text-xl hover:text-blue-300 transition-colors tracking-tight"
              >
                {item.value}
              </a>
            ) : (
              <p className="text-white font-black text-xl tracking-tight">{item.value}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
