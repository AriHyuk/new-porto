'use client';

import { Link as ScrollLink } from 'react-scroll';
import Link from 'next/link';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface NavLinkProps {
  to: string;
  label: string;
  isActive: boolean;
  isHome: boolean;
  onClick?: () => void;
  onSetActive: (to: string) => void;
}

export default function NavLink({ to, label, isActive, isHome, onClick, onSetActive }: NavLinkProps) {
  const baseClass = clsx(
    'relative cursor-pointer text-xs font-black uppercase tracking-widest transition-all duration-150 px-1 py-0.5',
    isActive
      ? 'text-[#2B5CE6] dark:text-[#5b82ff]'
      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
  );

  const activeIndicator = isActive ? (
    <motion.span
      layoutId="nav-active-bar"
      className="absolute -bottom-[3px] left-0 w-full h-[3px] bg-[#2B5CE6]"
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    />
  ) : null;

  if (!isHome) {
    return (
      <div className="relative">
        <Link
          href={`/#${to}`}
          className={baseClass}
          onClick={onClick}
        >
          {label}
          {activeIndicator}
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <ScrollLink
        to={to}
        href={`#${to}`}
        spy={true}
        smooth={true}
        duration={500}
        offset={-70}
        className={baseClass}
        onClick={onClick}
        onSetActive={() => onSetActive(to)}
      >
        {label}
        {activeIndicator}
      </ScrollLink>
    </div>
  );
}
