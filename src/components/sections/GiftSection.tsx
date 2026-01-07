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

  const getBankInfo = (bankName: string) => {
    if (bankName.toLowerCase().includes('bri')) {
      return {
        logo: (
          <div className="w-12 h-8 relative">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_2020.svg"
              alt="BRI Logo"
              fill
              className="object-contain"
            />
          </div>
        ),
        displayName: 'Bank BRI'
      };
    }
    if (bankName.toLowerCase().includes('bca')) {
      return {
        logo: (
          <div className="w-12 h-8 relative">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg"
              alt="BCA Logo"
              fill
              className="object-contain"
            />
          </div>
        ),
        displayName: 'Bank BCA'
      };
    }
    // Default placeholder for other banks
    return {
      logo: (
        <div className="w-10 h-6 rounded flex items-center justify-center" style={{backgroundColor: '#F3E2D7'}}>
          <div className="w-5 h-3 rounded-sm" style={{backgroundColor: '#C6B283'}}></div>
        </div>
      ),
      displayName: bankName
    };
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
        
        <Card className="animate-scaleIn p-4" style={{animationDelay: '0.2s'}}>
          {gifts.message && (
            <div className="mb-8">
              <p className="leading-relaxed" style={{color: '#381516'}}>
                {gifts.message}
              </p>
            </div>
          )}
          
          <div className="grid gap-6 md:grid-cols-2">
            {gifts.bankAccounts.map((account, index) => {
              const bankInfo = getBankInfo(account.bank);
              return (
                <div 
                  key={index} 
                  className="group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(243, 226, 215, 0.9) 100%)',
                    border: '1px solid rgba(191, 171, 151, 0.3)',
                    boxShadow: '0 8px 32px rgba(49, 18, 18, 0.1)'
                  }}
                >
                  {/* Card Background Pattern */}
                  <div 
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 20% 50%, #C6B283 1px, transparent 1px), radial-gradient(circle at 80% 50%, #C6B283 1px, transparent 1px)',
                      backgroundSize: '30px 30px'
                    }}
                  />
                  
                  {/* Top Section - Bank Logo */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center">
                      {bankInfo.logo}
                    </div>
                    <div className="w-8 h-8 rounded-full" style={{background: 'linear-gradient(45deg, #F3E2D7, #C6B283)'}}></div>
                  </div>
                  
                  {/* Account Number */}
                  <div className="mb-4">
                    <div 
                      className="font-mono font-bold text-base md:text-lg tracking-widest"
                      style={{color: '#311212'}}
                    >
                      {account.accountNumber.replace(/(\d{4})/g, '$1 ').trim()}
                    </div>
                  </div>
                  
                  {/* Bottom Section */}
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="font-semibold text-base" style={{color: '#311212'}}>
                        {account.accountName}
                      </div>
                    </div>
                    
                    {/* Copy Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(account.accountNumber)}
                      className="relative overflow-hidden px-3 py-2 transition-all duration-300 border-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(243, 226, 215, 0.8), rgba(198, 178, 131, 0.6))',
                        color: '#7F5F45'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(127, 95, 69, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </Button>
                  </div>
                  
                  {/* Card Shine Effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%)',
                      transform: 'translateX(-100%)',
                      animation: 'shimmer 2s infinite'
                    }}
                  />
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
}