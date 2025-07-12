# AugWeb - Augmented Webcraft Portfolio

A modern React Router v7 application showcasing Augmented Webcraft's services with an animated splash screen and smooth user experience.

## Features

- **Animated Splash Screen**: Eye-catching logo animation with localStorage persistence
- **Smooth Navigation**: Scroll-to-section navigation with smooth transitions
- **Responsive Design**: Mobile-first design using Tailwind CSS v4
- **Performance Optimized**: Built with Vite and modern React patterns
- **Analytics Integration**: Google Tag Manager integration for tracking

## Tech Stack

- **Framework**: React Router v7 with SSR capabilities
- **Styling**: Tailwind CSS v4 with Vite integration
- **Build Tool**: Vite with TypeScript support
- **Icons**: React Icons library
- **Analytics**: Google Tag Manager via react-gtm-module
- **Deployment**: Docker-ready configuration

## Project Structure

```
app/
├── components/           # Reusable UI components
│   ├── Footer.tsx       # Site footer with contact info
│   ├── Header.tsx       # Navigation header
│   ├── HeroSection.tsx  # Main hero section
│   ├── Logo.tsx         # Logo components (Full & Icon)
│   └── ServicesSection.tsx # Services showcase
├── routes/              # Route components
│   ├── home.tsx         # Main landing page with animations
│   └── SplashPage.tsx   # Splash screen component
├── welcome/             # Welcome assets
├── app.css             # Global styles
├── root.tsx            # Root layout and error boundaries
└── routes.ts           # Route definitions
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

- `npm run dev` - Start development server with host binding
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript type checking

## Key Components

### Logo Animation System
The homepage features a sophisticated logo animation that transitions from a full-screen splash to a compact navigation logo:

- **Splash Phase**: Full logo displayed center-screen (`app/routes/home.tsx:18-87`)
- **Animation**: Smooth transform and scale transition (`app/routes/home.tsx:89-107`)
- **Landing**: Logo settles into navigation bar position

### Services Section
Showcases four main service offerings with icons and descriptions:

1. Web Development
2. Development Assistance  
3. Custom Solutions & Integrations
4. Ongoing Maintenance & Support

### Navigation
Sticky navigation with smooth scroll-to-section functionality and responsive design.

## Configuration

### Google Tag Manager
Update the GTM ID in `app/root.tsx:54`:
```typescript
gtmId: 'GTM-559BP478' // Replace with your GTM ID
```

### Styling
The project uses Tailwind CSS v4 with a dark theme color scheme:
- Primary background: `#050917`
- Navigation background: `#101726`
- Accent colors: Blue to violet gradients

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t augweb .

# Run the container
docker run -p 3000:3000 augweb
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Browser Support

Modern browsers supporting ES2022 and CSS Grid. The application is optimized for:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Performance Features

- **Code Splitting**: Automatic route-based code splitting
- **Asset Optimization**: Vite's built-in asset optimization
- **Smooth Animations**: Hardware-accelerated transforms
- **Lazy Loading**: Components loaded on demand
- **Caching**: Splash screen state persisted in localStorage

---

Built with ❤️ using React Router.
