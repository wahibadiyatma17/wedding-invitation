'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useWeddingStore } from '@/stores/weddingStore';
import { weddingData } from '@/data/weddingData';
import Image from 'next/image';

import { OpeningSection } from '@/components/sections/OpeningSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { EventSection } from '@/components/sections/EventSection';
import { EventMapSection } from '@/components/sections/EventMapSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { GiftSection } from '@/components/sections/GiftSection';
import { GuestbookSection } from '@/components/sections/GuestbookSection';

import { MusicControl } from '@/components/ui/MusicControl';
import { Modal } from '@/components/ui/Modal';
import { ToastContainer } from '@/components/ui/Toast';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { FloatingElements } from '@/components/decorative/FloatingElements';

interface InvitationPageContentProps {
  eventFilter?: 'akad' | 'resepsi';
}

export function InvitationPageContent({ eventFilter }: InvitationPageContentProps) {
  const { setInvitation, setGuestName } = useWeddingStore();
  const searchParams = useSearchParams();
  const [isMainContentVisible, setIsMainContentVisible] = useState(false);

  useEffect(() => {
    const guestName = searchParams.get('to');

    // Filter events based on eventFilter prop
    let filteredEvents = eventFilter
      ? weddingData.events.filter(e => e.type === eventFilter)
      : weddingData.events;

    // Safety check - fallback to all events if filtering returns empty
    if (filteredEvents.length === 0) {
      console.error(`No events found for filter: ${eventFilter}`);
      filteredEvents = weddingData.events;
    }

    const invitationWithGuest = {
      ...weddingData,
      events: filteredEvents,
      guestName: guestName || undefined,
    };

    setInvitation(invitationWithGuest);
    if (guestName) {
      setGuestName(guestName);
    }
  }, [setInvitation, setGuestName, searchParams, eventFilter]);

  // Listen for opening animation completion
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    const handleOpeningComplete = () => {
      setIsMainContentVisible(true);

      // Remove overflow hidden after animation completes
      setTimeout(() => {
        const mainElement = document.querySelector('main');
        if (mainElement) {
          mainElement.classList.remove('overflow-hidden');
        }
      }, 800); // Match animation duration
    };

    window.addEventListener('openingAnimationComplete', handleOpeningComplete);
    return () => {
      window.removeEventListener('openingAnimationComplete', handleOpeningComplete);
    };
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden" style={{background: '#FDF1E9'}}>
      <OpeningSection />

      {/* Desktop Split Layout / Mobile Single Column */}
      <div className={`lg:flex lg:h-screen relative z-40 ${isMainContentVisible ? 'animate-slideUpFromBottom' : 'transform translate-y-full'}`} style={{background: 'linear-gradient(135deg, #FDF1E9 0%, #F3E2D7 50%, #BFAB97 100%)'}}>
        {/* Left Side - Full Background Image (Desktop Only) */}
        <div className="hidden lg:block lg:flex-1 lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:right-[450px]">
          <Image
            src="/images/pre-wedding-images/25.jpg"
            alt="Wedding background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/30 via-black/20 to-black/40"></div>

          {/* Overlay Text on Image */}
          <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-2xl font-wedding-elegant mb-2 tracking-wide opacity-90">
              THE WEDDING OF
            </h1>
            <p className="text-5xl font-wedding-script leading-tight">Aji & Ery</p>
            <p className="text-base font-wedding-body mt-4 opacity-80 tracking-wider">
              24 . 01 . 2026
            </p>
          </div>
        </div>

        {/* Right Side - Scrollable Content (Fixed 450px width) */}
        <div
          className="w-full lg:w-[450px] lg:ml-auto lg:fixed lg:right-0 lg:top-0 lg:h-screen lg:overflow-y-auto"
          style={{ background: 'linear-gradient(135deg, #FDF1E9 0%, #F3E2D7 50%, #BFAB97 100%)' }}
        >
          <ScrollReveal direction="fade" threshold={0.1}>
            <HeroSection />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100} threshold={0.15}>
            <EventSection />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={125} threshold={0.15}>
            <EventMapSection />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150} threshold={0.15}>
            <GallerySection />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200} threshold={0.15}>
            <GiftSection />
          </ScrollReveal>

          <GuestbookSection />
        </div>
      </div>

      {weddingData.musicUrl && <MusicControl src={weddingData.musicUrl} />}

      <Modal />
      <ToastContainer />
      <FloatingElements />
    </main>
  );
}
