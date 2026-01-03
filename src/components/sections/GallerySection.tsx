'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSpring, animated, useTransition } from '@react-spring/web';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

const galleryImages = [
  '/images/pre-wedding-images/1.jpg',
  '/images/pre-wedding-images/2.jpg',
  '/images/pre-wedding-images/3.jpg',
  '/images/pre-wedding-images/4.jpg',
  '/images/pre-wedding-images/5.jpg',
  '/images/pre-wedding-images/6.jpg',
  '/images/pre-wedding-images/7.jpg',
  '/images/pre-wedding-images/8.jpg',
  '/images/pre-wedding-images/9.jpg',
  '/images/pre-wedding-images/10.jpg',
  '/images/pre-wedding-images/11.jpg',
  '/images/pre-wedding-images/12.jpg',
  '/images/pre-wedding-images/13.jpg',
  '/images/pre-wedding-images/14.jpg',
  '/images/pre-wedding-images/15.jpg',
  '/images/pre-wedding-images/16.jpg',
  '/images/pre-wedding-images/17.jpg',
  '/images/pre-wedding-images/18.jpg',
  '/images/pre-wedding-images/34.jpg',
  '/images/pre-wedding-images/35.jpg',
  '/images/pre-wedding-images/37.jpg',
  '/images/pre-wedding-images/38.jpg',
  '/images/pre-wedding-images/39.jpg'
];

// Photo captions with detailed descriptions reflecting each moment
const photoCaptions = [
  { title: 'Awal Perjalanan Cinta', subtitle: 'Ketika mata pertama kali bertemu, hati sudah berbisik' },
  { title: 'Tawa yang Menawan', subtitle: 'Keceriaan yang tulus dalam setiap momen kebersamaan' },
  { title: 'Hangatnya Pelukan', subtitle: 'Dalam dekapan ini, dunia terasa sempurna' },
  { title: 'Senyuman Kebahagiaan', subtitle: 'Pancaran cahaya cinta dari dalam hati' },
  { title: 'Janji di Antara Bunga', subtitle: 'Keindahan alam menyaksikan ikrar cinta yang tulus' },
  { title: 'Momen Ketenangan', subtitle: 'Bersama denganmu, waktu seakan berhenti' },
  { title: 'Canda dan Tawa', subtitle: 'Berbagi kegembiraan dalam setiap detik bersama' },
  { title: 'Tatapan Penuh Makna', subtitle: 'Mata yang saling memahami tanpa kata' },
  { title: 'Kebersamaan yang Sejati', subtitle: 'Dua jiwa yang menyatu dalam harmoni' },
  { title: 'Kemesraan di Senja', subtitle: 'Indahnya cinta diwarnai cahaya mentari sore' },
  { title: 'Kelembutan Hati', subtitle: 'Sentuhan kasih yang menyentuh jiwa terdalam' },
  { title: 'Berbagi Mimpi', subtitle: 'Merajut harapan untuk masa depan bersama' },
  { title: 'Spontanitas Cinta', subtitle: 'Kebahagiaan yang meluap dalam setiap gerakan' },
  { title: 'Kehangatan Berdua', subtitle: 'Rasa aman dan nyaman dalam pelukan cinta' },
  { title: 'Pesona Alami', subtitle: 'Kecantikan cinta yang bersinar natural' },
  { title: 'Saat-saat Berharga', subtitle: 'Kenangan indah yang akan selalu diingat' },
  { title: 'Romantisme Sejati', subtitle: 'Cinta yang terpancar dari setiap sudut hati' },
  { title: 'Kedamaian Bersama', subtitle: 'Menemukan ketenangan dalam cinta yang tulus' },
  { title: 'Impian Menjadi Nyata', subtitle: 'Ketika harapan terindah terwujud bersama' },
  { title: 'Kasih yang Abadi', subtitle: 'Cinta yang akan bertahan hingga akhir waktu' },
  { title: 'Senja Romantis', subtitle: 'Indahnya cinta ditemani cahaya emas senja' },
  { title: 'Fajar Kebahagiaan', subtitle: 'Awal yang baru penuh harapan dan cinta' },
  { title: 'Cinta yang Sempurna', subtitle: 'Takdir terindah yang dipersembahkan Tuhan' }
];

export function GallerySection() {
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Prevent hydration errors
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setDirection('next');
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    setIsAutoPlaying(false);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    setIsAutoPlaying(false);
  }, []);


  // Auto-play functionality
  useEffect(() => {
    if (!mounted || !isAutoPlaying) return;

    autoPlayRef.current = setInterval(() => {
      setDirection('next');
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, mounted]);

  // Preload adjacent images for better performance
  useEffect(() => {
    if (!mounted) return;

    const preloadImages = () => {
      const nextIndex = (currentSlide + 1) % galleryImages.length;
      const prevIndex = (currentSlide - 1 + galleryImages.length) % galleryImages.length;
      
      [nextIndex, prevIndex].forEach(index => {
        if (typeof window !== 'undefined') {
          const img = new window.Image();
          img.src = galleryImages[index];
        }
      });
    };

    preloadImages();
  }, [currentSlide, mounted]);

  // Controls visibility management
  const showControlsTemporarily = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, []);

  // Mouse movement handler
  const handleMouseMove = useCallback(() => {
    showControlsTemporarily();
  }, [showControlsTemporarily]);

  // Image loading handler
  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Touch handlers for mobile gestures
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    showControlsTemporarily();
  }, [showControlsTemporarily]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }, [nextSlide, prevSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          setIsAutoPlaying(prev => !prev);
          break;
      }
      showControlsTemporarily();
    };

    if (mounted) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [mounted, nextSlide, prevSlide, showControlsTemporarily]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // Slide transition animation
  const slideTransition = useTransition(currentSlide, {
    from: { 
      opacity: 0, 
      transform: `translateX(${direction === 'next' ? '100%' : '-100%'})` 
    },
    enter: { 
      opacity: 1, 
      transform: 'translateX(0%)' 
    },
    leave: { 
      opacity: 0, 
      transform: `translateX(${direction === 'next' ? '-100%' : '100%'})` 
    },
    config: { tension: 280, friction: 60 }
  });

  // Controls animation
  const controlsAnimation = useSpring({
    opacity: showControls ? 1 : 0,
    transform: showControls ? 'translateY(0px)' : 'translateY(20px)',
    config: { tension: 300, friction: 30 }
  });

  if (!mounted) {
    return (
      <section className="relative h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading gallery...</div>
      </section>
    );
  }

  return (
    <ScrollReveal direction="fade" duration={800}>
      <section 
        className="relative h-screen w-full bg-black overflow-hidden cursor-none"
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Section Header */}
        <animated.div 
          style={controlsAnimation}
          className="absolute top-0 left-0 right-0 z-30 p-6 bg-gradient-to-b from-black/60 to-transparent"
        >
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-wedding-elegant text-white mb-2">
              Galeri Pre-Wedding
            </h2>
          </div>
        </animated.div>

        {/* Main Image Display */}
        <div className="relative h-full w-full">
          {slideTransition((style, item) => (
            <animated.div
              style={style}
              className="absolute inset-0"
            >
              <div className="relative h-full w-full">
                <Image
                  src={galleryImages[item]}
                  alt={photoCaptions[item]?.title || `Wedding photo ${item + 1}`}
                  fill
                  className="object-cover"
                  priority={item === currentSlide}
                  onLoad={handleImageLoad}
                  sizes="100vw"
                />
                
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                
                {/* Caption Overlay */}
                <animated.div 
                  style={controlsAnimation}
                  className="absolute bottom-20 left-0 right-0 z-20 p-6"
                >
                  <div className="text-center max-w-2xl mx-auto">
                    <p className="text-white/60 text-xs md:text-sm">
                      {item + 1} dari {galleryImages.length}
                    </p>
                  </div>
                </animated.div>
              </div>
            </animated.div>
          ))}
        </div>

        {/* Navigation Controls */}
        <animated.div 
          style={controlsAnimation}
          className="absolute inset-y-0 left-0 right-0 z-20 pointer-events-none"
        >
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all pointer-events-auto group"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all pointer-events-auto group"
            aria-label="Next image"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </animated.div>

        {/* Bottom Controls */}
        <animated.div 
          style={controlsAnimation}
          className="absolute bottom-0 left-0 right-0 z-30 p-6 bg-gradient-to-t from-black/60 to-transparent"
        >
          <div className="flex items-center justify-center mb-4">
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center space-x-2 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-all"
              aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isAutoPlaying ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Pause</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Play</span>
                </>
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-300 ease-linear rounded-full"
                style={{ width: `${((currentSlide + 1) / galleryImages.length) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-white/60 text-xs">
              <span>Foto {currentSlide + 1}</span>
              <span>{galleryImages.length} Foto</span>
            </div>
          </div>
        </animated.div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 z-40 bg-black flex items-center justify-center">
            <div className="flex items-center space-x-2 text-white">
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span className="text-lg">Loading image...</span>
            </div>
          </div>
        )}

        {/* Keyboard Instructions (shown briefly on load) */}
        <animated.div 
          style={{
            ...controlsAnimation,
            opacity: controlsAnimation.opacity.to(o => o * 0.8)
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center text-white/60 pointer-events-none"
        >
          <p className="text-sm mb-2">Navigate with ← → keys or swipe</p>
          <p className="text-xs">Press P to pause/play • Space for next</p>
        </animated.div>
      </section>
    </ScrollReveal>
  );
}