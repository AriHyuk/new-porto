'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { HiEnvelope, HiPhone, HiMapPin, HiArrowUp } from 'react-icons/hi2';
import { FiExternalLink } from 'react-icons/fi';

const socialLinks = [
  { icon: <FaInstagram />, href: 'https://instagram.com/ariawaludin', label: 'Instagram', hoverColor: 'hover:bg-[#FF4D00]' },
  { icon: <FaTwitter />, href: 'https://twitter.com/ariawaludin', label: 'Twitter', hoverColor: 'hover:bg-[#2B5CE6]' },
  { icon: <FaLinkedin />, href: 'https://linkedin.com/in/ariawaludin', label: 'LinkedIn', hoverColor: 'hover:bg-[#2B5CE6]' },
  { icon: <FaGithub />, href: 'https://github.com/ariawaludin', label: 'GitHub', hoverColor: 'hover:bg-[#CCFF00]' },
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
    <footer className="relative bg-[#F5F0E8] dark:bg-[#0F1117] border-t-8 border-black dark:border-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex flex-col space-y-4">
              <h3 className="text-4xl font-black tracking-tighter text-black dark:text-white uppercase">
                ARI AWALUDIN.
              </h3>
              <div className="flex items-center gap-2 px-3 py-1 bg-[#CCFF00] border-4 border-black w-fit shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full bg-black opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 bg-black"></span>
                </span>
                <span className="text-[10px] font-black text-black uppercase tracking-widest">Available for Projects</span>
              </div>
            </div>
            <p className="text-black dark:text-gray-300 font-bold leading-relaxed text-sm max-w-xs border-l-4 border-black dark:border-white pl-4">
              Membangun pengalaman digital yang bermakna melalui kombinasi kode yang bersih dan desain yang intuitif.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-black dark:text-white">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="text-black dark:text-gray-300 font-bold hover:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all inline-block px-2 py-1 -ml-2 text-sm uppercase tracking-wider"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-black dark:text-white">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="mt-1 w-10 h-10 bg-[#FF4D00] border-4 border-black dark:border-white flex items-center justify-center text-black dark:text-white shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,1)]">
                  <HiEnvelope className="text-lg" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-black dark:text-gray-400 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-sm text-black dark:text-white font-bold">{contactInfo.email}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 w-10 h-10 bg-[#2B5CE6] border-4 border-black dark:border-white flex items-center justify-center text-white shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,1)]">
                  <HiMapPin className="text-lg" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-black dark:text-gray-400 uppercase tracking-widest mb-1">Location</p>
                  <p className="text-sm text-black dark:text-white font-bold">{contactInfo.address}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-black dark:text-white">Connect</h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-white dark:bg-black border-4 border-black dark:border-white flex items-center justify-center text-black dark:text-white transition-all duration-300 ${social.hoverColor} hover:text-white dark:hover:text-black hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_rgba(255,255,255,1)]`}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <span className="text-xl">{social.icon}</span>
                </motion.a>
              ))}
            </div>
            <p className="text-xs text-black dark:text-gray-400 font-bold flex items-center gap-1 uppercase tracking-widest mt-4">
              Let's build something epic <FiExternalLink className="text-black dark:text-white" />
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t-4 border-black dark:border-white/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-black dark:text-gray-400 text-xs font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} <span className="text-black dark:text-white font-black bg-[#CCFF00] dark:bg-black dark:text-[#CCFF00] px-2 py-1 border-2 border-black dark:border-transparent mx-1">ARI AWALUDIN</span>. Handcrafted with passion.
          </p>

          <motion.button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-6 py-3 bg-[#2B5CE6] border-4 border-black dark:border-white text-white font-black text-xs uppercase tracking-widest transition-all hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_rgba(255,255,255,1)]"
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
