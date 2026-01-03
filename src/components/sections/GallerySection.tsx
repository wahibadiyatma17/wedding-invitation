'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ParallaxWrapper } from '@/components/animations/ParallaxWrapper';

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

// Photo captions for hover effects
const photoCaptions = [
  'Momen Berharga',
  'Kebahagiaan Bersama',
  'Cinta Yang Tulus',
  'Senyuman Manis',
  'Ikatan Hati',
  'Janji Suci',
  'Kasih Sayang',
  'Pelukan Hangat',
  'Harmoni Cinta',
  'Kenangan Indah',
  'Tawa Bahagia',
  'Cinta Sejati',
  'Momen Romantis',
  'Kebersamaan',
  'Kelembutan Hati',
  'Cahaya Cinta',
  'Keajaiban Cinta',
  'Pesona Berdua',
  'Impian Nyata',
  'Kasih Abadi',
  'Senja Bersama',
  'Fajar Bahagia',
  'Cinta Sempurna'
];

type ViewMode = 'slideshow' | 'grid' | 'masonry' | 'featured';

export function GallerySection() {
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('slideshow');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageLoadStates, setImageLoadStates] = useState<{[key: number]: boolean}>({});
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState(1);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-play for slideshow
  useEffect(() => {
    if (!isAutoPlaying || viewMode !== 'slideshow') return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, viewMode]);

  const openLightbox = (index: number) => {
    setLightboxImageIndex(index);
    setIsLightboxOpen(true);
    setLightboxZoom(1);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxZoom(1);
    document.body.style.overflow = '';
  };

  const nextLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev + 1) % galleryImages.length);
    setLightboxZoom(1);
  };

  const prevLightboxImage = () => {
    setLightboxImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    setLightboxZoom(1);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    setIsAutoPlaying(false);
  };

  const handleImageLoad = (index: number) => {
    setImageLoadStates((prev) => ({ ...prev, [index]: true }));
  };

  const toggleZoom = () => {
    setLightboxZoom(prev => prev === 1 ? 2 : 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      if (isLightboxOpen) nextLightboxImage();
      else nextSlide();
    } else if (isRightSwipe) {
      if (isLightboxOpen) prevLightboxImage();
      else prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      switch (e.key) {
        case 'ArrowLeft':
          prevLightboxImage();
          break;
        case 'ArrowRight':
          nextLightboxImage();
          break;
        case 'Escape':
          closeLightbox();
          break;
        case '+':
        case '=':
          setLightboxZoom(prev => Math.min(prev + 0.5, 3));
          break;
        case '-':
        case '_':
          setLightboxZoom(prev => Math.max(prev - 0.5, 0.5));
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const displayedPhotos = showAllPhotos ? galleryImages : galleryImages.slice(0, 12);

  return (
    <section className="relative py-12 md:py-20 bg-gradient-to-b from-wedding-light via-wedding-cream to-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        {mounted ? (
          <>
            <ParallaxWrapper speed={0.03} direction="down">
              <div className="absolute top-0 right-0 w-96 h-96 bg-wedding-primary rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
            </ParallaxWrapper>
            <ParallaxWrapper speed={0.02} direction="up">
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-wedding-accent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
            </ParallaxWrapper>
          </>
        ) : (
          <>
            <div className="absolute top-0 right-0 w-96 h-96 bg-wedding-primary rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-wedding-accent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
          </>
        )}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="fade" duration={300}>
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-wedding-primary" />
              <div className="relative">
                <svg className="w-8 h-8 text-wedding-primary animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="absolute -inset-2 bg-wedding-primary/20 rounded-full blur-xl animate-pulse" />
              </div>
              <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-wedding-primary" />
            </div>
            <h2 className="font-wedding-elegant text-3xl md:text-5xl text-wedding-dark mb-4 bg-gradient-to-r from-wedding-primary via-wedding-accent to-wedding-primary bg-clip-text text-transparent animate-gradient">
              Galeri Kami
            </h2>
            <p className="font-wedding-body text-wedding-dark/90 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Momen indah perjalanan cinta yang kami abadikan dalam setiap frame
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-wedding-primary animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-2 h-2 rounded-full bg-wedding-accent animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 rounded-full bg-wedding-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        </ScrollReveal>

        {/* View Mode Toggle */}
        <ScrollReveal direction="up" duration={300} delay={100}>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
            {[
              { mode: 'slideshow' as ViewMode, label: 'Slideshow', icon: '▶', description: 'Automatic presentation' },
              { mode: 'grid' as ViewMode, label: 'Grid', icon: '▦', description: 'Classic grid layout' },
              { mode: 'masonry' as ViewMode, label: 'Masonry', icon: '▥', description: 'Pinterest style' },
              { mode: 'featured' as ViewMode, label: 'Featured', icon: '⭐', description: 'Highlight mode' }
            ].map(({ mode, label, icon, description }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`group relative px-4 md:px-6 py-2.5 rounded-full font-wedding-body text-xs md:text-sm transition-all duration-500 ${
                  viewMode === mode
                    ? 'bg-gradient-to-r from-wedding-primary to-wedding-accent text-white shadow-xl shadow-wedding-primary/30 scale-105'
                    : 'bg-white/90 text-wedding-dark hover:bg-white hover:shadow-lg hover:scale-105'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`text-base transition-transform duration-300 ${viewMode === mode ? 'scale-125' : 'group-hover:scale-110'}`}>{icon}</span>
                  <span className="font-medium">{label}</span>
                </span>
                {viewMode !== mode && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-wedding-dark/90 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
                      {description}
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Slideshow View */}
        {viewMode === 'slideshow' && (
          <ScrollReveal direction="up" duration={400} delay={150}>
            <div className="max-w-6xl mx-auto">
              {/* Main Slideshow */}
              <div className="relative mb-8 group">
                <div
                  className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onClick={() => openLightbox(currentSlide)}
                >
                  {/* Image Container with Transition */}
                  <div className="relative w-full h-full">
                    <Image
                      src={galleryImages[currentSlide]}
                      alt={`Slideshow ${currentSlide + 1}`}
                      fill
                      className="object-cover transition-all duration-1000 group-hover:scale-110"
                      priority
                      sizes="(max-width: 768px) 100vw, 90vw"
                      onLoad={() => handleImageLoad(currentSlide)}
                    />

                    {/* Loading Skeleton */}
                    {!imageLoadStates[currentSlide] && (
                      <div className="absolute inset-0 bg-gradient-to-r from-wedding-light via-wedding-cream to-wedding-light animate-shimmer" />
                    )}
                  </div>

                  {/* Multi-layer Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-wedding-primary/10 to-wedding-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Animated Border Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-wedding-gold rounded-tl-3xl transition-all duration-500" />
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-wedding-gold rounded-br-3xl transition-all duration-500" />
                  </div>

                  {/* Photo Caption Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 md:p-6 border border-white/20">
                      <p className="font-wedding-elegant text-2xl md:text-3xl text-white mb-2">
                        {photoCaptions[currentSlide]}
                      </p>
                      <p className="font-wedding-body text-white/80 text-sm md:text-base">
                        Foto {currentSlide + 1} dari {galleryImages.length}
                      </p>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-110 opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-110 opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Top Controls */}
                  <div className="absolute top-4 md:top-6 right-4 md:right-6 flex items-center gap-2 md:gap-3">
                    {/* Auto-play Toggle */}
                    <button
                      onClick={(e) => { e.stopPropagation(); setIsAutoPlaying(!isAutoPlaying); }}
                      className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group/btn"
                    >
                      {isAutoPlaying ? (
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>

                    {/* Counter */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-full px-4 md:px-6 py-2 md:py-2.5 text-white font-wedding-body text-sm md:text-base flex items-center gap-2">
                      <span className="font-semibold">{currentSlide + 1}</span>
                      <span className="opacity-60">/</span>
                      <span className="opacity-80">{galleryImages.length}</span>
                    </div>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
                    <div
                      className="h-full bg-gradient-to-r from-wedding-gold via-wedding-accent to-wedding-gold transition-all duration-700 relative overflow-hidden"
                      style={{ width: `${((currentSlide + 1) / galleryImages.length) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                    </div>
                  </div>
                </div>

                {/* Thumbnail Preview Strip */}
                <div className="flex gap-2 md:gap-3 mt-6 overflow-x-auto pb-3 scrollbar-hide">
                  {galleryImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => { setCurrentSlide(index); setIsAutoPlaying(false); }}
                      className={`flex-shrink-0 relative transition-all duration-500 ${
                        index === currentSlide
                          ? 'w-24 h-24 md:w-28 md:h-28 ring-4 ring-wedding-gold scale-110 shadow-2xl shadow-wedding-gold/50'
                          : 'w-20 h-20 md:w-24 md:h-24 opacity-60 hover:opacity-100 hover:scale-105 ring-2 ring-white/50'
                      } rounded-xl overflow-hidden`}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                      {index === currentSlide && (
                        <div className="absolute inset-0 bg-gradient-to-t from-wedding-primary/30 to-transparent" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {displayedPhotos.map((image, index) => (
                <ScrollReveal
                  key={index}
                  direction="up"
                  duration={300}
                  delay={index * 30}
                >
                  <div
                    className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                    onClick={() => openLightbox(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Main Image */}
                    <Image
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-3"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      onLoad={() => handleImageLoad(index)}
                    />

                    {/* Loading Skeleton */}
                    {!imageLoadStates[index] && (
                      <div className="absolute inset-0 bg-gradient-to-br from-wedding-light via-wedding-cream to-wedding-light animate-shimmer" />
                    )}

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-wedding-dark via-wedding-dark/50 to-transparent transition-opacity duration-500 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`} />

                    {/* Decorative Corners */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-wedding-gold opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-tl-2xl transform -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-wedding-gold opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-br-2xl transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                      {/* Icon */}
                      <div className={`w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-3 transform transition-all duration-500 ${
                        hoveredIndex === index ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                      }`}>
                        <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                      </div>

                      {/* Caption */}
                      <div className={`text-center transform transition-all duration-500 ${
                        hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}>
                        <p className="font-wedding-elegant text-base md:text-lg mb-1">
                          {photoCaptions[index]}
                        </p>
                        <p className="font-wedding-body text-xs md:text-sm opacity-90">
                          Photo #{index + 1}
                        </p>
                      </div>
                    </div>

                    {/* Shimmer Effect on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Load More Button */}
            {!showAllPhotos && galleryImages.length > 12 && (
              <ScrollReveal direction="up" duration={300} delay={400}>
                <div className="text-center mt-10">
                  <button
                    onClick={() => setShowAllPhotos(true)}
                    className="group px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-wedding-primary to-wedding-accent text-white rounded-full font-wedding-body font-medium shadow-xl hover:shadow-2xl hover:shadow-wedding-primary/40 transition-all duration-500 hover:scale-105"
                  >
                    <span className="flex items-center gap-3">
                      <span>Lihat Semua Foto ({galleryImages.length - 12} lainnya)</span>
                      <svg className="w-5 h-5 transform group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                </div>
              </ScrollReveal>
            )}
          </div>
        )}

        {/* Masonry View */}
        {viewMode === 'masonry' && (
          <div className="max-w-7xl mx-auto">
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-6">
              {displayedPhotos.map((image, index) => {
                // Vary heights for masonry effect
                const heights = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[5/6]'];
                const height = heights[index % heights.length];

                return (
                  <ScrollReveal
                    key={index}
                    direction="fade"
                    duration={400}
                    delay={index * 40}
                  >
                    <div
                      className={`group relative ${height} rounded-2xl overflow-hidden shadow-xl cursor-pointer break-inside-avoid mb-3 md:mb-6 hover:shadow-2xl hover:shadow-wedding-primary/30 transition-all duration-500`}
                      onClick={() => openLightbox(index)}
                    >
                      {/* Image */}
                      <Image
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        onLoad={() => handleImageLoad(index)}
                      />

                      {/* Loading Skeleton */}
                      {!imageLoadStates[index] && (
                        <div className="absolute inset-0 bg-gradient-to-br from-wedding-light via-wedding-cream to-wedding-accent/20 animate-shimmer" />
                      )}

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                          {/* Photo Icon */}
                          <svg className="w-12 h-12 mb-3 transform scale-0 group-hover:scale-100 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>

                          {/* Caption */}
                          <p className="font-wedding-elegant text-lg md:text-xl text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            {photoCaptions[index]}
                          </p>
                        </div>

                        {/* Number Badge */}
                        <div className="absolute top-4 left-4 w-10 h-10 bg-wedding-gold backdrop-blur-md rounded-full flex items-center justify-center text-white font-wedding-body font-semibold shadow-lg transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Load More */}
            {!showAllPhotos && galleryImages.length > 12 && (
              <ScrollReveal direction="up" duration={300} delay={400}>
                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowAllPhotos(true)}
                    className="px-10 py-3 bg-gradient-to-r from-wedding-primary to-wedding-accent text-white rounded-full font-wedding-body font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Lihat Semua ({galleryImages.length - 12} lainnya)
                  </button>
                </div>
              </ScrollReveal>
            )}
          </div>
        )}

        {/* Featured View */}
        {viewMode === 'featured' && (
          <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
            {/* Featured Large Image */}
            <ScrollReveal direction="up" duration={400} delay={100}>
              <div
                className="group relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                onClick={() => openLightbox(0)}
              >
                <Image
                  src={galleryImages[0]}
                  alt="Featured 1"
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-110"
                  priority
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="font-wedding-elegant text-3xl md:text-5xl mb-2">{photoCaptions[0]}</p>
                  <p className="font-wedding-body text-lg md:text-xl opacity-90">Featured Photo</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Grid of Featured Photos */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {galleryImages.slice(1, 7).map((image, index) => (
                <ScrollReveal
                  key={index}
                  direction="up"
                  duration={300}
                  delay={index * 60}
                >
                  <div
                    className="group relative aspect-square rounded-2xl overflow-hidden shadow-xl cursor-pointer"
                    onClick={() => openLightbox(index + 1)}
                  >
                    <Image
                      src={image}
                      alt={`Featured ${index + 2}`}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <svg className="w-16 h-16 text-white transform scale-0 group-hover:scale-100 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* More Photos Grid */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {galleryImages.slice(7, displayedPhotos.length).map((image, index) => (
                <ScrollReveal
                  key={index}
                  direction="fade"
                  duration={300}
                  delay={index * 40}
                >
                  <div
                    className="group relative aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-500"
                    onClick={() => openLightbox(index + 7)}
                  >
                    <Image
                      src={image}
                      alt={`Photo ${index + 8}`}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 33vw, 25vw"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* View All */}
            {!showAllPhotos && galleryImages.length > 12 && (
              <ScrollReveal direction="up" duration={300}>
                <div className="text-center">
                  <button
                    onClick={() => setShowAllPhotos(true)}
                    className="px-12 py-4 bg-gradient-to-r from-wedding-primary to-wedding-accent text-white rounded-full font-wedding-body font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
                  >
                    Tampilkan Semua Foto
                  </button>
                </div>
              </ScrollReveal>
            )}
          </div>
        )}

        {/* Bottom Decorative Line */}
        <ScrollReveal direction="fade" duration={300} delay={500}>
          <div className="mt-12 md:mt-20 flex items-center justify-center gap-4">
            <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent via-wedding-primary to-transparent" />
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-wedding-primary animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-wedding-accent animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 rounded-full bg-wedding-primary animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <div className="h-px w-20 md:w-32 bg-gradient-to-l from-transparent via-wedding-primary to-transparent" />
          </div>
        </ScrollReveal>
      </div>

      {/* Enhanced Lightbox with Zoom */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center backdrop-blur-xl animate-fadeIn"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 md:top-6 right-4 md:right-6 z-30 w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:rotate-90 transition-all duration-500 group"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => { e.stopPropagation(); prevLightboxImage(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => { e.stopPropagation(); nextLightboxImage(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Main Image with Zoom */}
            <div
              className="relative max-w-6xl max-h-full animate-scaleIn cursor-zoom-in"
              onClick={(e) => { e.stopPropagation(); toggleZoom(); }}
            >
              <div className={`transition-transform duration-500 ${lightboxZoom > 1 ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
                <Image
                  src={galleryImages[lightboxImageIndex]}
                  alt={`Wedding photo ${lightboxImageIndex + 1}`}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
                  style={{
                    transform: `scale(${lightboxZoom})`,
                    transition: 'transform 0.5s ease-out'
                  }}
                  priority
                />
              </div>

              {/* Photo Info Overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl border border-white/20">
                <p className="font-wedding-elegant text-lg md:text-xl mb-1">{photoCaptions[lightboxImageIndex]}</p>
                <p className="font-wedding-body text-sm md:text-base opacity-80 text-center">
                  {lightboxImageIndex + 1} / {galleryImages.length}
                </p>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 flex items-center gap-2 bg-black/70 backdrop-blur-xl rounded-full px-4 py-2">
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxZoom(prev => Math.max(prev - 0.5, 0.5)); }}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="text-white text-sm font-wedding-body min-w-[3rem] text-center">
                {Math.round(lightboxZoom * 100)}%
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxZoom(prev => Math.min(prev + 0.5, 3)); }}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            {/* Keyboard Hints */}
            <div className="absolute top-4 md:top-6 left-4 md:left-6 text-white/80 text-sm backdrop-blur-xl bg-black/50 rounded-2xl px-4 py-3 font-wedding-body hidden md:block border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <kbd className="px-3 py-1.5 bg-white/20 rounded-lg font-mono text-xs">←</kbd>
                <kbd className="px-3 py-1.5 bg-white/20 rounded-lg font-mono text-xs">→</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <kbd className="px-3 py-1.5 bg-white/20 rounded-lg font-mono text-xs">+</kbd>
                <kbd className="px-3 py-1.5 bg-white/20 rounded-lg font-mono text-xs">-</kbd>
                <span>Zoom</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-3 py-1.5 bg-white/20 rounded-lg font-mono text-xs">ESC</kbd>
                <span>Close</span>
              </div>
            </div>

            {/* Download Button */}
            <a
              href={galleryImages[lightboxImageIndex]}
              download
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-4 md:bottom-6 right-4 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group/download"
            >
              <svg className="w-6 h-6 md:w-7 md:h-7 transform group-hover/download:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
      `}</style>
    </section>
  );
}
