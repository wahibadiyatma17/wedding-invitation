'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useWeddingStore } from '@/stores/weddingStore';
import { useUIStore } from '@/stores/uiStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ParallaxWrapper } from '@/components/animations/ParallaxWrapper';
import { MessageCircle, Clock } from 'lucide-react';

export function GuestbookSection() {
  const invitation = useWeddingStore((state) => state.invitation);
  const guestbookEntries = useWeddingStore((state) => state.guestbookEntries);
  const isGuestbookLoading = useWeddingStore((state) => state.isGuestbookLoading);
  const guestbookError = useWeddingStore((state) => state.guestbookError);
  const addGuestbookEntry = useWeddingStore((state) => state.addGuestbookEntry);
  const subscribeToGuestbookUpdates = useWeddingStore((state) => state.subscribeToGuestbookUpdates);
  const addToast = useUIStore((state) => state.addToast);

  const [formData, setFormData] = useState({
    guestName: '',
    message: '',
    attendanceStatus: undefined as 'attending' | 'not-attending' | 'maybe' | undefined,
  });
  const [showAll, setShowAll] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // Auto-fill guest name from URL parameter
  useEffect(() => {
    if (invitation?.guestName && !formData.guestName) {
      setFormData(prev => ({
        ...prev,
        guestName: invitation.guestName || ''
      }));
    }
  }, [invitation?.guestName, formData.guestName]);

  // Set up real-time listener on component mount
  useEffect(() => {
    const unsubscribe = subscribeToGuestbookUpdates();
    if (unsubscribe) {
      unsubscribeRef.current = unsubscribe;
    }

    // Cleanup on unmount
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [subscribeToGuestbookUpdates]);

  const displayedEntries = showAll ? guestbookEntries : guestbookEntries.slice(0, 10);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.guestName.trim()) {
      addToast({ type: 'error', message: 'Mohon isi nama Anda' });
      return;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      addToast({ type: 'error', message: 'Pesan minimal 10 karakter' });
      return;
    }

    if (formData.message.length > 500) {
      addToast({ type: 'error', message: 'Pesan maksimal 500 karakter' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Debug logging to verify form data
      console.log('Submitting guestbook entry:', {
        guestName: formData.guestName.trim(),
        message: formData.message.trim(),
        attendanceStatus: formData.attendanceStatus,
      });

      await addGuestbookEntry({
        guestName: formData.guestName.trim(),
        message: formData.message.trim(),
        attendanceStatus: formData.attendanceStatus,
      });

      addToast({
        type: 'success',
        message: 'Terima kasih atas ucapan dan doa Anda!'
      });

      // Reset form but keep guest name from URL if it exists
      setFormData({
        guestName: invitation?.guestName || '',
        message: '',
        attendanceStatus: undefined,
      });
    } catch (error) {
      console.error('Error submitting guestbook entry:', error);

      // Log detailed error information
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }

      // Check if it's a Firebase error
      const firebaseError = error as any;
      if (firebaseError?.code) {
        console.error('Firebase error code:', firebaseError.code);
        console.error('Firebase error details:', firebaseError.message);

        // Show specific error messages
        if (firebaseError.code === 'permission-denied') {
          addToast({
            type: 'error',
            message: 'Akses ditolak. Silakan hubungi administrator.'
          });
        } else {
          addToast({
            type: 'error',
            message: 'Gagal mengirim pesan. Silakan coba lagi.'
          });
        }
      } else {
        addToast({
          type: 'error',
          message: 'Gagal mengirim pesan. Silakan coba lagi.'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - new Date(date).getTime();
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMins < 1) return 'Baru saja';
    if (diffInMins < 60) return `${diffInMins} menit yang lalu`;
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
    if (diffInDays === 1) return 'Kemarin';
    return `${diffInDays} hari yang lalu`;
  };

  const getAttendanceBadge = (status?: 'attending' | 'not-attending' | 'maybe') => {
    switch (status) {
      case 'attending':
        return { label: 'Hadir', color: 'bg-wedding-sage text-white', dotColor: 'bg-white/90' };
      case 'not-attending':
        return { label: 'Tidak Hadir', color: 'bg-wedding-secondary text-wedding-dark', dotColor: 'bg-wedding-dark/70' };
      case 'maybe':
        return { label: 'Ragu', color: 'bg-wedding-terracotta text-white', dotColor: 'bg-white/90' };
      default:
        return null;
    }
  };

  return (
    <section className="relative py-12 md:py-20 bg-wedding-dark overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ParallaxWrapper speed={0.05} direction="down">
          <div className="relative w-full h-full">
            <Image
              src="/images/pre-wedding-images/1.jpg"
              alt="Guestbook Background"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-b from-wedding-dark/90 via-wedding-dark/85 to-wedding-dark/90" />
          </div>
        </ParallaxWrapper>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="fade" duration={300}>
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 md:w-20 bg-linear-to-r from-transparent to-wedding-gold" />
              <MessageCircle className="w-6 h-6 text-wedding-gold" />
              <div className="h-px w-12 md:w-20 bg-linear-to-l from-transparent to-wedding-gold" />
            </div>
            <h2 className="font-wedding-elegant text-3xl md:text-5xl text-wedding-cream mb-4">
              RSVP
            </h2>
            <p className="font-wedding-body text-wedding-cream/95 max-w-2xl mx-auto text-sm md:text-base">
              Tulis ucapan dan doa terbaik untuk kami. Setiap kata dari Anda sangat berarti bagi kami.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
          {/* Guestbook Form */}
          <ScrollReveal direction="up" duration={300}>
            <Card className="p-6 md:p-8 bg-white/95 backdrop-blur-sm border-wedding-secondary/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="guestName" className="block font-wedding-body text-wedding-dark font-medium mb-2">
                    Nama <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="guestName"
                    type="text"
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    placeholder="Masukkan nama Anda"
                    className="w-full px-4 py-3 rounded-lg border border-wedding-secondary/30 focus:border-wedding-accent focus:ring-2 focus:ring-wedding-accent/20 outline-none transition-all font-sans text-wedding-dark"
                    required
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block font-wedding-body text-wedding-dark font-medium mb-2">
                    Ucapan & Doa <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tulis ucapan dan doa terbaik untuk kami..."
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-3 rounded-lg border border-wedding-secondary/30 focus:border-wedding-accent focus:ring-2 focus:ring-wedding-accent/20 outline-none transition-all font-sans text-wedding-dark resize-none"
                    required
                  />
                  <p className="text-xs text-wedding-dark/75 mt-1 text-right">
                    {formData.message.length}/500 karakter
                  </p>
                </div>

                {/* Attendance Status (Optional) */}
                <div>
                  <label className="block font-wedding-body text-wedding-dark font-medium mb-3">
                    Status Kehadiran (Opsional)
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {([
                      { 
                        value: 'attending' as const, 
                        label: 'Hadir', 
                        selectedBg: 'bg-wedding-sage',
                        selectedText: 'text-white',
                        selectedBorder: 'border-wedding-sage',
                        dotColor: 'bg-wedding-sage',
                        selectedDotColor: 'bg-white/90'
                      },
                      { 
                        value: 'not-attending' as const, 
                        label: 'Tidak Hadir', 
                        selectedBg: 'bg-wedding-secondary',
                        selectedText: 'text-wedding-dark',
                        selectedBorder: 'border-wedding-secondary',
                        dotColor: 'bg-wedding-secondary',
                        selectedDotColor: 'bg-wedding-dark/70'
                      },
                    ] as const).map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          attendanceStatus: formData.attendanceStatus === option.value
                            ? undefined
                            : option.value
                        })}
                        className={`px-4 py-3 rounded-full border-2 transition-all duration-300 font-wedding-body text-sm font-medium flex items-center gap-2 shadow-sm hover:shadow-md ${
                          formData.attendanceStatus === option.value
                            ? `${option.selectedBg} ${option.selectedText} ${option.selectedBorder} scale-105 shadow-lg`
                            : 'bg-white text-wedding-dark border-wedding-secondary/40 hover:border-wedding-accent hover:bg-wedding-cream/50'
                        }`}
                      >
                        <div className={`w-2.5 h-2.5 rounded-full transition-colors ${
                          formData.attendanceStatus === option.value
                            ? option.selectedDotColor
                            : option.dotColor
                        }`} />
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="elegant"
                  disabled={isSubmitting}
                  className="w-full min-h-[44px]"
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
                </Button>
              </form>
            </Card>
          </ScrollReveal>

          {/* Comments Wall */}
          <div className="space-y-6">
            <ScrollReveal direction="fade" duration={300} delay={100}>
              <h3 className="font-wedding-elegant text-2xl md:text-3xl text-wedding-cream text-center mb-8">
                Ucapan dari Tamu
              </h3>
            </ScrollReveal>

            {guestbookEntries.length === 0 ? (
              <ScrollReveal direction="fade" duration={300} delay={200}>
                <Card className="p-8 md:p-12 bg-white/95 backdrop-blur-sm text-center">
                  <MessageCircle className="w-12 h-12 text-wedding-primary/70 mx-auto mb-4" />
                  <p className="font-wedding-body text-wedding-dark/80">
                    Belum ada ucapan. Jadilah yang pertama memberikan ucapan dan doa!
                  </p>
                </Card>
              </ScrollReveal>
            ) : (
              <>
                <div className="space-y-4">
                  {displayedEntries.map((entry, index) => {
                    const badge = getAttendanceBadge(entry.attendanceStatus);
                    return (
                      <ScrollReveal
                        key={entry.id}
                        direction="up"
                        duration={300}
                        delay={index * 100}
                      >
                        <Card className="p-4 md:p-6 bg-white/95 backdrop-blur-sm border-wedding-secondary/20 hover:shadow-xl transition-shadow">
                          <div className="flex items-start gap-3">
                            {/* Avatar Placeholder */}
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-wedding-primary to-wedding-accent flex items-center justify-center text-white font-wedding-elegant text-lg">
                              {entry.guestName.charAt(0).toUpperCase()}
                            </div>

                            <div className="flex-1 min-w-0">
                              {/* Name and Badges */}
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h4 className="font-wedding-body font-semibold text-wedding-dark">
                                  {entry.guestName}
                                </h4>
                                {badge && (
                                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${badge.color} shadow-sm`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${badge.dotColor}`} />
                                    {badge.label}
                                  </span>
                                )}
                              </div>

                              {/* Message */}
                              <p className="font-wedding-body text-wedding-dark/90 italic text-sm md:text-base mb-2 leading-relaxed">
                                &ldquo;{entry.message}&rdquo;
                              </p>

                              {/* Meta Info */}
                              <div className="flex flex-wrap items-center gap-3 text-xs text-wedding-dark/70">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {getTimeAgo(entry.submittedAt)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </ScrollReveal>
                    );
                  })}
                </div>

                {/* Load More Button */}
                {!showAll && guestbookEntries.length > 10 && (
                  <ScrollReveal direction="fade" duration={300}>
                    <div className="text-center pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setShowAll(true)}
                        className="min-h-[44px]"
                      >
                        Lihat Semua ({guestbookEntries.length - 10} lainnya)
                      </Button>
                    </div>
                  </ScrollReveal>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
