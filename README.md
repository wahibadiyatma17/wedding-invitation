# Wedding Invitation Website

A beautiful, responsive wedding invitation website built with Next.js 16, React Spring animations, and Tailwind CSS v4, following clean architecture principles.

## Features

- 🎨 Beautiful responsive design with green color scheme
- 📱 Mobile-friendly interface
- ⏰ Live countdown timer to wedding day
- 📅 Event details with calendar integration
- 🎵 Background music player
- 💒 Dress code section with color palette
- 💝 Wedding gift section with bank account details
- 📝 RSVP form with guest comments
- ✨ Smooth scroll animations using React Spring
- 🎯 Clean architecture with separation of concerns

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS v4
- **Animations**: React Spring
- **State Management**: Zustand
- **Language**: TypeScript
- **Package Manager**: Bun

## Architecture

The project follows clean architecture principles:

```
src/
├── app/                    # Next.js app router
├── components/
│   ├── animations/         # Animation components
│   ├── sections/          # Page sections
│   └── ui/                # Reusable UI components
├── data/                  # Static data
├── stores/                # Zustand state management
└── types/                 # TypeScript type definitions
```

## Getting Started

1. Install dependencies:
   ```bash
   bun install
   ```

2. Run the development server:
   ```bash
   bun dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### Wedding Data
Edit `src/data/weddingData.ts` to customize:
- Couple information
- Wedding events
- Dress code colors
- Bank account details

### Personalized Invitations
Access with guest name: `http://localhost:3000?to=GuestName`

### Colors & Styling
Modify the color scheme in:
- `src/app/globals.css` for custom colors
- Components for Tailwind CSS classes

## Deployment

The website can be deployed to any platform that supports Next.js:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Custom server

## License

MIT License
