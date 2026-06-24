'use client';

import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const contactInfo = [
  {
    icon: <FaMapMarkerAlt />,
    label: 'Location',
    value: 'Serang, Indonesia',
    href: null,
    color: 'bg-[#FF4D00]',
    showTime: true
  },
  {
    icon: <FaEnvelope />,
    label: 'Email',
    value: 'ariawl0209@gmail.com',
    href: 'mailto:ariawl0209@gmail.com',
    color: 'bg-[#CCFF00]',
  },
  {
    icon: <FaGithub />,
    label: 'GitHub',
    value: 'AriHyuk',
    href: 'https://github.com/AriHyuk',
    color: 'bg-[#F5F0E8] dark:bg-black',
  },
  {
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    value: 'Ari Awaludin',
    href: 'https://linkedin.com/in/ari-awaludin',
    color: 'bg-[#2B5CE6]',
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
        const interval = setInterval(updateTime, 1000); 
        return () => clearInterval(interval);
    }, []);

    if (!time) return null;

    return (
        <span className="text-black dark:text-white font-black text-[9px] ml-auto tracking-widest uppercase flex items-center gap-1 transition-colors">
            {time} (WIB) <span className="inline-block w-1.5 h-1.5 bg-black dark:bg-white animate-pulse" />
        </span>
    );
};

interface InfoCardProps {
    item: typeof contactInfo[0];
    index: number;
}

const InfoCard = ({ item, index }: InfoCardProps) => {
    return (
        <motion.div
            className="group relative flex items-center gap-4 p-4 bg-white dark:bg-[#1a1c23] border-4 border-black dark:border-white hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_rgba(255,255,255,1)] transition-all duration-300"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
        >
            <div className={`w-14 h-14 shrink-0 border-4 border-black dark:border-white ${item.color} flex items-center justify-center text-2xl text-black dark:text-white transition-all duration-300 shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,1)] group-hover:scale-110 group-hover:rotate-6`}>
                {item.icon}
            </div>
            
            <div className="relative z-10 flex-grow min-w-0">
                <p className="text-black dark:text-gray-300 text-[10px] font-black uppercase tracking-[0.3em] mb-1.5 flex items-center flex-wrap gap-2">
                    {item.label} {item.showTime && <TimeDisplay />}
                </p>
                {item.href ? (
                    <a 
                        href={item.href}
                        target={item.label !== 'Email' ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-black dark:text-white font-black text-lg hover:text-[#2B5CE6] transition-colors tracking-tight block truncate"
                    >
                        {item.value}
                    </a>
                ) : (
                    <p className="text-black dark:text-white font-black text-lg tracking-tight truncate">{item.value}</p>
                )}
            </div>

            <div className="absolute right-6 opacity-[0.05] dark:opacity-10 transition-opacity duration-700 transform scale-150 rotate-[-20deg] pointer-events-none">
                {item.icon}
            </div>
        </motion.div>
    );
};

export default function ContactInfo() {
  return (
    <div className="grid grid-cols-1 gap-6">
      {contactInfo.map((item, index) => (
        <InfoCard key={item.label} item={item} index={index} />
      ))}
    </div>
  );
}
