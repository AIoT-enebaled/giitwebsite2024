import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { courseCatalogs, courseCategories, courseLevels, courseTypes } from '../data/courseDetails';
import { Filter, Search, Star, Clock, Users, BookOpen, Zap, Award, Target } from 'lucide-react';
import FloatingLogo from '../components/FloatingLogo';
import TypewriterEffect from '../components/TypewriterEffect';
import NeuralNetwork from '../components/NeuralNetwork';
import RegistrationModal from '../components/RegistrationModal';
import ElegantAnimatedBackground from '../components/CrazyAnimatedBackground';

const AcceleratorProgram = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationCourse, setRegistrationCourse] = useState<any>(null);

  // Create accelerator versions of all courses
  const acceleratorCourses = courseCatalogs.map(course => ({
    ...course,
    id: `accelerator-${course.id}`,
    title: `${course.title} - Accelerator`,
    duration: '2 weeks',
    price: { ugx: 150000, usd: 41 },
    description: `Accelerated 2-week intensive version of ${course.title}. ${course.description}`,
    isAccelerator: true
  }));

  // Filter courses based on search and filters
  const filteredCourses = acceleratorCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesType = selectedType === 'All' || course.courseType === selectedType;
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    
    return matchesSearch && matchesLevel && matchesType && matchesCategory;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLevel('All');
    setSelectedType('All');
    setSelectedCategory('All');
  };

  const handleEnroll = (course: any) => {
    setRegistrationCourse(course);
    setShowRegistrationModal(true);
  };

  const closeRegistrationModal = () => {
    setShowRegistrationModal(false);
    setRegistrationCourse(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-dark-light">
      <NeuralNetwork />
      
      <div className="relative pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <FloatingLogo size="large" showText={true} showTypewriter={false} className="justify-center mb-8" />
            <div className="flex items-center justify-center gap-3 mb-6">
              <Zap className="h-8 w-8 text-yellow-400" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Accelerator Program
              </h1>
              <Zap className="h-8 w-8 text-yellow-400" />
            </div>
            <div className="min-h-[80px] flex items-center justify-center mb-6 w-full overflow-visible">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-300 text-center px-4 max-w-full">
                <TypewriterEffect
                  texts={[
                    'Master Any Course in Just 2 Weeks!',
                    'Intensive Learning, Maximum Results',
                    'Fast-Track Your Tech Skills',
                    'Accelerate Your Future'
                  ]}
                  speed={80}
                  delay={4000}
                  className="whitespace-nowrap"
                />
              </h2>
            </div>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Experience our revolutionary accelerator program where every course is condensed into an intensive 
              2-week format for just <span className="text-yellow-400 font-bold">UGX 150,000</span>. 
              Perfect for fast learners and those who want quick results!
            </p>
          </motion.div>

          {/* Program Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-2xl p-8 border border-yellow-500/30"
          >
            <h3 className="text-3xl font-bold text-center text-yellow-400 mb-8">Why Choose Accelerator Program?</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Super Fast Learning</h4>
                <p className="text-gray-300 text-sm">Complete any course in just 2 weeks with intensive daily sessions</p>
              </div>
              <div className="text-center">
                <Award className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Same Certification</h4>
                <p className="text-gray-300 text-sm">Receive the same certificate as regular course completers</p>
              </div>
              <div className="text-center">
                <Target className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Focused Learning</h4>
                <p className="text-gray-300 text-sm">Highly focused curriculum covering essential skills only</p>
              </div>
              <div className="text-center">
                <Star className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Affordable Price</h4>
                <p className="text-gray-300 text-sm">Same quality education at UGX 150,000 for any course</p>
              </div>
            </div>
          </motion.div>

          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="bg-dark-light rounded-xl p-6 border border-gray-700">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-indigo-400" />
                  <h3 className="text-lg font-semibold text-white">Filter Courses</h3>
                </div>
                <button
                  onClick={clearFilters}
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-dark-lighter border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Level Filter */}
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full py-2 px-4 bg-dark-lighter border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="All">All Levels</option>
                  {Object.values(courseLevels).map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>

                {/* Type Filter */}
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full py-2 px-4 bg-dark-lighter border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="All">All Course Types</option>
                  {Object.values(courseTypes).map(type => (
                    <option key={type} value={type}>{type} Course</option>
                  ))}
                </select>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full py-2 px-4 bg-dark-lighter border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="All">All Categories</option>
                  {Object.values(courseCategories).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="mt-4 text-sm text-gray-400">
                Showing {filteredCourses.length} of {acceleratorCourses.length} accelerator courses
              </div>
            </div>
          </motion.div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 * index }}
                className="bg-dark-light rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 group"
              >
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  
                  {/* Accelerator Badge */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    Accelerator
                  </div>
                  
                  {/* Level & Type Badges */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1">
                    <span className="bg-indigo-600/80 text-white px-2 py-1 rounded-full text-xs">
                      {course.level}
                    </span>
                    <span className="bg-purple-600/80 text-white px-2 py-1 rounded-full text-xs">
                      {course.courseType}
                    </span>
                  </div>

                  {/* Course Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">{course.title}</h3>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-yellow-400 font-medium">{course.category}</span>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{course.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.ageGroup}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold text-yellow-400">
                        UGX {course.price.ugx.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-400">${course.price.usd}</p>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      <div className="bg-yellow-500/20 px-2 py-1 rounded text-yellow-400 font-semibold">
                        2 Weeks Intensive
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleEnroll(course)}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
                  >
                    Enroll Now - UGX 150k
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-xl mb-4">No courses found matching your criteria</div>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Accelerate Your Learning?</h2>
            <p className="text-xl text-yellow-100 mb-6">
              Choose any course and complete it in just 2 weeks for only UGX 150,000!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="tel:+256752067815"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-orange-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
              >
                Contact Us: +256752-067-815
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowRegistrationModal(true)}
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-orange-600 transition-all duration-300"
              >
                Register Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={showRegistrationModal}
        onClose={closeRegistrationModal}
        courseTitle={registrationCourse?.title}
        price={registrationCourse?.price}
        courses={registrationCourse ? [registrationCourse.title] : []}
      />
    </div>
  );
};

export default AcceleratorProgram;
