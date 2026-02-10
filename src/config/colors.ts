// Centralized color theme configuration
// Change colors here to update them throughout the entire application

export const colors = {
  // Primary brand colors - Based on #003366 (dark navy)
  primary: {
    50: '#f0f4ff',
    100: '#e0ebff', 
    200: '#c7d9ff',
    300: '#a4c0ff',
    400: '#809eff',
    500: '#1a4d80',    // Lighter variant of main color
    600: '#003366',    // Main dark navy blue (from Hero section)
    700: '#002952',    // Darker variant
    800: '#001f3d',    // Much darker variant
    900: '#001629',    // Very dark variant
    950: '#000d14',    // Darkest variant
  },
  
  // Semantic colors
  accent: '#FF4500',        // Reddit orange
  accentLight: '#FF6B35',   // Lighter variant
  accentDark: '#CC3700',    // Darker variant
  
  // UI colors
  text: {
    primary: 'var(--foreground)',
    secondary: 'var(--muted-foreground)',
    accent: '#003366',      // dark navy blue for accent text
  },
  
  background: {
    primary: 'var(--background)',
    secondary: 'var(--muted)',
    card: 'var(--card)',
  },
  
  border: {
    default: 'var(--border)',
    accent: '#003366',      // dark navy blue for accent borders
  },
  
  // Interactive states
  hover: {
    accent: '#1a4d80',      // lighter navy for hover states (more visible)
    accentLight: '#003366', // main navy for light hover states
  },
  
  // Component specific colors
  button: {
    primary: '#003366',     // dark navy blue
    primaryHover: '#1a4d80', // lighter navy for better visibility on hover
    secondary: '#1a4d80',   // lighter navy
    secondaryHover: '#003366',
  },
  
  icon: {
    accent: '#003366',      // dark navy blue for icons
    light: '#1a4d80',       // lighter navy for secondary icons
  },
  
  // Status colors (keep these separate as they have semantic meaning)
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
} as const;

// CSS class names that correspond to Tailwind colors
export const colorClasses = {
  text: {
    accent: 'text-[#FF4500]',
    accentLight: 'text-[#FF6B35]',
    accentDark: 'text-[#CC3700]',
  },
  
  bg: {
    accent: 'bg-[#FF4500]',
    accentLight: 'bg-[#FF6B35]',
    accentDark: 'bg-[#CC3700]',
    accentOpacity: 'bg-[#FF4500]/10',
    accentLightOpacity: 'bg-[#FF4500]/20',
  },
  
  border: {
    accent: 'border-[#FF4500]',
    accentOpacity: 'border-[#FF4500]/30',
  },
  
  shadow: {
    accent: 'shadow-[#FF4500]/10',
    accentHover: 'hover:shadow-[#FF4500]/20',
  },
  
  hover: {
    bgAccent: 'hover:bg-[#CC3700]',
    textAccent: 'hover:text-[#FF4500]',
    borderAccent: 'hover:border-[#FF4500]/30',
  },
} as const;

// Export individual colors for easy access
export const {
  primary,
  accent,
  accentLight,
  accentDark,
  text: textColors,
  background: backgroundColors,
  border: borderColors,
  hover: hoverColors,
  button: buttonColors,
  icon: iconColors,
} = colors;

// Helper function to get color with opacity
export const withOpacity = (color: string, opacity: number) => `${color}/${Math.round(opacity * 100)}`;

// Export the main theme colors for easy access
export const theme = {
  // Main brand color (dark navy blue from Hero section)
  navy: '#003366',
  navyLight: '#1a4d80',
  navyDark: '#002952',
  navyLighter: '#4d7399',
  navyDarker: '#001f3d',
} as const;
