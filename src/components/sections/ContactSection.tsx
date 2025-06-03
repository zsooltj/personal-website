'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ContactSectionProps {
  content: {
    title: string;
    subtitle?: string;
    description?: string;
    email?: string;
    phone?: string;
    location?: string;
    social?: Array<{
      name: string;
      url: string;
      icon: string;
    }>;
    availability?: string;
    responseTime?: string;
  };
  contactForm: {
    formData: {
      name: string;
      email: string;
      message: string;
    };
    isLoading: boolean;
    isSuccess: boolean;
    error: string | null;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
  };
}

const ContactSection: React.FC<ContactSectionProps> = ({ content, contactForm }) => {
  const {
    formData,
    isLoading,
    isSuccess,
    error,
    handleChange,
    handleSubmit
  } = contactForm;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl lg:text-6xl font-bold">
          <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            {content.title}
          </span>
        </h2>
        <p className="text-xl text-primary-300">{content.subtitle}</p>
        <p className="text-lg text-dark-300 leading-relaxed">{content.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6 ">
          <div className="bg-dark-800/30 backdrop-blur-sm rounded-lg p-6 border-l border-dark-700">
            <h3 className="text-xl font-bold text-dark-100 mb-4">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-primary-400">📧</span>
                <a 
                  href={`mailto:${content.email}`}
                  className="text-dark-200 hover:text-primary-400 transition-colors duration-300 cursor-pointer"
                >
                  {content.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary-400">📱</span>
                <span className="text-dark-200">{content.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary-400">📍</span>
                <span className="text-dark-200">{content.location}</span>
              </div>
            </div>
          </div>

          <div className="bg-dark-800/30 backdrop-blur-sm rounded-lg p-6  border-l border-dark-700">
            <h3 className="text-xl font-bold text-dark-100 mb-4">Social Links</h3>
            <div className="grid grid-cols-2 gap-4">
              {content.social?.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-dark-700/50 rounded-lg hover:bg-primary-400/20 transition-all duration-300"
                >
                  <span>{social.icon}</span>
                  <span className="text-dark-200">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-dark-800/30 backdrop-blur-sm rounded-lg p-6  border-l border-dark-700">
          <h3 className="text-xl font-bold text-dark-100 mb-4">Send Message</h3>
          
          {/* Success Message - Replace entire form */}
          {isSuccess ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-6 bg-dark-700/50 rounded-full flex items-center justify-center border border-dark-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.span
                  className="text-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  ✅
                </motion.span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h4 className="text-xl font-semibold text-dark-100 mb-2">Message Sent Successfully</h4>
                <p className="text-dark-300 mb-4">Thank you for reaching out. I&apos;ll get back to you soon.</p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {/* Error Message with Animation */}
              {error && (
                <motion.div 
                  className="mb-4 p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/50 rounded-lg"
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-3">
                    <motion.span
                      className="text-xl"
                      animate={{ rotate: [-10, 10, -10] }}
                      transition={{ duration: 0.5, repeat: 2 }}
                    >
                      ❌
                    </motion.span>
                    <p className="text-red-400 font-medium">{error}</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full p-3 bg-dark-700/50 border border-dark-600 rounded-lg text-dark-100 placeholder-dark-400 focus:border-primary-400 focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full p-3 bg-dark-700/50 border border-dark-600 rounded-lg text-dark-100 placeholder-dark-400 focus:border-primary-400 focus:outline-none"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={4}
                  required
                  className="w-full p-3 bg-dark-700/50 border border-dark-600 rounded-lg text-dark-100 placeholder-dark-400 focus:border-primary-400 focus:outline-none resize-none"
                ></textarea>
                <motion.button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  {isLoading && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  <span className="relative z-10">
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </div>
                    ) : (
                      'Send Message 🚀'
                    )}
                  </span>
                </motion.button>
              </form>
            </motion.div>
          )}
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-primary-400 font-medium">{content.availability}</p>
        <p className="text-dark-400 text-sm">{content.responseTime}</p>
      </div>
    </div>
  );
};

export default ContactSection;
