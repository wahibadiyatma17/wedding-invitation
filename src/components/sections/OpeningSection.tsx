import { useState, useEffect } from 'react';
import { useWeddingStore } from '@/stores/weddingStore';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export function OpeningSection() {
  const { invitation } = useWeddingStore();
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Prevent scrolling when opening section is active
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isOpened]);

  if (!invitation || (isOpened && !isAnimating)) return null;

  const { couple } = invitation;

  const handleOpenInvitation = () => {
    setIsAnimating(true);
    
    // Start both animations simultaneously
    window.dispatchEvent(new Event('openingAnimationComplete'));
    
    // After animation completes, clean up
    setTimeout(() => {
      setIsOpened(true);
      setIsAnimating(false);
      
      // Ensure we're at the top
      window.scrollTo(0, 0);
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: 'auto' });
      }
    }, 800); // Match animation duration exactly
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black overflow-hidden ${isAnimating ? 'animate-openingSlideUp' : ''}`}>
      {/* Desktop Split Layout / Mobile Single Column */}
      <div className="lg:flex lg:h-screen">
        {/* Left Side - Full Background Image (Desktop Only) */}
        <div className="hidden lg:block lg:relative lg:flex-1">
          <Image
            src="/images/pre-wedding-images/28.jpg"
            alt="Wedding background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-black/40" />
        </div>

        {/* Right Side - Content (450px max width) */}
        <div className="min-h-screen lg:relative lg:w-[450px] lg:shrink-0 relative" style={{background: 'linear-gradient(135deg, #FDF1E9 0%, #F3E2D7 50%, #BFAB97 100%)'}}>
          {/* Mobile Background Image (only visible on mobile) */}
          <div className="absolute inset-0 lg:hidden">
            <Image
              src="/images/pre-wedding-images/36.jpg"
              alt="Wedding background"
              fill
              className="object-cover"
              priority
            />
            {/* Soft overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-b from-wedding-cream/30 via-wedding-beige/75 to-wedding-cream/30" />
          </div>

          <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-5 lg:px-8">
            <div className="text-center text-white w-full max-w-sm" style={{color: '#311212'}}>
              
              {/* Decorative Top */}
              <div className="mb-6">
                <div className="w-12 h-0.5 bg-white/60 mx-auto mb-3" style={{backgroundColor: '#7F5F45'}}></div>
                <p className="text-xs tracking-[0.2em] uppercase text-white/80 font-wedding-body" style={{color: '#381516'}}>
                  The Wedding of
                </p>
                <div className="w-12 h-0.5 bg-white/60 mx-auto mt-3" style={{backgroundColor: '#7F5F45'}}></div>
              </div>

              {/* Names */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-5xl lg:text-4xl font-wedding-elegant text-white mb-3" style={{color: '#311212'}}>
                  {couple.bride.name}
                </h1>
                <div className="text-2xl md:text-4xl lg:text-3xl text-white/90 font-wedding-script my-3" style={{color: '#7F5F45'}}>
                  &
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-4xl font-wedding-elegant text-white mb-4" style={{color: '#311212'}}>
                  {couple.groom.name}
                </h1>
              </div>

              {/* Date */}
              <div className="mb-6">
                <div className="text-base lg:text-base text-white/90 font-wedding-body" style={{color: '#381516'}}>
                  {couple.weddingDate.toLocaleDateString('id-ID', { 
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  }).replace(/\//g, ' • ')}
                </div>
              </div>

              {/* Guest Name */}
              {invitation.guestName && (
                <div className="mb-6 bg-white/10 lg:bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/20" style={{borderColor: '#BFAB97'}}>
                  <p className="text-white/80 text-xs font-wedding-body mb-1" style={{color: '#381516'}}>
                    Kepada Yth.
                  </p>
                  <p className="text-white/80 text-xs font-wedding-body mb-2" style={{color: '#381516'}}>
                    Bapak/Ibu/Saudara/i
                  </p>
                  <p className="text-lg lg:text-lg text-white font-wedding-elegant font-semibold" style={{color: '#311212'}}>
                    {invitation.guestName}
                  </p>
                  <p className="text-white/60 text-xs mt-2 italic font-wedding-body" style={{color: '#7F5F45'}}>
                    *Mohon maaf bila ada kesalahan dalam penulisan nama/gelar
                  </p>
                </div>
              )}

              {/* Open Button */}
              <div className="mt-8">
                <Button
                  onClick={handleOpenInvitation}
                  className={`bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 hover:scale-105 transform transition-all duration-300 px-6 py-3 text-base font-wedding-body shadow-xl rounded-xl animate-heartbeat ${isAnimating ? 'animate-pulse opacity-50' : ''}`} 
                  style={{background: 'linear-gradient(to right, #7F5F45, #C6B283)', border: 'none'}}
                  disabled={isAnimating}
                >
                  {isAnimating ? 'Membuka...' : 'Buka Undangan'}
                </Button>
              </div>

              {/* Decorative Bottom */}
              <div className="mt-8">
                <div className="w-12 h-0.5 bg-white/40 mx-auto" style={{backgroundColor: '#C6B283'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}