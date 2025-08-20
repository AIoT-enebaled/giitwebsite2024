import React, { useState } from 'react';
import NeuralNetwork from '../components/NeuralNetwork';
import { Calendar, User, ArrowRight, Trophy, Award, X } from 'lucide-react';
import FloatingLogo from '../components/FloatingLogo';
import ElegantAnimatedBackground from '../components/CrazyAnimatedBackground';

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showFullPost, setShowFullPost] = useState(false);
  const blogPosts = [
    {
      title: '🏆 GiiT Triumphs at Uganda Website Projects Competition 2025! 🇺🇬💻',
      excerpt: "We're beyond excited to announce that GiiT has been crowned Junior Category Winner at the Uganda Website Projects Competition 2025! Our standout project, SkillBridge Uganda, beat strong competition from Olive School and Mbuya Parents Primary School.",
      image: 'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F2d31f64d07cb4378a8cd3f3dd7f45030?format=webp&width=800',
      date: '2025-06-20',
      author: 'Christopher Rwairare',
      category: 'Competition Win',
      featured: true,
      fullContent: `
        <div class="space-y-6">
          <p class="text-lg text-gray-300">We're beyond excited to announce that Genius Institute of Information Technology (GiiT) has been crowned Junior Category Winner at the Uganda Website Projects Competition 2025, held at the National ICT Innovation Hub in Nakawa! 🎉</p>

          <p class="text-gray-300">Our standout project, <strong class="text-indigo-400">SkillBridge Uganda</strong>, beat strong competition from Olive School and Mbuya Parents Primary School, proving that with creativity, teamwork, and the right mentorship, young Ugandans can solve real national challenges — and win big doing it! 🥇✨</p>

          <div class="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-6 rounded-xl border border-indigo-500/20">
            <h3 class="text-xl font-bold text-indigo-400 mb-3">🚀 About the Winning Project</h3>
            <p class="text-gray-300 mb-4">SkillBridge Uganda is a WordPress-powered platform that empowers youth with market-aligned vocational skills like tailoring, carpentry, and solar installation — and connects them to real job opportunities using:</p>
            <ul class="space-y-2 text-gray-300">
              <li class="flex items-center gap-2"><span class="text-green-400">✅</span> A smart job-matching engine</li>
              <li class="flex items-center gap-2"><span class="text-green-400">✅</span> USSD/SMS access for offline learners</li>
              <li class="flex items-center gap-2"><span class="text-green-400">✅</span> 360° virtual workshop tours</li>
              <li class="flex items-center gap-2"><span class="text-green-400">✅</span> Built-in microfinance referral hub</li>
            </ul>
          </div>

          <div class="bg-gray-800/50 p-6 rounded-xl">
            <h3 class="text-xl font-bold text-purple-400 mb-3">💡 Why This Matters</h3>
            <p class="text-gray-300">This win isn't just about trophies — it's about youth empowerment, digital innovation, and a brighter future for Uganda. We're proud to be shaping the next generation of tech leaders and changemakers.</p>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-gray-800/50 p-4 rounded-xl">
              <h4 class="font-semibold text-yellow-400 mb-2">📍 Venue</h4>
              <p class="text-gray-300">Uganda National ICT Innovation Hub – Nakawa</p>
            </div>
            <div class="bg-gray-800/50 p-4 rounded-xl">
              <h4 class="font-semibold text-blue-400 mb-2">📅 Date</h4>
              <p class="text-gray-300">June 20, 2025</p>
            </div>
          </div>

          <div class="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-6 rounded-xl border border-green-500/20">
            <h3 class="text-xl font-bold text-green-400 mb-3">🙏 Gratitude To:</h3>
            <ul class="space-y-2 text-gray-300">
              <li>• Our visionary student team - Kayden and Kylie</li>
              <li>• Mentors, trainers & GiiT facilitators</li>
              <li>• The organizing team at WordPress Uganda</li>
              <li>• Fellow competitors for their incredible spirit</li>
              <li>• Uganda's ICT Ministry for supporting such platforms 🙌</li>
            </ul>
          </div>

          <p class="text-lg text-center text-indigo-400 font-semibold">🎥 Stay tuned for behind-the-scenes footage, project demos, and celebration highlights!</p>

          <div class="flex flex-wrap gap-2 justify-center">
            <span class="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">#GiiT</span>
            <span class="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">#SkillBridge</span>
            <span class="bg-green-600 text-white px-3 py-1 rounded-full text-sm">#UgandaWebsiteProjects</span>
            <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">#YouthEmpowerment</span>
            <span class="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm">#DigitalInnovation</span>
          </div>
        </div>
      `
    },
    {
      title: 'Getting Started with Python Programming',
      excerpt: "Learn the basics of Python programming and why it is perfect for beginners.",
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80',
      date: '2024-02-20',
      author: 'Katie Cate🤞',
      category: 'Programming',
    },
    {
      title: 'Web Design Trends in 2024',
      excerpt: 'Explore the latest trends in web design and how to implement them.',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80',
      date: '2024-02-18',
      author: 'Chris Walker🙂',
      category: 'Design',
    },
    {
      title: 'Machine Learning Fundamentals',
      excerpt: 'Understanding the basic concepts of machine learning and AI.',
      image: 'https://images.unsplash.com/photo-1485796826113-174aa68fd81b?auto=format&fit=crop&q=80',
      date: '2024-02-15',
      author: 'Betty Smith😊',
      category: 'AI & ML',
    },
  ];

  const handleViewPost = (post: any) => {
    setSelectedPost(post);
    setShowFullPost(true);
  };

  const closePost = () => {
    setShowFullPost(false);
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-[#020817] pb-8">
      {/* Neural Network Background */}
      <NeuralNetwork />
      <ElegantAnimatedBackground />
      
      {/* Content */}
      <div className="relative">
        {/* Hero Section */}
        <section className="relative py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <FloatingLogo size="medium" showText={false} showTypewriter={false} />
              </div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Blog & Articles
              </h1>
              <div className="text-xl text-gray-300">
                <Typewriter
                  options={{
                    strings: ['Latest Tech News', 'Programming Insights', 'Industry Updates'],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                  }}
                />
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {blogPosts.map((post, index) => (
                <div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl backdrop-blur-sm border overflow-hidden group cursor-pointer hover:scale-[1.02] transition-all duration-300 flex flex-col ${
                    post.featured
                      ? 'border-yellow-500/50 ring-2 ring-yellow-500/20 md:col-span-2 lg:col-span-2'
                      : 'border-indigo-500/20'
                  }`}
                  onClick={() => handleViewPost(post)}
                >
                  <div className={`relative overflow-hidden ${post.featured ? 'h-56 md:h-64' : 'h-48'}`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                      {post.featured && (
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <Trophy className="h-3 w-3" />
                          <span className="hidden sm:inline">Featured</span>
                        </div>
                      )}
                      {post.category === 'Competition Win' && (
                        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          <span className="hidden sm:inline">Winner</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 md:p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between text-xs md:text-sm text-gray-400 mb-3">
                      <div className="flex items-center space-x-1 md:space-x-2">
                        <Calendar size={14} />
                        <span className="truncate">{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1 md:space-x-2">
                        <User size={14} />
                        <span className="truncate max-w-20 md:max-w-none">{post.author}</span>
                      </div>
                    </div>

                    <h3 className={`font-semibold mb-2 text-gray-100 line-clamp-2 ${post.featured ? 'text-lg md:text-xl' : 'text-base md:text-lg'}`}>
                      {post.title}
                    </h3>

                    <p className="text-gray-300 mb-4 text-sm md:text-base line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    <button className="flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors duration-300 text-sm">
                      <span>Read More</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Blog Post Modal */}
      {showFullPost && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-dark-light rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700"
          >
            <div className="relative">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <button
                onClick={closePost}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-white" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <h1 className="text-3xl font-bold text-white mb-2">{selectedPost.title}</h1>
                <div className="flex items-center gap-4 text-gray-200">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{selectedPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{selectedPost.author}</span>
                  </div>
                  <span className="bg-indigo-600 px-3 py-1 rounded-full text-sm">{selectedPost.category}</span>
                </div>
              </div>
            </div>

            <div className="p-8 max-h-[60vh] overflow-y-auto">
              {selectedPost.fullContent ? (
                <div
                  dangerouslySetInnerHTML={{ __html: selectedPost.fullContent }}
                  className="prose prose-invert max-w-none"
                />
              ) : (
                <div className="space-y-4">
                  <p className="text-lg text-gray-300 leading-relaxed">{selectedPost.excerpt}</p>
                  <p className="text-gray-400">Full content coming soon...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
