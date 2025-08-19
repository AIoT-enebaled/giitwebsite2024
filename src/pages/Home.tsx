import { Code, Brain, Layout, BookOpen, Users, Trophy, Monitor, UserPlus, Group, Globe } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import NeuralNetwork from '../components/NeuralNetwork';
import FloatingLogo from '../components/FloatingLogo';
import StudentImageScroll from '../components/StudentImageScroll';
import RegistrationModal from '../components/RegistrationModal';
import ElegantAnimatedBackground from '../components/CrazyAnimatedBackground';
import { useState } from 'react';

const Home = () => {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: 'Coding Excellence',
      description: 'Learn programming from industry experts',
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'AI & Innovation',
      description: 'Explore cutting-edge AI technologies',
    },
    {
      icon: <Layout className="h-8 w-8" />,
      title: 'Web Design',
      description: 'Create responsive and modern websites',
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Comprehensive Learning',
      description: 'From basics to advanced concepts',
    },
  ];

  const classFormats = [
    {
      icon: <Globe className="h-12 w-12" />,
      title: 'Remote Classes',
      description: 'Learn from anywhere in the world with our interactive online sessions',
    },
    {
      icon: <UserPlus className="h-12 w-12" />,
      title: 'One-on-One',
      description: 'Personalized attention and customized learning pace',
    },
    {
      icon: <Monitor className="h-12 w-12" />,
      title: 'Physical Classes',
      description: 'Traditional classroom experience with hands-on learning',
    },
    {
      icon: <Group className="h-12 w-12" />,
      title: 'Group Classes',
      description: 'Collaborative learning environment with peer interaction',
    },
  ];

  return (
    <div className="relative">
      <NeuralNetwork />
      <ElegantAnimatedBackground />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/50 to-dark" />
          </div>

          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut"
              }}
              className="space-y-8"
            >
              <div className="text-center mb-16">
                <div className="flex justify-center mb-6">
                  <FloatingLogo size="large" showText={false} showTypewriter={false} />
                </div>

                <h1
                  className="text-5xl lg:text-6xl font-bold mb-6 gradient-text flex items-center justify-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span>Welcome to</span>
                  <Typewriter
                    options={{
                      strings: ['Genius Institute of IT', 'the Future of Learning', 'Innovation Hub', 'Tech Excellence'],
                      autoStart: true,
                      loop: true,
                      wrapperClassName: "gradient-text",
                      cursorClassName: "text-indigo-400",
                      delay: 75,
                      deleteSpeed: 30,
                    }}
                  />
                </h1>

                <div
                  className="text-3xl lg:text-4xl font-semibold mb-8 text-gray-200 flex items-center justify-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Typewriter
                    options={{
                      strings: [
                        'Learn. Grow. Succeed.',
                        'Discover Your Potential',
                        'Shape Your Future',
                        'Master Technology'
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 100,
                      deleteSpeed: 30,
                      pauseFor: 3000,
                    } as any}
                  />
                </div>

                <p
                  className="text-gray-400 max-w-3xl mx-auto text-xl leading-relaxed mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Transform your passion into expertise with our cutting-edge technology courses and personalized learning paths.
                  Join us on a journey of innovation and excellence in technology education.
                </p>
              </div>

              <div
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/services" className="btn-primary inline-block">
                    Explore Our Courses
                  </Link>
                </div>

                <button
                  onClick={() => setShowRegistrationModal(true)}
                  className="btn-outline"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </button>
              </div>
            </div>

            <div
              initial={{ opacity: 0, y: 50, rotateX: 30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeOut", type: "spring" }}
              className="mt-16"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {classFormats.map((format, index) => (
                  <div
                    key={index}
                    className="card p-6 backdrop-blur-sm relative overflow-hidden group"
                    initial={{
                      opacity: 0,
                      y: 100,
                      rotate: Math.random() * 20 - 10,
                      scale: 0.8
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      rotate: 0,
                      scale: 1,
                    }}
                    transition={{
                      duration: 1,
                      delay: index * 0.2 + 1,
                      type: "spring",
                      bounce: 0.5
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, 5, -5, 0],
                      y: -10,
                      boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)",
                      transition: { duration: 0.5 }
                    }}
                    whileTap={{
                      scale: 0.95,
                      rotate: 10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {/* Crazy background effects */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100"
                      animate={{
                        background: [
                          "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))",
                          "linear-gradient(225deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))",
                          "linear-gradient(315deg, rgba(34, 197, 94, 0.1), rgba(251, 191, 36, 0.1))",
                          "linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))",
                        ]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />

                    <div
                      className="text-indigo-400 mb-4 flex justify-center relative z-10"
                      animate={{
                        y: [0, -5, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                      whileHover={{
                        rotate: 360,
                        scale: 1.3,
                        color: "#ec4899",
                        transition: { duration: 0.8 }
                      }}
                    >
                      {format.icon}
                    </div>

                    <h3
                      className="text-xl font-semibold text-gray-100 mb-2 relative z-10"
                      animate={{
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      }}
                      whileHover={{
                        scale: 1.05,
                        color: "#a855f7",
                        transition: { duration: 0.3 }
                      }}
                    >
                      {format.title}
                    </h3>

                    <p
                      className="text-gray-400 relative z-10"
                      animate={{
                        y: [0, 2, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.4
                      }}
                    >
                      {format.description}
                    </p>

                    {/* Floating particles on hover */}
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100"
                        style={{
                          top: `${20 + i * 20}%`,
                          right: `${10 + i * 10}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold gradient-text mb-4">Why Choose GIIT?</h2>
                <p className="text-indigo-200/80 max-w-2xl mx-auto text-lg">
                  We offer cutting-edge technology education with a focus on practical skills and industry relevance.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <AnimatedSection key={index} delay={index * 0.2}>
                  <div
                    className="card p-6 backdrop-blur-sm relative overflow-hidden group"
                    initial={{
                      opacity: 0,
                      scale: 0.5,
                      rotate: 180,
                      y: 100
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      y: 0
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.2,
                      delay: index * 0.3,
                      type: "spring",
                      bounce: 0.6
                    }}
                    whileHover={{
                      scale: 1.15,
                      rotate: [0, 5, -5, 0],
                      y: -15,
                      boxShadow: "0 25px 50px rgba(99, 102, 241, 0.4)",
                      transition: { duration: 0.6 }
                    }}
                    whileTap={{
                      scale: 0.9,
                      rotate: 15,
                      transition: { duration: 0.2 }
                    }}
                    animate={{
                      y: [0, Math.sin(index) * 5, 0],
                    }}
                    transition={{
                      y: {
                        duration: 4 + index,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    {/* Crazy morphing background */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      animate={{
                        background: [
                          "radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)",
                          "radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)",
                          "radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)",
                          "radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)",
                        ]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />

                    <div
                      className="text-indigo-400 mb-4 relative z-10"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }
                      }}
                      whileHover={{
                        rotate: 720,
                        scale: 1.5,
                        color: "#ec4899",
                        filter: "drop-shadow(0 0 20px rgba(236, 72, 153, 0.8))",
                        transition: { duration: 1 }
                      }}
                    >
                      {feature.icon}
                    </div>

                    <h3
                      className="text-xl font-semibold text-gray-100 mb-2 relative z-10"
                      animate={{
                        color: [
                          "#f3f4f6",
                          "#a855f7",
                          "#3b82f6",
                          "#f3f4f6"
                        ],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.8
                      }}
                      whileHover={{
                        scale: 1.1,
                        textShadow: "0 0 20px rgba(168, 85, 247, 0.8)",
                        transition: { duration: 0.3 }
                      }}
                    >
                      {feature.title}
                    </h3>

                    <p
                      className="text-gray-400 relative z-10"
                      animate={{
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.6
                      }}
                    >
                      {feature.description}
                    </p>

                    {/* Orbiting particles */}
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100"
                        style={{
                          top: "50%",
                          left: "50%",
                        }}
                        animate={{
                          x: Math.cos(i * Math.PI / 2) * 40,
                          y: Math.sin(i * Math.PI / 2) * 40,
                          rotate: [0, 360],
                          scale: [0, 1.5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}

                    {/* Lightning effect on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                      animate={{
                        background: [
                          "linear-gradient(45deg, transparent 48%, rgba(99, 102, 241, 0.8) 49%, rgba(99, 102, 241, 0.8) 51%, transparent 52%)",
                          "linear-gradient(45deg, transparent 48%, rgba(236, 72, 153, 0.8) 49%, rgba(236, 72, 153, 0.8) 51%, transparent 52%)",
                          "linear-gradient(45deg, transparent 48%, rgba(99, 102, 241, 0.8) 49%, rgba(99, 102, 241, 0.8) 51%, transparent 52%)",
                        ]
                      }}
                      transition={{
                        duration: 0.3,
                        repeat: 3,
                        repeatType: "reverse"
                      }}
                    />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Student Images Scrolling */}
        <section className="py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold gradient-text mb-4">Our Amazing Students</h2>
                <p className="text-indigo-200/80 max-w-2xl mx-auto text-lg">
                  Meet Kayden, Kylie, and our other bright minds shaping the future of technology
                </p>
              </div>
            </AnimatedSection>

            {/* First row - scrolling left */}
            <StudentImageScroll direction="left" speed={60} />

            {/* Second row - scrolling right */}
            <div className="mt-4">
              <StudentImageScroll direction="right" speed={70} />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Explosive background effects */}
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                background: `radial-gradient(circle, ${
                  i % 3 === 0 ? 'rgba(99, 102, 241, 0.1)' :
                  i % 3 === 1 ? 'rgba(236, 72, 153, 0.1)' :
                  'rgba(34, 197, 94, 0.1)'
                } 0%, transparent 70%)`,
                width: Math.random() * 200 + 100,
                height: Math.random() * 200 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
              }}
              transition={{
                duration: Math.random() * 8 + 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedSection>
                <div
                  className="card p-8 text-center backdrop-blur-sm relative overflow-hidden group"
                  initial={{
                    opacity: 0,
                    scale: 0.3,
                    rotate: -45,
                    y: 100
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    y: 0
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.5,
                    type: "spring",
                    bounce: 0.8
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, 10, -10, 0],
                    y: -20,
                    boxShadow: "0 30px 60px rgba(99, 102, 241, 0.5)",
                    transition: { duration: 0.8 }
                  }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  {/* Explosive burst effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    animate={{
                      background: [
                        "radial-gradient(circle at center, rgba(99, 102, 241, 0.3) 0%, transparent 70%)",
                        "radial-gradient(circle at center, rgba(236, 72, 153, 0.3) 0%, transparent 70%)",
                        "radial-gradient(circle at center, rgba(34, 197, 94, 0.3) 0%, transparent 70%)",
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  <div
                    className="flex justify-center mb-4 relative z-10"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                    whileHover={{
                      rotate: 720,
                      scale: 1.5,
                      color: "#ec4899",
                      filter: "drop-shadow(0 0 30px rgba(99, 102, 241, 0.8))",
                      transition: { duration: 1 }
                    }}
                  >
                    <Users className="h-12 w-12 text-indigo-400" />
                  </div>

                  <div
                    className="text-4xl font-bold gradient-text mb-2 relative z-10"
                    animate={{
                      scale: [1, 1.1, 1],
                      textShadow: [
                        "0 0 0px rgba(99, 102, 241, 0)",
                        "0 0 30px rgba(99, 102, 241, 0.8)",
                        "0 0 0px rgba(99, 102, 241, 0)"
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    whileHover={{
                      scale: 1.3,
                      color: "#ec4899",
                      transition: { duration: 0.3 }
                    }}
                  >
                    50+
                  </div>

                  <div
                    className="text-gray-400 relative z-10"
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Students Trained
                  </div>

                  {/* Confetti particles */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full opacity-0 group-hover:opacity-100"
                      style={{
                        background: i % 2 === 0 ? "#60a5fa" : "#ec4899",
                        top: "50%",
                        left: "50%",
                      }}
                      animate={{
                        x: Math.cos(i * Math.PI / 4) * 80,
                        y: Math.sin(i * Math.PI / 4) * 80,
                        rotate: [0, 360],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div
                  className="card p-8 text-center backdrop-blur-sm relative overflow-hidden group"
                  initial={{
                    opacity: 0,
                    scale: 0.3,
                    rotate: 45,
                    y: 100
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    y: 0
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.5,
                    delay: 0.3,
                    type: "spring",
                    bounce: 0.8
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -10, 10, 0],
                    y: -20,
                    boxShadow: "0 30px 60px rgba(34, 197, 94, 0.5)",
                    transition: { duration: 0.8 }
                  }}
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
                  }}
                >
                  <div
                    className="flex justify-center mb-4 relative z-10"
                    animate={{
                      rotate: [0, -360],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }
                    }}
                    whileHover={{
                      rotate: -720,
                      scale: 1.5,
                      color: "#10b981",
                      filter: "drop-shadow(0 0 30px rgba(34, 197, 94, 0.8))",
                      transition: { duration: 1 }
                    }}
                  >
                    <BookOpen className="h-12 w-12 text-indigo-400" />
                  </div>

                  <div
                    className="text-4xl font-bold gradient-text mb-2 relative z-10"
                    animate={{
                      scale: [1, 1.1, 1],
                      color: [
                        "#6366f1",
                        "#10b981",
                        "#f59e0b",
                        "#6366f1"
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  >
                    5+
                  </div>

                  <div className="text-gray-400 relative z-10">Expert Instructors</div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <div
                  className="card p-8 text-center backdrop-blur-sm relative overflow-hidden group"
                  initial={{
                    opacity: 0,
                    scale: 0.3,
                    rotate: -90,
                    y: 100
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    y: 0
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.5,
                    delay: 0.6,
                    type: "spring",
                    bounce: 0.8
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, 15, -15, 0],
                    y: -20,
                    boxShadow: "0 30px 60px rgba(251, 191, 36, 0.5)",
                    transition: { duration: 0.8 }
                  }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }
                  }}
                >
                  <div
                    className="flex justify-center mb-4 relative z-10"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.4, 1],
                    }}
                    transition={{
                      rotate: { duration: 5, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }
                    }}
                    whileHover={{
                      rotate: 1080,
                      scale: 1.6,
                      color: "#f59e0b",
                      filter: "drop-shadow(0 0 30px rgba(251, 191, 36, 0.8))",
                      transition: { duration: 1.2 }
                    }}
                  >
                    <Trophy className="h-12 w-12 text-indigo-400" />
                  </div>

                  <div
                    className="text-4xl font-bold gradient-text mb-2 relative z-10"
                    animate={{
                      scale: [1, 1.2, 1],
                      color: [
                        "#6366f1",
                        "#f59e0b",
                        "#ec4899",
                        "#6366f1"
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    95%
                  </div>

                  <div className="text-gray-400 relative z-10">Success Rate</div>

                  {/* Victory sparkles */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute opacity-0 group-hover:opacity-100"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        scale: [0, 1.5, 0],
                        rotate: [0, 360],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                    >
                      ⭐
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </div>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        courseTitle="General Course Registration"
        price={{ ugx: 400000, usd: 100 }}
        courses={["General Technology Course"]}
      />
    </div>
  );
};

export default Home;
