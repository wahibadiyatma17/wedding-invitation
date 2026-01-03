import { useRef, useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface ParallaxWrapperProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  offset?: number;
}

export function ParallaxWrapper({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = '',
  offset = 0
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress for this element
        const scrollProgress = (window.scrollY + windowHeight - elementTop) / (windowHeight + elementHeight);
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
        
        setScrollY(clampedProgress);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getTransform = () => {
    const movement = (scrollY - 0.5) * speed * 100 + offset;
    
    switch (direction) {
      case 'up':
        return `translateY(${-movement}px)`;
      case 'down':
        return `translateY(${movement}px)`;
      case 'left':
        return `translateX(${-movement}px)`;
      case 'right':
        return `translateX(${movement}px)`;
      default:
        return `translateY(${-movement}px)`;
    }
  };

  const springProps = useSpring({
    transform: getTransform(),
    config: { tension: 120, friction: 14 }
  });

  return (
    <div ref={ref} className={className}>
      <animated.div style={springProps}>
        {children}
      </animated.div>
    </div>
  );
}