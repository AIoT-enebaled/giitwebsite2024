import React from 'react';

interface StudentImageScrollProps {
  direction?: 'left' | 'right';
  speed?: number;
}

const StudentImageScroll: React.FC<StudentImageScrollProps> = ({ 
  direction = 'left', 
  speed = 50 
}) => {
  const studentImages = [
    'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2Ff271f789cdd54b87abf9a350b0c4e962?format=webp&width=800', // Group of students
    'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F063548303c374c9089b5ff99b308aa44?format=webp&width=800', // Boy with hands together
    'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F958881ed13be4aad814fac28d19f32df?format=webp&width=800', // Boy at tech event
    'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F442f39e52ddf4e8db77061762d90508b?format=webp&width=800', // Girl in pink dress
    'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2Fd04ac144a7934abcbc062f88c8cc9f74?format=webp&width=800', // Girl with bow dress
    'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2Fd4f3012bfc434f2d946f67c11c1e5b55?format=webp&width=800', // Boy in navy pants
    'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2Fdb0d43140a1a4c358e62aa7d41dbcb6f?format=webp&width=800', // Girl at tech event
    'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F125097ea7935466ca3334444071266ad?format=webp&width=800', // Two boys walking
    'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F18879f3f01184dfa89ca41638e0b4809?format=webp&width=800', // Two boys at table
    'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F1e8b224096f4478a8dab0b074d0fd1d1?format=webp&width=800', // Two boys in Santa outfits
    'https://cdn.builder.io/api/v1/image/assets%2F6f20e37aab06494d82177a5be26befff%2F0fdf18657d4341edbbf56901a3bc00c1?format=webp&width=800', // Two boys in school uniforms
  ];

  // Duplicate images for seamless loop
  const duplicatedImages = [...studentImages, ...studentImages];

  return (
    <div className="relative overflow-hidden w-full py-8">
      <div className="flex gap-6" style={{ width: '200%', animation: `${direction === 'left' ? 'marqueeLeft' : 'marqueeRight'} ${speed}s linear infinite` }} >
        {duplicatedImages.map((image, index) => (
          <div key={index} className="flex-shrink-0 relative group">
            <div
              className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 overflow-hidden rounded-xl border-2 border-indigo-500/20 group-hover:border-indigo-400/50 transition-all duration-300 relative"
            >
              <img
                src={image}
                alt={`GiiT Student ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Gentle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Simple floating badge */}
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              GiiT Student
            </div>
          </div>
        ))}
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#020817] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#020817] to-transparent z-10 pointer-events-none" />
    </div>
  );
};

export default StudentImageScroll;
