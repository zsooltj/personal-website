import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
      
      {/* Animated blurry splashes - Desktop only (xl:block = 1280px+) */}
      <div className="hidden xl:block absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/30 rounded-full filter blur-3xl opacity-80 animate-blob" />
      
      <div className="hidden xl:block absolute top-1/3 right-1/4 w-96 h-96 bg-secondary-500/25 rounded-full filter blur-3xl opacity-75 animate-blob animation-delay-2000" />
      
      <div className="hidden xl:block absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary-400/20 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      
      {/* Additional smaller blobs - Desktop only */}
      <div className="hidden xl:block absolute top-1/2 left-1/2 w-64 h-64 bg-secondary-400/15 rounded-full filter blur-2xl opacity-60 animate-pulse-slow" />
      
      <div className="hidden xl:block absolute top-3/4 right-1/3 w-80 h-80 bg-primary-300/20 rounded-full filter blur-2xl opacity-65 animate-blob animation-delay-1000" />
      
      {/* Large background blobs for more atmosphere - Desktop only */}
      <div className="hidden xl:block absolute -top-32 -left-32 w-[600px] h-[600px] bg-primary-600/10 rounded-full filter blur-3xl opacity-40 animate-blob" />
      
      <div className="hidden xl:block absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-secondary-600/8 rounded-full filter blur-3xl opacity-35 animate-blob animation-delay-2000" />
      
      {/* Static blobs for mobile/tablet - no animations */}
      <div className="xl:hidden absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full filter blur-3xl opacity-60" />
      <div className="xl:hidden absolute top-1/3 right-1/4 w-96 h-96 bg-secondary-500/15 rounded-full filter blur-3xl opacity-55" />
      <div className="xl:hidden absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary-400/15 rounded-full filter blur-3xl opacity-50" />
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-dark-900/50 to-dark-900" />
    </div>
  );
};

export default AnimatedBackground;
