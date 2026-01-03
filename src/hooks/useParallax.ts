import { useEffect, useState } from 'react';

export function useParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
}

export function useParallaxElement(ref: React.RefObject<HTMLElement>, speed: number = 0.5) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrollTop = window.scrollY;
        const elementTop = rect.top + scrollTop;
        const windowHeight = window.innerHeight;
        
        // Only apply parallax when element is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          const relativePos = (scrollTop - elementTop) * speed;
          setOffset(relativePos);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, speed]);

  return offset;
}