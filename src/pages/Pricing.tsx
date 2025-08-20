import React, { useState } from 'react';
import {
  CreditCard,
  Check,
  Star,
  Users,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Info,
  X,
  Clock,
  Award,
  Target,
  BookOpen,
  Smartphone
} from 'lucide-react';
import FloatingLogo from '../components/FloatingLogo';
import TypewriterEffect from '../components/TypewriterEffect';
import NeuralNetwork from '../components/NeuralNetwork';
import PaymentMethodsModal from '../components/PaymentMethodsModal';
import ElegantAnimatedBackground from '../components/CrazyAnimatedBackground';

interface PricingTier {
  id: string;
  name: string;
  price: {
    ugx: number;
    label: string;
  };
  duration: string;
  popular?: boolean;
  description: string;
  features: string[];
  benefits: string[];
  ageRange: string;
  courseContent: string[];
  learningOutcomes: string[];
  professionalSkills?: string[];
  careerPreparation?: string[];
}

const Pricing = () => {
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const pricingTiers: PricingTier[] = [
    {
      id: 'monthly-subscription',
      name: 'Monthly Subscription',
      price: { ugx: 400000, label: 'UGX 400,000/month' },
      duration: 'Monthly',
      popular: true,
      description: 'Perfect for busy families who want continuous learning',
      ageRange: 'All Ages',
      features: [
        'Access to ALL courses',
        'Unlimited learning for all children',
        'No long-term commitment',
        'Cancel anytime',
        'Best value for families with multiple children'
      ],
      benefits: [
        'Unlimited course access for all your children',
        'Flexibility to explore different technologies',
        'Continuous skill building without interruption',
        'Family-friendly pricing structure'
      ],
      courseContent: [
        'All available courses and modules',
        'Live instructor sessions',
        'Project-based learning',
        'Peer collaboration opportunities'
      ],
      learningOutcomes: [
        'Continuous skill development',
        'Technology literacy across multiple domains',
        'Confidence in digital tools and programming',
        'Strong foundation for advanced learning'
      ]
    },
    {
      id: 'mini-courses',
      name: 'Mini Courses - Foundation Level',
      price: { ugx: 400000, label: 'UGX 400,000' },
      duration: '2 months',
      description: 'Perfect for students new to programming and families wanting to test interest levels',
      ageRange: 'Ages 5-18',
      features: [
        'Scratch Programming Fundamentals',
        'Basic Computer Literacy',
        'Introduction to Problem-Solving',
        'Creative Technology Projects',
        'Portfolio of 3-5 completed projects'
      ],
      benefits: [
        'Solid foundation in computational thinking',
        'Confidence using technology for creative expression',
        'Understanding of basic programming concepts',
        'Age-appropriate learning adaptations'
      ],
      courseContent: [
        'Visual programming for logical thinking',
        'Essential digital skills and safety',
        'Critical thinking through puzzles and games',
        'Art meets technology for engaging learning'
      ],
      learningOutcomes: [
        'Basic programming concepts mastery',
        'Creative project completion',
        'Digital literacy skills',
        'Problem-solving abilities'
      ]
    },
    {
      id: 'comprehensive-courses',
      name: 'Comprehensive Courses - Intermediate',
      price: { ugx: 1500000, label: 'UGX 1,500,000' },
      duration: '3 months',
      description: 'Perfect for students ready for serious programming study and substantial skill development',
      ageRange: 'Ages 9-18',
      features: [
        'Python Programming Mastery',
        'Web Development (HTML/CSS/JavaScript)',
        'Database Fundamentals',
        'Introduction to Artificial Intelligence',
        'Project Management and Version Control',
        'Mobile App Development Basics'
      ],
      benefits: [
        'Proficiency in multiple programming languages',
        'Ability to create functional web applications',
        'Understanding of software development lifecycle',
        'Portfolio of 8-12 substantial projects'
      ],
      courseContent: [
        'Professional programming language fundamentals',
        'Creating interactive websites',
        'Data storage and retrieval concepts',
        'AI concepts and practical applications',
        'Professional development practices',
        'Creating applications for smartphones'
      ],
      learningOutcomes: [
        'Multi-language programming proficiency',
        'Web application development skills',
        'Professional development practices',
        'Technology career preparation'
      ],
      professionalSkills: [
        'Problem-solving methodologies',
        'Collaborative development through team projects',
        'Technical communication through presentations',
        'Critical thinking for complex system design'
      ]
    },
    {
      id: 'full-courses',
      name: 'Full Courses - Advanced Mastery',
      price: { ugx: 3500000, label: 'UGX 3,500,000' },
      duration: '6 months',
      description: 'Perfect for students committed to technology career preparation and university CS program prep',
      ageRange: 'Ages 13-18',
      features: [
        'Advanced Python and Data Science',
        'Full-Stack Web Development',
        'Mobile App Development',
        'AI and Machine Learning',
        'Robotics and IoT Programming',
        'Cybersecurity Fundamentals',
        'Software Engineering Practices',
        'Entrepreneurship in Technology'
      ],
      benefits: [
        'Professional-level programming skills',
        'Industry-ready portfolio with 15-20 projects',
        'Competitive programming abilities',
        'Preparation for technology internships',
        'Foundation for technology entrepreneurship'
      ],
      courseContent: [
        'Machine learning, data analysis, automation',
        'Professional web application creation',
        'iOS and Android application development',
        'Practical AI application development',
        'Hardware programming and automation',
        'Digital security and ethical hacking basics',
        'Professional development methodologies',
        'Building and launching tech startups'
      ],
      learningOutcomes: [
        'Professional-level multi-platform programming',
        'Industry-ready project portfolio',
        'Competitive programming readiness',
        'University admission preparation',
        'Technology entrepreneurship foundation'
      ],
      careerPreparation: [
        'University application portfolio development',
        'Professional networking through mentorship',
        'Internship placement assistance',
        'International coding olympiad preparation'
      ]
    }
  ];

  const handleViewDetails = (tier: PricingTier) => {
    setSelectedTier(tier);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedTier(null);
  };

  const handleContactForEnrollment = () => {
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-UG').format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-dark-light relative">
      <NeuralNetwork />
      <ElegantAnimatedBackground />
      
      <div className="relative pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <FloatingLogo size="large" showText={true} showTypewriter={false} className="justify-center mb-8" />
            <div className="typewriter-container min-h-[120px] flex items-center justify-center mb-6">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center">
                <TypewriterEffect
                  texts={[
                    'Flexible Investment Plans',
                    'Quality Education for All',
                    'Your Future Starts Here',
                    'Technology Excellence'
                  ]}
                  speed={80}
                  delay={4000}
                  className="typewriter-text"
                />
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              At GiiT, we believe quality computer science education should be accessible to every Ugandan family. 
              Choose the investment plan that works best for your family's needs and budget.
            </p>
          </div>

          {/* Special Offers Banner */}
          <div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="h-6 w-6 text-yellow-400" />
              <h3 className="text-2xl font-bold text-white">Special Family Offer</h3>
              <Star className="h-6 w-6 text-yellow-400" />
            </div>
            <p className="text-xl text-indigo-100 mb-4">
              🎉 <strong>Monthly Subscription:</strong> Same price for unlimited children!
              Perfect for families with multiple tech-interested kids.
            </p>
            <div className="flex items-center justify-center gap-4 text-indigo-100">
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span className="text-sm">Free Trial Classes Available</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                <span className="text-sm">Referral Rewards Program</span>
              </div>
            </div>
          </div>

          {/* Long-Term Partnership Discount */}
          <div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="h-8 w-8 text-green-200" />
              <h3 className="text-3xl font-bold text-white">Long-Term Partnership Discount</h3>
              <Users className="h-8 w-8 text-green-200" />
            </div>
            <p className="text-xl text-green-100 mb-6">
              For families committed to comprehensive technology education
            </p>

            <div className="bg-white/10 rounded-xl p-6 mb-6">
              <h4 className="text-2xl font-bold text-white mb-4">Families with 3+ Children (Long-term)</h4>
              <div className="text-4xl font-bold text-yellow-300 mb-2">UGX 250,000</div>
              <p className="text-green-200 text-lg">per child per course</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/10 rounded-lg p-4">
                <h5 className="text-lg font-semibold text-white mb-3">Example: Family with 3 Children (Long-term)</h5>
                <ul className="space-y-2 text-green-100">
                  <li>• <strong>Cost per course cycle (2 months):</strong> UGX 750,000 total</li>
                  <li>• <strong>Per child investment:</strong> UGX 250,000 each</li>
                  <li>• <strong>You save:</strong> UGX 450,000 compared to individual pricing</li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h5 className="text-lg font-semibold text-white mb-3">Benefits of Long-term Partnership</h5>
                <ul className="space-y-2 text-green-100">
                  <li>• <strong>Significant savings</strong> compared to individual pricing</li>
                  <li>• <strong>Priority enrollment</strong> for all children</li>
                  <li>• <strong>Dedicated family support</strong> from our team</li>
                  <li>• <strong>Flexible scheduling</strong> to accommodate multiple children</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-500/20 rounded-lg">
              <p className="text-yellow-200 font-semibold">
                💡 <strong>Contact us to discuss your family's long-term technology education plan!</strong>
              </p>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {pricingTiers.map((tier, index) => (
              <div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={`relative bg-dark-light rounded-2xl p-6 border hover:border-indigo-400 transition-all duration-300 ${
                  tier.popular ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-gray-700'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-indigo-400">
                      {tier.price.label}
                    </span>
                    <div className="text-gray-400 text-sm">{tier.duration}</div>
                  </div>
                  <p className="text-gray-300 text-sm">{tier.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  {tier.features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                  {tier.features.length > 4 && (
                    <div className="text-indigo-400 text-sm">
                      +{tier.features.length - 4} more features...
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handleViewDetails(tier)}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Info className="h-4 w-4" />
                    View Details
                  </button>
                  <button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleContactForEnrollment}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                      tier.popular
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    Contact for Enrollment
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Methods */}
          <div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-dark-light rounded-2xl p-8 border border-gray-700 mb-16"
          >
            <h2 className="text-3xl font-bold text-center text-indigo-400 mb-8">Payment Methods & Contact</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-green-500" />
                  Mobile Money Options
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-400 mb-2">MTN Mobile Money</h4>
                    <p className="text-gray-300">Number: +256791418501</p>
                    <p className="text-gray-400 text-sm">Quick and secure payments 24/7</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-400 mb-2">Airtel Money</h4>
                    <p className="text-gray-300">Merchant Code: 6708507</p>
                    <p className="text-gray-300">Direct Number: +256752067815</p>
                    <p className="text-gray-400 text-sm">Dual options for maximum flexibility</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-indigo-500" />
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-indigo-400" />
                    <span className="text-gray-300">+256752-067-815</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-indigo-400" />
                    <span className="text-gray-300">geniusinstitute2024@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-indigo-400" />
                    <span className="text-gray-300">Kampala, Uganda</span>
                  </div>
                  <div className="mt-4 p-4 bg-indigo-900/30 rounded-lg">
                    <h4 className="font-semibold text-indigo-400 mb-2">Office Hours</h4>
                    <p className="text-gray-300 text-sm">Monday-Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-300 text-sm">Saturday: 9:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROI Section */}
          <div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-2xl p-8 border border-indigo-500/20"
          >
            <h2 className="text-3xl font-bold text-indigo-400 mb-6">Investment in Uganda's Future</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Target className="h-12 w-12 text-green-400 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-white mb-2">Junior Developer</h3>
                <p className="text-green-400 text-lg font-bold">UGX 1,800,000+ annually</p>
              </div>
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-white mb-2">Senior Developer</h3>
                <p className="text-blue-400 text-lg font-bold">UGX 4,000,000+ annually</p>
              </div>
              <div className="text-center">
                <Award className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-white mb-2">Tech Lead</h3>
                <p className="text-purple-400 text-lg font-bold">UGX 8,000,000+ annually</p>
              </div>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
              Your investment in GiiT education pays for itself within months of your child's first tech job. 
              <strong className="text-indigo-400"> We're not just teaching coding—we're building Uganda's next generation of technology leaders.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && selectedTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-dark-light rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-indigo-400 mb-2">{selectedTier.name}</h2>
                <p className="text-xl text-gray-300">{selectedTier.price.label} - {selectedTier.duration}</p>
              </div>
              <button
                onClick={closeDetails}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Course Content</h3>
                  <ul className="space-y-2">
                    {selectedTier.courseContent.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Learning Outcomes</h3>
                  <ul className="space-y-2">
                    {selectedTier.learningOutcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Award className="h-4 w-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Key Benefits</h3>
                  <ul className="space-y-2">
                    {selectedTier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Star className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedTier.professionalSkills && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Professional Skills</h3>
                    <ul className="space-y-2">
                      {selectedTier.professionalSkills.map((skill, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Target className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedTier.careerPreparation && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Career Preparation</h3>
                    <ul className="space-y-2">
                      {selectedTier.careerPreparation.map((prep, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <BookOpen className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{prep}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleContactForEnrollment}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-8 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
              >
                Contact Us for Enrollment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Methods Modal */}
      <PaymentMethodsModal
        isOpen={showPaymentModal}
        onClose={closePaymentModal}
      />
    </div>
  );
};

export default Pricing;
