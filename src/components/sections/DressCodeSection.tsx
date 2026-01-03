import { useWeddingStore } from '@/stores/weddingStore';
import { Card } from '@/components/ui/Card';
import { ParallaxWrapper } from '@/components/animations/ParallaxWrapper';
import Image from 'next/image';

export function DressCodeSection() {
  const { invitation } = useWeddingStore();

  if (!invitation) return null;

  const { dressCode } = invitation;

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <ParallaxWrapper speed={0.03} className="absolute inset-0 -z-20">
        <Image
          src="/images/pre-wedding-images/27.jpg"
          alt="Dress code background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 z-10" style={{background: 'linear-gradient(135deg, rgba(253, 241, 233, 0.95) 0%, rgba(243, 226, 215, 0.90) 50%, rgba(191, 171, 151, 0.85) 100%)'}}></div>
      </ParallaxWrapper>
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="mb-12 animate-fadeInUp">
          <div className="w-24 h-0.5 mx-auto mb-4" style={{background: 'linear-gradient(90deg, transparent, #C6B283, transparent)'}}></div>
          <h2 className="text-3xl md:text-4xl font-wedding-elegant mb-4" style={{color: '#311212'}}>
            Dress Code
          </h2>
          <div className="w-24 h-0.5 mx-auto" style={{background: 'linear-gradient(90deg, transparent, #C6B283, transparent)'}}></div>
        </div>
        
        <Card className="animate-scaleIn" style={{animationDelay: '0.2s'}}>
          <div className="mb-6">
            <p className="leading-relaxed" style={{color: '#381516'}}>
              {dressCode.description}
            </p>
          </div>
          
          <div className="flex justify-center space-x-4 mb-6">
            {dressCode.colors.map((color, index) => (
              <div key={index} className="text-center">
                <div 
                  className="w-16 h-16 rounded-full border-4 border-white shadow-lg mx-auto mb-2"
                  style={{ backgroundColor: color }}
                />
                {dressCode.suggestions && dressCode.suggestions[index] && (
                  <p className="text-sm" style={{color: '#8B6914'}}>
                    {dressCode.suggestions[index]}
                  </p>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-sm" style={{color: '#87A96B'}}>
            Kami akan sangat senang jika Anda mengenakan salah satu dari warna di atas
          </div>
        </Card>
      </div>
    </section>
  );
}