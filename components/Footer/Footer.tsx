'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { HiEnvelope, HiPhone, HiMapPin, HiArrowUp } from 'react-icons/hi2';
import { FiExternalLink } from 'react-icons/fi';

const socialLinks = [
  { icon: <FaInstagram />, href: 'https://instagram.com/ariawaludin', label: 'Instagram', color: 'hover:text-pink-500' },
  { icon: <FaTwitter />, href: 'https://twitter.com/ariawaludin', label: 'Twitter', color: 'hover:text-blue-400' },
  { icon: <FaLinkedin />, href: 'https://linkedin.com/in/ariawaludin', label: 'LinkedIn', color: 'hover:text-blue-600' },
  { icon: <FaGithub />, href: 'https://github.com/ariawaludin', label: 'GitHub', color: 'hover:text-gray-900 dark:hover:text-white' },
];

const quickLinks = [
  { name: "Beranda", url: "#" },
  { name: "About Me", url: "#about" },
  { name: "Layanan", url: "#portfolio" },
  { name: "Kontak", url: "#contact" },
];

const contactInfo = {
  email: "ariawl0209@gmail.com",
  phone: "+62 858 9370 7918",
  address: "Cikande, Serang, Indonesia",
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white dark:bg-[#030712] border-t border-gray-100 dark:border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Premium Background Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[70%] bg-blue-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute -bottom-[30%] -right-[10%] w-[50%] h-[70%] bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex flex-col space-y-4">
              <h3 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                ARI HYUK.
              </h3>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Available for Projects</span>
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm max-w-xs">
              Membangun pengalaman digital yang bermakna melalui kombinasi kode yang bersih dan desain yang intuitif.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center gap-2 group text-sm"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-blue-600 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <HiEnvelope className="text-base" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Email</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{contactInfo.email}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <HiMapPin className="text-base" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Location</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{contactInfo.address}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white">Connect</h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 transition-all duration-300 ${social.color} hover:border-current/30 hover:shadow-lg hover:shadow-current/5`}
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <span className="text-xl">{social.icon}</span>
                </motion.a>
              ))}
            </div>
            <p className="text-xs text-gray-400 flex items-center gap-1 italic">
              Let's build something epic <FiExternalLink />
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-400 dark:text-gray-500 text-xs font-medium">
            © {new Date().getFullYear()} <span className="text-gray-900 dark:text-white font-bold tracking-tight">ARI HYUK</span>. Handcrafted with passion.
          </p>

          <motion.button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold transition-all hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white shadow-xl shadow-blue-500/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            BACK TO TOP
            <HiArrowUp className="text-base group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
