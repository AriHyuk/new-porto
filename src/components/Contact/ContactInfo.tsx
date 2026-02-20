'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

const contactInfo = [
  {
    icon: <FaMapMarkerAlt />,
    label: 'Location',
    value: 'Serang, Indonesia',
    href: null,
    color: 'from-blue-500 to-cyan-400',
    showTime: true
  },
  {
    icon: <FaEnvelope />,
    label: 'Email',
    value: 'ariawl0209@gmail.com',
    href: 'mailto:ariawl0209@gmail.com',
    color: 'from-purple-500 to-indigo-400',
  },
  {
    icon: <FaGithub />,
    label: 'GitHub',
    value: 'AriHyuk',
    href: 'https://github.com/AriHyuk',
    color: 'from-gray-700 to-gray-500',
  },
  {
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    value: 'Ari Awaludin',
    href: 'https://linkedin.com/in/ari-awaludin',
    color: 'from-blue-600 to-blue-400',
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
        <span className="text-blue-600/60 dark:text-blue-200/40 font-black text-[9px] ml-auto tracking-widest uppercase flex items-center gap-1 transition-colors">
            {time} (WIB) <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </span>
    );
};

interface InfoCardProps {
    item: typeof contactInfo[0];
    index: number;
}

const InfoCard = ({ item, index }: InfoCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-60, 60], [10, -10]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-60, 60], [-10, 10]), { stiffness: 100, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        cardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
        cardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="group relative flex items-center gap-4 p-4 rounded-2xl bg-gray-100/50 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/5 hover:border-blue-500/30 transition-all duration-500 cursor-default shadow-xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
        >
            {/* Spotlight Effect */}
            <div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 rounded-3xl" 
                style={{ 
                    background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), rgba(59,130,246,0.1), transparent 40%)` 
                }} 
            />

            <div className={`w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl text-white shadow-xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-6`}>
                {item.icon}
            </div>
            
            <div className="relative z-10 flex-grow min-w-0">
                <p className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mb-1.5 flex items-center flex-wrap gap-2">
                    {item.label} {item.showTime && <TimeDisplay />}
                </p>
                {item.href ? (
                    <a 
                        href={item.href}
                        target={item.label !== 'Email' ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-gray-900 dark:text-white font-black text-lg hover:text-blue-600 transition-colors tracking-tight block truncate"
                    >
                        {item.value}
                    </a>
                ) : (
                    <p className="text-gray-900 dark:text-white font-black text-lg tracking-tight truncate">{item.value}</p>
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
