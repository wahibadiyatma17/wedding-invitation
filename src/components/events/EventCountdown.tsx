'use client';

import { useEventCountdown } from '@/hooks/useEventCountdown';

interface EventCountdownProps {
  eventDate: Date;
}

export function EventCountdown({ eventDate }: EventCountdownProps) {
  const countdown = useEventCountdown(eventDate);

  const timeUnits = [
    { label: 'Hari', value: countdown.days },
    { label: 'Jam', value: countdown.hours },
    { label: 'Menit', value: countdown.minutes },
    { label: 'Detik', value: countdown.seconds }
  ];

  return (
    <div className="mb-6 bg-linear-to-br from-wedding-primary/5 to-wedding-accent/5 rounded-xl p-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {timeUnits.map((unit) => (
          <div key={unit.label} className="text-center">
            <div className="relative bg-linear-to-br from-wedding-primary to-wedding-accent text-white rounded-lg p-3 lg:p-4 mb-2 shadow-lg transform transition-all duration-300 hover:scale-105 group">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />

              {/* Number */}
              <div className="relative text-xl lg:text-3xl font-wedding-elegant font-bold">
                {unit.value.toString().padStart(2, '0')}
              </div>

              {/* Pulsing dot */}
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white/40 rounded-full animate-ping" />
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white/60 rounded-full" />
            </div>

            {/* Label */}
            <div className="text-xs font-wedding-body font-semibold uppercase tracking-widest text-wedding-dark/70">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
