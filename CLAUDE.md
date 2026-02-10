# Animated Portfolio - Project Context

## Overview
Modern React 19 + TypeScript portfolio template with 3D animations, smooth transitions, and full backend support.

## Tech Stack
- **Frontend**: React 19, TypeScript 5.8, Vite 7, Tailwind CSS 3, Framer Motion
- **3D Graphics**: Three.js, React Three Fiber, @react-three/drei
- **Backend**: Express 5, Vercel Postgres, Vercel Blob storage
- **Icons**: Lucide React

## Project Structure
```
src/
├── components/     # React components (Hero, Header, Services, ContactUs, etc.)
├── config/         # colors.ts - centralized color configuration
├── contexts/       # ThemeContext.tsx - dark/light mode provider
├── i18n/           # LanguageContext.tsx - EN/DE translations
├── utils/          # performance.ts - optimization utilities
├── App.tsx         # Main routing component
└── main.tsx        # Entry point

api/                # Vercel serverless functions
├── contact.js      # POST - contact form submissions
├── status.js       # Health check endpoint
├── upload.js       # File upload to Vercel Blob
├── admin/contacts.js  # Admin API (GET/POST/DELETE contacts)
└── lib/database.js    # ContactsDatabase class
```

## Key Components
- **Hero.tsx** - 3D WebGL animations with Three.js, particle system, WebGL fallback
- **ParticleBackground.tsx** - Canvas-based 2D particle animation (5 geometric shapes, orange palette)
- **ContactUs.tsx** - Animated contact form with validation
- **Admin.tsx** - Admin panel for managing contact submissions
- **ThemeToggle.tsx** - Dark/light mode switcher
- **LanguageSelector.tsx** - EN/DE language toggle

## Routes
- `/` - Main portfolio page (all sections)
- `/admin` - Admin panel (bearer token auth)

## Commands
```bash
npm run dev      # Start dev server
npm run build    # TypeScript + Vite production build
npm run lint     # ESLint checks
npm run preview  # Preview production build
```

## Environment Variables
- `POSTGRES_URL` - Vercel Postgres connection
- `ADMIN_EMAIL` / `ADMIN_SECRET` - Admin panel credentials
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob storage token

## Design Patterns
- React Context for theme and language state
- Mobile-first responsive design with Tailwind breakpoints
- WebGL performance optimization with device detection and fallbacks
- Input sanitization and validation in API endpoints

## Color Scheme
- **Primary**: Dark navy blue (#003366)
- **Accent**: Reddit orange (#FF4500)
- Configured in `src/config/colors.ts`
