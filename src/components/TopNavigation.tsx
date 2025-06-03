'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TopNavigationProps {
  onToggleAI?: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ onToggleAI }) => {
  const [activeTab, setActiveTab] = useState('hero');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false);
  const [theme, setTheme] = useState('default');
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAgent, setShowAgent] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [handedness, setHandedness] = useState<'left' | 'right' | null>(null);
  const [showHandednessPrompt, setShowHandednessPrompt] = useState(false);
  const [isMobileNavHidden, setIsMobileNavHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Check if device is mobile
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
      // Show handedness prompt on first mobile visit
      if (isMobileDevice && !localStorage.getItem('handedness-n') && !showHandednessPrompt) {
        setTimeout(() => setShowHandednessPrompt(true), 2000);
      } else if (isMobileDevice) {
        const savedHandedness = localStorage.getItem('handedness-n') as 'left' | 'right' | null;
        setHandedness(savedHandedness);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Hide header when scrolled down more than 60px
      setIsHeaderHidden(currentScrollY > 60);
      
      // Mobile-specific navigation hiding
      if (isMobile) {
        const scrollDifference = currentScrollY - lastScrollY;
        
        // Close mobile menu when scrolling down 50px or more (even if nav is still visible)
        if (currentScrollY > 50 && scrollDifference > 0 && isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
        
        // Keep nav always visible - removed auto-hide behavior
        
        setLastScrollY(currentScrollY);
      }
      
      const sections = ['hero', 'about', 'projects', 'skills', 'hobbies', 'contact'];
      const scrollPosition = currentScrollY + 100;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, isMobileMenuOpen, lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tabs = [
    { id: 'hero', name: 'Welcome.init()', color: 'bg-gradient-to-r from-blue-500 to-purple-500' },
    { id: 'about', name: 'About.exe', color: 'bg-dark-600' },
    { id: 'projects', name: 'Projects.ai', color: 'bg-dark-600' },
    { id: 'skills', name: 'Skills.dll', color: 'bg-dark-600' },
    { id: 'hobbies', name: 'Hobbies.fun', color: 'bg-dark-600' },
    { id: 'contact', name: 'Contact.js', color: 'bg-dark-600' },
  ];

  return (
    <>
      {/* Window Controls - Scrolls away */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-50 bg-dark-800/90 backdrop-blur-md border-b border-dark-700"
        initial={{ y: -100 }}
        animate={{ 
          y: isHeaderHidden ? -60 : 0,
          opacity: isHeaderHidden ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-3">
            {/* Traffic Light Buttons */}
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            
            {/* Title */}
            <span className="text-dark-300 text-sm font-mono">
              zsolt_app.js
            </span>
          </div>

          {/* Time and Status */}
          <div className="flex items-center space-x-4 text-xs text-dark-400 font-mono">
            <span>{mounted ? currentTime.toLocaleTimeString() : '--:--:--'}</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Online</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs - Always sticky */}
      <motion.div 
        className={`fixed left-0 right-0 z-50 border-b border-dark-700 ${
          isMobile ? 'bg-transparent backdrop-blur-xl' : 'bg-dark-800/95 backdrop-blur-md'
        }`}
        initial={{ y: -100 }}
        animate={{ 
          y: 0,
          top: isHeaderHidden ? 0 : 35
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ top: isHeaderHidden ? 0 : 35 }}
      >
        <div className="flex items-center px-4 py-2">
          {/* Mobile Hamburger Menu - Left positioned for left-handed */}
          {handedness === 'left' && (
            <div className="md:hidden flex items-center mr-auto">
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-dark-700 to-dark-800 hover:from-primary-400/20 hover:to-secondary-400/20 flex items-center justify-center transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                  <motion.span
                    className="absolute w-5 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"
                    animate={{
                      rotate: isMobileMenuOpen ? 45 : 0,
                      y: isMobileMenuOpen ? 0 : -6
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                  <motion.span
                    className="absolute w-5 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"
                    animate={{
                      opacity: isMobileMenuOpen ? 0 : 1,
                      scale: isMobileMenuOpen ? 0 : 1
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="absolute w-5 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"
                    animate={{
                      rotate: isMobileMenuOpen ? -45 : 0,
                      y: isMobileMenuOpen ? 0 : 6
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </div>
              </motion.button>
            </div>
          )}
          
          {/* Mobile Name Display - Only show when header is hidden */}
          <AnimatePresence>
            {isMobile && isHeaderHidden && (
              <motion.div 
                className="flex items-center cursor-pointer"
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                onDoubleClick={() => {
                  localStorage.removeItem('handedness-n');
                  setHandedness(null);
                  setShowHandednessPrompt(true);
                }}
              >
                <span className="text-lg font-mono font-bold">
                  <motion.span 
                    className="text-primary-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    zsolt.app
                  </motion.span>
                  <motion.span 
                    className="text-secondary-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    onyi
                  </motion.span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`
                px-4 py-2 text-sm font-mono rounded-t-lg mr-1 transition-all duration-200
                ${activeTab === tab.id
                  ? 'bg-dark-700 text-white border-t-2 border-primary-400' 
                  : 'bg-dark-800 text-dark-400 hover:bg-dark-700 hover:text-dark-200'
                }
              `}
              onClick={() => scrollToSection(tab.id)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-2">
                {tab.id === 'hero' && (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
                <span>{tab.name}</span>
                {activeTab === tab.id && (
                  <motion.div
                    className="w-1 h-1 bg-primary-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>
            </motion.button>
            ))}
          </div>
          
          {/* Mobile Hamburger Menu - Right positioned for right-handed */}
          {(handedness === 'right' || handedness === null) && (
            <div className="md:hidden flex items-center ml-auto">
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-dark-700 to-dark-800 hover:from-primary-400/20 hover:to-secondary-400/20 flex items-center justify-center transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                  <motion.span
                    className="absolute w-5 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"
                    animate={{
                      rotate: isMobileMenuOpen ? 45 : 0,
                      y: isMobileMenuOpen ? 0 : -6
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  <motion.span
                    className="absolute w-5 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"
                    animate={{
                      opacity: isMobileMenuOpen ? 0 : 1,
                      scale: isMobileMenuOpen ? 0 : 1
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="absolute w-5 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"
                    animate={{
                      rotate: isMobileMenuOpen ? -45 : 0,
                      y: isMobileMenuOpen ? 0 : 6
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </div>
              </motion.button>
            </div>
          )}
          
          {/* Site Sandbox Dropdown Button - Desktop Only */}
          <div className="relative hidden md:block">
            <button 
              className="ml-5 px-3 py-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded text-xs font-mono hover:shadow-lg transition-all duration-300 flex items-center gap-1.5"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span>🧪 Website Sandbox</span>
              <svg className={`w-2.5 h-2.5 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-64 bg-dark-800/95 border border-dark-600 rounded-lg shadow-xl z-50 "
                >
                  <div className="p-4 space-y-3">
                    <div className="text-sm font-mono text-primary-400 border-b border-dark-600 pb-2">
                      🎨 Developer Tools
                    </div>
                    
                    {/* Theme Selector */}
                    <div className="space-y-2">
                      <label className="text-xs text-dark-300 font-mono">Color Theme:</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { name: 'default', color: 'bg-blue-500', label: 'Neural' },
                          { name: 'matrix', color: 'bg-green-500', label: 'Matrix' },
                          { name: 'sunset', color: 'bg-orange-500', label: 'Sunset' },
                          { name: 'purple', color: 'bg-purple-500', label: 'Cosmic' },
                          { name: 'red', color: 'bg-red-500', label: 'Alert' },
                          { name: 'cyan', color: 'bg-cyan-500', label: 'Cyber' },
                          { name: 'pink', color: 'bg-pink-500', label: 'Neon' }
                        ].map((themeOption) => (
                          <button
                            key={themeOption.name}
                            onClick={() => {
                              setTheme(themeOption.name);
                              const hueValue = 
                                themeOption.name === 'matrix' ? '120' :
                                themeOption.name === 'sunset' ? '30' :
                                themeOption.name === 'purple' ? '270' :
                                themeOption.name === 'red' ? '0' :
                                themeOption.name === 'cyan' ? '180' :
                                themeOption.name === 'pink' ? '320' : '220';
                              
                              document.documentElement.style.setProperty('--primary-hue', hueValue);
                              
                              // Force update of CSS custom properties
                              document.documentElement.style.setProperty('--primary-400', `hsl(${hueValue}, 70%, 60%)`);
                              document.documentElement.style.setProperty('--primary-500', `hsl(${hueValue}, 70%, 50%)`);
                              document.documentElement.style.setProperty('--secondary-400', `hsl(${parseInt(hueValue) + 60}, 70%, 60%)`);
                              document.documentElement.style.setProperty('--secondary-500', `hsl(${parseInt(hueValue) + 60}, 70%, 50%)`);
                              
                              // Close dropdown after selection
                              setShowDropdown(false);
                              
                              // Trigger a custom event to notify ThreeJS components
                              window.dispatchEvent(new CustomEvent('themeChanged', { detail: { hue: hueValue } }));
                            }}
                            className={`p-2 rounded text-xs font-mono transition-all ${
                              theme === themeOption.name 
                                ? 'bg-dark-600 text-white ring-2 ring-primary-400' 
                                : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                            }`}
                          >
                            <div className={`w-3 h-3 ${themeOption.color} rounded-full mx-auto mb-1`}></div>
                            {themeOption.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Edit Mode Toggle */}
                    <button
                      onClick={() => {
                        setIsEditMode(!isEditMode);
                        document.body.classList.toggle('edit-mode', !isEditMode);
                      }}
                      className={`w-full p-2 rounded text-sm font-mono transition-all ${
                        isEditMode 
                          ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50' 
                          : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                      }`}
                    >
                      {isEditMode ? '🔧 Exit Block Mode' : '✏️ Enable Block Mode'}
                    </button>
                    
                    {/* MAXIMUM CHAOS Button */}
                    <button
                      onClick={() => {
                        // MAXIMUM CHAOS MODE 🔥💀🔥
                        console.log('🔥 INITIATING MAXIMUM CHAOS 🔥');
                        
                        // Extreme rotation and scaling
                        document.body.style.transform = `rotate(${Math.random() * 30 - 15}deg) scale(${0.7 + Math.random() * 0.6}) skew(${Math.random() * 10 - 5}deg)`;
                        
                        // Insane color cycling with multiple filters
                        let colorCycle = 0;
                        const colorInterval = setInterval(() => {
                          document.body.style.filter = `
                            hue-rotate(${colorCycle * 45}deg) 
                            saturate(${200 + Math.random() * 200}%) 
                            brightness(${60 + Math.random() * 80}%) 
                            contrast(${150 + Math.random() * 100}%)
                            invert(${Math.random() > 0.7 ? 1 : 0})
                            sepia(${Math.random() * 100}%)
                          `;
                          colorCycle++;
                          if (colorCycle > 20) clearInterval(colorInterval);
                        }, 100);
                        
                        // Violent shaking of random elements
                        const shakeElements = document.querySelectorAll('*');
                        shakeElements.forEach((el) => {
                          if (Math.random() > 0.5) {
                            (el as HTMLElement).style.animation = `shake 0.1s infinite`;
                            (el as HTMLElement).style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
                            setTimeout(() => {
                              (el as HTMLElement).style.animation = '';
                              (el as HTMLElement).style.transform = '';
                            }, 1500 + Math.random() * 2000);
                          }
                        });
                        
                        // Text scrambling chaos
                        const textElements = document.querySelectorAll('h1, h2, h3, p, span, button');
                        const chaosTexts = ['💀', '🔥', '💥', '⚡', '🌪️', '👾', '🎭', '💀', 'CHAOS', 'ERROR', '404', 'GLITCH'];
                        textElements.forEach((el) => {
                          if (Math.random() > 0.6) {
                            const originalText = el.textContent;
                            let scrambleCount = 0;
                            const scrambleInterval = setInterval(() => {
                              if (scrambleCount < 10) {
                                el.textContent = chaosTexts[Math.floor(Math.random() * chaosTexts.length)].repeat(Math.floor(Math.random() * 3) + 1);
                                scrambleCount++;
                              } else {
                                el.textContent = originalText;
                                clearInterval(scrambleInterval);
                              }
                            }, 150);
                          }
                        });
                        
                        // Cursor madness
                        document.body.style.cursor = 'none';
                        const cursors = ['🔥', '💀', '👾', '🌪️', '⚡', '🎭', '🚀', '💥', '👻', '🤖', '💣', '🌋'];
                        let cursorIndex = 0;
                        const cursorInterval = setInterval(() => {
                          document.body.style.cursor = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:32px;'><text y='50%'>${cursors[cursorIndex % cursors.length]}</text></svg>") 16 0, auto`;
                          cursorIndex++;
                        }, 100);
                        
                        // Multiple screen flashes
                        for (let i = 0; i < 5; i++) {
                          setTimeout(() => {
                            const flashOverlay = document.createElement('div');
                            const flashColors = ['red', 'blue', 'green', 'purple', 'yellow', 'cyan', 'magenta'];
                            flashOverlay.style.cssText = `
                              position: fixed;
                              top: 0;
                              left: 0;
                              width: 100vw;
                              height: 100vh;
                              background: ${flashColors[Math.floor(Math.random() * flashColors.length)]};
                              z-index: 9999;
                              opacity: 0;
                              pointer-events: none;
                              animation: flash 0.05s ease-in-out 2;
                            `;
                            document.body.appendChild(flashOverlay);
                            setTimeout(() => flashOverlay.remove(), 200);
                          }, i * 300);
                        }
                        
                        // Chaos audio symphony
                        try {
                          for (let i = 0; i < 3; i++) {
                            setTimeout(() => {
                              const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                              const oscillator = audioContext.createOscillator();
                              const gainNode = audioContext.createGain();
                              oscillator.connect(gainNode);
                              gainNode.connect(audioContext.destination);
                              oscillator.frequency.setValueAtTime(100 + Math.random() * 1000, audioContext.currentTime);
                              oscillator.type = (['sine', 'square', 'sawtooth', 'triangle'] as const)[Math.floor(Math.random() * 4)];
                              gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
                              oscillator.start();
                              oscillator.stop(audioContext.currentTime + 0.2);
                            }, i * 200);
                          }
                        } catch (e) {
                          console.log('Audio chaos failed, but visual chaos continues!');
                        }
                        
                        // Random element displacement
                        const allElements = document.querySelectorAll('div, section, button, img');
                        allElements.forEach((el) => {
                          if (Math.random() > 0.8) {
                            (el as HTMLElement).style.position = 'relative';
                            (el as HTMLElement).style.left = `${Math.random() * 20 - 10}px`;
                            (el as HTMLElement).style.top = `${Math.random() * 20 - 10}px`;
                            setTimeout(() => {
                              (el as HTMLElement).style.position = '';
                              (el as HTMLElement).style.left = '';
                              (el as HTMLElement).style.top = '';
                            }, 2000 + Math.random() * 1000);
                          }
                        });
                        
                        // Close dropdown during chaos
                        setShowDropdown(false);
                        
                        // Reset everything after maximum chaos
                        setTimeout(() => {
                          document.body.style.transform = 'none';
                          document.body.style.filter = 'none';
                          document.body.style.cursor = 'auto';
                          clearInterval(cursorInterval);
                          
                          // Epic chaos completion message
                          const chaosMsg = document.createElement('div');
                          chaosMsg.innerHTML = `
                            <div style="text-align: center;">
                              <div style="font-size: 24px; margin-bottom: 10px;">🔥💀 MAXIMUM CHAOS COMPLETE 💀🔥</div>
                              <div style="font-size: 14px;">System survived the digital apocalypse!</div>
                            </div>
                          `;
                          chaosMsg.style.cssText = `
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            background: linear-gradient(45deg, #ff0000, #ff6600, #ffff00, #00ff00, #0066ff, #6600ff, #ff0066);
                            background-size: 400% 400%;
                            animation: rainbow 1s ease infinite;
                            color: white;
                            padding: 30px;
                            border-radius: 15px;
                            font-family: monospace;
                            font-weight: bold;
                            z-index: 10000;
                            border: 3px solid white;
                            box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
                          `;
                          document.body.appendChild(chaosMsg);
                          setTimeout(() => chaosMsg.remove(), 3000);
                        }, 6000);
                      }}
                      className="w-full p-2 rounded text-sm font-mono bg-gradient-to-r from-red-600 via-purple-600 via-pink-600 to-orange-600 text-white hover:from-purple-600 hover:to-red-600 transition-all animate-pulse shadow-lg border border-red-400"
                    >
                      🔥💀 MAXIMUM CHAOS 💀🔥
                    </button>
                    
                    <div className="text-xs text-dark-500 font-mono pt-2 border-t border-dark-600">
                      Warning: May cause unexpected behavior 😈
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Handedness Prompt Modal */}
        <AnimatePresence>
          {showHandednessPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 min-h-screen"
            >
              <motion.div
                initial={{ scale: 0.8, y: 0 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 0 }}
                className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-2xl p-6 border border-primary-400/30 max-w-sm w-full text-center"
              >
                <div className="text-4xl mb-4">🤔</div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-2">
                  Quick Question!
                </h3>
                <p className="text-dark-300 mb-6 text-sm">
                  Are you left-handed or right-handed? I&apos;ll position the menu for optimal thumb reach! 👍
                </p>
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => {
                      setHandedness('left');
                      localStorage.setItem('handedness-n', 'left');
                      setShowHandednessPrompt(false);
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🤚 Left
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setHandedness('right');
                      localStorage.setItem('handedness-n', 'right');
                      setShowHandednessPrompt(false);
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-secondary-500 to-primary-500 text-white rounded-xl font-medium hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Right 🤚
                  </motion.button>
                </div>
                <button
                  onClick={() => {
                    setHandedness('right'); // Default to right
                    localStorage.setItem('handedness-n', 'right');
                    setShowHandednessPrompt(false);
                  }}
                  className="mt-3 text-xs text-dark-500 hover:text-dark-300 transition-colors"
                >
                  Skip (default: right)
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
      </motion.div>
      
      {/* Mobile Menu Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-transparent backdrop-blur-xl z-[60] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ 
                y: handedness === 'right' ? -50 : 50,
                opacity: 0
              }}
              animate={{ 
                y: 0,
                opacity: 1
              }}
              exit={{ 
                y: handedness === 'right' ? -50 : 50,
                opacity: 0
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`absolute bg-dark-800/95 backdrop-blur-md border border-dark-600 rounded-2xl shadow-2xl ${
                handedness === 'right' 
                  ? 'top-20 right-4 w-80' 
                  : 'top-20 left-4 w-80'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-3 space-y-3">
                {/* Navigation Items in 2 Columns */}
                <div className="grid grid-cols-2 gap-2">
                  {tabs.map((tab, index) => (
                    <motion.button
                      key={tab.id}
                      initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * (isMobile ? 0.05 : 0.1), duration: isMobile ? 0.2 : 0.3 }}
                      className={`
                        text-center px-3 py-3 rounded-xl font-mono text-xs transition-all duration-300 flex flex-col items-center justify-center group min-h-[60px]
                        ${activeTab === tab.id
                          ? 'bg-gradient-to-r from-primary-500/20 to-secondary-500/20 text-primary-300 border border-primary-400/30' 
                          : 'bg-dark-700/50 text-dark-300 hover:bg-dark-600/70 hover:text-dark-100 border border-dark-600/50'
                        }
                      `}
                      onClick={() => {
                        scrollToSection(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      whileHover={isMobile ? {} : { scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-1 mb-1">
                        {tab.id === 'hero' && (
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                        )}
                        {activeTab === tab.id && (
                          <motion.div
                            className="w-1.5 h-1.5 bg-primary-400 rounded-full"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        )}
                      </div>
                      <span className="leading-tight">{tab.name}</span>
                    </motion.button>
                  ))}
                </div>
                
                {/* Mobile Sandbox Button */}
                <div className="relative">
                  <motion.button
                    initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: tabs.length * (isMobile ? 0.05 : 0.1), duration: isMobile ? 0.2 : 0.3 }}
                    className="w-full px-4 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl text-sm font-mono hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
                    onClick={() => setShowDropdown(!showDropdown)}
                    whileHover={isMobile ? {} : { scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <span className="relative z-10">🧪 Website Sandbox</span>
                    <motion.div
                      className="relative z-10"
                      animate={{ rotate: showDropdown ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ↓
                    </motion.div>
                  </motion.button>
                  
                  {/* Mobile Sandbox Dropdown */}
                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-dark-800/95 backdrop-blur-md border border-dark-600 rounded-lg shadow-xl z-50"
                      >
                        <div className="p-4 space-y-3">
                          <div className="text-sm font-mono text-primary-400 border-b border-dark-600 pb-2">
                            🎨 Developer Tools
                          </div>
                          
                          {/* Theme Selector */}
                          <div className="space-y-2">
                            <label className="text-xs text-dark-300 font-mono">Color Theme:</label>
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { name: 'default', color: 'bg-blue-500', label: 'Neural' },
                                { name: 'matrix', color: 'bg-green-500', label: 'Matrix' },
                                { name: 'sunset', color: 'bg-orange-500', label: 'Sunset' },
                                { name: 'purple', color: 'bg-purple-500', label: 'Cosmic' },
                                { name: 'red', color: 'bg-red-500', label: 'Alert' },
                                { name: 'cyan', color: 'bg-cyan-500', label: 'Cyber' },
                                { name: 'pink', color: 'bg-pink-500', label: 'Neon' }
                              ].map((themeOption) => (
                                <button
                                  key={themeOption.name}
                                  onClick={() => {
                                    setTheme(themeOption.name);
                                    const hueValue = 
                                      themeOption.name === 'matrix' ? '120' :
                                      themeOption.name === 'sunset' ? '30' :
                                      themeOption.name === 'purple' ? '270' :
                                      themeOption.name === 'red' ? '0' :
                                      themeOption.name === 'cyan' ? '180' :
                                      themeOption.name === 'pink' ? '320' : '220';
                                    
                                    document.documentElement.style.setProperty('--primary-hue', hueValue);
                                    document.documentElement.style.setProperty('--primary-400', `hsl(${hueValue}, 70%, 60%)`);
                                    document.documentElement.style.setProperty('--primary-500', `hsl(${hueValue}, 70%, 50%)`);
                                    document.documentElement.style.setProperty('--secondary-400', `hsl(${parseInt(hueValue) + 60}, 70%, 60%)`);
                                    document.documentElement.style.setProperty('--secondary-500', `hsl(${parseInt(hueValue) + 60}, 70%, 50%)`);
                                    
                                    setShowDropdown(false);
                                    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { hue: hueValue } }));
                                  }}
                                  className={`p-2 rounded text-xs font-mono transition-all ${
                                    theme === themeOption.name 
                                      ? 'bg-dark-600 text-white ring-2 ring-primary-400' 
                                      : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                                  }`}
                                >
                                  <div className={`w-3 h-3 ${themeOption.color} rounded-full mx-auto mb-1`}></div>
                                  {themeOption.label}
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          {/* Edit Mode Toggle */}
                          <button
                            onClick={() => {
                              setIsEditMode(!isEditMode);
                              document.body.classList.toggle('edit-mode', !isEditMode);
                            }}
                            className={`w-full p-2 rounded text-sm font-mono transition-all ${
                              isEditMode 
                                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50' 
                                : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                            }`}
                          >
                            {isEditMode ? '🔧 Exit Edit Mode' : '✏️ Enable Edit Mode'}
                          </button>
                          

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopNavigation;
