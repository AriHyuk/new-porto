'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessage } from '@/app/actions/send-message';
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
    ${hasError ? 'text-red-500' : 'text-gray-400 focus-within:text-blue-500'}
  `;

  const inputClasses = (hasError: boolean) => `
    w-full px-5 py-4 rounded-2xl bg-gray-100/50 dark:bg-black/40 border-2 transition-all duration-500
    ${hasError 
      ? 'border-red-500/50 focus:border-red-500 ring-red-500/10' 
      : 'border-white/5 focus:border-blue-500/50 dark:focus:border-blue-400/50 ring-blue-500/5'}
    focus:ring-4 outline-none text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-600 font-medium
    backdrop-blur-xl hover:bg-white dark:hover:bg-white/5
  `;

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="flex flex-col items-center justify-center py-12 px-4 text-center h-full min-h-[400px]"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="w-24 h-24 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 mb-8"
        >
          <FaCheckCircle className="text-white text-5xl" />
        </motion.div>
        <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Message Sent!</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md text-lg mb-8 leading-relaxed font-medium">
          Thank you for reaching out. I'll review your project details and get back to you within 24 hours.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="px-10 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-900 dark:text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 hover:scale-105"
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
          <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 ml-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
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
                className="text-red-500 text-[10px] font-black uppercase tracking-wider mt-2 ml-1 flex items-center gap-1"
              >
                <FaExclamationCircle /> {errors.name.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className={inputContainerClasses(!!errors.email)}>
          <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 ml-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
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
                className="text-red-500 text-[10px] font-black uppercase tracking-wider mt-2 ml-1 flex items-center gap-1"
              >
                <FaExclamationCircle /> {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        <div className={inputContainerClasses(!!errors.category)}>
          <label htmlFor="category" className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 ml-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            Project Category
          </label>
          <div className="relative group/select">
            <select
              id="category"
              className={`${inputClasses(!!errors.category)} appearance-none pr-10 cursor-pointer text-sm md:text-base`}
              {...register('category')}
            >
              <option value="" disabled className="bg-white dark:bg-[#0D0F14]">Select Category</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value} className="bg-white dark:bg-[#0D0F14]">
                  {cat.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-focus-within/select:text-blue-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
          <AnimatePresence>
            {errors.category && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-[10px] font-black uppercase tracking-wider mt-2 ml-1 flex items-center gap-1"
              >
                <FaExclamationCircle /> {errors.category.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className={inputContainerClasses(!!errors.budget)}>
          <label htmlFor="budget" className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 ml-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
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
                className="text-red-500 text-[10px] font-black uppercase tracking-wider mt-2 ml-1 flex items-center gap-1"
              >
                <FaExclamationCircle /> {errors.budget.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className={inputContainerClasses(!!errors.message)}>
        <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 ml-1 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
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
              className="text-red-500 text-[10px] font-black uppercase tracking-wider mt-2 ml-1 flex items-center gap-1"
            >
              <FaExclamationCircle /> {errors.message.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="group w-full py-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-4 disabled:opacity-70 disabled:grayscale relative overflow-hidden active:scale-95"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
        
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="animate-pulse">Broadcasting Signal...</span>
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
