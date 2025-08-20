import React, { useState } from 'react';
import { X, Download, Heart, Share2 } from 'lucide-react';
import NeuralNetwork from '../components/NeuralNetwork';
import FloatingLogo from '../components/FloatingLogo';
import ElegantAnimatedBackground from '../components/CrazyAnimatedBackground';
import TypewriterEffect from '../components/TypewriterEffect';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  description: string;
  category: string;
  featured?: boolean;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  // Collect all images used throughout the site
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: 'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F2ad69148086148c288ff98a1e4c8b79f?format=webp&width=800',
      title: 'GiiT Logo',
      description: 'Official logo of Genius Institute of Information Technology',
      category: 'branding',
      featured: true
    },
    {
      id: 2,
      src: 'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F42e56409de1e49da80e923bedf388d00?format=webp&width=800',
      title: 'Kayden & Kylie - Winners',
      description: 'Website Competition Winners 2025 - SkillBridge Uganda Project',
      category: 'students',
      featured: true
    },
    {
      id: 3,
      src: 'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2Ff271f789cdd54b87abf9a350b0c4e962?format=webp&width=800',
      title: 'Kayden - Young Developer',
      description: 'Full-Stack Developer at 13 - Mastering Python, JavaScript, and AI',
      category: 'students'
    },
    {
      id: 4,
      src: 'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F442f39e52ddf4e8db77061762d90508b?format=webp&width=800',
      title: 'Kylie - Creative Innovator',
      description: 'Creative Tech Innovator combining art and technology',
      category: 'students'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Programming Classroom',
      description: 'Modern programming classroom with latest technology',
      category: 'facilities'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      title: 'Collaborative Learning',
      description: 'Students working together on innovative projects',
      category: 'activities'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2088&q=80',
      title: 'AI & Machine Learning',
      description: 'Advanced AI research and development lab',
      category: 'technology'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
      title: 'Web Development Studio',
      description: 'State-of-the-art web development workspace',
      category: 'facilities'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Innovation Workshop',
      description: 'Creative space for innovation and prototyping',
      category: 'activities'
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Technology Excellence',
      description: 'Cutting-edge technology and equipment',
      category: 'technology'
    }
  ];

  const categories = ['all', 'students', 'facilities', 'technology', 'activities', 'branding'];

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openImage = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="relative min-h-screen">
      <NeuralNetwork />
      <ElegantAnimatedBackground />
      
      <div className="relative z-10 pt-24 pb-16">
        {/* Header Section */}
        <section className="text-center px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <FloatingLogo size="large" showText={false} showTypewriter={false} />
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 gradient-text">
              <TypewriterEffect
                texts={['Image Gallery', 'Our Journey', 'Visual Stories', 'GiiT Moments']}
                speed={100}
                delay={3000}
              />
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              <TypewriterEffect
                texts={[
                  'Explore our visual collection showcasing students, facilities, and achievements',
                  'Discover the vibrant community and cutting-edge technology at GiiT',
                  'See how we are transforming lives through technology education'
                ]}
                speed={50}
                delay={4000}
              />
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                      : 'bg-dark-light text-gray-300 hover:bg-indigo-500/20 hover:text-white'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`gallery-item ${image.featured ? 'md:col-span-2 md:row-span-2' : ''}`}
                  onClick={() => openImage(image)}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden rounded-lg">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Overlay */}
                    <div className="gallery-overlay">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-bold text-lg mb-1">
                          {image.title}
                        </h3>
                        <p className="text-gray-200 text-sm">
                          {image.description}
                        </p>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-3">
                          <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-300">
                            <Heart className="h-4 w-4 text-white" />
                          </button>
                          <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-300">
                            <Share2 className="h-4 w-4 text-white" />
                          </button>
                          <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-300">
                            <Download className="h-4 w-4 text-white" />
                          </button>
                        </div>
                      </div>
                      
                      {image.featured && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <div className="relative max-w-5xl w-full max-h-[90vh] bg-dark-light rounded-2xl overflow-hidden opacity-0 scale-90 animate-[fadeInScale_0.3s_ease-out_forwards]">
              <button
                onClick={closeImage}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors duration-300"
              >
                <X className="h-6 w-6 text-white" />
              </button>
              
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="w-full h-96 md:h-full object-cover"
                  />
                </div>
                
                <div className="p-8">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-semibold mb-4">
                      {selectedImage.category}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {selectedImage.title}
                  </h2>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {selectedImage.description}
                  </p>
                  
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-300">
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-dark border border-gray-600 hover:border-gray-500 text-gray-300 rounded-lg transition-colors duration-300">
                      <Share2 className="h-4 w-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
