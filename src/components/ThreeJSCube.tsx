'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface Section {
  id: string;
  name: string;
}

interface ThreeJSCubeProps {
  sections: Section[];
  showCube?: boolean;
}

// Custom gradient material for text
const GradientTextMaterial: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const [themeVersion, setThemeVersion] = useState(0);
  
  useEffect(() => {
    const handleThemeChange = () => {
      setThemeVersion(prev => prev + 1);
    };
    
    window.addEventListener('themeChanged', handleThemeChange);
    return () => window.removeEventListener('themeChanged', handleThemeChange);
  }, []);
  
  const material = useMemo(() => {
    if (!isActive) {
      return new THREE.MeshBasicMaterial({ 
        color: '#cbd5e1',
        depthTest: false,
        depthWrite: false
      });
    }
    
    // Only run on client side
    if (typeof window === 'undefined') {
      return new THREE.MeshBasicMaterial({ 
        color: '#38bdf8',
        depthTest: false,
        depthWrite: false
      });
    }
    
    // Get current CSS custom property values
    const computedStyle = getComputedStyle(document.documentElement);
    const primaryColor = computedStyle.getPropertyValue('--primary-400').trim() || 'hsl(220, 70%, 60%)';
    const secondaryColor = computedStyle.getPropertyValue('--secondary-400').trim() || 'hsl(280, 70%, 60%)';
    
    // Create a gradient texture
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 1;
    const context = canvas.getContext('2d');
    
    if (context) {
      const gradient = context.createLinearGradient(0, 0, 256, 0);
      gradient.addColorStop(0, primaryColor);
      gradient.addColorStop(1, secondaryColor);
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, 256, 1);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    
    return new THREE.MeshBasicMaterial({ 
      map: texture,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      fog: false,
      toneMapped: false
    });
  }, [isActive, themeVersion]);
  
  return <primitive object={material} />;
};

interface DynamicCubeProps {
  sections: Section[];
  currentSection: string;
  isInitializing?: boolean;
}

// Rubik Cube Face Component - creates a 3x3 grid of tiles on a face
const RubikFace: React.FC<{ 
  position: [number, number, number]; 
  rotation: [number, number, number];
  opacity: number;
  faceColors: string[];
}> = ({ position, rotation, opacity, faceColors }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* 3x3 grid of tiles */}
      {Array.from({ length: 9 }).map((_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const x = (col - 1) * 1.8; // Spacing between tiles
        const y = (1 - row) * 1.8;
        
        return (
          <mesh
            key={i}
            position={[x, y, 0.01]} // Slightly above the cube surface
          >
            <planeGeometry args={[1.6, 1.6]} />
            <meshPhysicalMaterial
              color={faceColors[i]}
              roughness={0.1}
              metalness={0.0}
              clearcoat={0.9}
              clearcoatRoughness={0.1}
              transparent={true}
              opacity={opacity}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const DynamicCube: React.FC<DynamicCubeProps> = ({ sections, currentSection, isInitializing = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [targetPosition, setTargetPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [targetRotation, setTargetRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollRotation, setScrollRotation] = useState(0);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [showRubikTiles, setShowRubikTiles] = useState(false);
  const [tilesOpacity, setTilesOpacity] = useState(0);

  // Listen for puzzle tiles toggle event from hobbies section
  useEffect(() => {
    const handlePuzzleTilesToggle = (event: CustomEvent) => {
      setShowRubikTiles(event.detail.showTiles);
    };

    window.addEventListener('puzzleTilesToggle', handlePuzzleTilesToggle as EventListener);
    return () => window.removeEventListener('puzzleTilesToggle', handlePuzzleTilesToggle as EventListener);
  }, []);

  // Smooth opacity transition for tiles
  useFrame(() => {
    const targetOpacity = showRubikTiles ? 1 : 0;
    setTilesOpacity(prev => THREE.MathUtils.lerp(prev, targetOpacity, 0.05));
  });

  useEffect(() => {
    const sectionIndex = sections.findIndex(section => section.id === currentSection);
    if (sectionIndex !== -1) {
      // Alternating left-right pattern: center → left → right → left → right → left (hobbies)
      const positions: [number, number, number][] = [
        [0, -1, 0],    // Hero - center but lower
        [-8, 0, 0],    // About - left (reduced to avoid fish-eye effect)
        [8, 0, 0],     // Projects - right (reduced to avoid fish-eye effect)
        [-8, 0, 0],    // Skills - left (reduced to avoid fish-eye effect)
        [-10, 0, 0],   // Hobbies - left side, further out for sticky effect
        [8, 0, 0],     // Contact - right (reduced to avoid fish-eye effect)
      ];
      
      // Rotation to show different faces as we progress through sections
      const rotations: [number, number, number][] = [
        [Math.PI * 0.07, Math.PI * -0.1, 0],  // Hero - front face with slight edge visibility
        [0, -Math.PI / 2, 0],                // About - right face (-90° to show right face)
        [0, Math.PI, 0],                     // Projects - back face (180°)
        [0, Math.PI / 2, 0],                 // Skills - left face (90° to show left face)
        [Math.PI / 2.5, -0.1,  Math.PI],       // Hobbies - angled view to show tiles better
        // [-Math.PI * 0.4, 0, 0],
        [-Math.PI / 2.4, -Math.PI / 1 , 0], 
      ];
      
      setTargetPosition(positions[sectionIndex] || [0, 0, 0]);
      setTargetRotation(rotations[sectionIndex] || [0, 0, 0]);
    }
  }, [currentSection, sections]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      setScrollRotation(prev => prev + scrollDelta * 0.00005);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useFrame((state) => {
    if (groupRef.current) {
      // Calculate scroll-based scale
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.min(scrollY / windowHeight, 1);
      
      // Scale from 0.5 (small on hero) to 1.0 (full size when scrolled)
      const scrollBasedScale = THREE.MathUtils.lerp(0.5, 1.0, scrollProgress);
      
      // Initial dramatic entrance animation
      if (isInitializing && !hasInitialized) {
        // Start from far away and fly in
        const startZ = -50;
        const targetZ = targetPosition[2];
        const animationStart = 0; // Start immediately when isInitializing becomes true
        const progress = Math.min((state.clock.elapsedTime - animationStart) / 2.5, 1); // 2.5 second animation
        
        if (progress >= 0) {
          // Easing function for dramatic entrance
          const easeOut = 1 - Math.pow(1 - progress, 3);
          
          groupRef.current.position.z = THREE.MathUtils.lerp(startZ, targetZ, easeOut);
          groupRef.current.position.x = THREE.MathUtils.lerp(0, targetPosition[0], easeOut);
          
          // Dramatic spinning entrance
          groupRef.current.rotation.y = (1 - easeOut) * Math.PI * 4 + targetRotation[1];
          groupRef.current.rotation.x = (1 - easeOut) * Math.PI * 2 + targetRotation[0];
          
          // Scale effect during entrance, then apply scroll-based scaling
          const entranceScale = THREE.MathUtils.lerp(0.3, scrollBasedScale, easeOut);
          groupRef.current.scale.set(entranceScale, entranceScale, entranceScale);
          
          if (progress >= 1) {
            setHasInitialized(true);
          }
        } else {
          // Before animation starts, position cube far away and invisible
          groupRef.current.position.z = startZ;
          groupRef.current.position.x = 0;
          groupRef.current.scale.set(0.3, 0.3, 0.3);
        }
      } else {
        // Normal behavior after initialization - apply scroll-based scaling
        groupRef.current.scale.set(scrollBasedScale, scrollBasedScale, scrollBasedScale);
        
        // Smooth position interpolation (left to right movement)
        groupRef.current.position.x = THREE.MathUtils.lerp(
          groupRef.current.position.x,
          targetPosition[0],
          0.02
        );
        groupRef.current.position.z = THREE.MathUtils.lerp(
          groupRef.current.position.z,
          targetPosition[2],
          0.02
        );
        
        // Smooth rotation interpolation to show different faces
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          targetRotation[0],
          0.03
        );
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          targetRotation[1],
          0.03
        );
        
        // Scroll-based rotation only
        groupRef.current.rotation.z = scrollRotation;
      }
      
      // Subtle floating animation (always active)
      groupRef.current.position.y = targetPosition[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <RoundedBox args={[6, 6, 6]} radius={0.3} smoothness={4} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.0}
          transmission={0.9}
          thickness={0.5}
          transparent={true}
          opacity={0.3}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>
      
      {/* Puzzle Cube Faces */}
      <>
          {/* Front face - Colorful puzzle pieces */}
          <RubikFace
            position={[0, 0, 3.1]}
            rotation={[0, 0, 0]}
            opacity={tilesOpacity}
            faceColors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3']}
          />
          
          {/* Right face - Warm puzzle colors */}
          <RubikFace
            position={[3.1, 0, 0]}
            rotation={[0, Math.PI/2, 0]}
            opacity={tilesOpacity}
            faceColors={['#ff9f43', '#feca57', '#ff6348', '#ff7675', '#fd79a8', '#fdcb6e', '#e17055', '#d63031', '#74b9ff']}
          />
          
          {/* Back face - Cool puzzle colors */}
          <RubikFace
            position={[0, 0, -3.1]}
            rotation={[0, Math.PI, 0]}
            opacity={tilesOpacity}
            faceColors={['#0984e3', '#74b9ff', '#00b894', '#00cec9', '#6c5ce7', '#a29bfe', '#fd79a8', '#e84393', '#2d3436']}
          />
          
          {/* Left face - Nature puzzle colors */}
          <RubikFace
            position={[-3.1, 0, 0]}
            rotation={[0, -Math.PI/2, 0]}
            opacity={tilesOpacity}
            faceColors={['#00b894', '#55a3ff', '#26de81', '#2bcbba', '#45aaf2', '#a55eea', '#778ca3', '#4b6584', '#f8b500']}
          />
          
          {/* Top face - Bright puzzle colors */}
          <RubikFace
            position={[0, 3.1, 0]}
            rotation={[-Math.PI/2, 0, 0]}
            opacity={tilesOpacity}
            faceColors={['#ffeaa7', '#fab1a0', '#ff7675', '#fd79a8', '#fdcb6e', '#e17055', '#74b9ff', '#0984e3', '#00b894']}
          />
          
          {/* Bottom face - Mixed puzzle colors */}
          <RubikFace
            position={[0, -3.1, 0]}
            rotation={[Math.PI/2, 0, 0]}
            opacity={tilesOpacity}
            faceColors={['#a29bfe', '#6c5ce7', '#fd79a8', '#e84393', '#00cec9', '#55a3ff', '#26de81', '#feca57', '#ff6348']}
          />
        </>

      {/* Text on each face of the cube */}
      {sections.map((section, index) => {
        const faceConfigs = [
          { position: [0, 0, 3.1] as [number, number, number], rotation: [0, 0, 0] as [number, number, number] },           // Front face - Hero
          { position: [3.1, 0, 0] as [number, number, number], rotation: [0, Math.PI/2, 0] as [number, number, number] },   // Right face - About (text faces outward)
          { position: [0, 0, -3.1] as [number, number, number], rotation: [0, Math.PI, 0] as [number, number, number] },    // Back face - Projects (text faces outward toward camera)
          { position: [-3.1, 0, 0] as [number, number, number], rotation: [0, -Math.PI/2, 0] as [number, number, number] }, // Left face - Skills (text faces outward)
          { position: [0, 3.1, 0] as [number, number, number], rotation: [-Math.PI/2, 0, 0] as [number, number, number] },  // Top face - Hobbies
          { position: [0, -3.1, 0] as [number, number, number], rotation: [Math.PI/2, 0, Math.PI] as [number, number, number] },  // Bottom face - Contact (flipped text)
        ];
        
        if (index >= faceConfigs.length) return null;
        
        const config = faceConfigs[index];
        const isActive = currentSection === section.id;
        
        return (
          <Text
            key={section.id}
            position={config.position}
            rotation={config.rotation}
            fontSize={showRubikTiles ? 0.8 : 1.2} // Make text smaller when tiles are visible
            anchorX="center"
            anchorY="middle"
            maxWidth={6}
            textAlign="center"
            visible={!showRubikTiles} // Hide text when tiles are visible
          >
            {section.name.toUpperCase()}
            <GradientTextMaterial isActive={isActive} />
          </Text>
        );
      })}
    </group>
  );
};

const ThreeJSCube: React.FC<ThreeJSCubeProps> = ({ sections, showCube = false }) => {
  const [isInitializing, setIsInitializing] = useState(false);
  
  useEffect(() => {
    if (showCube && !isInitializing) {
      setIsInitializing(true);
    }
  }, [showCube, isInitializing]);
  
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      
      // Find the section that's most visible in the viewport
      let currentSectionId = 'hero';
      let maxVisibility = 0;
      
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top;
          const elementBottom = rect.bottom;
          const elementHeight = rect.height;
          
          // Calculate how much of the element is visible
          const visibleTop = Math.max(0, Math.min(elementBottom, windowHeight) - Math.max(elementTop, 0));
          const visibilityRatio = visibleTop / elementHeight;
          
          // Also consider if the element is near the center of the viewport
          const centerDistance = Math.abs((elementTop + elementBottom) / 2 - windowHeight / 2);
          const centerWeight = Math.max(0, 1 - centerDistance / windowHeight);
          
          const totalScore = visibilityRatio * 0.7 + centerWeight * 0.3;
          
          if (totalScore > maxVisibility) {
            maxVisibility = totalScore;
            currentSectionId = section.id;
          }
        }
      });
      
      setCurrentSection(currentSectionId);
    };

    // Initial call
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  if (!showCube) {
    return (
      <div className="fixed inset-0 pointer-events-none z-5 flex items-center justify-center">
        <div className="bg-dark-800/80 backdrop-blur-md rounded-lg p-6 border border-dark-700 max-w-md">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full flex items-center justify-center border border-primary-400/30">
              <span className="text-2xl">⏳</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-dark-100 mb-2">Initializing the System</h3>
              <p className="text-dark-400 text-sm">Waiting for cube.start() command...</p>
            </div>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-5">
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={2.0} color="#ffffff" />
        <pointLight position={[-3, 3, 3]} intensity={1.8} color={typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--primary-400').trim() || '#38bdf8' : '#38bdf8'} />
        <pointLight position={[3, -3, 3]} intensity={1.5} color={typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--secondary-400').trim() || '#d946ef' : '#d946ef'} />
        <pointLight position={[0, 0, 8]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[2, 5, 3]} intensity={1.2} color="#ffffff" castShadow />
        <spotLight
          position={[0, 6, 6]}
          angle={0.4}
          penumbra={0.3}
          intensity={3.0}
          color="#ffffff"
          target-position={[0, 0, 0]}
          castShadow
        />
        <DynamicCube sections={sections} currentSection={currentSection} isInitializing={isInitializing} />
      </Canvas>
    </div>
  );
};

export default ThreeJSCube;
