import { useWeddingStore } from '@/stores/weddingStore';
import { ParallaxWrapper } from '@/components/animations/ParallaxWrapper';
import Image from 'next/image';

export function CoupleIntroSection() {
  const { invitation } = useWeddingStore();

  if (!invitation) return null;

  const { couple } = invitation;

  // Auto-detect date: use event date if only one event, otherwise use couple.weddingDate
  const displayDate = invitation.events.length === 1
    ? invitation.events[0].date
    : couple.weddingDate;

  return (
    <section id="couple-intro-section" className="relative flex items-center justify-center overflow-hidden min-h-dvh">
      {/* Background with Parallax */}
      <ParallaxWrapper speed={0.02} className="absolute inset-0 -z-20">
        <Image
          src="/images/pre-wedding-images/25.jpg"
          alt="Couple introduction background"
          fill
          className="object-cover"
        />
        <div 
          className="absolute inset-0 z-10" 
          style={{
            background: 'linear-gradient(135deg, rgba(253, 241, 233, 0.92) 0%, rgba(243, 226, 215, 0.88) 50%, rgba(191, 171, 151, 0.85) 100%)'
          }}
        />
      </ParallaxWrapper>

      {/* Decorative Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C6B283' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Main Couple Introduction */}
        <div className="text-center mb-12 lg:mb-16">
          {/* Decorative Header */}
          <div className="mb-8 lg:mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#C6B283] to-[#C6B283]"></div>
              <div className="mx-4 w-3 h-3 rounded-full" style={{background: 'linear-gradient(45deg, #C6B283, #D6CB94)'}}></div>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent via-[#C6B283] to-[#C6B283]"></div>
            </div>
            
            <p className="text-sm lg:text-base font-wedding-body tracking-[0.3em] uppercase mb-6" style={{color: '#7F5F45'}}>
              The Wedding of
            </p>
            
            <div className="flex items-center justify-center">
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#C6B283] to-[#C6B283]"></div>
              <div className="mx-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#C6B283"/>
                </svg>
              </div>
              <div className="w-20 h-0.5 bg-gradient-to-l from-transparent via-[#C6B283] to-[#C6B283]"></div>
            </div>
          </div>
          
          {/* Couple Names */}
          <div className="mb-8 lg:mb-12">
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-wedding-elegant leading-tight" style={{color: '#311212'}}>
              <span className="block mb-2 lg:mb-4 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                {couple.groom.name}
              </span>
              <span 
                className="text-2xl lg:text-4xl xl:text-5xl font-wedding-script block mb-2 lg:mb-4 animate-scaleIn" 
                style={{color: '#7F5F45', animationDelay: '0.4s'}}
              >
                &
              </span>
              <span className="block animate-fadeInUp" style={{animationDelay: '0.6s'}}>
                {couple.bride.name}
              </span>
            </h1>
          </div>
          
          {/* Wedding Date */}
          <div className="animate-fadeInUp" style={{animationDelay: '0.8s'}}>
            <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-xl border border-white/50">
              <div className="w-3 h-3 rounded-full" style={{background: 'linear-gradient(45deg, #C6B283, #D6CB94)'}}></div>
              <p className="text-lg lg:text-xl font-wedding-body font-medium" style={{color: '#311212'}}>
                {displayDate.toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <div className="w-3 h-3 rounded-full" style={{background: 'linear-gradient(45deg, #C6B283, #D6CB94)'}}></div>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Flourish */}
        <div className="flex justify-center animate-fadeInUp" style={{animationDelay: '1s'}}>
          <svg width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M10 10C20 5 40 5 50 10C60 15 80 15 90 10C95 7.5 105 7.5 110 10"
              stroke="#C6B283" 
              strokeWidth="1.5" 
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="60" cy="10" r="2" fill="#C6B283"/>
            <circle cx="20" cy="8" r="1" fill="#D6CB94"/>
            <circle cx="100" cy="8" r="1" fill="#D6CB94"/>
          </svg>
        </div>
      </div>
    </section>
  );
}