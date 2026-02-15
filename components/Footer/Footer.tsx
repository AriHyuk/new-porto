'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const socialLinks = [
  { icon: <FaGithub />, href: 'https://github.com/ariawaludin', label: 'GitHub' },
  { icon: <FaLinkedin />, href: 'https://linkedin.com/in/ariawaludin', label: 'LinkedIn' },
  { icon: <FaTwitter />, href: 'https://twitter.com/ariawaludin', label: 'Twitter' },
  { icon: <FaInstagram />, href: 'https://instagram.com/ariawaludin', label: 'Instagram' },
];

export default function Footer() {
  const socialLinks = [
    { icon: <FaInstagram />, href: 'https://instagram.com/ariawaludin', label: 'Instagram' },
    { icon: <FaTwitter />, href: 'https://twitter.com/ariawaludin', label: 'Twitter' },
    { icon: <FaLinkedin />, href: 'https://linkedin.com/in/ariawaludin', label: 'LinkedIn' },
    { icon: <FaGithub />, href: 'https://github.com/ariawaludin', label: 'GitHub' },
  ];

  const quickLinks = [
    { name: "Beranda", url: "#" },
    { name: "About Me", url: "#about" },
    { name: "Layanan", url: "#portfolio" }, // Mapping 'Layanan' to portfolio or relevant section
    { name: "Kontak", url: "#contact" },
  ];

  const contactInfo = {
    email: "ariawl0209@gmail.com",
    phone: "+62 858 9370 7918",
    address: "Cikande, Serang, Indonesia",
  };

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* About Me */}
          <div className="space-y-4">
            <h3 className="text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent inline-block">
              About Me
            </h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Saya adalah seorang pengembang web yang berfokus pada pengembangan aplikasi web dan desain UI/UX. 
              Saya memiliki pengalaman dalam pengembangan aplikasi web dengan teknologi modern.
            </p>
          </div>

          {/* Link Cepat */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-900 dark:text-white">
              Link Cepat
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 group-hover:bg-blue-600 transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-900 dark:text-white">
              Kontak
            </h3>
            <ul className="space-y-3 text-gray-500 dark:text-gray-400">
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 text-sm">📧</span>
                {contactInfo.email}
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 text-sm">📱</span>
                {contactInfo.phone}
              </li>
              <li className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 text-sm">📍</span>
                {contactInfo.address}
              </li>
            </ul>
          </div>

          {/* Sosial Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-900 dark:text-white">
              Sosial Media
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-900 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            © {new Date().getFullYear()} Ari Hyuk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
