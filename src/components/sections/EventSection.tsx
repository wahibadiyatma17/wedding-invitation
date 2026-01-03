import { useWeddingStore } from '@/stores/weddingStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ParallaxWrapper } from '@/components/animations/ParallaxWrapper';
import Image from 'next/image';

export function EventSection() {
  const { invitation } = useWeddingStore();

  if (!invitation) return null;

  const { events } = invitation;

  const formatEventDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const addToCalendar = (event: typeof events[0]) => {
    const startDate = event.date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDate = event.time.end 
      ? new Date(event.date.getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
      : startDate;
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(event.venue.address)}&location=${encodeURIComponent(event.venue.name)}`;
    
    window.open(url, '_blank');
  };

  return (
    <section className="px-4 py-5 lg:px-6 lg:py-8" style={{background: 'linear-gradient(135deg, #FDF1E9 0%, #F3E2D7 50%, #BFAB97 100%)'}}>
      <div className="max-w-full">
        
        {/* Section Header */}
        <div className="text-center mb-6 animate-fadeInUp">
          <div className="w-8 h-0.5 mx-auto mb-3" style={{backgroundColor: '#C6B283'}}></div>
          <h2 className="text-xl lg:text-3xl font-wedding-elegant mb-2" style={{color: '#311212'}}>
            Wedding Event
          </h2>
          <div className="w-8 h-0.5 mx-auto" style={{backgroundColor: '#C6B283'}}></div>
        </div>

        {/* Events List */}
        <div className="space-y-3">
          {events.map((event, index) => (
            <div key={event.id} className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border shadow-lg animate-fadeInUp" style={{borderColor: 'rgba(191, 171, 151, 0.5)', animationDelay: `${0.2 + index * 0.1}s`}}>
              
              {/* Event Image Header */}
              <div className="relative h-28 lg:h-40">
                <Image
                  src="/images/pre-wedding-images/26.jpg"
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Event Title Overlay */}
                <div className="absolute top-3 left-3">
                  <h3 className="text-white font-wedding-script text-lg lg:text-2xl italic">
                    {event.type === 'akad' ? 'Akad nikah' : 'Resepsi'}
                  </h3>
                </div>

                {/* Event Type Badge */}
                <div className="absolute top-3 right-3">
                  <div className="text-white px-2 py-1 rounded-full text-xs font-wedding-body" style={{backgroundColor: '#C6B283'}}>
                    {event.type === 'akad' ? 'Akad Nikah' : 'Resepsi'}
                  </div>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-3 lg:p-6">
                <div className="flex items-start justify-between">
                  
                  {/* Left Side - Date */}
                  <div className="flex-shrink-0 mr-3">
                    <div className="text-center">
                      <div className="text-2xl lg:text-4xl font-bold text-gray-400 leading-none">
                        {event.date.getDate()}
                      </div>
                      <div className="text-xs font-wedding-body" style={{color: '#7F5F45'}}>
                        {event.date.toLocaleDateString('id-ID', { month: 'long' })}
                      </div>
                      <div className="text-xs font-wedding-body" style={{color: '#8B6914'}}>
                        {event.date.getFullYear()}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Event Details */}
                  <div className="flex-1">
                    
                    {/* Time */}
                    <div className="flex items-center mb-3">
                      <div className="w-2 h-2 rounded-full mr-3" style={{backgroundColor: '#C6B283'}}></div>
                      <span className="text-sm lg:text-base font-wedding-body" style={{color: '#7F5F45'}}>
                        {event.time.start} {event.time.end && `- ${event.time.end}`} WIB
                      </span>
                    </div>

                    {/* Venue */}
                    <div className="mb-4">
                      <h4 className="font-wedding-elegant text-base lg:text-lg font-semibold mb-1" style={{color: '#311212'}}>
                        LOKASI ACARA
                      </h4>
                      <p className="font-wedding-body text-sm lg:text-base font-medium mb-1" style={{color: '#7F5F45'}}>
                        {event.venue.name}
                      </p>
                      <p className="text-xs lg:text-sm leading-relaxed" style={{color: '#8B6914'}}>
                        {event.venue.address}
                      </p>
                    </div>

                    {/* Action Button */}
                    {event.venue.mapUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(event.venue.mapUrl, '_blank')}
                        className="text-xs lg:text-sm px-4 py-2" style={{borderColor: '#C6B283', color: '#7F5F45'}} onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#F3E2D7'; e.currentTarget.style.borderColor = '#7F5F45'}} onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = '#C6B283'}}
                      >
                        Google Maps
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}