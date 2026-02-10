import { motion } from 'framer-motion';
import { colorClasses } from '../config/colors';

interface WebGLFallbackProps {
  className?: string;
}

const GRADIENT_BACKGROUNDS = [
  "linear-gradient(45deg, rgba(255, 69, 0, 0.1), rgba(255, 99, 71, 0.1), rgba(255, 140, 0, 0.1))",
  "linear-gradient(135deg, rgba(255, 99, 71, 0.1), rgba(255, 140, 0, 0.1), rgba(255, 69, 0, 0.1))",
  "linear-gradient(225deg, rgba(255, 140, 0, 0.1), rgba(255, 69, 0, 0.1), rgba(255, 99, 71, 0.1))",
  "linear-gradient(315deg, rgba(255, 69, 0, 0.1), rgba(255, 99, 71, 0.1), rgba(255, 140, 0, 0.1))"
];

const WebGLFallback = ({ className = "" }: WebGLFallbackProps) => {
  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      {/* Animated gradient background as fallback */}
      <motion.div
        className={`absolute inset-0 ${colorClasses.bg.accentOpacity}`}
        animate={{
          background: GRADIENT_BACKGROUNDS
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={`circle-${i}`}
            className={`absolute w-4 h-4 ${colorClasses.bg.accentLightOpacity} rounded-full`}
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${30 + (i * 10)}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
        
        {/* Additional decorative elements */}
        {Array.from({ length: 4 }, (_, i) => (
          <motion.div
            key={`rect-${i}`}
            className={`absolute w-6 h-6 border ${colorClasses.border.accentOpacity} rotate-45`}
            style={{
              right: `${15 + (i * 20)}%`,
              bottom: `${20 + (i * 15)}%`,
            }}
            animate={{
              rotate: [45, 225, 45],
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WebGLFallback;
