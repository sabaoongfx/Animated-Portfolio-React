import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { colorClasses } from '../config/colors';

type Language = 'en' | 'de' | 'ar' | 'ja' | 'zh' | 'id' | 'es' | 'fr' | 'ru';

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
  countryCode: string; // For PNG fallback
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', countryCode: 'us' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', countryCode: 'de' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', countryCode: 'sa' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', countryCode: 'jp' },
  { code: 'zh', name: '中文', flag: '🇨🇳', countryCode: 'cn' },
  { code: 'id', name: 'Indonesia', flag: '🇮🇩', countryCode: 'id' },
  { code: 'es', name: 'Español', flag: '🇪🇸', countryCode: 'es' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', countryCode: 'fr' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', countryCode: 'ru' }
];

// Check if flag emojis are supported (they don't render on Windows Chrome)
const checkFlagEmojiSupport = (): boolean => {
  if (typeof document === 'undefined') return false;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return false;
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'top';
  ctx.font = '32px Arial';
  ctx.fillText('🇺🇸', 0, 0);
  // Check if the flag rendered (not as two letter boxes)
  const data = ctx.getImageData(0, 0, 32, 32).data;
  // If flag emoji is supported, there will be colored pixels
  let hasColor = false;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] !== data[i + 1] || data[i + 1] !== data[i + 2]) {
      hasColor = true;
      break;
    }
  }
  return hasColor;
};

// Component to display flag with PNG fallback
const FlagDisplay: React.FC<{ flag: string; countryCode: string; size?: 'sm' | 'lg' }> = ({ flag, countryCode, size = 'sm' }) => {
  const [useEmoji, setUseEmoji] = useState(true);

  useEffect(() => {
    setUseEmoji(checkFlagEmojiSupport());
  }, []);

  const imgSize = size === 'lg' ? 20 : 16;

  if (useEmoji) {
    return <span className={size === 'lg' ? 'text-lg' : 'text-sm'}>{flag}</span>;
  }

  // Fallback to PNG from flagcdn.com
  return (
    <img
      src={`https://flagcdn.com/w40/${countryCode}.png`}
      alt={countryCode.toUpperCase()}
      width={imgSize}
      height={Math.round(imgSize * 0.75)}
      className="inline-block rounded-sm"
      style={{ objectFit: 'cover' }}
    />
  );
};

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border border-border bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:ring-opacity-50`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={t('common.language')}
      >
        <span className="text-sm font-medium text-foreground flex items-center gap-2">
          <FlagDisplay flag={currentLanguage.flag} countryCode={currentLanguage.countryCode} />
          {currentLanguage.name}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-48 max-h-80 bg-background border border-border rounded-lg shadow-lg z-50 overflow-y-auto"
          >
            <div className="py-1">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors duration-150 ${
                    language === lang.code ? `${colorClasses.bg.accent} text-white` : 'text-foreground'
                  }`}
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.1 }}
                >
                  <FlagDisplay flag={lang.flag} countryCode={lang.countryCode} size="lg" />
                  <div className="flex flex-col">
                    <span className={`text-sm font-medium ${
                      language === lang.code ? 'text-white' : 'text-foreground'
                    }`}>
                      {lang.name}
                    </span>
                    <span className={`text-xs ${
                      language === lang.code ? 'text-white/80' : 'text-muted-foreground'
                    }`}>
                      {lang.code.toUpperCase()}
                    </span>
                  </div>
                  {language === lang.code && (
                    <motion.div
                      className="ml-auto"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
