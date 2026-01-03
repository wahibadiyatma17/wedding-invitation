import { useRef, useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 300,
  threshold = 0.1,
  className = ''
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, threshold]);

  const getInitialStyle = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, transform: 'translateY(50px)' };
      case 'down':
        return { opacity: 0, transform: 'translateY(-50px)' };
      case 'left':
        return { opacity: 0, transform: 'translateX(50px)' };
      case 'right':
        return { opacity: 0, transform: 'translateX(-50px)' };
      case 'fade':
      default:
        return { opacity: 0 };
    }
  };

  const getFinalStyle = () => {
    return { 
      opacity: 1, 
      transform: direction === 'fade' ? 'none' : 'translate(0px, 0px)' 
    };
  };

  const springProps = useSpring({
    from: getInitialStyle(),
    to: isVisible ? getFinalStyle() : getInitialStyle(),
    config: { duration }
  });

  return (
    <animated.div ref={ref} style={springProps} className={className}>
      {children}
    </animated.div>
  );
}