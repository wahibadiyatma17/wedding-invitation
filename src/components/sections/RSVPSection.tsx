import { useState } from 'react';
import { useWeddingStore } from '@/stores/weddingStore';
import { useUIStore } from '@/stores/uiStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RSVP } from '@/types/wedding';
import { ParallaxWrapper } from '@/components/animations/ParallaxWrapper';
import Image from 'next/image';

export function RSVPSection() {
  const { invitation, addRSVP } = useWeddingStore();
  const { addToast } = useUIStore();
  
  const [formData, setFormData] = useState({
    guestName: '',
    attendance: '' as 'yes' | 'no' | 'maybe',
    guestCount: 1,
    message: ''
  });

  if (!invitation) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.guestName || !formData.attendance) {
      addToast({
        type: 'error',
        message: 'Mohon lengkapi nama dan konfirmasi kehadiran'
      });
      return;
    }

    const rsvp: RSVP = {
      guestName: formData.guestName,
      attendance: formData.attendance,
      guestCount: formData.attendance === 'yes' ? formData.guestCount : undefined,
      message: formData.message || undefined,
      submittedAt: new Date()
    };

    addRSVP(rsvp);
    
    addToast({
      type: 'success',
      message: 'Terima kasih! Konfirmasi kehadiran Anda telah diterima.'
    });

    setFormData({
      guestName: '',
      attendance: '' as 'yes' | 'no' | 'maybe',
      guestCount: 1,
      message: ''
    });
  };

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <ParallaxWrapper speed={0.03} className="absolute inset-0 -z-20">
        <Image
          src="/images/pre-wedding-images/23.jpg"
          alt="RSVP section background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 z-10" style={{background: 'linear-gradient(135deg, rgba(253, 241, 233, 0.95) 0%, rgba(243, 226, 215, 0.90) 50%, rgba(191, 171, 151, 0.85) 100%)'}}></div>
      </ParallaxWrapper>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="w-24 h-0.5 mx-auto mb-4" style={{background: 'linear-gradient(90deg, transparent, #C6B283, transparent)'}}></div>
          <h2 className="text-3xl md:text-4xl font-wedding-elegant mb-4" style={{color: '#311212'}}>
            RSVP
          </h2>
          <div className="w-24 h-0.5 mx-auto" style={{background: 'linear-gradient(90deg, transparent, #C6B283, transparent)'}}></div>
        </div>
        
        <Card className="animate-slideInUp" style={{animationDelay: '0.2s'}}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-wedding-body font-medium mb-2" style={{color: '#381516'}}>
                Nama Lengkap *
              </label>
              <input
                type="text"
                value={formData.guestName}
                onChange={(e) => setFormData(prev => ({ ...prev, guestName: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-wedding-accent focus:border-transparent bg-white/90 backdrop-blur-sm" style={{borderColor: '#BFAB97'}}
                placeholder="Masukkan nama lengkap Anda"
                required
              />
            </div>

            <div>
              <label className="block font-wedding-body font-medium mb-2" style={{color: '#381516'}}>
                Konfirmasi Kehadiran *
              </label>
              <div className="space-y-3">
                {[
                  { value: 'yes', label: 'Ya, saya akan hadir' },
                  { value: 'no', label: 'Maaf, saya tidak bisa hadir' },
                  { value: 'maybe', label: 'Masih belum pasti' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-wedding-light" style={{borderColor: '#BFAB97'}}>
                    <input
                      type="radio"
                      value={option.value}
                      checked={formData.attendance === option.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, attendance: e.target.value as 'yes' | 'no' | 'maybe' }))}
                      className="mr-3 focus:ring-wedding-accent" style={{color: '#7F5F45'}}
                    />
                    <span className="font-wedding-body" style={{color: '#381516'}}>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.attendance === 'yes' && (
              <div>
                <label className="block font-wedding-body font-medium mb-2" style={{color: '#381516'}}>
                  Jumlah Tamu
                </label>
                <select
                  value={formData.guestCount}
                  onChange={(e) => setFormData(prev => ({ ...prev, guestCount: parseInt(e.target.value) }))}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-wedding-accent focus:border-transparent bg-white/90 backdrop-blur-sm" style={{borderColor: '#BFAB97'}}
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>
                      {num} orang
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block font-wedding-body font-medium mb-2" style={{color: '#381516'}}>
                Pesan & Ucapan
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-wedding-accent focus:border-transparent bg-white/90 backdrop-blur-sm" style={{borderColor: '#BFAB97'}}
                placeholder="Berikan ucapan terbaik untuk pasangan ini..."
              />
            </div>

            <Button 
              type="submit" 
              className="w-full text-white font-wedding-body transform hover:scale-105 transition-all duration-300 shadow-lg" 
              style={{background: 'linear-gradient(135deg, #7F5F45, #C6B283)'}}
              size="lg"
            >
              Kirim Konfirmasi
            </Button>
          </form>
        </Card>

        {invitation.rsvps.length > 0 && (
          <div className="mt-12 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
            <div className="text-center mb-8">
              <div className="w-20 h-0.5 mx-auto mb-4" style={{background: 'linear-gradient(90deg, transparent, #D6CB94, transparent)'}}></div>
              <h3 className="text-xl font-wedding-elegant mb-2" style={{color: '#311212'}}>
                Ucapan dari Tamu
              </h3>
              <div className="w-20 h-0.5 mx-auto" style={{background: 'linear-gradient(90deg, transparent, #D6CB94, transparent)'}}></div>
            </div>
            <div className="space-y-4">
              {invitation.rsvps
                .filter(rsvp => rsvp.message)
                .slice(-5)
                .reverse()
                .map((rsvp, index) => (
                  <Card key={index} className="text-left bg-white/80 backdrop-blur-sm" style={{borderColor: '#BFAB97'}}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold font-wedding-body" style={{color: '#311212'}}>
                        {rsvp.guestName}
                      </h4>
                      <span className="text-xs" style={{color: '#8B6914'}}>
                        {rsvp.submittedAt.toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <p className="text-sm italic font-wedding-body" style={{color: '#7F5F45'}}>
                      &ldquo;{rsvp.message}&rdquo;
                    </p>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}