/**
 * Selenium Test Configuration
 */

export const config = {
  // Base URL for testing (change to your deployed URL or localhost)
  baseUrl: process.env.TEST_URL || 'http://localhost:5173',

  // Browser to use for testing
  browser: process.env.TEST_BROWSER || 'chrome',

  // Timeout settings (in milliseconds)
  timeouts: {
    implicit: 15000,
    pageLoad: 60000,
    script: 30000,
  },

  // Headless mode (set to true for CI/CD)
  headless: process.env.HEADLESS === 'true',
};

// Supported languages for testing - using CTA button text for more reliable matching
export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', heroText: 'Explore My Services' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', heroText: 'Projekt starten' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', heroText: 'استكشف خدماتي' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', heroText: 'サービスを見る' },
  { code: 'zh', name: '中文', flag: '🇨🇳', heroText: '探索我的服务' },
  { code: 'id', name: 'Indonesia', flag: '🇮🇩', heroText: 'Jelajahi Layanan Saya' },
  { code: 'es', name: 'Español', flag: '🇪🇸', heroText: 'Explora Mis Servicios' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', heroText: 'Découvrir Mes Services' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', heroText: 'Мои услуги' },
];

export default config;
