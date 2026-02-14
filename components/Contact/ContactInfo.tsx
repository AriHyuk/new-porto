'use client';

import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const contactInfo = [
  {
    icon: <FaEnvelope />,
    label: 'Email',
    value: 'ariawl0209@gmail.com',
    href: 'mailto:ariawl0209@gmail.com',
  },
  {
    icon: <FaPhone />,
    label: 'Phone',
    value: '+62 858 9370 7918',
    href: 'tel:+6285893707918',
  },
  {
    icon: <FaMapMarkerAlt />,
    label: 'Location',
    value: 'Remote Worldwide',
    href: null,
  },
];

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      {contactInfo.map((item, index) => (
        <motion.div
          key={item.label}
          className="flex items-center gap-6 group p-4 rounded-2xl hover:bg-white/5 transition-all duration-300"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
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
