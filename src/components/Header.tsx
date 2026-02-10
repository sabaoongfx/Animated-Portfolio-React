import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { colorClasses } from '../config/colors';
import { useTranslation } from '../i18n/LanguageContext';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
// To add your photo: place it in src/assets/ and import it here
// import ProfilePhoto from '../assets/your-photo.jpg';

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const services = [
    {
      category: t('navigation.serviceCategories.developmentServices'),
      items: [
        { name: t('navigation.serviceItems.customSoftware'), href: '#services' },
        { name: t('navigation.serviceItems.enterpriseSolutions'), href: '#services' },
        { name: t('navigation.serviceItems.performanceOptimization'), href: '#services' }
      ]
    },
    {
      category: t('navigation.serviceCategories.technologySolutions'),
      items: [
        { name: t('navigation.serviceItems.cloudSolutions'), href: '#services' },
        { name: t('navigation.serviceItems.aiMachineLearning'), href: '#services' },
        { name: t('navigation.serviceItems.processAutomation'), href: '#services' }
      ]
    }
  ];

  const industries = [
    { name: t('navigation.industryItems.technology'), href: '#clients' },
    { name: t('navigation.industryItems.engineering'), href: '#clients' },
    { name: t('navigation.industryItems.healthcare'), href: '#clients' },
    { name: t('navigation.industryItems.manufacturing'), href: '#clients' },
    { name: t('navigation.industryItems.mediaEntertainment'), href: '#clients' },
    { name: t('navigation.industryItems.professionalServices'), href: '#clients' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full primary-menu border-b border-border/50 bg-white" role="banner">
      <div className="container flex h-14 items-center">
        {/* Logo with Profile */}
        <div className="mr-5 hidden md:flex">
          <a 
            className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:ring-opacity-50 rounded-lg p-1" 
            href="/"
            aria-label="Developer Portfolio, go to homepage"
          >
            <div className="h-11 w-11 rounded-full bg-[#FF4500] flex items-center justify-center text-white font-bold text-lg border-2 border-brand-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-[#FF4500]  tracking-tight">Sabaoon</span>
              <span className="text-xs font-medium -mt-1">React/Next.js Dev</span>
            </div>
          </a>
        </div>

        {/* Mobile Logo with Profile */}
        <div className="mr-3 md:hidden flex">
          <a 
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:ring-opacity-50 rounded-lg p-1" 
            href="/"
            aria-label="Developer Portfolio, go to homepage"
          >
            <div className="h-9 w-9 rounded-full bg-[#FF4500] flex items-center justify-center text-white font-bold text-base border-2 border-brand-200 shadow-lg">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-[#FF4500]">Sabaoon</span>
              <span className="text-xs font-medium -mt-1">React/Next.js Dev</span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className="flex items-center text-foreground transition-colors hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:ring-opacity-50 rounded"
                type="button"
                aria-expanded={activeDropdown === 'services'}
                aria-haspopup="true"
                aria-label="Services menu"
              >
                {t('navigation.services')} <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-96 rounded-md border bg-popover p-4 text-popover-foreground shadow-md"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {services.map((service, index) => (
                        <div key={index}>
                          <h4 className="mb-2 text-sm font-medium leading-none">{service.category}</h4>
                          <ul className="space-y-1">
                            {service.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <a href={item.href} className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm">
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Industries Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('industries')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className="flex items-center text-foreground transition-colors hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:ring-opacity-50 rounded"
                type="button"
                aria-expanded={activeDropdown === 'industries'}
                aria-haspopup="true"
                aria-label="Industries menu"
              >
                {t('navigation.industries')} <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'industries' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md"
                  >
                    <ul className="space-y-1">
                      {industries.map((industry, index) => (
                        <li key={index}>
                          <a href={industry.href} className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm">
                            {industry.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#technologies" className={`text-foreground transition-colors ${colorClasses.hover.textAccent}`}>{t('navigation.technologies')}</a>
            <a href="#about" className={`text-foreground transition-colors ${colorClasses.hover.textAccent}`}>{t('navigation.about')}</a>
            <a href="#clients" className={`text-foreground transition-colors ${colorClasses.hover.textAccent}`}>{t('navigation.clients')}</a>
            <a href="#contact" className={`text-foreground transition-colors ${colorClasses.hover.textAccent}`}>{t('navigation.contact')}</a>
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-3">
              <ThemeToggle />
              <LanguageSelector />
            </div>
            <a href="#contact" className={`hidden md:inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ${colorClasses.bg.accent} text-white ${colorClasses.hover.bgAccent} h-10 px-4 py-2 shadow-lg transition-all duration-300 transform hover:scale-105`}>
              {t('navigation.getInTouch')}
            </a>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="mr-2 px-2 py-1 text-base text-foreground hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-[#003366] focus:ring-opacity-50 rounded md:hidden transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          <span className="sr-only">{t('navigation.toggleMenu')}</span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border/50"
          >
            <div className="px-4 py-6 space-y-4">
              <a href="#services" className={`block text-foreground ${colorClasses.hover.textAccent} transition-colors`}>{t('navigation.services')}</a>
              <a href="#technologies" className={`block text-foreground ${colorClasses.hover.textAccent} transition-colors`}>{t('navigation.technologies')}</a>
              <a href="#about" className={`block text-foreground ${colorClasses.hover.textAccent} transition-colors`}>{t('navigation.about')}</a>
              <a href="#clients" className={`block text-foreground ${colorClasses.hover.textAccent} transition-colors`}>{t('navigation.clients')}</a>
              <a href="#contact" className={`block text-foreground ${colorClasses.hover.textAccent} transition-colors`}>{t('navigation.contact')}</a>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-3">
                  <ThemeToggle />
                  <LanguageSelector />
                </div>
                <a href="#contact" className={`w-full ${colorClasses.bg.accent} text-white ${colorClasses.hover.bgAccent} px-6 py-2 rounded-lg transition-all duration-300 block text-center shadow-lg transform hover:scale-105`}>
                  {t('navigation.getInTouch')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
