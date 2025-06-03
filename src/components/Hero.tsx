'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  onCubeStart?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCubeStart }) => {
  const [currentTokenIndex, setCurrentTokenIndex] = useState(0);
  const [showCube, setShowCube] = useState(false);
  
  // Array of renderable tokens with their styles
  const codeTokens = [
    { text: '// Zsolt\'s Daily AI/Frontend Struggles', type: 'comment', newLine: true },
    { text: 'const', type: 'keyword' },
    { text: ' ' },
    { text: 'debugAI', type: 'variable' },
    { text: ' = ' },
    { text: 'async', type: 'keyword' },
    { text: ' () => {', newLine: true },
    { text: '  ', type: 'indent' },
    { text: 'if', type: 'keyword' },
    { text: '(model.isHallucinating()) {', newLine: true },
    { text: '    ', type: 'indent' },
    { text: 'console', type: 'variable' },
    { text: '.log(' },
    { text: '"AI thinks 2+2=fish 🐟"', type: 'string' },
    { text: ');', newLine: true },
    { text: '    ', type: 'indent' },
    { text: 'return', type: 'keyword' },
    { text: ' ' },
    { text: 'RAG', type: 'class' },
    { text: '.addMoreContext();', newLine: true },
    { text: '  }', newLine: true },
    { text: '  ', type: 'indent' },
    { text: 'if', type: 'keyword' },
    { text: '(React.isAngry()) {', newLine: true },
    { text: '    ', type: 'indent' },
    { text: 'throw', type: 'keyword' },
    { text: ' ' },
    { text: 'new', type: 'keyword' },
    { text: ' ' },
    { text: 'Error', type: 'class' },
    { text: '(' },
    { text: '"Hydration failed again!"', type: 'string' },
    { text: ');', newLine: true },
    { text: '  }', newLine: true },
    { text: '};', newLine: true },
    { text: '', newLine: true },
    { text: '// The Hungarian solution™', type: 'comment', newLine: true },
    { text: 'useEffect', type: 'method' },
    { text: '(() => {', newLine: true },
    { text: '  ', type: 'indent' },
    { text: 'if', type: 'keyword' },
    { text: '(typeof window !== ' },
    { text: '"undefined"', type: 'string' },
    { text: ') {', newLine: true },
    { text: '    ', type: 'indent' },
    { text: '// Deploy the magic cube! 🎯', type: 'comment', newLine: true },
    { text: '    ', type: 'indent' },
    { text: 'cube', type: 'variable' },
    { text: '.' },
    { text: 'start', type: 'method'},
    { text: '();', newLine: true },
    { text: '  }', newLine: true },
    { text: '}, []);' , special: 'easter-egg' }
  ];
  
  useEffect(() => {
    if (currentTokenIndex >= codeTokens.length) return;
    
    const currentToken = codeTokens[currentTokenIndex];
    
    // Check for easter egg
    if (currentToken.special === 'easter-egg') {
      setShowCube(true);
      if (onCubeStart) {
        console.log('Triggering cube start!');
        onCubeStart();
      }
    }
    
    // Vary timing based on token type (faster)
    const delay = currentToken.newLine ? 100 : 
                 currentToken.type === 'string' ? 50 :
                 currentToken.text.length > 5 ? 40 : 30;
    
    const timer = setTimeout(() => {
      setCurrentTokenIndex(prev => prev + 1);
    }, currentTokenIndex === 0 ? 1000 : delay);
    
    return () => clearTimeout(timer);
  }, [currentTokenIndex, onCubeStart]);
  
  const getTokenStyle = (type?: string, special?: string) => {
    switch (type) {
      case 'comment': return 'text-dark-500';
      case 'keyword': return 'text-blue-400';
      case 'class': return 'text-yellow-400';
      case 'variable': return 'text-yellow-300';
      case 'parameter': return 'text-orange-400';
      case 'property': return 'text-green-400';
      case 'string': return 'text-green-300';
      case 'method': return special === 'easter-egg' ? 'text-red-400 animate-pulse' : 'text-blue-300';
      default: return 'text-dark-300';
    }
  };

  return (
    <section id="hero" className="relative h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 lg:px-16 z-20">
      {/* Hero content - full width on mobile, half on desktop */}
      <div className="w-full lg:w-1/2 lg:max-w-2xl z-20 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="space-y-2">
            {/* Mobile: Name positioned 3rem above title */}
            <motion.p
              className="block lg:hidden text-xl sm:text-2xl text-dark-300 font-medium text-center mb-12"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              My name is Zsolt Apponyi
            </motion.p>
            
            {/* Desktop: Original positioning */}
            <motion.p
              className="hidden lg:block text-sm xl:text-base text-dark-400 font-normal ml-1 -mb-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              My name is Zsolt Apponyi ...
            </motion.p>
            
            

            <motion.h1 
              className="text-4xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
            <span className="mb-1 block text-4xl sm:text-5xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              AI Specialist
            </span>
            <span className="text-dark-100">
              & Full-Stack Web Developer
            </span>
            </motion.h1>
          </div>
          
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-dark-300 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Building intelligent AI agents, RAG systems, and modern React applications. 
            From chatbots to complex multi-agent workflows - crafting the future of AI-powered web experiences.
          </motion.p>
          
          {/* <motion.div 
            className="pt-8 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="px-8 py-4 min-w-[12rem] rounded-xl text-base font-medium border border-primary-400/30 text-center inline-block">
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                Scroll down to learn more
              </span>
            </div>
          </motion.div> */}
        </motion.div>
      </div>
      
      {/* Right side - Code Preview - Hidden on mobile */}
      <motion.div 
        className="hidden lg:block w-full lg:w-1/2 lg:max-w-lg z-20 lg:-mt-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="bg-dark-900/80 backdrop-blur-md rounded-lg p-4 font-mono text-sm border border-dark-700 h-[440px] lg:h-[470px] overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-dark-400 text-xs">justforfun.js</span>
          </div>
          <div className="relative h-[350px] lg:h-[440px] overflow-y-auto">
            <div className="text-dark-300 font-mono text-sm leading-relaxed whitespace-pre">
              {codeTokens.slice(0, currentTokenIndex).map((token, index) => (
                <React.Fragment key={index}>
                  <span className={getTokenStyle(token.type, token.special)}>
                    {token.text}
                  </span>
                  {token.newLine && <br />}
                </React.Fragment>
              ))}
              {currentTokenIndex < codeTokens.length && (
                <motion.span 
                  className="text-primary-400 animate-pulse"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  |
                </motion.span>
              )}
            </div>
          </div>
        </div>
        
        {/* Fun stats below code */}
        <motion.div 
          className="mt-6 grid grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="bg-dark-800/50 backdrop-blur-sm rounded-lg p-3 border border-dark-700">
            <div className="text-primary-400 text-lg font-bold">☕ 2847</div>
            <div className="text-dark-400 text-xs">Cups of coffee</div>
          </div>
          <div className="bg-dark-800/50 backdrop-blur-sm rounded-lg p-3 border border-dark-700">
            <div className="text-secondary-400 text-lg font-bold">🐛 0</div>
            <div className="text-dark-400 text-xs">Bugs (allegedly)</div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-primary-400/50 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-1 h-3 bg-primary-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
