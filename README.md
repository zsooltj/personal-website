# Zsolt Apponyi - Portfolio Website

A modern, interactive portfolio website showcasing AI expertise and full-stack development skills. Built with Next.js 15, featuring dynamic 3D elements, AI-powered chatbot, and responsive design optimized for all devices.

## Features

- **Interactive 3D Navigation** - Three.js cube that responds to scroll and section changes
- **AI-Powered Chatbot** - Intelligent assistant with conversation starters and contextual responses
- **Dynamic Theme System** - 7 color schemes (Neural, Matrix, Sunset, Cosmic, Alert, Cyber, Neon)
- **Mobile-First Design** - Optimized for touch interactions with handedness detection
- **Project Showcase** - Interactive project viewer with detailed case studies
- **Animated Components** - Smooth transitions and micro-interactions throughout
- **Contact Integration** - Working contact form with email API integration

## Tech Stack

- **Next.js** 15.3.2 (App Router)
- **React** 19.1.0 with TypeScript 5.7.2
- **Three.js** 0.176.0 with React Three Fiber 9.1.2
- **Framer Motion** 12.15.0 for animations
- **Tailwind CSS** 3.4.15 for styling
- **Resend** 4.5.1 for email functionality

## Key Components

### Hero Section
- Animated typing effect showcasing technical expertise
- Interactive call-to-action buttons
- Responsive layout with live preview elements

### 3D Interactive Cube
- Six-faced cube representing different portfolio sections
- Smooth scroll-based animations and transitions
- Dynamic lighting effects that respond to theme changes
- Mobile-optimized with fallback for smaller screens

### AI Assistant
- Contextual chatbot with predefined conversation starters
- Intelligent responses about skills, projects, and experience
- Expandable chat interface with smooth animations

### Project Viewer
- Modal-based detailed project showcase
- Image galleries with navigation
- Technology badges and challenge descriptions
- Live links to deployed projects

### Dynamic Sections
- **About** - Skills visualization with animated progress bars
- **Projects** - Featured AI and full-stack projects
- **Skills** - Categorized technical expertise
- **Hobbies** - Interactive storytelling with mini-games
- **Contact** - Working contact form with validation

### Theme System
- 7 distinct color schemes affecting entire site
- CSS custom properties for consistent theming
- Theme-responsive scrollbars and UI elements
- Smooth transitions between themes

## Project Highlights

### Enterprise AI Solutions
- **labIQ.io** - AI research platform with media analysis and transcription
- **LEXHR.ai** - Legal AI assistant with document analysis
- **CoreClarity.io** - Business intelligence with AI-driven insights
- **HLB Global Insights** - Public chat widget with secure RAG ecosystem

### Technical Achievements
- Mobile-first responsive design with optimal UX
- Interactive 3D elements optimized for performance
- AI chatbot integration with contextual responses
- Enterprise-grade security implementations
- High-traffic application architecture

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd personal-website
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main page component
│   └── api/contact/         # Contact form API endpoint
├── components/
│   ├── AIAssistant.tsx      # Intelligent chatbot component
│   ├── AnimatedBackground.tsx # Dynamic blob background
│   ├── DynamicSection.tsx   # Adaptive content sections
│   ├── Hero.tsx             # Landing section with animations
│   ├── ProjectViewer.tsx    # Modal project showcase
│   ├── ThreeJSCube.tsx      # Interactive 3D navigation
│   ├── TopNavigation.tsx    # Header with theme switcher
│   ├── hobbies/             # Interactive hobby components
│   └── sections/            # Individual section components
├── data/
│   └── content.ts           # Portfolio content and data
└── hooks/
    ├── useContactForm.ts    # Contact form logic
    └── useHobbiesScroll.ts  # Hobby section interactions
```

## Customization

### Content Updates
Edit `src/data/content.ts` to customize:
- Personal information and bio
- Project details and descriptions
- Skills and experience data
- Contact information and social links

### Theme Customization
Modify CSS custom properties in `src/app/globals.css` for:
- Color schemes and palettes
- Animation timings and effects
- Typography and spacing
- Component styling

### Component Configuration
Individual components can be customized through:
- Props and configuration objects
- CSS classes and Tailwind utilities
- Animation parameters and timing

## Performance Features

- **Server-Side Rendering** with Next.js App Router
- **Code Splitting** for optimized loading
- **Image Optimization** with Next.js Image component
- **Mobile Performance** optimized 3D rendering
- **SEO Optimization** with proper meta tags
- **Hydration Safety** preventing SSR mismatches

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contact

- **Email**: zsolt.apponyi@gmail.com
- **Phone**: +36 30 574 4252
- **LinkedIn**: [zsoltapp](https://www.linkedin.com/in/zsoltapp)
- **Location**: Debrecen, Hungary

---

*Built with precision and passion by Zsolt Apponyi*
