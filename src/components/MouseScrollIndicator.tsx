import { motion } from 'framer-motion';
import { colorClasses } from '../config/colors';

const MouseScrollIndicator = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      {/* Mouse Icon */}
      <motion.div
        className="relative w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Mouse Wheel */}
        <motion.div
          className={`w-1 h-3 ${colorClasses.bg.accent} rounded-full mt-2`}
          animate={{
            y: [0, 8, 0],
            opacity: [1, 0.3, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Scroll Text */}
      <motion.p
        className="text-xs text-muted-foreground font-medium tracking-wider uppercase"
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Scroll Down
      </motion.p>

      {/* Animated Arrow */}
      <motion.div
        className="flex flex-col space-y-1"
        animate={{
          y: [0, 4, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          className={`w-0.5 h-4 ${colorClasses.bg.accent} mx-auto`}
          animate={{
            scaleY: [0.5, 1, 0.5],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className={`w-0 h-0 border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent ${colorClasses.border.accentOpacity} mx-auto`}
          animate={{
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default MouseScrollIndicator;
