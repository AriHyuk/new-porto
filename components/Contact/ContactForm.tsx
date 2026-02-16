'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessage, CollaborationFormData } from '@/app/actions/send-message';
import { toast } from 'react-hot-toast';
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const categories = [
  { value: "Web Development", label: "Web Development", icon: "💻" },
  { value: "UI/UX Design", label: "UI/UX Design", icon: "🎨" },
  { value: "E-commerce", label: "E-commerce", icon: "🛒" },
  { value: "Other", label: "Other", icon: "✨" }
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CollaborationFormData>({
    name: '',
    email: '',
    category: '',
    budget: '',
    message: '',
    _honeypot: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CollaborationFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name as keyof CollaborationFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const result = await sendMessage(formData);

    if (result.success) {
      toast.success(result.message);
      setFormData({ name: '', email: '', category: '', budget: '', message: '', _honeypot: '' });
    } else {
      if (result.errors) {
        const fieldErrors: any = {};
        Object.entries(result.errors).forEach(([key, value]) => {
          fieldErrors[key] = value[0];
        });
        setErrors(fieldErrors);
      }
      toast.error(result.message);
    }
    setIsSubmitting(false);
  };

  const inputClasses = (fieldName: keyof CollaborationFormData) => `
    w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border-2 transition-all duration-300
    ${errors[fieldName] 
      ? 'border-red-500/50 focus:border-red-500 ring-red-500/10' 
      : 'border-transparent focus:border-blue-500 dark:focus:border-blue-400 ring-blue-500/10'}
    focus:ring-4 outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Honeypot Field - Hidden from humans, caught by bots */}
      <div className="hidden pointer-events-none opacity-0" aria-hidden="true">
        <input
          type="text"
          name="_honeypot"
          value={formData._honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label htmlFor="name" className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Full Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ari Hyuk"
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            className={inputClasses('name')}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1"
              >
                <FaExclamationCircle /> {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-3">
          <label htmlFor="email" className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="aria@example.com"
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            className={inputClasses('email')}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1"
              >
                <FaExclamationCircle /> {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label htmlFor="category" className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            Project Category
          </label>
          <div className="relative">
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              aria-required="true"
              className={`${inputClasses('category')} appearance-none pr-12`}
            >
              <option value="" disabled>Select a category</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
          <AnimatePresence>
            {errors.category && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1"
              >
                <FaExclamationCircle /> {errors.category}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-3">
          <label htmlFor="budget" className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Budget Range
          </label>
          <input
            id="budget"
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="e.g. $1,000 - $5,000"
            className={inputClasses('budget')}
          />
        </div>
      </div>

      <div className="space-y-3">
        <label htmlFor="message" className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          Project Details
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          required
          aria-required="true"
          aria-invalid={!!errors.message}
          placeholder="Describe your vision, timeline, and goals..."
          className={`${inputClasses('message')} resize-none`}
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1"
            >
              <FaExclamationCircle /> {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.01, boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.2)' }}
        whileTap={{ scale: 0.98 }}
        className="group w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-lg shadow-xl shadow-blue-500/10 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:grayscale relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isSubmitting ? (
          <>
            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="animate-pulse">Sending Proposal...</span>
          </>
        ) : (
          <>
            <FaPaperPlane className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
            <span>Request for Meeting</span>
          </>
        )}
      </motion.button>
    </form>
  );
}
