import React from 'react';
import { Home, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';
import { colorClasses } from '../config/colors';

interface NavItem {
  href: string;
  icon: React.ReactNode;
  label: string;
  ariaLabel: string;
}

const MobileBottomNav = () => {
  const { t } = useTranslation();
  
  const handleNavClick = (href: string): void => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems: NavItem[] = [
    {
      href: '#hero',
      icon: <Home className="h-5 w-5" aria-hidden="true" />,
      label: t('navigation.mobile.home'),
      ariaLabel: 'Go to homepage'
    },
    {
      href: '#contact',
      icon: <MessageCircle className="h-5 w-5" aria-hidden="true" />,
      label: t('navigation.mobile.contact'),
      ariaLabel: 'Go to contact section'
    }
  ];

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/50 md:hidden"
      role="navigation"
      aria-label="Mobile bottom navigation"
    >
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavClick(item.href)}
            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-300 hover:bg-muted/50 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#003366] focus:ring-opacity-50`}
            type="button"
            aria-label={item.ariaLabel}
          >
            <div className={`p-2 rounded-full ${colorClasses.bg.accentOpacity} group-hover:bg-muted/80 transition-all duration-300`}>
              <div className={`${colorClasses.text.accent} group-hover:text-foreground transition-colors`}>
                {item.icon}
              </div>
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors mt-1">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </motion.nav>
  );
};

export default MobileBottomNav;
