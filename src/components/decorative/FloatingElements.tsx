import { ParallaxWrapper } from '@/components/animations/ParallaxWrapper';

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-1">
      {/* Subtle geometric shapes */}
      <ParallaxWrapper speed={0.2}>
        <div className="absolute top-10 left-10 w-3 h-3 bg-amber-300/20 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-2 h-2 bg-amber-400/15 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-16 w-4 h-4 bg-amber-500/20 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-32 w-2 h-2 bg-amber-300/25 rounded-full animate-float" style={{animationDelay: '6s'}}></div>
      </ParallaxWrapper>

      {/* Additional floating elements */}
      <ParallaxWrapper speed={0.3}>
        <div className="absolute top-1/3 left-8 w-1 h-1 bg-amber-400/30 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-2/3 right-8 w-3 h-3 bg-amber-300/20 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-amber-500/15 rounded-full animate-float" style={{animationDelay: '5s'}}></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-amber-400/25 rounded-full animate-float" style={{animationDelay: '7s'}}></div>
      </ParallaxWrapper>

      {/* Minimal accent dots */}
      <ParallaxWrapper speed={0.4}>
        <div className="absolute top-16 left-1/2 w-1 h-1 bg-amber-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-24 right-1/3 w-2 h-2 bg-amber-300/25 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-1 h-1 bg-amber-500/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-28 right-1/4 w-2 h-2 bg-amber-400/30 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
      </ParallaxWrapper>
    </div>
  );
}