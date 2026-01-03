'use client';

import Image from 'next/image';
import { useWeddingStore } from '@/stores/weddingStore';
import { Card } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ParallaxWrapper } from '@/components/animations/ParallaxWrapper';

export function LoveStorySection() {
  const invitation = useWeddingStore((state) => state.invitation);
  const timeline = invitation?.couple.timeline;

  if (!timeline || timeline.length === 0) {
    return null;
  }

  return (
    <section className="relative py-12 md:py-20 bg-gradient-to-b from-wedding-cream via-wedding-light to-wedding-cream overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-wedding-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-wedding-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="fade" duration={300}>
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-wedding-primary" />
              <h2 className="font-wedding-script text-wedding-primary text-xl md:text-2xl">
                Kisah Kami
              </h2>
              <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-wedding-primary" />
            </div>
            <h3 className="font-wedding-elegant text-3xl md:text-5xl text-wedding-dark mb-4">
              Perjalanan Cinta
            </h3>
            <p className="font-wedding-body text-wedding-dark/90 max-w-2xl mx-auto text-sm md:text-base">
              Setiap kisah cinta memiliki awalnya sendiri. Inilah perjalanan kami dari pertemuan pertama hingga komitmen selamanya.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline Stories */}
        <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
          {timeline.map((story, index) => {
            const isEven = index % 2 === 0;

            return (
              <ScrollReveal
                key={story.id}
                direction="up"
                duration={300}
                delay={index * 100}
              >
                <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}>
                  {/* Image Side */}
                  <div className="w-full md:w-1/2">
                    <ParallaxWrapper speed={0.02} direction="down">
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={story.image}
                          alt={story.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-wedding-dark/30 to-transparent" />
                      </div>
                    </ParallaxWrapper>
                  </div>

                  {/* Content Side */}
                  <div className="w-full md:w-1/2">
                    <Card className="p-6 md:p-8 bg-white/80 backdrop-blur-sm border-wedding-secondary/20">
                      {/* Phase Badge */}
                      <div className="inline-block mb-4">
                        <div className="px-4 py-2 rounded-full bg-wedding-primary/10 border border-wedding-primary/20">
                          <span className="font-wedding-body text-wedding-primary text-sm font-medium">
                            {story.phase}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="font-wedding-elegant text-2xl md:text-3xl text-wedding-dark mb-2">
                        {story.title}
                      </h4>

                      {/* Date */}
                      {story.date && (
                        <p className="font-wedding-script text-wedding-primary text-lg mb-4">
                          {story.date}
                        </p>
                      )}

                      {/* Description */}
                      <p className="font-wedding-body text-wedding-dark/90 leading-relaxed text-sm md:text-base">
                        {story.description}
                      </p>

                      {/* Decorative corner elements */}
                      <div className="mt-6 flex justify-end">
                        <svg width="40" height="40" viewBox="0 0 40 40" className="text-wedding-primary/20">
                          <path
                            d="M0 20 Q 0 0, 20 0 L 40 0 L 40 40 L 20 40 Q 0 40, 0 20 Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </Card>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Decorative Line */}
        <ScrollReveal direction="fade" duration={300} delay={400}>
          <div className="mt-16 md:mt-20 flex items-center justify-center gap-4">
            <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent to-wedding-primary" />
            <div className="w-2 h-2 rounded-full bg-wedding-primary" />
            <div className="h-px w-20 md:w-32 bg-gradient-to-l from-transparent to-wedding-primary" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
