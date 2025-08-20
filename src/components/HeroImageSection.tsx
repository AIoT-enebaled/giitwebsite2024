import React, { useEffect, useState } from 'react';

const HeroImageSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroImages = [
    {
      src: 'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F42e56409de1e49da80e923bedf388d00?format=webp&width=800',
      name: 'Kayden & Kylie',
      description: 'GiiT Star Students'
    },
    {
      src: 'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2Ff271f789cdd54b87abf9a350b0c4e962?format=webp&width=800',
      name: 'Kayden',
      description: 'Coding Prodigy'
    },
    {
      src: 'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F442f39e52ddf4e8db77061762d90508b?format=webp&width=800',
      name: 'Kylie',
      description: 'Tech Innovator'
    }
  ];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Parallax Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 w-full h-full opacity-0 animate-[fadeIn_0.5s_ease-out_forwards] transition-transform duration-1000"
          style={{
            transform: `translateY(${scrollY * (0.3 + index * 0.1)}px)`,
            zIndex: heroImages.length - index,
            animationDelay: `${index * 0.2}s`
          }}
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${image.src})`,
              filter: `brightness(${0.7 - index * 0.1})`,
            }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
            
            {/* Dynamic Color Overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(45deg, rgba(99, 102, 241, ${0.2 - index * 0.05}), rgba(168, 85, 247, ${0.2 - index * 0.05}))`,
              }}
            />
          </div>
        </div>
      ))}

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <div className="opacity-0 translate-y-12 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow-lg">
              <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                Meet Our Stars
              </span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-yellow-300">
              Kayden & Kylie
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 max-w-2xl mx-auto">
              Exceptional students who are already making their mark in the world of technology
            </p>
          </div>

          {/* Student Achievement Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-12 opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">Kayden</h3>
              <p className="text-gray-200 mb-4">
                Programming prodigy who built his first app at age 12. Winner of multiple coding competitions.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-600/80 px-3 py-1 rounded-full text-sm">Python Expert</span>
                <span className="bg-green-600/80 px-3 py-1 rounded-full text-sm">Web Developer</span>
                <span className="bg-purple-600/80 px-3 py-1 rounded-full text-sm">AI Enthusiast</span>
              </div>
            </div>

            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-pink-400 mb-2">Kylie</h3>
              <p className="text-gray-200 mb-4">
                Creative technologist with a passion for design and innovation. Published app developer.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-pink-600/80 px-3 py-1 rounded-full text-sm">UI/UX Designer</span>
                <span className="bg-orange-600/80 px-3 py-1 rounded-full text-sm">Mobile Apps</span>
                <span className="bg-teal-600/80 px-3 py-1 rounded-full text-sm">Creative Coder</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-float">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default HeroImageSection;
