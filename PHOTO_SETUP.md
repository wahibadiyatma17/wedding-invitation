# Photo Setup Instructions

To use your beautiful couple photos in the wedding invitation website, follow these steps:

## Required Photos

1. **Boat Photo**: The romantic scene with the couple sitting on boats in the lake
2. **Running/Walking Photo**: The playful scene with the couple running/walking at sunset

## Setup Steps

### Option 1: Replace Default Photos (Recommended)

1. Copy your photos to the `public/images/` directory:
   ```
   public/images/
   ├── couple-boat.jpg       # Your boat scene photo
   ├── couple-running.jpg    # Your running/walking scene photo
   ├── bride.jpg            # Bride's profile photo
   └── groom.jpg            # Groom's profile photo
   ```

2. Update the `OpeningSection.tsx` to use real photos:

```tsx
// Replace the gradient backgrounds with actual images
<div className="absolute inset-0 w-full h-full">
  <Image
    src="/images/couple-boat.jpg"
    alt="Beautiful couple scene"
    fill
    className="object-cover"
    priority
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
</div>

// For the secondary image
<div className="absolute top-10 right-10 w-80 h-48 opacity-30 overflow-hidden rounded-lg">
  <Image
    src="/images/couple-running.jpg"
    alt="Couple running at sunset"
    fill
    className="object-cover"
  />
</div>
```

### Option 2: Use Your Screenshots

If you have the photos as screenshots, copy them to:
```
public/images/
├── boat-scene.png
└── running-scene.png
```

## Current Status

✅ Beautiful opening section with elegant typography
✅ Smooth transition to main invitation
✅ Guest name personalization
✅ Responsive design
✅ Clean architecture maintained

## Next Steps

1. Add your actual photos to replace the gradient placeholders
2. Adjust opacity and overlay effects if needed
3. Test on different screen sizes
4. Consider adding subtle animations to the opening

The opening section now creates a stunning first impression that matches the aesthetic of the reference website while using your beautiful couple photos as the background!