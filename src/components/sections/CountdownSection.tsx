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
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border shadow-lg mb-5 animate-scaleIn" style={{borderColor: '#BFAB97', animationDelay: '0.2s'}}>
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
    <section className="px-4 py-5 lg:px-6 lg:py-8">
      <div className="max-w-full text-center">
        
        {/* Section Header */}
        <div className="mb-6 animate-fadeInUp">
          <div className="w-8 h-0.5 mx-auto mb-3" style={{backgroundColor: '#7F5F45'}}></div>
          <h2 className="text-xl lg:text-3xl font-wedding-elegant mb-2" style={{color: '#311212'}}>
            Menuju Hari Bahagia
          </h2>
          <div className="w-8 h-0.5 mx-auto" style={{backgroundColor: '#7F5F45'}}></div>
        </div>
        
        {/* Countdown Cards - Optimized for 450px */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border shadow-lg mb-5 animate-scaleIn" style={{borderColor: '#BFAB97', animationDelay: '0.2s'}}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {timeUnits.map((unit, index) => (
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
          
          {countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0 ? (
            <div className="mt-6 p-4 rounded-xl border" style={{background: 'linear-gradient(to right, #F3E2D7, #D6CB94)', borderColor: '#BFAB97'}}>
              <p className="font-wedding-elegant font-semibold text-lg" style={{color: '#311212'}}>
                Hari yang ditunggu telah tiba!
              </p>
            </div>
          ) : (
            <div className="mt-6">
              <p className="font-wedding-script text-sm lg:text-base italic" style={{color: '#381516'}}>
                Waktu menuju momen bahagia kami bersama
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}