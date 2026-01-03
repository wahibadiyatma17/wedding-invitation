import { useWeddingStore } from '@/stores/weddingStore';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const heroBackgroundImages = [
  '/images/pre-wedding-images/29.jpg',
  '/images/pre-wedding-images/30.jpg',
  '/images/pre-wedding-images/31.jpg',
  '/images/pre-wedding-images/32.jpg',
  '/images/pre-wedding-images/33.jpg'
];

export function HeroSection() {
  const { invitation } = useWeddingStore();
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isVisible] = useState(true);

  // Background image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % heroBackgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!invitation) return null;

  const { couple } = invitation;

  return (
    <section id="hero-section" className="relative lg:bg-none overflow-hidden" style={{background: 'linear-gradient(135deg, #FDF1E9 0%, #F3E2D7 50%, #BFAB97 100%)'}}>
      {/* Mobile Dynamic Background */}
      <div className="lg:hidden absolute inset-0 z-0">
        {heroBackgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBgIndex ? 'opacity-30' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt="Hero background"
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/40"></div>
      </div>

      <div className="relative z-10 px-4 py-5 lg:px-6 lg:py-8 max-w-full">
        
        {/* Guest Name Section */}
        {invitation.guestName && (
          <div className={`mb-6 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="bg-white/90 backdrop-blur-md border rounded-xl px-4 py-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]" style={{borderColor: '#BFAB97'}}>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-[#7F5F45] to-[#C6B283] rounded-full animate-pulse"></div>
                <p className="text-xs font-wedding-body mb-1" style={{color: '#381516'}}>
                  Kepada Yth. 
                </p>
              </div>
              <p className="text-base font-wedding-elegant font-semibold" style={{color: '#311212'}}>
                {invitation.guestName}
              </p>
            </div>
          </div>
        )}

        {/* Main Couple Introduction */}
        <div className={`mb-8 text-center transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="mb-5">
            <div className="w-8 h-0.5 mx-auto mb-3 bg-gradient-to-r from-transparent via-[#7F5F45] to-transparent"></div>
            <p className="text-xs font-wedding-body tracking-[0.2em] uppercase mb-2" style={{color: '#381516'}}>
              The Wedding of
            </p>
            <div className="w-8 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#7F5F45] to-transparent"></div>
          </div>
          
          <h1 className="text-2xl lg:text-4xl font-wedding-elegant mb-3 leading-tight" style={{color: '#311212'}}>
            <span className={`block mb-1 transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>{couple.bride.name}</span>
            <span className={`text-lg lg:text-2xl font-wedding-script block mb-1 transform transition-all duration-700 delay-400 ${isVisible ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`} style={{color: '#7F5F45'}}>&</span>
            <span className={`block transform transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>{couple.groom.name}</span>
          </h1>
          
          <div className={`transform transition-all duration-700 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
              <div className="w-2 h-2 bg-gradient-to-r from-[#C6B283] to-[#D6CB94] rounded-full"></div>
              <p className="text-sm lg:text-base font-wedding-body" style={{color: '#381516'}}>
                {couple.weddingDate.toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <div className="w-2 h-2 bg-gradient-to-r from-[#C6B283] to-[#D6CB94] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Couple Photos - Optimized for 450px */}
        <div className="mb-8 animate-scaleIn" style={{animationDelay: '0.4s'}}>
          <div className="flex items-center justify-center gap-3 lg:gap-6">
            {/* Bride Photo */}
            <div className="text-center flex-1">
              <div className="relative w-20 h-20 lg:w-28 lg:h-28 mx-auto mb-2">
                <div className="absolute inset-0 rounded-full p-0.5" style={{background: 'linear-gradient(135deg, #C6B283, #D6CB94)'}}>
                  <div className="w-full h-full bg-white rounded-full overflow-hidden shadow-lg">
                    <Image 
                      src="/images/pre-wedding-images/22.jpg"
                      alt={couple.bride.name}
                      className="w-full h-full object-cover"
                      width={112}
                      height={112}
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-sm lg:text-base font-wedding-elegant mb-1 leading-tight" style={{color: '#311212'}}>{couple.bride.fullName}</h3>
              <p className="text-xs font-wedding-body leading-tight" style={{color: '#8B6914'}}>
                Putri dari<br />
                <span className="font-medium">{couple.bride.parents.father}</span><br />
                <span className="font-medium">{couple.bride.parents.mother}</span>
              </p>
            </div>
            
            {/* Decorative Ampersand */}
            <div className="text-xl lg:text-3xl font-wedding-script px-1" style={{color: '#A0522D'}}>&</div>
            
            {/* Groom Photo */}
            <div className="text-center flex-1">
              <div className="relative w-20 h-20 lg:w-28 lg:h-28 mx-auto mb-2">
                <div className="absolute inset-0 rounded-full p-0.5" style={{background: 'linear-gradient(135deg, #C6B283, #D6CB94)'}}>
                  <div className="w-full h-full bg-white rounded-full overflow-hidden shadow-lg">
                    <Image 
                      src="/images/pre-wedding-images/21.jpg"
                      alt={couple.groom.name}
                      className="w-full h-full object-cover"
                      width={112}
                      height={112}
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-sm lg:text-base font-wedding-elegant mb-1 leading-tight" style={{color: '#311212'}}>{couple.groom.fullName}</h3>
              <p className="text-xs font-wedding-body leading-tight" style={{color: '#8B6914'}}>
                Putra dari<br />
                <span className="font-medium">{couple.groom.parents.father}</span><br />
                <span className="font-medium">{couple.groom.parents.mother}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Spiritual Quote */}
        {couple.spiritualQuote && (
          <div className="mb-6 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border" style={{borderColor: 'rgba(191, 171, 151, 0.5)'}}>
              <p className="font-wedding-script text-sm lg:text-base leading-relaxed italic text-center" style={{color: '#7F5F45'}}>
                &ldquo;{couple.spiritualQuote}&rdquo;
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}