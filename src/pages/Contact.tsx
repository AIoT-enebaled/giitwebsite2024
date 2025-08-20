import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import NeuralNetwork from '../components/NeuralNetwork';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import FloatingLogo from '../components/FloatingLogo';
import ElegantAnimatedBackground from '../components/CrazyAnimatedBackground';

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#020817] pb-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Neural Network Background */}
      <NeuralNetwork />
      <ElegantAnimatedBackground />
      
      {/* Content */}
      <div className="relative">
        {/* Hero Section */}
        <section className="relative py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div 
              className="text-center mb-12"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <div 
                className="flex justify-center mb-6"
                variants={itemVariants}
              >
                <FloatingLogo size="medium" showText={false} showTypewriter={false} />
              </div>
              <h1 
                className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                variants={itemVariants}
              >
                Contact Us
              </h1>
              <div 
                className="text-xl text-gray-300"
                variants={itemVariants}
              >
                Get in Touch
              </div>
            </div>

            <div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {/* Contact Information */}
              <div className="space-y-8" variants={itemVariants}>
                <div 
                  className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-6 rounded-xl backdrop-blur-sm border border-indigo-500/20"
                  whileHover={{ scale: 1.02, borderColor: "rgba(99, 102, 241, 0.4)" }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-semibold mb-6 text-gray-100">Get in Touch</h2>
                  <div className="space-y-4">
                    <div 
                      className="flex items-center space-x-4 text-gray-300"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Mail className="text-indigo-400" size={24} />
                      <span>geniusinstitute2024@gmail.com</span>
                    </div>
                    <div 
                      className="flex items-center space-x-4 text-gray-300"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Phone className="text-indigo-400" size={24} />
                      <div className="flex flex-col">
                        <span>+256 745 695 576</span>
                        <span>+256 752 067 815</span>
                      </div>
                    </div>
                    <div 
                      className="flex items-center space-x-4 text-gray-300"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MapPin className="text-indigo-400" size={24} />
                      <div>
                        <div>123 Technology Street</div>
                        <div>Kampala, Uganda</div>
                      </div>
                    </div>
                    <div 
                      className="flex items-center space-x-4 text-gray-300"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Clock className="text-indigo-400" size={24} />
                      <div>
                        <div>Monday - Friday: 8:00 AM - 6:00 PM</div>
                        <div>Saturday: 9:00 AM - 1:00 PM</div>
                        <div>Sunday: Closed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div variants={itemVariants}>
                <div 
                  className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-6 rounded-xl backdrop-blur-sm border border-indigo-500/20"
                  whileHover={{ scale: 1.02, borderColor: "rgba(99, 102, 241, 0.4)" }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-semibold mb-6 text-gray-100">Send us a Message</h2>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="w-full px-4 py-2 rounded-lg bg-black/50 border border-indigo-500/20 text-gray-300 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                        />
                      </div>
                      <div
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="w-full px-4 py-2 rounded-lg bg-black/50 border border-indigo-500/20 text-gray-300 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                        />
                      </div>
                    </div>
                    <div
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <textarea
                        placeholder="Your Message"
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg bg-black/50 border border-indigo-500/20 text-gray-300 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Send Message</span>
                      <Send size={20} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
