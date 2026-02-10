import { useRef, Suspense, useState, useEffect, useCallback } from 'react';
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

// Contained Particle Background for cards
interface ContainedParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: 'triangle' | 'square' | 'diamond' | 'hexagon' | 'pentagon';
  rotation: number;
  rotationSpeed: number;
}

const BRAND_COLORS = [
  'rgba(255, 69, 0, 0.6)',
  'rgba(255, 107, 53, 0.5)',
  'rgba(251, 129, 60, 0.5)',
  'rgba(253, 171, 116, 0.4)',
  'rgba(254, 204, 170, 0.4)',
];

const SHAPES = ['triangle', 'square', 'diamond', 'hexagon', 'pentagon'] as const;

const ContainedParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<ContainedParticle[]>([]);
  const animationRef = useRef<number>(0);

  const drawShape = useCallback((ctx: CanvasRenderingContext2D, particle: ContainedParticle) => {
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.rotation);
    ctx.fillStyle = particle.color;
    const size = particle.size;

    switch (particle.shape) {
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(-size * 0.866, size * 0.5);
        ctx.lineTo(size * 0.866, size * 0.5);
        ctx.closePath();
        ctx.fill();
        break;
      case 'square':
        ctx.fillRect(-size / 2, -size / 2, size, size);
        break;
      case 'diamond':
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(-size, 0);
        ctx.closePath();
        ctx.fill();
        break;
      case 'hexagon':
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const x = size * Math.cos(angle);
          const y = size * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        break;
      case 'pentagon':
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          const x = size * Math.cos(angle);
          const y = size * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        break;
    }
    ctx.restore();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    const createParticles = () => {
      const particles: ContainedParticle[] = [];
      const count = 25;

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 3 + 1,
          color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
          shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
        });
      }
      particlesRef.current = particles;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        drawShape(ctx, particle);

        particlesRef.current.slice(index + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 69, 0, ${0.15 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [drawShape]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

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
                failIfMajorPerformanceCaveat: false,
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
            <div className={`w-full h-96 ${colorClasses.bg.accentLightOpacity} rounded-2xl backdrop-blur-sm border border-border/20 flex items-center justify-center relative overflow-hidden`}>
              <ContainedParticleBackground />
              <div className="text-center space-y-4 relative z-10">
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
