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

  // Student photos with achievements
  const galleryImages: GalleryImage[] = [
    {
      id: 3,
      src: 'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F442f39e52ddf4e8db77061762d90508b?format=webp&width=800',
      title: 'Kylie Ingabire - Creative Tech Innovator',
      description: 'Combines art and technology for beautiful, functional UI/UX designs',
      category: 'students'
    },
    {
      id: 4,
      src: 'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F063548303c374c9089b5ff99b308aa44?format=webp&width=800',
      title: 'Kayden Mugwaneza - Full-Stack Developer',
      description: 'Master Python, JavaScript, and AI - Building innovative solutions',
      category: 'students'
    },
    {
      id: 5,
      src: 'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F958881ed13be4aad814fac28d19f32df?format=webp&width=800',
      title: 'Manzi Shammah - Tech Leader',
      description: 'Outstanding tech presenter and digital literacy champion',
      category: 'students'
    },
    {
      id: 6,
      src: 'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2Fd04ac144a7934abcbc062f88c8cc9f74?format=webp&width=800',
      title: 'Raphael Mutsinzi - Web Designer',
      description: 'Excellence in responsive web design - HTML/CSS expert creating stunning layouts',
      category: 'students'
    },
    {
      id: 7,
      src: 'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2Fd4f3012bfc434f2d946f67c11c1e5b55?format=webp&width=800',
      title: 'David - Problem Solver',
      description: 'Champion in coding competitions - Algorithmic thinking and logic puzzles',
      category: 'students'
    },
    {
      id: 8,
      src: 'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2Fdb0d43140a1a4c358e62aa7d41dbcb6f?format=webp&width=800',
      title: 'Emma - AI Enthusiast',
      description: 'Machine learning explorer - Building intelligent apps and predictive models',
      category: 'students'
    },
    {
      id: 9,
      src: 'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F125097ea7935466ca3334444071266ad?format=webp&width=800',
      title: 'Lucas & James - Coding Partners',
      description: 'Collaborative developers building real-world applications together',
      category: 'students'
    },
    {
      id: 10,
      src: 'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F18879f3f01184dfa89ca41638e0b4809?format=webp&width=800',
      title: 'Marcus & Peter - Project Leads',
      description: 'Leading team projects in full-stack development and system design',
      category: 'students'
    },
    {
      id: 11,
      src: 'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F1e8b224096f4478a8dab0b074d0fd1d1?format=webp&width=800',
      title: 'Chris & Sam - Digital Creators',
      description: 'Passionate about creating engaging digital content and multimedia projects',
      category: 'students'
    },
    {
      id: 12,
      src: 'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F0fdf18657d4341edbbf56901a3bc00c1?format=webp&width=800',
      title: 'Nathan & Oliver - IT Leaders',
      description: 'IT support specialists and tech mentors helping peers with troubleshooting',
      category: 'students'
    }
  ];

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
                texts={['Student Gallery', 'Our Stars', 'Future Leaders', 'Student Achievements']}
                speed={100}
                delay={3000}
              />
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              <TypewriterEffect
                texts={[
                  'Meet our incredible students and their achievements',
                  'Discover the brilliant minds shaping the future of technology',
                  'Celebrating our students success stories and innovations'
                ]}
                speed={50}
                delay={4000}
              />
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`gallery-item group ${image.featured ? 'md:col-span-2 md:row-span-2' : ''}`}
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
