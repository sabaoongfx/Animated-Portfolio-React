import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { colorClasses } from '../config/colors';

const ANIMATION_CONFIG = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
  toggle: {
    type: "spring" as const,
    stiffness: 500,
    damping: 30
  }
};

const ThemeToggle = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative flex items-center justify-center w-12 h-6 rounded-full 
        transition-colors duration-300 focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-opacity-50 dark:focus:ring-offset-gray-800
        ${isDark ? `${colorClasses.bg.accent}` : 'bg-gray-300'}
        ${isDark ? 'focus:ring-blue-500' : `focus:ring-[#003366]`}
      `}
      whileHover={ANIMATION_CONFIG.hover}
      whileTap={ANIMATION_CONFIG.tap}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      type="button"
    >
      {/* Toggle Circle */}
      <motion.div
        className={`
          absolute w-5 h-5 rounded-full shadow-lg flex items-center justify-center
          ${isDark ? 'bg-gray-800' : 'bg-white'}
        `}
        style={{ top: '2px' }}
        animate={{
          left: isDark ? '25px' : '2px',
        }}
        transition={ANIMATION_CONFIG.toggle}
      >
        {/* Icon */}
        {isDark ? (
          <Moon className="w-3 h-3 text-blue-400" aria-hidden="true" />
        ) : (
          <Sun className="w-3 h-3 text-yellow-500" aria-hidden="true" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
