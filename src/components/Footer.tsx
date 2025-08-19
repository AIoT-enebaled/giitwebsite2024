import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
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
    hidden: { y: 20, opacity: 0 },
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
    <motion.footer
      className="bg-gray-900 text-white mt-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {/* Institute Info */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <div className="flex items-center space-x-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F2ad69148086148c288ff98a1e4c8b79f?format=webp&width=800"
                alt="GiiT Logo"
                className="h-8 w-8"
              />
              <span className="font-bold text-xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">GiiT</span>
            </div>
            <p className="text-gray-400">
              Empowering minds through technology education and innovation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-blue-400">Courses</Link>
              </li>
              <li>
                <Link to="/curriculum" className="text-gray-400 hover:text-blue-400">Curriculum</Link>
              </li>
              <li>
                <Link to="/accelerator" className="text-gray-400 hover:text-blue-400">Accelerator Program</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-blue-400">Pricing</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-blue-400">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-400">Contact</Link>
              </li>
            </ul>
          </motion.div>

          {/* Courses */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Our Courses</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Problem-Solving & Critical Thinking</li>
              <li className="text-gray-400">Coding and Puzzle-Solving</li>
              <li className="text-gray-400">Design Thinking and Creativity</li>
              <li className="text-gray-400">Python Full Course</li>
              <li className="text-gray-400">JavaScript Web Development</li>
              <li className="text-gray-400">AI for Kids</li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">info@giit.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">+256 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">Kampala, Uganda</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
          variants={itemVariants}
        >
          <p>&copy; {new Date().getFullYear()} Genius Institute Of Information Technology. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
