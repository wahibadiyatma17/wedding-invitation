'use client';

interface EventMapProps {
  mapUrl: string;
  venueName: string;
}

export function EventMap({ mapUrl, venueName }: EventMapProps) {
  // Extract place ID or coordinates from Google Maps URL
  // Google Maps URL formats:
  // - https://maps.app.goo.gl/xxx (short URL)
  // - https://www.google.com/maps/place/...
  // - https://www.google.com/maps?q=...

  // For embed, we can use the URL directly or convert to embed format
  const getEmbedUrl = (url: string): string => {
    // If it's already a maps URL, convert to embed format
    if (url.includes('maps.app.goo.gl')) {
      // For short URLs, we can embed directly
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d0!3d0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sid!4v1234567890!5m2!1sen!2sid&q=${encodeURIComponent(url)}`;
    }

    // For full Google Maps URLs, extract the place URL
    if (url.includes('google.com/maps')) {
      // Try to extract place ID or coordinates
      const placeMatch = url.match(/place\/([^/]+)/);
      if (placeMatch) {
        return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(placeMatch[1])}`;
      }

      // Fallback: use the URL as-is with embed path
      return url.replace('/maps/', '/maps/embed/').replace('?', '&').replace(/^([^?]+)/, '$1?pb=!1m14!1m12!1m3!1d');
    }

    // Fallback: use a generic embed with the venue name
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(venueName)}`;
  };

  const embedUrl = getEmbedUrl(mapUrl);

  return (
    <div className="mt-4">
      <div className="relative w-full h-64 lg:h-80 rounded-xl overflow-hidden border-2 shadow-lg" style={{borderColor: 'rgba(191, 171, 151, 0.3)'}}>
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map of ${venueName}`}
          className="absolute inset-0"
        />
      </div>
      <p className="text-xs text-center mt-2 font-wedding-body opacity-70" style={{color: '#7F5F45'}}>
        Peta Lokasi {venueName}
      </p>
    </div>
  );
}
