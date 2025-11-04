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
            <div className="space-y-8">
              <div className="text-center mb-16">
                <div className="flex justify-center mb-6">
                  <FloatingLogo size="large" showText={false} showTypewriter={false} />
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold mb-6 gradient-text flex items-center justify-center gap-2">
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

                <div className="text-3xl lg:text-4xl font-semibold mb-8 text-gray-200 flex items-center justify-center gap-2">
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
                    }}
                  />
                </div>

                <p className="text-gray-400 max-w-3xl mx-auto text-xl leading-relaxed mb-12">
                  Transform your passion into expertise with our cutting-edge technology courses and personalized learning paths.
                  Join us on a journey of innovation and excellence in technology education.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/services" className="btn-primary inline-block">
                  Explore Our Courses
                </Link>

                <button
                  onClick={() => setShowRegistrationModal(true)}
                  className="btn-outline"
                >
                  Get Started
                </button>
              </div>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {classFormats.map((format, index) => (
                  <div
                    key={index}
                    className="card p-6 backdrop-blur-sm relative overflow-hidden group"
                  >
                    <div className="text-indigo-400 mb-4 flex justify-center">
                      {format.icon}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-100 mb-2">
                      {format.title}
                    </h3>

                    <p className="text-gray-400">
                      {format.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold gradient-text mb-4">
                Why Choose GiiT?
              </h2>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                Experience world-class technology education with our innovative approach to learning
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <AnimatedSection key={index}>
                  <div className="card p-6 backdrop-blur-sm relative overflow-hidden group">
                    <div className="text-indigo-400 mb-4 relative z-10">
                      {feature.icon}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-100 mb-2 relative z-10">
                      {feature.title}
                    </h3>

                    <p className="text-gray-400 relative z-10">
                      {feature.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Student Showcase */}
        <section className="py-20">
          <StudentImageScroll direction="left" speed={50} />
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="card p-8 backdrop-blur-sm relative overflow-hidden group">
              <div className="flex justify-center mb-4 relative z-10">
                <Users className="h-12 w-12 text-indigo-400" />
              </div>

              <div className="text-4xl font-bold gradient-text mb-2 relative z-10">
                50+
              </div>

              <div className="text-gray-400 relative z-10">
                Students Trained
              </div>
            </div>
          </div>
        </section>

        {/* Registration Modal */}
        {showRegistrationModal && (
          <RegistrationModal
            isOpen={showRegistrationModal}
            onClose={() => setShowRegistrationModal(false)}
            courseTitle="GiiT Program"
            price={{ ugx: 400000, usd: 100 }}
            courses={['Web Development', 'AI & Machine Learning', 'Mobile Development']}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
