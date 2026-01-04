import { useEffect, useState } from 'react';
import { useWeddingStore } from '@/stores/weddingStore';

export function CountdownSection() {
  const { countdown, updateCountdown } = useWeddingStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [updateCountdown, mounted]);

  // Return static countdown on server to prevent hydration mismatch
  if (!mounted) {
    return (
      <section className="px-4 py-5 lg:px-6 lg:py-8">
        <div className="max-w-full text-center">
          <div className="mb-6 animate-fadeInUp">
            <div className="w-8 h-0.5 mx-auto mb-3" style={{backgroundColor: '#7F5F45'}}></div>
            <h2 className="text-xl lg:text-3xl font-wedding-elegant mb-2" style={{color: '#311212'}}>
              Menuju Hari Bahagia
            </h2>
            <div className="w-8 h-0.5 mx-auto" style={{backgroundColor: '#7F5F45'}}></div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border shadow-lg mb-5 animate-scaleIn" style={{borderColor: '#BFAB97', animationDelay: '0.2s'}}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {[
                { label: 'Hari', value: 0 },
                { label: 'Jam', value: 0 },
                { label: 'Menit', value: 0 },
                { label: 'Detik', value: 0 }
              ].map((unit, index) => (
                <div key={unit.label} className="text-center animate-heartbeat" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="text-white rounded-lg p-3 mb-2 shadow-lg" style={{background: 'linear-gradient(135deg, #7F5F45, #C6B283)'}}>
                    <div className="text-xl lg:text-3xl font-wedding-elegant font-bold">
                      {unit.value.toString().padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-xs font-wedding-body font-medium uppercase tracking-wide" style={{color: '#381516'}}>
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <p className="font-wedding-script text-sm lg:text-base italic" style={{color: '#381516'}}>
                Waktu menuju momen bahagia kami bersama
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const timeUnits = [
    { label: 'Hari', value: countdown.days },
    { label: 'Jam', value: countdown.hours },
    { label: 'Menit', value: countdown.minutes },
    { label: 'Detik', value: countdown.seconds }
  ];

  return (
    <section className="relative px-4 py-12 lg:px-6 lg:py-16 overflow-hidden">
      {/* Elegant Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-wedding-cream via-wedding-beige to-wedding-light opacity-50" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-wedding-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-wedding-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <div className="mb-10 animate-fadeInUp">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-gold to-transparent" />
            <svg className="w-5 h-5 text-wedding-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <div className="w-16 h-px bg-gradient-to-l from-transparent via-wedding-gold to-transparent" />
          </div>
          <h2 className="text-2xl lg:text-4xl font-wedding-elegant mb-2 text-wedding-dark">
            Menuju Hari Bahagia
          </h2>
          <p className="text-sm lg:text-base font-wedding-body text-wedding-dark/70 italic">
            Hitung mundur menuju momen terindah
          </p>
        </div>

        {/* Countdown Cards */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 lg:p-8 border-2 border-wedding-secondary/30 shadow-2xl mb-6 animate-scaleIn relative overflow-hidden" style={{animationDelay: '0.2s'}}>
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-wedding-gold/5 via-transparent to-wedding-accent/5 pointer-events-none" />

          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {timeUnits.map((unit, index) => (
              <div
                key={unit.label}
                className="text-center group"
                style={{
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  animationDelay: `${index * 0.15}s`,
                  opacity: 0
                }}
              >
                {/* Card with enhanced styling */}
                <div className="relative bg-gradient-to-br from-wedding-primary to-wedding-accent text-white rounded-xl p-5 lg:p-6 mb-3 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group-hover:from-wedding-accent group-hover:to-wedding-primary">
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

                  {/* Number with transition */}
                  <div className="relative text-3xl lg:text-5xl font-wedding-elegant font-bold tracking-wider transition-all duration-300">
                    {unit.value.toString().padStart(2, '0')}
                  </div>

                  {/* Decorative dot */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-white/40 rounded-full animate-ping" />
                  <div className="absolute top-2 right-2 w-2 h-2 bg-white/60 rounded-full" />
                </div>

                {/* Label with enhanced styling */}
                <div className="text-xs lg:text-sm font-wedding-body font-semibold uppercase tracking-widest text-wedding-dark/80">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>

          {/* Message Section */}
          {countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0 ? (
            <div className="mt-8 p-5 rounded-xl border-2 bg-gradient-to-r from-wedding-beige via-wedding-gold/30 to-wedding-beige border-wedding-gold/50 shadow-lg animate-pulse">
              <p className="font-wedding-elegant font-bold text-xl lg:text-2xl text-wedding-dark flex items-center justify-center gap-3">
                <svg className="w-6 h-6 text-wedding-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Hari yang ditunggu telah tiba!
                <svg className="w-6 h-6 text-wedding-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </p>
            </div>
          ) : (
            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="w-8 h-px bg-wedding-gold/40" />
              <p className="font-wedding-script text-base lg:text-lg italic text-wedding-dark/70 px-4">
                Waktu menuju momen bahagia kami bersama
              </p>
              <div className="w-8 h-px bg-wedding-gold/40" />
            </div>
          )}
        </div>

        {/* Wedding Date Display */}
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-wedding-secondary/30 shadow-lg">
          <svg className="w-5 h-5 text-wedding-gold" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span className="font-wedding-body text-sm lg:text-base font-semibold text-wedding-dark">
            24 Januari 2026
          </span>
        </div>
      </div>
    </section>
  );
}