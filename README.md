# Zsolt Apponyi - Portfolio Website (Next.js 13)

This is a Next.js 13 version of Zsolt Apponyi's portfolio website, featuring AI-powered components, interactive 3D elements, and modern animations.

## Features

- **Next.js 13** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Three.js** with React Three Fiber for 3D graphics
- **Interactive 3D Cube** that responds to scroll
- **Dynamic Theme System** with multiple color schemes
- **MAXIMUM CHAOS Mode** 🔥💀🔥 (Developer Easter Egg)
- **Responsive Design** optimized for all devices
- **AI-focused Content** showcasing RAG systems and intelligent agents

## Tech Stack

- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js / React Three Fiber
- React Three Drei

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the nextjs directory:
```bash
cd nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
nextjs/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles with CSS variables
│   │   ├── layout.tsx           # Root layout with metadata
│   │   └── page.tsx             # Main page component
│   ├── components/
│   │   ├── AnimatedBackground.tsx    # Animated blob background
│   │   ├── DynamicSection.tsx        # Content sections (About, Projects, etc.)
│   │   ├── Hero.tsx                  # Hero section with code animation
│   │   ├── ThreeJSCube.tsx          # Interactive 3D cube
│   │   └── TopNavigation.tsx        # Navigation with chaos mode
│   └── data/
│       └── content.ts               # Portfolio content data
├── tailwind.config.ts              # Tailwind configuration
└── package.json
```

## Key Components

### Hero Component
- Animated code typing effect showing AI/frontend development humor
- Interactive call-to-action buttons
- Responsive layout with live code preview
- Triggers the 3D cube animation

### ThreeJSCube Component
- Interactive 3D cube with text on each face representing different sections
- Responds to scroll position and moves between sections
- Smooth animations and transitions with dramatic entrance
- Dynamic lighting effects that respond to theme changes

### DynamicSection Component
- Renders different content based on section ID
- **About**: Skills grid with animated progress bars and experience timeline
- **Projects**: AI-focused project showcase with technology badges
- **Skills**: Categorized technical expertise with animated skill levels
- **Contact**: Contact form and social links

### TopNavigation Component
- Sticky navigation with tab-style interface mimicking a code editor
- Real-time clock display (hydration-safe)
- Theme switcher with 7 different color schemes
- Developer tools dropdown with:
  - Color theme selector (Neural, Matrix, Sunset, Cosmic, Alert, Cyber, Neon)
  - Edit mode toggle
  - **MAXIMUM CHAOS Mode** 🔥💀🔥 (Epic visual effects)

## Special Features

### MAXIMUM CHAOS Mode 🔥💀🔥
A hidden developer easter egg that creates complete visual mayhem:
- Extreme page rotation and scaling
- Insane color cycling with multiple filters
- Random element shaking and displacement
- Text scrambling with chaos symbols
- Custom cursor madness
- Screen flashes in random colors
- Chaos audio symphony (if audio context available)
- Epic completion message after 6 seconds

### Theme System
Dynamic color themes that affect the entire site:
- **Neural** (Blue) - Default AI-focused theme
- **Matrix** (Green) - Hacker/cyberpunk aesthetic
- **Sunset** (Orange) - Warm, creative vibe
- **Cosmic** (Purple) - Space/futuristic theme
- **Alert** (Red) - High-energy, urgent feel
- **Cyber** (Cyan) - Cool, tech-focused
- **Neon** (Pink) - Vibrant, modern design

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions
- Adaptive layouts for different devices

## Content Customization

Update the content in `src/data/content.ts` to customize:
- Personal information and bio
- Project details and descriptions
- Skills and experience data
- Contact information and social links

## Build and Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Export static site (if needed)
npm run export
```

## Performance Features

- **Server-Side Rendering** with Next.js 13 App Router
- **Optimized Images** and assets
- **Code Splitting** for faster loading
- **Responsive Design** for all devices
- **SEO Optimized** with proper meta tags and structured data
- **Hydration-safe** components to prevent SSR mismatches

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- Uses TypeScript for type safety
- Implements proper hydration handling for SSR
- Custom CSS variables for dynamic theming
- Framer Motion for smooth animations
- Three.js integration with proper cleanup

## License

This project is for portfolio purposes. Please contact Zsolt Apponyi for usage permissions.

## Contact

- **Email**: zsolt.apponyi@gmail.com
- **Phone**: +36 30 574 4252
- **LinkedIn**: [zsoltapp](https://www.linkedin.com/in/zsoltapp)
- **Location**: Debrecen, Hungary

---

*Built with ❤️ and a lot of ☕ by Zsolt Apponyi*
