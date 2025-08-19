import React, { useState } from 'react';
import { BookOpen, Code, Brain, Palette, Users, Target, Clock, Trophy, CheckCircle, Star } from 'lucide-react';
import FloatingLogo from '../components/FloatingLogo';
import TypewriterEffect from '../components/TypewriterEffect';
import DetailedCurriculum from '../components/DetailedCurriculum';
import { courseCatalogs } from '../data/courseDetails';
import ElegantAnimatedBackground from '../components/CrazyAnimatedBackground';
import NeuralNetwork from '../components/NeuralNetwork';

const Curriculum = () => {
  const [showDetailedCurriculum, setShowDetailedCurriculum] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const handleViewCurriculum = (courseId: string) => {
    setSelectedCourseId(courseId);
    setShowDetailedCurriculum(true);
  };

  const closeDetailedCurriculum = () => {
    setShowDetailedCurriculum(false);
    setSelectedCourseId('');
  };

  // Group courses by category
  const groupedCourses = courseCatalogs.reduce((acc, course) => {
    if (!acc[course.category]) {
      acc[course.category] = [];
    }
    acc[course.category].push(course);
    return acc;
  }, {} as Record<string, typeof courseCatalogs>);

  const getCategoryColor = (index: number) => {
    const colors = [
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-indigo-500",
      "from-green-500 to-emerald-500",
      "from-orange-500 to-red-500",
      "from-pink-500 to-rose-500",
      "from-yellow-500 to-orange-500",
      "from-teal-500 to-cyan-500"
    ];
    return colors[index % colors.length];
  };

  const learningPaths = [
    {
      level: "Beginner (Ages 6-9)",
      icon: Users,
      color: "bg-green-500",
      description: "Foundation building with visual programming and basic concepts",
      duration: "6-12 months",
      courses: ["Computer Training", "Scratch for Kids", "Problem-Solving Basics"]
    },
    {
      level: "Intermediate (Ages 10-13)",
      icon: Code,
      color: "bg-blue-500", 
      description: "Text-based programming and web development introduction",
      duration: "12-18 months",
      courses: ["Python Programming", "Web Development", "Design Thinking", "AI for Kids"]
    },
    {
      level: "Advanced (Ages 14+)",
      icon: Trophy,
      color: "bg-purple-500",
      description: "Full-stack development and advanced CS concepts",
      duration: "18-24 months",
      courses: ["Advanced Python", "JavaScript Full Course", "AI & Machine Learning", "Advanced Web Development"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-dark-light relative">
      <NeuralNetwork />
      <ElegantAnimatedBackground />
      {/* Animated background with dots and connections */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20">
          {/* Animated dots */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-indigo-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-8">
              <FloatingLogo size="large" showText={true} showTypewriter={false} className="justify-center" />
            </div>
            <div className="mb-6">
              <span className="text-gray-400 text-lg">Genius Institute of IT</span>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Technology Excellence
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A comprehensive, age-appropriate curriculum designed to build strong foundations in 
              computer science, programming, and 21st-century digital skills.
            </p>
          </motion.div>

          {/* Course Categories */}
          {Object.entries(groupedCourses).map(([categoryName, courses], categoryIndex) => (
            <motion.div
              key={categoryName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * categoryIndex }}
              className="mb-16"
            >
              {/* Category Header */}
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">{categoryName}</h2>
                <p className="text-indigo-400 text-lg">{courses.length} courses available in this category</p>
              </div>

              {/* Course Cards Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="bg-dark-light rounded-2xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-300 group"
                  >
                    {/* Card Header */}
                    <div className={`h-32 bg-gradient-to-r ${getCategoryColor(categoryIndex)} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute top-4 left-6">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="h-6 w-6 text-white" />
                          <span className="text-white font-bold text-lg line-clamp-1">{course.title}</span>
                        </div>
                        <div className="flex items-center gap-4 text-white/90 text-sm">
                          <span className="bg-white/20 px-2 py-1 rounded-full">{course.level}</span>
                          <span className="bg-white/20 px-2 py-1 rounded-full">{course.courseType}</span>
                        </div>
                      </div>
                      <div className="absolute top-4 right-6">
                        <div className="text-right text-white/90 text-sm">
                          <div className="flex items-center gap-1 mb-1">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{course.curriculum.length} Modules</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-4 w-4" />
                            <span>Certificate</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3">What You'll Learn</h3>
                      <ul className="space-y-2 mb-6">
                        {course.objectives.slice(0, 4).map((objective, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2 text-gray-300 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{objective.title}: {objective.description}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-white mb-2">Prerequisites</h4>
                        <p className="text-gray-400 text-sm">{course.prerequisites.join(', ')}</p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleViewCurriculum(course.id)}
                        className={`w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r ${getCategoryColor(categoryIndex)} hover:shadow-lg transition-all duration-300`}
                      >
                        View Full Curriculum →
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Learning Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16 bg-gradient-to-r from-dark-light to-dark-lighter rounded-2xl p-8 border border-gray-700"
          >
            <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">Our Learning Philosophy</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Brain className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Think Critically</h3>
                <p className="text-gray-300">Develop analytical thinking and problem-solving skills</p>
              </div>
              <div className="text-center">
                <Code className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Code Creatively</h3>
                <p className="text-gray-300">Build real projects and express creativity through technology</p>
              </div>
              <div className="text-center">
                <Target className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Apply Knowledge</h3>
                <p className="text-gray-300">Use skills to solve real-world problems and challenges</p>
              </div>
            </div>
          </motion.div>

          {/* Learning Paths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center text-indigo-400 mb-12">Learning Paths</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {learningPaths.map((path, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-dark-light rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-full ${path.color} mr-4`}>
                      <path.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{path.level}</h3>
                  </div>
                  <p className="text-gray-300 mb-4">{path.description}</p>
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{path.duration}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-indigo-400 mb-2">Recommended Courses:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {path.courses.map((course, courseIndex) => (
                        <li key={courseIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></div>
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-indigo-100 mb-6">
              Join thousands of students who have transformed their futures with GiiT
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore Our Courses
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Detailed Curriculum Modal */}
      {showDetailedCurriculum && selectedCourseId && (
        <DetailedCurriculum
          courseId={selectedCourseId}
          onClose={closeDetailedCurriculum}
        />
      )}
    </div>
  );
};

export default Curriculum;
