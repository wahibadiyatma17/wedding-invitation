import { useWeddingStore } from '@/stores/weddingStore';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { ParallaxWrapper } from '@/components/animations/ParallaxWrapper';
import { CompactCountdown } from '@/components/events/CompactCountdown';

export function EventSection() {
  const { invitation } = useWeddingStore();

  if (!invitation) return null;

  const { events } = invitation;


  return (
    <section className="relative px-4 py-12 lg:py-16 overflow-hidden">
      {/* Parallax Background */}
      <ParallaxWrapper speed={0.03} className="absolute inset-0 -z-20">
        <Image
          src="/images/pre-wedding-images/18.jpg"
          alt="Event section background"
          fill
          className="object-cover"
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(253, 241, 233, 0.93) 0%, rgba(243, 226, 215, 0.90) 50%, rgba(191, 171, 151, 0.88) 100%)'
          }}
        />
      </ParallaxWrapper>

      {/* Content container */}
      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-10 animate-fadeInUp">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-px bg-linear-to-r from-transparent via-wedding-gold to-transparent" />
            <svg className="w-5 h-5 text-wedding-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <div className="w-16 h-px bg-linear-to-l from-transparent via-wedding-gold to-transparent" />
          </div>
          <h2 className="text-2xl lg:text-4xl font-wedding-elegant mb-2 text-wedding-dark">
            Acara Pernikahan
          </h2>
          <p className="text-sm lg:text-base font-wedding-body text-wedding-dark/70 italic">
            Dengan senang hati kami mengundang Bapak/Ibu/Saudara/i
          </p>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {events.map((event, index) => {
            // Create additional events based on type
            const additionalEvents = [];
            
            // For akad events, add resepsi
            if (event.type === 'akad') {
              const resepsiEvent = {
                ...event,
                id: `${event.id}-resepsi`,
                type: 'resepsi' as const,
                title: 'Resepsi',
                time: {
                  start: '12:00 WIB',
                  end: 'Selesai'
                }
              };
              additionalEvents.push(resepsiEvent);
            }
            
            // For ngunduh mantu events, add akad before
            if (event.type === 'resepsi' && event.title === 'Ngunduh Mantu') {
              const akadEvent = {
                id: `${event.id}-akad`,
                type: 'akad' as const,
                title: 'Akad Nikah',
                date: new Date('2026-01-19T10:00:00'),
                time: {
                  start: '08:00 WIB',
                  end: 'Selesai'
                },
                venue: {
                  name: 'Dsn. Silegi, Desa Tlogobulu, Kec. Kaligesing, Kab. Purworejo',
                  address: 'Dsn. Silegi, Desa Tlogobulu, Kec. Kaligesing, Kab. Purworejo',
                  mapUrl: 'https://maps.google.com'
                }
              };
              additionalEvents.unshift(akadEvent); // Add before main event
            }
            
            // Create array of events to render (additional events + main event)
            const eventsToRender = event.type === 'resepsi' && event.title === 'Ngunduh Mantu' 
              ? [...additionalEvents, event] 
              : [event, ...additionalEvents];
              
            return eventsToRender.map((currentEvent, eventIndex) => (
              <div
                key={currentEvent.id}
                className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden border-2 shadow-2xl animate-fadeInUp hover:shadow-3xl transition-all duration-300"
                style={{
                  borderColor: 'rgba(191, 171, 151, 0.4)',
                  animationDelay: `${0.2 + (index + eventIndex) * 0.15}s`
                }}
              >
              <div className="p-6 lg:p-8">
                {/* Event Type Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-10 bg-linear-to-b from-wedding-primary to-wedding-accent rounded-full" />
                    <h3 className="text-xl lg:text-2xl font-wedding-elegant font-bold" style={{color: '#311212'}}>
                      {currentEvent.title}
                    </h3>
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-full text-xs font-wedding-body font-medium shadow-md"
                    style={{backgroundColor: '#C6B283', color: 'white'}}
                  >
                    {currentEvent.type === 'akad' ? 'Akad' : currentEvent.type === 'resepsi' ? 'Resepsi' : 'Ngunduh Mantu'}
                  </div>
                </div>

                {/* Main Event Info */}
                <div className="mb-6">
                  {/* Date & Time */}
                  <div className="mb-4 p-5 bg-white/50 backdrop-blur-sm rounded-xl border shadow-md" style={{borderColor: 'rgba(191, 171, 151, 0.3)'}}>
                    <div className="flex items-start gap-4">
                      {/* Date Number */}
                      <div className="shrink-0 text-center">
                        <div className="text-3xl lg:text-4xl font-wedding-elegant font-bold leading-none mb-1" style={{color: '#7F5F45'}}>
                          {currentEvent.date.getDate()}
                        </div>
                        <div className="text-xs font-wedding-body uppercase tracking-wide" style={{color: '#8B6914'}}>
                          {currentEvent.date.toLocaleDateString('id-ID', { month: 'short' })}
                        </div>
                      </div>

                      {/* Date & Time Details */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-4 h-4" style={{color: '#C6B283'}} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm lg:text-base font-wedding-body font-semibold" style={{color: '#311212'}}>
                            {currentEvent.date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" style={{color: '#C6B283'}} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm lg:text-base font-wedding-body" style={{color: '#7F5F45'}}>
                            {currentEvent.time.start} {currentEvent.time.end && `- ${currentEvent.time.end}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Venue - hide for Akad before Ngunduh Mantu */}
                  {!(currentEvent.id.includes('-akad') && event.title === 'Ngunduh Mantu') && (
                    <div className="mb-4 p-5 bg-white/50 backdrop-blur-sm rounded-xl border shadow-md" style={{borderColor: 'rgba(191, 171, 151, 0.3)'}}>
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-5 h-5" style={{color: '#C6B283'}} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <h4 className="text-sm font-wedding-body font-semibold uppercase tracking-wide" style={{color: '#7F5F45'}}>
                          Lokasi Acara
                        </h4>
                      </div>
                      <p className="text-base lg:text-lg font-wedding-elegant font-semibold mb-2" style={{color: '#311212'}}>
                        {currentEvent.venue.name}
                      </p>
                      <p className="text-sm lg:text-base leading-relaxed mb-4 font-wedding-body" style={{color: '#7F5F45'}}>
                        {currentEvent.venue.address}
                      </p>

                      {/* Google Maps Button */}
                      {currentEvent.venue.mapUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(currentEvent.venue.mapUrl, '_blank')}
                          className="text-sm px-5 py-2.5 w-full font-medium transition-all duration-300"
                          style={{borderColor: '#C6B283', color: '#7F5F45'}}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#F3E2D7';
                            e.currentTarget.style.borderColor = '#7F5F45';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(127, 95, 69, 0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.borderColor = '#C6B283';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <svg className="w-4 h-4 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          Lihat di Google Maps
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                {/* Compact Countdown Timer - hide for Akad before Ngunduh Mantu */}
                {!(currentEvent.id.includes('-akad') && event.title === 'Ngunduh Mantu') && (
                  <div className="pt-4 border-t" style={{borderColor: '#E5D5C5'}}>
                    <div className="text-center mb-2">
                      <p className="text-xs font-wedding-body uppercase tracking-wider opacity-70" style={{color: '#7F5F45'}}>
                        Hitung Mundur
                      </p>
                    </div>
                    <CompactCountdown eventDate={currentEvent.date} />
                  </div>
                )}
              </div>
            </div>
            ));
          })}
        </div>
      </div>
    </section>
  );
}