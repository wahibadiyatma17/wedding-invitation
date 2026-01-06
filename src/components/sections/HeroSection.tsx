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

  // Auto-detect date: use event date if only one event, otherwise use couple.weddingDate
  const displayDate = invitation.events.length === 1
    ? invitation.events[0].date
    : couple.weddingDate;

  return (
    <section id="hero-section" className="relative lg:bg-none overflow-hidden" style={{background: 'linear-gradient(135deg, #FDF1E9 0%, #F3E2D7 50%, #BFAB97 100%)'}}>
      {/* Mobile Dynamic Background */}
      <div className="lg:hidden absolute inset-0 z-0">
        {heroBackgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBgIndex ? 'opacity-20' : 'opacity-0'
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
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/10 to-white/40"></div>
      </div>

      <div className="relative z-10 px-4 py-5 lg:px-6 lg:py-8 max-w-full">

        {/* Formal Invitation Text */}
        <div className="mb-8 animate-fadeInUp text-center" style={{animationDelay: '0.2s'}}>
          
          {/* Islamic Greeting */}
          <div className="mb-4">
            <p className="text-base lg:text-lg font-wedding-script italic font-medium leading-relaxed" style={{color: '#7F5F45'}}>
              Bismillahirrahmanirrahim
            </p>
            <p className="text-sm lg:text-base font-wedding-body font-medium leading-relaxed" style={{color: '#7F5F45'}}>
              Assalamu'alaikum Warahmatullahi Wabarakatuh
            </p>
          </div>
          
          {/* Main Invitation Text */}
          <div className="px-2">
            <p className="text-sm lg:text-base font-wedding-body leading-loose" style={{color: '#311212'}}>
              Dengan memohon rahmat dan ridho Allah SWT, kami
              bermaksud mengundang Bapak/Ibu/Saudara/i untuk
              menghadiri acara pernikahan kami:
            </p>
          </div>
          
          {/* Bottom decorative element */}
             <div className="flex items-center justify-center mt-6">
              <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-[#C6B283]"></div>
              <div className="mx-3 w-1.5 h-1.5 rounded-full" style={{background: '#D6CB94'}}></div>
              <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-[#C6B283]"></div>
            </div>
        </div>

        {/* Couple Photos - Optimized for 450px */}
        <div className="mb-8 animate-scaleIn" style={{animationDelay: '0.4s'}}>
          <div className="flex flex-col-reverse items-center justify-center gap-3 lg:gap-4">
            {/* Bride Photo */}
            <div className="text-center flex-1">
              <div className="relative w-20 h-20 lg:w-28 lg:h-28 mx-auto mb-2">
                <div className="absolute inset-0 rounded-full p-0.5" style={{background: 'linear-gradient(135deg, #C6B283, #D6CB94)'}}>
                  <div className="w-full h-full bg-white rounded-full overflow-hidden shadow-lg">
                    <Image 
                      src="/images/ery.png"
                      alt={couple.bride.name}
                      className="w-full h-full object-cover"
                      width={112}
                      height={112}
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-base lg:text-base font-wedding-elegant font-semibold mb-1 leading-tight" style={{color: '#311212'}}>{couple.bride.fullName}</h3>
              <p className="text-sm font-wedding-body leading-tight" style={{color: '#8B6914'}}>
                Putri dari<br />
                <span className="text-sm font-medium">{couple.bride.parents.father}</span><br />
                <span className="text-sm font-medium">{couple.bride.parents.mother}</span>
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
                      src="/images/aji.png"
                      alt={couple.groom.name}
                      className="w-full h-full object-cover"
                      width={112}
                      height={112}
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-base lg:text-base font-wedding-elegant mb-1 leading-tight font-semibold" style={{color: '#311212'}}>{couple.groom.fullName}</h3>
              <p className="text-sm font-wedding-body leading-tight" style={{color: '#8B6914'}}>
                Putra dari<br />
                <span className="text-sm font-medium">{couple.groom.parents.father}</span><br />
                <span className="text-sm font-medium">{couple.groom.parents.mother}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Spiritual Quote */}
        {couple.spiritualQuote && (
          <div className="mb-6 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border" style={{borderColor: 'rgba(191, 171, 151, 0.5)'}}>
              <p className="font-wedding-script text-sm lg:text-base leading-relaxed italic text-center" style={{color: '#7F5F45'}}>
                &ldquo;{couple.spiritualQuote}&rdquo; <br/>(Q.S. Ar-Ruum : 21)
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}