import { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import WebGLFallback from './WebGLFallback';
import { colorClasses } from '../config/colors';
import { useTranslation } from '../i18n/LanguageContext';
// To add your photo: place it in src/assets/ and import it here
// import ProfilePhoto from '../assets/your-photo.jpg';

// Animated Counter Component
interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({ end, duration = 2, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-foreground">
      {prefix}{count}{suffix}
    </span>
  );
};

// 3D Floating Elements
const FloatingElements = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-2, 1, 0]}>
          <dodecahedronGeometry args={[0.5]} />
          <meshStandardMaterial color="#4F46E5" />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[2, -1, 1]}>
          <icosahedronGeometry args={[0.7]} />
          <meshStandardMaterial color="#8B5CF6" />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={2} floatIntensity={1.8}>
        <mesh position={[0, 2, -1]}>
          <octahedronGeometry args={[0.6]} />
          <meshStandardMaterial color="#06B6D4" />
        </mesh>
      </Float>
    </group>
  );
};

const About = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [hasWebGLSupport, setHasWebGLSupport] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check for WebGL support and memory constraints
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return false;

        // Check for sufficient memory and avoid integrated graphics
        const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          if (typeof renderer === 'string' && (renderer.includes('Intel') || renderer.includes('Microsoft Basic'))) {
            return false;
          }
        }
        return true;
      } catch {
        return false;
      }
    };

    const webglSupport = checkWebGLSupport();
    setHasWebGLSupport(webglSupport);
    setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const stats = [
    { number: 15, suffix: '+', label: t('about.stats.yearsExperience') },
    { number: 500, suffix: '+', label: t('about.stats.projectsDelivered') },
    { number: 50, suffix: '+', label: t('about.stats.teamMembers') },
    { number: 25, suffix: '+', label: t('about.stats.countriesServed') }
  ];

  return (
    <section id="about" className="py-20 bg-background relative overflow-hidden">
      {/* 3D Background - Desktop only with WebGL support */}
      {!isMobile && hasWebGLSupport ? (
        <div className="absolute inset-0 opacity-30">
          <Suspense fallback={<WebGLFallback className="opacity-30" />}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 75 }}
              dpr={[0.5, 1]} // Reduced DPR for better performance
              performance={{ min: 0.3, max: 0.8 }}
              gl={{
                antialias: false, // Disable antialiasing to save memory
                alpha: true,
                powerPreference: "low-power",
                failIfMajorPerformanceCaveat: true,
                preserveDrawingBuffer: false,
                stencil: false,
                depth: true
              }}
              onCreated={({ gl }) => {
                // Set up context loss handling
                gl.domElement.addEventListener('webglcontextlost', (e) => {
                  e.preventDefault();
                  console.warn('WebGL context lost in About section, switching to fallback');
                  setHasWebGLSupport(false);
                }, false);
              }}
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <FloatingElements />
            </Canvas>
          </Suspense>
        </div>
      ) : !isMobile ? (
        <WebGLFallback className="opacity-30" />
      ) : null}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {(() => {
                const title = t('technologies.impact.title');
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
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('about.description')}
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.expertise')}
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('about.globalPresence')}
            </p>


          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className={`w-full h-96 ${colorClasses.bg.accentLightOpacity} rounded-2xl backdrop-blur-sm border border-border/20 flex items-center justify-center`}>
              <div className="text-center space-y-4">
                <div className="w-24 h-24 rounded-full mx-auto shadow-lg overflow-hidden border-4 border-white">
                  <div className="w-full h-full bg-[#FF4500] flex items-center justify-center text-white font-bold text-4xl">
                    S
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground">{t('about.visualCard.title')}</h3>
                <p className="text-muted-foreground">{t('about.visualCard.subtitle')}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/20 hover:bg-card transition-all duration-300"
            >
              <AnimatedCounter 
                end={stat.number} 
                suffix={stat.suffix}
                duration={2}
              />
              <p className="text-muted-foreground mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>


      </div>

    </section>
  );
};

export default About;
