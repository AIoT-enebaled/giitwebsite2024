import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, Code, Lightbulb } from 'lucide-react';

const StudentShowcase = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showcaseImages = [
    {
      src: 'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F42e56409de1e49da80e923bedf388d00?format=webp&width=800',
      name: 'Kayden & Kylie',
      achievement: 'Website Competition Winners 2025',
      description: 'Built SkillBridge Uganda - A platform empowering youth with market-aligned vocational skills',
      icon: <Trophy className="h-8 w-8" />,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      src: 'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2Ff271f789cdd54b87abf9a350b0c4e962?format=webp&width=800',
      name: 'Kayden',
      achievement: 'Full-Stack Developer at 13',
      description: 'Mastered Python, JavaScript, and AI development. Currently building educational apps.',
      icon: <Code className="h-8 w-8" />,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      src: 'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F442f39e52ddf4e8db77061762d90508b?format=webp&width=800',
      name: 'Kylie',
      achievement: 'Creative Tech Innovator',
      description: 'Combines art and technology to create beautiful, functional applications with stunning UI/UX.',
      icon: <Lightbulb className="h-8 w-8" />,
      color: 'from-pink-500 to-purple-500'
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`
        }} />
      </div>

      {showcaseImages.map((student, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 flex items-center"
          style={{
            transform: `translateY(${scrollY * (0.1 + index * 0.05)}px)`,
            zIndex: showcaseImages.length - index,
          }}
          initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className={`w-full min-h-screen flex items-center ${index % 2 === 0 ? 'justify-start pl-8 md:pl-16' : 'justify-end pr-8 md:pr-16'}`}>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center p-8">
              {/* Content Side */}
              <div className={`space-y-6 ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r ${student.color} text-white font-semibold`}
                >
                  {student.icon}
                  <span>{student.achievement}</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl md:text-6xl font-bold text-white"
                >
                  Meet{' '}
                  <span className={`bg-gradient-to-r ${student.color} bg-clip-text text-transparent`}>
                    {student.name}
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl text-gray-300 leading-relaxed max-w-lg"
                >
                  {student.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-400">Excellence in Technology</span>
                </motion.div>
              </div>

              {/* Image Side */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`relative ${index % 2 !== 0 ? 'md:order-1' : ''}`}
              >
                <div className="relative group">
                  {/* Main Image */}
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    <img
                      src={student.src}
                      alt={student.name}
                      className="w-full h-96 md:h-[500px] object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className={`absolute -top-4 -right-4 bg-gradient-to-r ${student.color} p-4 rounded-2xl shadow-lg`}
                  >
                    {student.icon}
                    <div className="text-white font-bold text-sm">GiiT Star</div>
                  </motion.div>

                  {/* Decorative Elements */}
                  <div className={`absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-r ${student.color} rounded-full opacity-20 blur-xl`} />
                  <div className={`absolute -top-8 left-1/2 w-16 h-16 bg-gradient-to-r ${student.color} rounded-full opacity-30 blur-lg`} />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
};

export default StudentShowcase;
