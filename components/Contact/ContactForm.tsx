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
      setFormData({ name: '', email: '', category: '', budget: '', message: '' });
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ari Hyuk"
            className={inputClasses('name')}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1"><FaExclamationCircle /> {errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="aria@example.com"
            className={inputClasses('email')}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1"><FaExclamationCircle /> {errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Project Category</label>
          <div className="relative">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`${inputClasses('category')} appearance-none pr-12`}
            >
              <option value="" disabled>Select a category</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              ▼
            </div>
          </div>
          {errors.category && <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1"><FaExclamationCircle /> {errors.category}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Budget Range (USD)</label>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="e.g. $1,000 - $5,000"
            className={inputClasses('budget')}
          />
          {errors.budget && <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1"><FaExclamationCircle /> {errors.budget}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Project Details</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="Describe your vision, timeline, and goals..."
          className={`${inputClasses('message')} resize-none`}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1"><FaExclamationCircle /> {errors.message}</p>}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-lg shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:grayscale"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-3 border-white/50 border-t-white rounded-full animate-spin" />
            Sending Proposal...
          </>
        ) : (
          <>
            <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            Request for Meeting
          </>
        )}
      </motion.button>
    </form>
  );
}
