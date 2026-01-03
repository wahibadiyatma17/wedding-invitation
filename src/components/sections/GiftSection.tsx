import { useWeddingStore } from '@/stores/weddingStore';
import { useUIStore } from '@/stores/uiStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ParallaxWrapper } from '@/components/animations/ParallaxWrapper';
import Image from 'next/image';

export function GiftSection() {
  const { invitation } = useWeddingStore();
  const { addToast } = useUIStore();

  if (!invitation) return null;

  const { gifts } = invitation;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      addToast({
        type: 'success',
        message: 'Nomor rekening berhasil disalin!'
      });
    } catch {
      addToast({
        type: 'error',
        message: 'Gagal menyalin nomor rekening'
      });
    }
  };

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <ParallaxWrapper speed={0.03} className="absolute inset-0 -z-20">
        <Image
          src="/images/pre-wedding-images/24.jpg"
          alt="Gift section background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 z-10" style={{background: 'linear-gradient(135deg, rgba(253, 241, 233, 0.95) 0%, rgba(243, 226, 215, 0.90) 50%, rgba(191, 171, 151, 0.85) 100%)'}}></div>
      </ParallaxWrapper>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="mb-12 animate-fadeInUp">
          <div className="w-24 h-0.5 mx-auto mb-4" style={{background: 'linear-gradient(90deg, transparent, #C6B283, transparent)'}}></div>
          <h2 className="text-3xl md:text-4xl font-wedding-elegant mb-4" style={{color: '#311212'}}>
            Wedding Gift
          </h2>
          <div className="w-24 h-0.5 mx-auto" style={{background: 'linear-gradient(90deg, transparent, #C6B283, transparent)'}}></div>
        </div>
        
        <Card className="animate-scaleIn" style={{animationDelay: '0.2s'}}>
          {gifts.message && (
            <div className="mb-8">
              <p className="leading-relaxed" style={{color: '#381516'}}>
                {gifts.message}
              </p>
            </div>
          )}
          
          <div className="space-y-6">
            {gifts.bankAccounts.map((account, index) => (
              <div key={index} className="border rounded-lg p-6 bg-white/80 backdrop-blur-sm" style={{borderColor: '#BFAB97'}}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold font-wedding-elegant" style={{color: '#311212'}}>
                    {account.bank}
                  </h3>
                  <div className="w-12 h-8 rounded flex items-center justify-center" style={{backgroundColor: '#F3E2D7'}}>
                    <div className="w-6 h-4 rounded-sm" style={{backgroundColor: '#C6B283'}}></div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="font-wedding-body" style={{color: '#7F5F45'}}>Nomor Rekening:</span>
                    <span className="font-mono font-semibold" style={{color: '#311212'}}>
                      {account.accountNumber}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-wedding-body" style={{color: '#7F5F45'}}>Atas Nama:</span>
                    <span className="font-semibold" style={{color: '#311212'}}>
                      {account.accountName}
                    </span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(account.accountNumber)}
                  className="w-full transition-all duration-300" style={{borderColor: '#BFAB97', color: '#7F5F45'}} onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = '#F3E2D7'; e.currentTarget.style.borderColor = '#C6B283'}} onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = '#BFAB97'}}
                >
                  Salin Nomor Rekening
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 backdrop-blur-sm rounded-lg border" style={{backgroundColor: 'rgba(243, 226, 215, 0.7)', borderColor: '#BFAB97'}}>
            <p className="text-sm font-wedding-body" style={{color: '#381516'}}>
              Terima kasih atas kebaikan dan perhatian Anda
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}