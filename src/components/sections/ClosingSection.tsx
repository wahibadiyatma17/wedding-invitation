import { useWeddingStore } from '@/stores/weddingStore';
import Image from 'next/image';

export function ClosingSection() {
  const { invitation } = useWeddingStore();

  if (!invitation) return null;

  const { couple } = invitation;

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden" style={{background: 'linear-gradient(135deg, #FEFCFA 0%, #FDF8F4 50%, #F7F1EB 100%)'}}>
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C6B283' fill-opacity='0.3'%3E%3Cpath d='M40 20 L45 30 L55 25 L50 35 L60 40 L50 45 L55 55 L45 50 L40 60 L35 50 L25 55 L30 45 L20 40 L30 35 L25 25 L35 30 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Elegant Corner Flourishes */}
      <div className="absolute top-8 left-8 w-24 h-24 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M10 90 Q30 70 50 90 Q70 70 90 90 Q70 50 50 70 Q30 50 10 70 Q30 30 50 50 Q70 30 90 50" stroke="#C6B283" strokeWidth="1.5" fill="none"/>
          <circle cx="20" cy="80" r="2" fill="#D6CB94"/>
          <circle cx="80" cy="80" r="2" fill="#C6B283"/>
          <circle cx="50" cy="60" r="1.5" fill="#7F5F45"/>
        </svg>
      </div>
      
      <div className="absolute bottom-8 right-8 w-24 h-24 opacity-20 rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M10 90 Q30 70 50 90 Q70 70 90 90 Q70 50 50 70 Q30 50 10 70 Q30 30 50 50 Q70 30 90 50" stroke="#C6B283" strokeWidth="1.5" fill="none"/>
          <circle cx="20" cy="80" r="2" fill="#D6CB94"/>
          <circle cx="80" cy="80" r="2" fill="#C6B283"/>
          <circle cx="50" cy="60" r="1.5" fill="#7F5F45"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-6 text-center">
        {/* Couple Photo in Modern Decorative Frame */}
        <div className="mb-8">
          <div className="relative inline-block">
            {/* Modern Elegant Frame */}
            <div className="relative mx-auto">
              <div 
                className="relative w-72 h-80 mx-auto overflow-hidden shadow-2xl"
                style={{
                  borderRadius: '60% 40% 40% 60% / 60% 50% 50% 40%',
                  border: '6px solid',
                  background: 'linear-gradient(135deg, #FDF1E9 0%, #F3E2D7 50%, #BFAB97 100%)'
                }}
              >
                <Image
                  src="/images/pre-wedding-images/37.jpg"
                  alt={`${couple.bride.name} & ${couple.groom.name}`}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Soft overlay for elegance */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5"></div>
              </div>
            </div>
            
            {/* Sophisticated decorative elements */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                <path d="M5 15 Q10 5 15 15 Q20 5 25 15 Q30 5 35 15" stroke="#C6B283" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <circle cx="20" cy="10" r="2" fill="#D6CB94"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Typography with Modern Hierarchy */}
        <div className="mb-8 space-y-8">
          {/* Primary Closing Statement - Larger, Bold Typography */}
          <div className="space-y-6">
            <p 
              className="text-sm lg:text-base leading-relaxed font-wedding-body font-medium tracking-wide"
              style={{ color: '#5D4E37', lineHeight: '1.6' }}
            >
              Menjadi sebuah kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dalam hari bahagia ini.
            </p>
            
            {/* Decorative Divider */}
            <div className="flex justify-center">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-wedding-gold to-transparent" style={{background: 'linear-gradient(to right, transparent, #C6B283, transparent)'}}></div>
            </div>
            
            <p 
              className="text-sm lg:text-base leading-relaxed font-wedding-body tracking-wide"
              style={{ color: '#7F5F45', lineHeight: '1.7' }}
            >
              Terima kasih atas segala doa,
              ucapan dan perhatian yang diberikan.
            </p>
          </div>
        </div>

        {/* Couple Names with Bold Modern Typography */}
        <div className="mb-8">
          <h3 
            className="text-3xl lg:text-4xl font-wedding-elegant tracking-wide leading-tight"
            style={{ color: '#7F5F45' }}
          >
            {couple.groom.name}
            <span 
              className="block text-2xl lg:text-3xl font-wedding-script my-3" 
              style={{ color: '#C6B283' }}
            >
              &
            </span>
            {couple.bride.name}
          </h3>
        </div>

        {/* Refined Decorative Bottom Element */}
        <div className="flex justify-center">
          <svg width="140" height="50" viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Elegant fountain design */}
            <rect x="65" y="35" width="10" height="12" fill="#C6B283" rx="2"/>
            <rect x="60" y="28" width="20" height="10" fill="#D6CB94" rx="3"/>
            <rect x="55" y="20" width="30" height="12" fill="#C6B283" rx="4"/>
            
            {/* Water streams */}
            <path d="M70 8 Q72 12 70 16 Q68 12 70 8" fill="#D6CB94"/>
            <path d="M60 12 Q62 16 60 20 Q58 16 60 12" fill="#C6B283" fillOpacity="0.8"/>
            <path d="M80 12 Q82 16 80 20 Q78 16 80 12" fill="#C6B283" fillOpacity="0.8"/>
            
            {/* Elegant side flourishes */}
            <path d="M20 40 Q30 30 40 40 Q35 45 25 42 Q20 45 20 40" fill="#7F5F45" fillOpacity="0.4"/>
            <path d="M100 40 Q110 30 120 40 Q115 45 105 42 Q100 45 100 40" fill="#7F5F45" fillOpacity="0.4"/>
            
            {/* Refined dots pattern */}
            <circle cx="15" cy="37" r="2" fill="#C6B283" fillOpacity="0.6"/>
            <circle cx="125" cy="37" r="2" fill="#C6B283" fillOpacity="0.6"/>
            <circle cx="10" cy="32" r="1.5" fill="#D6CB94" fillOpacity="0.8"/>
            <circle cx="130" cy="32" r="1.5" fill="#D6CB94" fillOpacity="0.8"/>
            
            {/* Connecting elegant curves */}
            <path d="M35 45 Q50 35 65 45" stroke="#C6B283" strokeWidth="1" fill="none" opacity="0.5"/>
            <path d="M75 45 Q90 35 105 45" stroke="#C6B283" strokeWidth="1" fill="none" opacity="0.5"/>
          </svg>
        </div>
      </div>
    </section>
  );
}