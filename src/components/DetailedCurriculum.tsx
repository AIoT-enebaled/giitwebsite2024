import React, { useState } from 'react';
import { Download, X, Code, BarChart3, Brain, Zap, Clock, Users, Award, Target } from 'lucide-react';
import { courseCatalogs } from '../data/courseDetails';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface DetailedCurriculumProps {
  courseId: string;
  onClose: () => void;
}

const DetailedCurriculum: React.FC<DetailedCurriculumProps> = ({ courseId, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const course = courseCatalogs.find(c => c.id === courseId);

  if (!course) return null;

  // Generate curriculum data based on course type
  const getCurriculumData = () => {
    if (course.courseType === 'Full') {
      return {
        duration: '18 weeks',
        learningHours: '200+ Learning Hours',
        phases: [
          {
            title: 'Phase 1: Fundamentals & Programming Foundations',
            weeks: 'Weeks 1-6',
            modules: [
              {
                week: 'Week 1-2',
                keyTopics: [
                  'Variables, data types, and operators',
                  'Control flow (if, else, for, while)',
                  'Functions and reusable modules',
                  'Basic input/output operations'
                ],
                project: course.title.includes('Python') ? 'Personal Expense Tracker - Build a command-line tool to log and analyze expenses' : 
                         course.title.includes('Web') ? 'Personal Portfolio Website - Create your professional online presence' :
                         course.title.includes('AI') ? 'AI Concept Explorer - Interactive learning application' :
                         'Mobile App Prototype - Basic functionality implementation',
                resources: [
                  course.title.includes('Python') ? 'Automate the Boring Stuff with Python' : 
                  course.title.includes('Web') ? 'MDN Web Development Documentation' :
                  course.title.includes('AI') ? 'MIT AI Course Materials' :
                  'Mobile Development Best Practices',
                  'Interactive coding exercises and tutorials'
                ]
              },
              {
                week: 'Week 3-4',
                keyTopics: [
                  'Data structures (lists, dictionaries, arrays)',
                  'Advanced control structures and algorithms',
                  'Error handling and debugging techniques',
                  'Code organization and best practices'
                ],
                project: course.title.includes('Python') ? 'Data Analysis Tool - Process and visualize datasets' :
                         course.title.includes('Web') ? 'Interactive Web Components - Dynamic user interfaces' :
                         course.title.includes('AI') ? 'Basic ML Algorithm Implementation' :
                         'Advanced Mobile Features Integration',
                resources: [
                  'Advanced programming concepts documentation',
                  'Code review guidelines and examples'
                ]
              },
              {
                week: 'Week 5-6',
                keyTopics: [
                  'Object-oriented programming principles',
                  'File handling and data persistence',
                  'API integration basics',
                  'Testing and quality assurance'
                ],
                project: course.title.includes('Python') ? 'Web Scraper Application - Automated data collection tool' :
                         course.title.includes('Web') ? 'Full-Stack Web Application - Frontend and backend integration' :
                         course.title.includes('AI') ? 'Neural Network from Scratch' :
                         'Cross-Platform Mobile Application',
                resources: [
                  'OOP design patterns',
                  'Testing frameworks and methodologies'
                ]
              }
            ]
          },
          {
            title: 'Phase 2: Advanced Development & Specialization',
            weeks: 'Weeks 7-12',
            modules: [
              {
                week: 'Week 7-9',
                keyTopics: [
                  'Advanced frameworks and libraries',
                  'Database design and integration',
                  'Authentication and security',
                  'Performance optimization'
                ],
                project: course.title.includes('Python') ? 'E-commerce Platform - Full-featured online store' :
                         course.title.includes('Web') ? 'Progressive Web Application - Modern web app with offline capabilities' :
                         course.title.includes('AI') ? 'Computer Vision Application - Image recognition system' :
                         'Enterprise Mobile Solution',
                resources: [
                  'Framework documentation and tutorials',
                  'Security best practices guide'
                ]
              },
              {
                week: 'Week 10-12',
                keyTopics: [
                  'Cloud deployment and DevOps',
                  'Microservices architecture',
                  'Real-time features and websockets',
                  'Monitoring and analytics'
                ],
                project: course.title.includes('Python') ? 'Real-time Analytics Dashboard' :
                         course.title.includes('Web') ? 'Social Media Platform Clone' :
                         course.title.includes('AI') ? 'Natural Language Processing System' :
                         'IoT Mobile Application',
                resources: [
                  'Cloud platform documentation',
                  'DevOps tools and practices'
                ]
              }
            ]
          },
          {
            title: 'Phase 3: Professional Development & Capstone',
            weeks: 'Weeks 13-18',
            modules: [
              {
                week: 'Week 13-15',
                keyTopics: [
                  'Advanced architecture patterns',
                  'Code review and collaboration',
                  'Open source contribution',
                  'Technical documentation'
                ],
                project: 'Open Source Contribution - Contribute to real-world projects',
                resources: [
                  'Open source contribution guidelines',
                  'Professional development resources'
                ]
              },
              {
                week: 'Week 16-18',
                keyTopics: [
                  'Capstone project development',
                  'Industry best practices',
                  'Portfolio optimization',
                  'Career preparation'
                ],
                project: 'Capstone Project - Industry-level application demonstrating mastery',
                resources: [
                  'Portfolio development guide',
                  'Interview preparation materials'
                ]
              }
            ]
          }
        ],
        careerPaths: [
          {
            title: course.title.includes('Python') ? 'Python Developer' : 
                   course.title.includes('Web') ? 'Full Stack Developer' :
                   course.title.includes('AI') ? 'AI Engineer' : 'Mobile Developer',
            description: course.title.includes('Python') ? 'Build applications and services using Python' :
                        course.title.includes('Web') ? 'Develop complete web applications' :
                        course.title.includes('AI') ? 'Develop AI and machine learning solutions' :
                        'Create mobile applications for multiple platforms',
            icon: Code,
            keySkills: course.title.includes('Python') ? ['Python', 'Django/Flask', 'APIs', 'Databases'] :
                      course.title.includes('Web') ? ['React/Vue', 'Node.js', 'Databases', 'DevOps'] :
                      course.title.includes('AI') ? ['TensorFlow', 'PyTorch', 'Deep Learning', 'NLP'] :
                      ['React Native', 'Flutter', 'iOS/Android', 'Cross-platform']
          },
          {
            title: course.title.includes('Python') ? 'Data Scientist' : 
                   course.title.includes('Web') ? 'Frontend Architect' :
                   course.title.includes('AI') ? 'ML Research Engineer' : 'Mobile Architect',
            description: course.title.includes('Python') ? 'Analyze data and build predictive models' :
                        course.title.includes('Web') ? 'Design and lead frontend development' :
                        course.title.includes('AI') ? 'Research and develop cutting-edge AI' :
                        'Design mobile application architecture',
            icon: BarChart3,
            keySkills: course.title.includes('Python') ? ['NumPy', 'Pandas', 'Machine Learning', 'Statistics'] :
                      course.title.includes('Web') ? ['Architecture', 'Performance', 'UI/UX', 'Leadership'] :
                      course.title.includes('AI') ? ['Research', 'Publications', 'Innovation', 'Mathematics'] :
                      ['System Design', 'Performance', 'Security', 'Leadership']
          },
          {
            title: course.title.includes('Python') ? 'AI Engineer' : 
                   course.title.includes('Web') ? 'DevOps Engineer' :
                   course.title.includes('AI') ? 'Computer Vision Specialist' : 'Mobile Product Manager',
            description: course.title.includes('Python') ? 'Develop AI and machine learning solutions' :
                        course.title.includes('Web') ? 'Manage deployment and infrastructure' :
                        course.title.includes('AI') ? 'Specialize in computer vision applications' :
                        'Lead mobile product development',
            icon: Brain,
            keySkills: course.title.includes('Python') ? ['TensorFlow', 'PyTorch', 'Deep Learning', 'NLP'] :
                      course.title.includes('Web') ? ['Docker', 'Kubernetes', 'CI/CD', 'Cloud'] :
                      course.title.includes('AI') ? ['OpenCV', 'Image Processing', 'CNN', 'Object Detection'] :
                      ['Product Strategy', 'User Research', 'Analytics', 'Leadership']
          },
          {
            title: course.title.includes('Python') ? 'Automation Specialist' : 
                   course.title.includes('Web') ? 'Technical Lead' :
                   course.title.includes('AI') ? 'AI Product Manager' : 'Mobile Security Specialist',
            description: course.title.includes('Python') ? 'Create automated solutions and workflows' :
                        course.title.includes('Web') ? 'Lead technical teams and projects' :
                        course.title.includes('AI') ? 'Manage AI product development' :
                        'Ensure mobile application security',
            icon: Zap,
            keySkills: course.title.includes('Python') ? ['Scripting', 'Web Scraping', 'Task Automation', 'Testing'] :
                      course.title.includes('Web') ? ['Leadership', 'Architecture', 'Mentoring', 'Strategy'] :
                      course.title.includes('AI') ? ['Product Management', 'AI Strategy', 'Market Analysis', 'Leadership'] :
                      ['Security Frameworks', 'Penetration Testing', 'Compliance', 'Risk Assessment']
          }
        ]
      };
    } else if (course.courseType === 'Comprehensive') {
      return {
        duration: '12 weeks',
        learningHours: '120+ Learning Hours',
        phases: [
          {
            title: 'Phase 1: Foundation & Core Concepts',
            weeks: 'Weeks 1-4',
            modules: [
              {
                week: 'Week 1-2',
                keyTopics: [
                  'Introduction to core concepts',
                  'Basic syntax and fundamentals',
                  'Development environment setup',
                  'First practical projects'
                ],
                project: 'Foundation Project - Apply basic concepts',
                resources: [
                  'Getting started guide',
                  'Practice exercises'
                ]
              },
              {
                week: 'Week 3-4',
                keyTopics: [
                  'Intermediate concepts and patterns',
                  'Problem-solving techniques',
                  'Code organization',
                  'Debugging and testing'
                ],
                project: 'Intermediate Application - Real-world problem solving',
                resources: [
                  'Best practices documentation',
                  'Code examples library'
                ]
              }
            ]
          },
          {
            title: 'Phase 2: Advanced Application & Integration',
            weeks: 'Weeks 5-8',
            modules: [
              {
                week: 'Week 5-6',
                keyTopics: [
                  'Advanced features and frameworks',
                  'Integration with external services',
                  'Performance optimization',
                  'Security considerations'
                ],
                project: 'Advanced Integration Project',
                resources: [
                  'Advanced tutorials',
                  'Integration guides'
                ]
              },
              {
                week: 'Week 7-8',
                keyTopics: [
                  'Professional development practices',
                  'Deployment and monitoring',
                  'Collaboration tools',
                  'Industry standards'
                ],
                project: 'Professional Application - Industry-standard project',
                resources: [
                  'Professional development resources',
                  'Industry case studies'
                ]
              }
            ]
          },
          {
            title: 'Phase 3: Mastery & Portfolio Development',
            weeks: 'Weeks 9-12',
            modules: [
              {
                week: 'Week 9-10',
                keyTopics: [
                  'Advanced problem solving',
                  'System design principles',
                  'Performance optimization',
                  'Code review practices'
                ],
                project: 'Complex System Implementation',
                resources: [
                  'System design resources',
                  'Performance optimization guides'
                ]
              },
              {
                week: 'Week 11-12',
                keyTopics: [
                  'Portfolio project development',
                  'Documentation and presentation',
                  'Career preparation',
                  'Continuous learning strategies'
                ],
                project: 'Portfolio Capstone - Comprehensive demonstration project',
                resources: [
                  'Portfolio development guide',
                  'Career transition resources'
                ]
              }
            ]
          }
        ],
        careerPaths: [
          {
            title: `Junior ${course.title.split(' ')[0]} Developer`,
            description: `Start your career in ${course.title.split(' ')[0].toLowerCase()} development`,
            icon: Code,
            keySkills: ['Core concepts', 'Basic frameworks', 'Problem solving', 'Team collaboration']
          },
          {
            title: `${course.title.split(' ')[0]} Specialist`,
            description: `Specialize in ${course.title.split(' ')[0].toLowerCase()} technologies`,
            icon: Target,
            keySkills: ['Advanced techniques', 'Best practices', 'Optimization', 'Mentoring']
          }
        ]
      };
    } else {
      return {
        duration: '8 weeks',
        learningHours: '60+ Learning Hours',
        phases: [
          {
            title: 'Phase 1: Introduction & Basics',
            weeks: 'Weeks 1-3',
            modules: [
              {
                week: 'Week 1',
                keyTopics: [
                  'Introduction to the technology',
                  'Basic concepts and terminology',
                  'Setting up development environment',
                  'First hands-on exercises'
                ],
                project: 'Hello World Project - First practical application',
                resources: [
                  'Beginner tutorial series',
                  'Setup and installation guides'
                ]
              },
              {
                week: 'Week 2-3',
                keyTopics: [
                  'Core features and functionality',
                  'Basic problem-solving patterns',
                  'Simple project development',
                  'Testing and debugging basics'
                ],
                project: 'Basic Application - Apply core concepts',
                resources: [
                  'Practice exercises',
                  'Code examples'
                ]
              }
            ]
          },
          {
            title: 'Phase 2: Application & Practice',
            weeks: 'Weeks 4-6',
            modules: [
              {
                week: 'Week 4-5',
                keyTopics: [
                  'Intermediate features',
                  'Integration techniques',
                  'Best practices',
                  'Common patterns'
                ],
                project: 'Practical Application - Real-world scenario',
                resources: [
                  'Best practices guide',
                  'Pattern library'
                ]
              },
              {
                week: 'Week 6',
                keyTopics: [
                  'Advanced basics',
                  'Optimization techniques',
                  'Professional practices',
                  'Next steps planning'
                ],
                project: 'Showcase Project - Portfolio piece',
                resources: [
                  'Advanced resources',
                  'Career guidance'
                ]
              }
            ]
          }
        ],
        careerPaths: [
          {
            title: `Entry-level ${course.title.split(' ')[0]} Role`,
            description: `Begin your journey in ${course.title.split(' ')[0].toLowerCase()}`,
            icon: Users,
            keySkills: ['Basic concepts', 'Foundational skills', 'Learning mindset', 'Growth potential']
          }
        ]
      };
    }
  };

  const curriculumData = getCurriculumData();

  const programTabs = [
    `${course.title} Program`,
    'Career Paths',
    'Resources & Support'
  ];

  const handleDownloadPDF = async () => {
    const element = document.getElementById('curriculum-content');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#1a1a2e',
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const scale = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const scaledWidth = imgWidth * scale;
      const scaledHeight = imgHeight * scale;
      
      const marginX = (pdfWidth - scaledWidth) / 2;
      const marginY = (pdfHeight - scaledHeight) / 2;

      pdf.addImage(imgData, 'PNG', marginX, marginY, scaledWidth, scaledHeight);
      pdf.save(`${course.title}_Curriculum.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto bg-gradient-to-b from-dark to-dark-light rounded-2xl overflow-hidden opacity-0 scale-95 animate-[fadeInScale_0.3s_ease-out_forwards]">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-b border-gray-700">
            {/* Program Tabs */}
            <div className="px-6 py-4">
              <div className="flex gap-2 mb-4">
                {programTabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === index
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                    }`}
                  >
                    {index === 0 && <Code className="inline h-4 w-4 mr-2" />}
                    {index === 1 && <Target className="inline h-4 w-4 mr-2" />}
                    {index === 2 && <Award className="inline h-4 w-4 mr-2" />}
                    {tab}
                  </button>
                ))}
              </div>
              
              {/* Course Header */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Code className="h-8 w-8 text-blue-400" />
                    <h1 className="text-3xl font-bold text-white">{course.title}</h1>
                  </div>
                  <p className="text-gray-300 text-lg mb-4">
                    Master {course.title} from Basics to Advanced {course.courseType === 'Full' ? 'Professional Level' : course.courseType === 'Comprehensive' ? 'Implementation' : 'Understanding'}
                  </p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
                      <Clock className="h-4 w-4 text-indigo-400" />
                      <span className="text-sm text-gray-300">Duration: {curriculumData.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
                      <Users className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-gray-300">{curriculumData.learningHours}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
                      <Award className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-gray-300">Beginner Friendly</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
                      <Target className="h-4 w-4 text-purple-400" />
                      <span className="text-sm text-gray-300">Career Ready</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div id="curriculum-content" className="p-6">
            {activeTab === 0 && (
              <div className="space-y-8">
                {curriculumData.phases.map((phase, phaseIndex) => (
                  <div key={phaseIndex} className="bg-dark-light rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center gap-3 mb-6">
                      <Code className="h-6 w-6 text-blue-400" />
                      <div>
                        <h2 className="text-2xl font-bold text-blue-400">{phase.title}</h2>
                        <p className="text-gray-400">{phase.weeks}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {phase.modules.map((module, moduleIndex) => (
                        <div key={moduleIndex} className="bg-gray-800/30 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-white mb-4">{module.week}</h3>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Key Topics:</h4>
                            <ul className="space-y-1">
                              {module.keyTopics.map((topic, topicIndex) => (
                                <li key={topicIndex} className="flex items-start gap-2 text-gray-300">
                                  <div className="w-1 h-1 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Project:</h4>
                            <p className="text-gray-300">{module.project}</p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Resources:</h4>
                            <ul className="space-y-1">
                              {module.resources.map((resource, resourceIndex) => (
                                <li key={resourceIndex} className="flex items-center gap-2 text-gray-300">
                                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                                  <span>{resource}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 1 && (
              <div>
                <h2 className="text-3xl font-bold text-blue-400 mb-8">Career Paths</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {curriculumData.careerPaths.map((career, index) => (
                    <div key={index} className="bg-dark-light rounded-xl p-6 border border-gray-700">
                      <div className="flex items-center gap-3 mb-4">
                        <career.icon className="h-8 w-8 text-blue-400" />
                        <div>
                          <h3 className="text-xl font-bold text-white">{career.title}</h3>
                          <p className="text-gray-400">{career.description}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Key Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {career.keySkills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div>
                <h2 className="text-3xl font-bold text-blue-400 mb-8">Resources & Support</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-dark-light rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4">Learning Resources</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Interactive coding exercises</li>
                      <li>• Video lectures and tutorials</li>
                      <li>• Real-world project templates</li>
                      <li>• Code review and feedback</li>
                      <li>• Community forums and discussions</li>
                    </ul>
                  </div>
                  
                  <div className="bg-dark-light rounded-xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4">Support System</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• 1-on-1 mentorship sessions</li>
                      <li>• Live Q&A sessions</li>
                      <li>• Career guidance and counseling</li>
                      <li>• Industry expert guest lectures</li>
                      <li>• Job placement assistance</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedCurriculum;
