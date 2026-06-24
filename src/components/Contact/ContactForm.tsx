'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessage } from '@/actions/send-message';
import { CollaborationSchema, type CollaborationFormData } from '@/lib/validations/contact';
import { toast } from 'react-hot-toast';
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const categories = [
  { value: "Web Development", label: "Web Development", icon: "💻" },
  { value: "UI/UX Design", label: "UI/UX Design", icon: "🎨" },
  { value: "E-commerce", label: "E-commerce", icon: "🛒" },
  { value: "Other", label: "Other", icon: "✨" }
];

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset 
  } = useForm<CollaborationFormData>({
    resolver: zodResolver(CollaborationSchema),
    defaultValues: {
      name: '',
      email: '',
      category: '',
      budget: '',
      message: '',
      _honeypot: '',
    }
  });

  const onSubmit: SubmitHandler<CollaborationFormData> = async (data) => {
    try {
      const result = await sendMessage(data);
      
      if (result.success) {
        setIsSuccess(true);
        reset();
        toast.success(result.message);
      } else {
        toast.error(result.message || 'Something went wrong');
      }
    } catch (error) {
        console.error(error);
        toast.error('Failed to send message');
    }
  };

  const inputContainerClasses = (hasError: boolean) => `
    relative group transition-all duration-300
    ${hasError ? 'text-red-500' : 'text-black dark:text-white focus-within:text-[#2B5CE6]'}
  `;

  const inputClasses = (hasError: boolean) => `
    w-full px-5 py-4 bg-[#F5F0E8] dark:bg-[#1a1c23] border-4 transition-all duration-300
    ${hasError 
      ? 'border-red-500 focus:border-red-500' 
      : 'border-black dark:border-white focus:border-[#2B5CE6] dark:focus:border-[#2B5CE6] focus:shadow-[8px_8px_0px_rgba(43,92,230,1)]'}
    outline-none text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-bold
    shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,1)] hover:bg-white dark:hover:bg-black
  `;

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="flex flex-col items-center justify-center py-12 px-4 text-center h-full min-h-[400px] border-4 border-black dark:border-white bg-[#CCFF00] dark:bg-[#0F1117] shadow-[12px_12px_0px_rgba(0,0,0,1)]"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="w-24 h-24 bg-white dark:bg-[#2B5CE6] border-4 border-black dark:border-white flex items-center justify-center shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_rgba(255,255,255,1)] mb-8"
        >
          <FaCheckCircle className="text-black dark:text-white text-5xl" />
        </motion.div>
        <h3 className="text-4xl font-black text-black dark:text-white mb-4 tracking-tight uppercase">Message Sent!</h3>
        <p className="text-black dark:text-gray-300 max-w-md text-lg mb-8 leading-relaxed font-bold border-l-4 border-black dark:border-white pl-4">
          Thank you for reaching out. I'll review your project details and get back to you within 24 hours.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="px-10 py-4 bg-black dark:bg-white border-2 border-transparent text-white dark:text-black font-black uppercase tracking-widest text-xs transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.5)] dark:hover:shadow-[4px_4px_0px_rgba(255,255,255,0.5)]"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      {/* Honeypot Field */}
      <div className="hidden pointer-events-none opacity-0" aria-hidden="true">
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('_honeypot')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        <div className={inputContainerClasses(!!errors.name)}>
          <label htmlFor="name" className="text-[12px] font-black uppercase tracking-[0.2em] mb-3 ml-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-black dark:bg-white" />
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Ari Hyuk"
            className={inputClasses(!!errors.name)}
            {...register('name')}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-white bg-red-500 border-2 border-black inline-flex px-2 py-1 text-[10px] font-black uppercase tracking-wider mt-2 shadow-[2px_2px_0px_rgba(0,0,0,1)] items-center gap-1"
              >
                <FaExclamationCircle /> {errors.name.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className={inputContainerClasses(!!errors.email)}>
          <label htmlFor="email" className="text-[12px] font-black uppercase tracking-[0.2em] mb-3 ml-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-black dark:bg-white" />
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="aria@example.com"
            className={inputClasses(!!errors.email)}
            {...register('email')}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-white bg-red-500 border-2 border-black inline-flex px-2 py-1 text-[10px] font-black uppercase tracking-wider mt-2 shadow-[2px_2px_0px_rgba(0,0,0,1)] items-center gap-1"
              >
                <FaExclamationCircle /> {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        <div className={inputContainerClasses(!!errors.category)}>
          <label htmlFor="category" className="text-[12px] font-black uppercase tracking-[0.2em] mb-3 ml-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-black dark:bg-white" />
            Project Category
          </label>
          <div className="relative group/select">
            <select
              id="category"
              className={`${inputClasses(!!errors.category)} appearance-none pr-10 cursor-pointer text-sm md:text-base`}
              {...register('category')}
            >
              <option value="" disabled className="bg-white dark:bg-black text-gray-500">Select Category</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value} className="bg-white dark:bg-black font-bold">
                  {cat.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black dark:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
          <AnimatePresence>
            {errors.category && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-white bg-red-500 border-2 border-black inline-flex px-2 py-1 text-[10px] font-black uppercase tracking-wider mt-2 shadow-[2px_2px_0px_rgba(0,0,0,1)] items-center gap-1"
              >
                <FaExclamationCircle /> {errors.category.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className={inputContainerClasses(!!errors.budget)}>
          <label htmlFor="budget" className="text-[12px] font-black uppercase tracking-[0.2em] mb-3 ml-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-black dark:bg-white" />
            Budget Range
          </label>
          <input
            id="budget"
            type="text"
            placeholder="e.g. $1,000 - $5,000"
            className={inputClasses(!!errors.budget)}
            {...register('budget')}
          />
           <AnimatePresence>
            {errors.budget && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-white bg-red-500 border-2 border-black inline-flex px-2 py-1 text-[10px] font-black uppercase tracking-wider mt-2 shadow-[2px_2px_0px_rgba(0,0,0,1)] items-center gap-1"
              >
                <FaExclamationCircle /> {errors.budget.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className={inputContainerClasses(!!errors.message)}>
        <label htmlFor="message" className="text-[12px] font-black uppercase tracking-[0.2em] mb-3 ml-1 flex items-center gap-2">
          <span className="w-2 h-2 bg-black dark:bg-white" />
          Project Details
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Describe your vision, timeline, and goals..."
          className={`${inputClasses(!!errors.message)} resize-none`}
          {...register('message')}
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-white bg-red-500 border-2 border-black inline-flex px-2 py-1 text-[10px] font-black uppercase tracking-wider mt-2 shadow-[2px_2px_0px_rgba(0,0,0,1)] items-center gap-1"
            >
              <FaExclamationCircle /> {errors.message.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ y: -4, x: -4 }}
        whileTap={{ y: 0, x: 0 }}
        className="group w-full py-6 bg-[#2B5CE6] border-4 border-black dark:border-white text-white font-black text-sm uppercase tracking-widest shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_rgba(255,255,255,1)] dark:hover:shadow-[12px_12px_0px_rgba(255,255,255,1)] transition-all flex items-center justify-center gap-4 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <span className="animate-pulse">SENDING...</span>
          </>
        ) : (
          <>
            <FaPaperPlane className="text-sm group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
            <span>Initiate Collaboration</span>
          </>
        )}
      </motion.button>
    </form>
  );
}
