# Parallax Effects Guide

## ✨ Parallax Implementation Complete!

The wedding invitation website now features beautiful parallax scrolling effects that create depth and visual interest throughout the user experience.

## 🎯 Parallax Features Implemented

### 1. **Opening Section Parallax**
- **Multi-layer background movement** with different speeds
- **Floating elements** that move organically during scroll
- **Background gradients** simulate lake and sunset scenes
- **Dynamic overlays** with varying parallax speeds

### 2. **Section-Based Parallax**
- **HeroSection**: Subtle background orbs with gentle movement
- **CountdownSection**: Floating background elements
- **EventSection**: Layered background effects with card animations
- **Global Background**: Site-wide parallax elements for cohesion

### 3. **Performance Optimizations**
- **CSS Hardware acceleration** with `transform: translateZ(0)`
- **Will-change properties** for smooth animations
- **FPS monitoring** to ensure 30+ FPS performance
- **Reduced motion support** for accessibility
- **Mobile-optimized** parallax effects

## 🛠️ Technical Architecture

### Components Created:
```
src/
├── components/animations/
│   └── ParallaxWrapper.tsx     # Reusable parallax component
├── hooks/
│   ├── useParallax.ts          # Parallax scroll hooks
│   └── usePerformanceMonitor.ts # Performance monitoring
└── app/globals.css             # Parallax performance CSS
```

### ParallaxWrapper Component
```tsx
<ParallaxWrapper speed={0.3} direction="up" offset={20}>
  <YourContent />
</ParallaxWrapper>
```

**Props:**
- `speed`: Parallax movement speed (0.1 = slow, 1.0 = fast)
- `direction`: Movement direction ('up', 'down', 'left', 'right')
- `offset`: Initial offset value
- `className`: Additional CSS classes

### useParallax Hook
```tsx
const offset = useParallax(0.5); // 0.5 speed multiplier
```

## 🎨 Parallax Effects by Section

### **Opening Section**
- **Background layers**: 3 different parallax speeds (0.3x, 0.5x, 0.7x)
- **Floating orbs**: 6 elements with unique movement patterns
- **Secondary overlay**: Moves independently for depth

### **Hero Section** 
- **Background orbs**: Subtle movement at 0.1x speed
- **Content layers**: Text moves at 0.15-0.2x speed
- **Atmospheric elements**: Large blurred shapes for ambiance

### **Event Section**
- **Background gradients**: Layered movement at different speeds
- **Card staggering**: Each event card has slight offset for rhythm
- **Organic shapes**: Blurred elements create depth

### **Countdown Section**
- **Corner elements**: Diagonal parallax movement
- **Central focus**: Background shapes emphasize countdown timer

## 📱 Mobile Optimization

- **Reduced parallax intensity** on smaller screens
- **Performance monitoring** automatically disables effects if FPS < 30
- **Respects `prefers-reduced-motion`** accessibility setting
- **Touch-optimized** smooth scrolling

## 🚀 Performance Features

### Automatic Performance Detection:
- Monitors FPS in real-time
- Disables parallax if performance drops
- Respects user accessibility preferences
- Uses CSS GPU acceleration

### Browser Compatibility:
- ✅ Modern browsers with CSS transforms
- ✅ Mobile Safari with optimizations
- ✅ Chrome/Firefox with full effects
- ✅ Fallback for older browsers

## 🎪 Visual Effects Achieved

1. **Depth Perception**: Multiple layers create 3D-like depth
2. **Organic Movement**: Elements float naturally during scroll
3. **Visual Hierarchy**: Important content moves less, backgrounds move more
4. **Atmospheric Ambiance**: Blurred shapes create dreamy atmosphere
5. **Smooth Transitions**: React Spring provides buttery animations

## 🔧 Customization Options

### Adjust Parallax Speed:
```tsx
// Slower, more subtle
<ParallaxWrapper speed={0.1}>

// Faster, more dramatic  
<ParallaxWrapper speed={0.8}>
```

### Add New Parallax Elements:
```tsx
<ParallaxWrapper speed={0.4} direction="left">
  <div className="floating-element">✨</div>
</ParallaxWrapper>
```

### Disable for Performance:
```tsx
const { shouldEnableParallax } = usePerformanceMonitor();

return shouldEnableParallax ? (
  <ParallaxWrapper>...</ParallaxWrapper>
) : (
  <div>...</div>
);
```

## 🎉 Result

The wedding invitation now features **cinematic parallax scrolling** that:
- Creates immersive depth and movement
- Maintains 60fps performance
- Works beautifully on all devices
- Enhances the romantic atmosphere
- Provides smooth, professional interactions

The parallax effects transform the static invitation into a **dynamic, engaging experience** that perfectly complements the beautiful couple photos and elegant design!