'use client';

import { useEventCountdown } from '@/hooks/useEventCountdown';

interface CompactCountdownProps {
  eventDate: Date;
}

export function CompactCountdown({ eventDate }: CompactCountdownProps) {
  const countdown = useEventCountdown(eventDate);

  const timeUnits = [
    { label: 'Hari', value: countdown.days },
    { label: 'Jam', value: countdown.hours },
    { label: 'Menit', value: countdown.minutes },
    { label: 'Detik', value: countdown.seconds }
  ];

  return (
    <div className="bg-linear-to-br from-wedding-primary/5 to-wedding-accent/5 rounded-xl p-3">
      <div className="grid grid-cols-4 gap-2">
        {timeUnits.map((unit) => (
          <div key={unit.label} className="text-center">
            <div className="bg-linear-to-br from-wedding-primary to-wedding-accent text-white rounded-lg p-2 mb-1 shadow-md">
              <div className="text-lg lg:text-xl font-wedding-elegant font-bold">
                {unit.value.toString().padStart(2, '0')}
              </div>
            </div>
            <div className="text-[10px] font-wedding-body font-semibold uppercase tracking-wide opacity-70" style={{color: '#7F5F45'}}>
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
