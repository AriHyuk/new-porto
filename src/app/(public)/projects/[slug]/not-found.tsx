import Link from 'next/link';
import { FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] dark:bg-[#0F1117] flex items-center justify-center px-4 py-20 transition-colors duration-200">
      <div className="max-w-lg w-full border-4 border-black dark:border-white bg-white dark:bg-[#1a1c23] p-8 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.2)] text-center relative overflow-hidden">
        
        {/* Top Warning Accent */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4D00] text-black border-2 border-black font-black uppercase text-[10px] tracking-widest shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-6">
          <FaExclamationTriangle />
          <span>Error 404 • Missing Resource</span>
        </div>

        <h1 className="text-7xl md:text-9xl font-black text-black dark:text-white tracking-tighter uppercase leading-none drop-shadow-[4px_4px_0px_rgba(204,255,0,1)]">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-black text-black dark:text-white mt-4 mb-4 uppercase tracking-tight">
          Project Not Found
        </h2>

        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-bold mb-8 leading-relaxed border-l-4 border-black dark:border-white pl-4 text-left">
          The requested project archive could not be located. It might have been migrated, renamed, or is temporarily offline.
        </p>

        <Link
          href="/#portfolio"
          className="inline-flex items-center justify-center gap-2.5 w-full py-4 px-6 bg-[#2B5CE6] text-white font-black uppercase tracking-widest text-xs border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-0 active:translate-x-0 transition-all duration-150"
        >
          <FaArrowLeft className="text-xs" />
          <span>Return to Showcase</span>
        </Link>
      </div>
    </div>
  );
}
