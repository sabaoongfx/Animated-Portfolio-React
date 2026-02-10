import { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import ParticleBackground from './ParticleBackground';
import MouseScrollIndicator from './MouseScrollIndicator';
import WebGLFallback from './WebGLFallback';
import { colorClasses } from '../config/colors';
import { useTranslation } from '../i18n/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';



// Small Mesh Ball Component
const SmallMeshBall = ({ isDark }: { isDark: boolean }) => {
  const ballRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ballRef.current) {
      ballRef.current.rotation.x = state.clock.elapsedTime * 0.08;
      ballRef.current.rotation.y = state.clock.elapsedTime * 0.12;
      ballRef.current.rotation.z = state.clock.elapsedTime * 0.04;
    }
  });

  // Use a gray that's visible in both light and dark modes
  const sphereColor = isDark ? '#A0A0A0' : '#606060'; // Light gray for dark mode, dark gray for light mode

  return (
    <mesh ref={ballRef} position={[0, 0, 0]}>
      <sphereGeometry args={[2.4, 16, 16]} />
      <meshBasicMaterial
        color={sphereColor}
        wireframe={true}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};


// Additional floating particles
const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={particlesRef}>
      {Array.from({ length: 20 }, (_, i) => (
        <mesh key={i} position={[
          Math.sin(i) * 12,
          Math.cos(i) * 8,
          Math.sin(i * 0.5) * 15
        ]}>
          <sphereGeometry args={[0.08]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#FF4500" : "#FF6B35"}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

// Floating Geometric Shapes
const FloatingShapes = ({ isDark }: { isDark: boolean }) => {
  return (
    <>
      <SmallMeshBall isDark={isDark} />
      <FloatingParticles />
    </>
  );
};

const Hero = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [hasWebGLSupport, setHasWebGLSupport] = useState(true);

  useEffect(() => {
    // Check if device is mobile for performance optimization
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check for basic WebGL support
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!gl;
      } catch {
        return false;
      }
    };

    const webglSupport = checkWebGLSupport();
    setHasWebGLSupport(webglSupport);
    setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Particle Background */}
      <ParticleBackground />


      {/* 3D Background - Render on all devices with WebGL support */}
      {hasWebGLSupport ? (
        <div className="absolute inset-0 z-10 opacity-30">
          <Suspense fallback={<WebGLFallback className="opacity-20" />}>
            <Canvas
              camera={{ position: [0, 0, isMobile ? 6 : 5], fov: 75 }}
              dpr={isMobile ? [0.3, 0.5] : [0.5, 1]} // Lower DPR on mobile
              performance={{ min: 0.2, max: isMobile ? 0.5 : 0.8 }}
              gl={{
                antialias: false,
                alpha: true,
                powerPreference: isMobile ? "low-power" : "default",
                failIfMajorPerformanceCaveat: false,
                preserveDrawingBuffer: false,
                stencil: false,
                depth: true
              }}
              onCreated={({ gl }) => {
                gl.domElement.addEventListener('webglcontextlost', (e) => {
                  e.preventDefault();
                  setHasWebGLSupport(false);
                }, false);
              }}
            >
              <ambientLight intensity={0.4} />
              <directionalLight
                position={[5, 5, 5]}
                intensity={0.8}
                castShadow={false}
              />
              {!isMobile && <pointLight position={[10, 10, 10]} intensity={0.3} />}
              <FloatingShapes isDark={isDark} />
              <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            </Canvas>
          </Suspense>
        </div>
      ) : (
        <WebGLFallback className="z-10 opacity-20" />
      )}

      {/* Content Overlay */}
      <div className="container relative z-20 flex flex-col items-center justify-center space-y-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Main Heading */}
          <motion.h1
            className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1] text-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {(() => {
              const title = t('hero.title');
              const parts = title.split(' ');
              const lastTwo = parts.slice(-2).join(' ');
              const firstPart = parts.slice(0, -2).join(' ');
              return (
                <>
                  {firstPart}{' '}
                  <span className={colorClasses.text.accent}>
                    {lastTwo}
                  </span>
                </>
              );
            })()} 
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="max-w-[800px] text-lg text-muted-foreground sm:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="#services" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 shadow-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
              {t('hero.cta')}
            </a>
          </motion.div>

        </motion.div>
      </div>

      {/* Mouse Scroll Indicator */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 transform z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <MouseScrollIndicator />
      </motion.div>

    </section>
  );
};

export default Hero;
