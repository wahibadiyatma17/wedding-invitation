import { useEffect, useState } from 'react';

export function usePerformanceMonitor() {
  const [isHighPerformance, setIsHighPerformance] = useState(true);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const currentFPS = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setFps(currentFPS);
        
        // Consider performance poor if consistently below 30 FPS
        setIsHighPerformance(currentFPS >= 30);
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationFrameId = requestAnimationFrame(measureFPS);
    };

    // Start monitoring after a delay to avoid initial load impact
    const timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(measureFPS);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Detect if user prefers reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Determine if parallax should be enabled
  const shouldEnableParallax = isHighPerformance && !prefersReducedMotion;

  return {
    fps,
    isHighPerformance,
    prefersReducedMotion,
    shouldEnableParallax
  };
}