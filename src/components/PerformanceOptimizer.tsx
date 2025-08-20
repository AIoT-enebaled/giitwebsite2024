import { useEffect } from 'react';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Reduce animation frequency when page is not visible
    let isPageVisible = true;
    
    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      
      // Pause heavy animations when page is hidden
      const animatedElements = document.querySelectorAll('.animate-float, .animate-pulse, .animate-spin');
      animatedElements.forEach(el => {
        const element = el as HTMLElement;
        if (isPageVisible) {
          element.style.animationPlayState = 'running';
        } else {
          element.style.animationPlayState = 'paused';
        }
      });
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Optimize images loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.loading) {
        img.loading = 'lazy';
      }
      if (!img.decoding) {
        img.decoding = 'async';
      }
    });
    
    // Add transform optimization to elements
    const heavyElements = document.querySelectorAll('.backdrop-blur-sm, .backdrop-blur-md, .backdrop-blur-lg, .filter');
    heavyElements.forEach(el => {
      const element = el as HTMLElement;
      element.style.willChange = 'auto';
      element.style.transform = element.style.transform || 'translateZ(0)';
    });
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  return null;
};

export default PerformanceOptimizer;
