'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { WeddingEvent } from '@/types/wedding';
import L from 'leaflet';

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Dynamically import Leaflet to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface EventsMapProps {
  events: WeddingEvent[];
}

export function EventsMap({ events }: EventsMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-[300px] lg:h-[400px] rounded-xl bg-wedding-cream/50 flex items-center justify-center">
        <p className="text-wedding-dark/60 font-wedding-body">Memuat peta...</p>
      </div>
    );
  }

  // Filter events that have coordinates
  const eventsWithCoords = events.filter(event => event.venue.coordinates);

  if (eventsWithCoords.length === 0) {
    return null;
  }

  // Calculate center point (average of all coordinates)
  const centerLat = eventsWithCoords.reduce((sum, e) => sum + e.venue.coordinates!.lat, 0) / eventsWithCoords.length;
  const centerLng = eventsWithCoords.reduce((sum, e) => sum + e.venue.coordinates!.lng, 0) / eventsWithCoords.length;

  // Determine zoom level based on distance between points
  const zoom = eventsWithCoords.length === 1 ? 15 : 12;

  return (
    <div className="w-full h-[300px] lg:h-[400px] rounded-xl overflow-hidden border-2 shadow-xl" style={{borderColor: 'rgba(191, 171, 151, 0.4)'}}>
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {eventsWithCoords.map((event) => (
          <Marker
            key={event.id}
            position={[event.venue.coordinates!.lat, event.venue.coordinates!.lng]}
          >
            <Popup>
              <div className="text-center p-2">
                <h3 className="font-wedding-elegant font-bold text-sm mb-1" style={{color: '#311212'}}>
                  {event.type === 'akad' ? 'Akad Nikah' : 'Ngunduh Mantu'}
                </h3>
                <p className="font-wedding-body text-xs mb-2" style={{color: '#7F5F45'}}>
                  {event.venue.name}
                </p>
                <a
                  href={event.venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 underline hover:text-blue-800"
                >
                  Buka di Google Maps
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
