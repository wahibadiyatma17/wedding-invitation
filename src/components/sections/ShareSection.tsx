'use client';

import { useShare } from '@/hooks/useShare';
import { ShareButton } from '@/components/ui/ShareButton';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Share2 } from 'lucide-react';

export function ShareSection() {
  const {
    shareToWhatsApp,
    shareToFacebook,
    shareToTwitter,
    copyLink,
    nativeShare,
    isNativeShareSupported
  } = useShare();

  return (
    <section className="relative py-12 md:py-20 bg-gradient-to-b from-wedding-cream to-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="fade" duration={300}>
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-wedding-primary" />
              <Share2 className="w-6 h-6 text-wedding-primary" />
              <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-wedding-primary" />
            </div>
            <h2 className="font-wedding-elegant text-3xl md:text-5xl text-wedding-dark mb-4">
              Bagikan Undangan
            </h2>
            <p className="font-wedding-body text-wedding-dark/90 max-w-2xl mx-auto text-sm md:text-base">
              Bantu kami menyebarkan kebahagiaan dengan membagikan undangan ini kepada keluarga dan teman-teman.
            </p>
          </div>
        </ScrollReveal>

        {/* Share Buttons Grid */}
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <ScrollReveal direction="up" duration={300} delay={0}>
              <ShareButton
                platform="whatsapp"
                onClick={shareToWhatsApp}
              />
            </ScrollReveal>

            <ScrollReveal direction="up" duration={300} delay={100}>
              <ShareButton
                platform="facebook"
                onClick={shareToFacebook}
              />
            </ScrollReveal>

            <ScrollReveal direction="up" duration={300} delay={200}>
              <ShareButton
                platform="twitter"
                onClick={shareToTwitter}
              />
            </ScrollReveal>

            <ScrollReveal direction="up" duration={300} delay={300}>
              <ShareButton
                platform="copy"
                onClick={copyLink}
              />
            </ScrollReveal>
          </div>

          {/* Mobile Native Share Button */}
          {isNativeShareSupported && (
            <ScrollReveal direction="up" duration={300} delay={400}>
              <div className="mt-6 md:hidden">
                <button
                  onClick={nativeShare}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-wedding-primary to-wedding-accent text-white font-wedding-body font-medium shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Bagikan Undangan
                </button>
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* Decorative Bottom Line */}
        <ScrollReveal direction="fade" duration={300} delay={500}>
          <div className="mt-12 md:mt-16 flex items-center justify-center gap-4">
            <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent to-wedding-primary" />
            <div className="w-2 h-2 rounded-full bg-wedding-primary" />
            <div className="h-px w-20 md:w-32 bg-gradient-to-l from-transparent to-wedding-primary" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
