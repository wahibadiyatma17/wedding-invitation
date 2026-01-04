'use client';

import { useWeddingStore } from '@/stores/weddingStore';
import { EventsMap } from '@/components/events/EventsMap';

export function EventMapSection() {
  const { invitation } = useWeddingStore();

  if (!invitation) return null;

  const { events } = invitation;

  return (
    <section className="relative px-4 py-12 lg:py-16 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-10 animate-fadeInUp">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-px bg-linear-to-r from-transparent via-wedding-gold to-transparent" />
          <svg className="w-5 h-5 text-wedding-gold" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <div className="w-16 h-px bg-linear-to-l from-transparent via-wedding-gold to-transparent" />
        </div>
        <h2 className="text-2xl lg:text-4xl font-wedding-elegant mb-2 text-wedding-dark">
          Peta Lokasi
        </h2>
        <p className="text-sm lg:text-base font-wedding-body text-wedding-dark/70 italic">
          Lokasi acara pernikahan kami
        </p>
      </div>

      {/* Map */}
      <div className="max-w-4xl mx-auto">
        <EventsMap events={events} />

        {/* Map Legend */}
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          {events.filter(e => e.venue.coordinates).map((event) => (
            <div key={event.id} className="flex items-center gap-2 px-3 py-2 bg-white/60 backdrop-blur-sm rounded-full border shadow-sm" style={{borderColor: 'rgba(191, 171, 151, 0.3)'}}>
              <div className="w-3 h-3 rounded-full" style={{backgroundColor: event.type === 'akad' ? '#7F5F45' : '#C6B283'}} />
              <span className="text-xs font-wedding-body font-medium" style={{color: '#311212'}}>
                {event.type === 'akad' ? 'Akad Nikah' : 'Ngunduh Mantu'}
              </span>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-xs mt-4 font-wedding-body opacity-70" style={{color: '#7F5F45'}}>
          Klik marker pada peta untuk melihat detail lokasi
        </p>
      </div>
    </section>
  );
}
