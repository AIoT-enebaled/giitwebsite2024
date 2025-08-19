import AnimatedSection from '../components/AnimatedSection';
import Typewriter from 'typewriter-effect';
import NeuralNetwork from '../components/NeuralNetwork';
import { useState } from 'react';
import { courseCatalogs, courseCategories, courseLevels, courseTypes } from '../data/courseDetails';
import CourseCatalog from '../components/CourseCatalog';
import DetailedCurriculum from '../components/DetailedCurriculum';
import RegistrationModal from '../components/RegistrationModal';
import { Filter, Search, Star, Clock, Users, BookOpen } from 'lucide-react';
import FloatingLogo from '../components/FloatingLogo';
import ElegantAnimatedBackground from '../components/CrazyAnimatedBackground';

const Services = () => {
  const [showCatalog, setShowCatalog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showDetailedCurriculum, setShowDetailedCurriculum] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationCourse, setRegistrationCourse] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter courses based on search and filters
  const filteredCourses = courseCatalogs.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesType = selectedType === 'All' || course.courseType === selectedType;
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    
    return matchesSearch && matchesLevel && matchesType && matchesCategory;
  });

  const handleEnroll = (course: any) => {
    setRegistrationCourse(course);
    setShowRegistrationModal(true);
  };

  const handleViewCurriculum = (courseId: string) => {
    setSelectedCourseId(courseId);
    setShowDetailedCurriculum(true);
  };

  const closeDetailedCurriculum = () => {
    setShowDetailedCurriculum(false);
    setSelectedCourseId('');
  };

  const closeRegistrationModal = () => {
    setShowRegistrationModal(false);
    setRegistrationCourse(null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLevel('All');
    setSelectedType('All');
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen bg-[#020817] relative">
      {/* Neural Network Background */}
      <NeuralNetwork />
      <ElegantAnimatedBackground />
      
      {/* Content */}
      <div className="relative">
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="text-center mb-16">
                <div className="flex justify-center mb-6">
                  <FloatingLogo size="large" showText={false} showTypewriter={false} />
                </div>
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Our Courses & Services
                </h1>
                <div className="text-xl text-gray-300">
                  <Typewriter
                    options={{
                      strings: [
                        'Transform Your Skills', 
                        'Build Your Future', 
                        'Learn from Experts',
                        'Master Technology',
                        'Create Amazing Projects'
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                    }}
                  />
                </div>
                <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                  Discover our comprehensive range of technology courses designed to prepare students for the digital future. 
                  From beginner-friendly programming to advanced AI concepts.
                </p>
              </div>
            </AnimatedSection>

            {/* Why Choose GiiT Section */}
            <AnimatedSection>
              <div className="mb-16 bg-gradient-to-r from-dark-light to-dark-lighter rounded-2xl p-8 border border-gray-700">
                <h2 className="text-3xl font-bold text-center text-indigo-400 mb-8">Why Choose GiiT?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <Star className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Expert Instructors</h3>
                    <p className="text-gray-300">Learn from industry professionals with real-world experience in technology and computer science.</p>
                  </div>
                  <div className="text-center">
                    <BookOpen className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Hands-On Learning</h3>
                    <p className="text-gray-300">Build real projects and gain practical skills that employers value in today's tech industry.</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Future-Ready Skills</h3>
                    <p className="text-gray-300">Master technologies that are shaping the future: AI, web development, and critical thinking.</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Filter Section */}
            <AnimatedSection>
              <div className="mb-12">
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
                    Showing {filteredCourses.length} of {courseCatalogs.length} courses
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Course Catalog Section */}
            <div className="container mx-auto px-4 py-8">
              <div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {filteredCourses.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-gray-400 text-xl mb-4">No courses found matching your criteria</div>
                    <button
                      onClick={clearFilters}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {filteredCourses.map((course, index) => (
                      <AnimatedSection key={course.id} delay={index * 0.1}>
                        <div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl backdrop-blur-sm border border-indigo-500/20 overflow-hidden group hover:border-indigo-400/40 transition-all duration-300"
                        >
                          <div className="relative h-64 overflow-hidden">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            
                            {/* Course Tags */}
                            <div className="absolute top-3 left-3 flex gap-2">
                              <span className="px-2 py-1 bg-indigo-600/80 text-white text-xs rounded-full">
                                {course.level}
                              </span>
                              <span className="px-2 py-1 bg-purple-600/80 text-white text-xs rounded-full">
                                {course.courseType}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs text-indigo-400 font-medium">{course.category}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{course.title}</h3>
                            <p className="text-gray-300 mb-4 text-sm line-clamp-3">{course.description}</p>
                            
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

                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-xs text-gray-400">Starting from</p>
                                <div className="flex gap-2">
                                  <p className="text-sm font-semibold text-indigo-400">
                                    UGX {course.price.ugx.toLocaleString()}
                                  </p>
                                  <p className="text-sm font-semibold text-purple-400">
                                    ${course.price.usd}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                              <button
                                onClick={() => handleViewCurriculum(course.id)}
                                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors"
                              >
                                View Curriculum
                              </button>
                              <button
                                onClick={() => handleEnroll(course)}
                                className="flex-1 px-3 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white text-sm font-medium hover:from-indigo-500 hover:to-purple-500 transition-colors"
                              >
                                Enroll Now
                              </button>
                            </div>
                            </div>
                          </div>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Course Catalog Modal */}
      {showCatalog && selectedCourse && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowCatalog(false)} />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl">
              <CourseCatalog
                title={selectedCourse.title}
                description={selectedCourse.description}
                price={selectedCourse.price}
                duration={selectedCourse.duration}
                ageGroup={selectedCourse.ageGroup}
                objectives={selectedCourse.objectives}
                prerequisites={selectedCourse.prerequisites}
                curriculum={selectedCourse.curriculum}
                tools={selectedCourse.tools}
                benefits={selectedCourse.benefits}
                parentInfo={selectedCourse.parentInfo}
                onClose={() => setShowCatalog(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Detailed Curriculum Modal */}
      {showDetailedCurriculum && selectedCourseId && (
        <DetailedCurriculum
          courseId={selectedCourseId}
          onClose={closeDetailedCurriculum}
        />
      )}

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

export default Services;
