
import { motion } from 'framer-motion';
import {
  MapPin,
  Linkedin,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { colorClasses } from '../config/colors';
import { useTranslation } from '../i18n/LanguageContext';
// To add your photo: place it in src/assets/ and import it here
// import ProfilePhoto from '../assets/your-photo.jpg';

const Footer = () => {
  const { t } = useTranslation();
  
  const services = [
    { name: 'Cross-Platform Mobile Apps', href: '#services' },
    { name: 'Backend Integration', href: '#services' },
    { name: 'App Store Deployment', href: '#services' },
    { name: 'Advanced Features', href: '#services' },
    { name: 'UI/UX Design', href: '#services' },
    { name: 'App Optimization', href: '#services' }
  ];

  const industries = [
    { name: 'Media & Entertainment', href: '#clients' },
    { name: 'Healthcare & Education', href: '#clients' },
    { name: 'FinTech', href: '#clients' },
    { name: 'Logistics', href: '#clients' },
    { name: 'Education & Technology', href: '#clients' },
    { name: 'E-commerce', href: '#clients' }
  ];

  const portfolio = [
    { name: 'About Me', href: '#about' },
    { name: 'My Services', href: '#services' },
    { name: 'Technologies', href: '#technologies' },
    { name: 'Flutter Projects', href: '#clients' },
    { name: 'Contact Me', href: '#contact' },
    { name: 'Resume/CV', href: '#' }
  ];

  return (
    <footer className="bg-background border-t border-border/50 text-foreground">

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Personal Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Profile Section */}
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#FF4500] flex items-center justify-center text-white font-bold text-2xl border-2 border-brand-200 shadow-lg mr-4">
                  S
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${colorClasses.text.accent} mb-1`}>
                    Sabaoon
                  </h2>
                  <p className=" font-medium text-lg">React/Next.js Developer & Mobile App Specialist</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t('footer.description')}
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className={`h-5 w-5 ${colorClasses.text.accent} mr-3`} />
                  <span className="text-foreground">Your Location</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground">
                    {t('footer.businessHours')}
                  </span>
                </div>
              </div>

              {/* Social & Professional Links */}
              <div className="flex space-x-4 mt-6">
                <motion.a
                  href="https://linkedin.com/in/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-12 h-12 bg-[#0077B5] rounded-lg flex items-center justify-center text-white hover:bg-[#005885] transition-all duration-300"
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://upwork.com/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white hover:bg-green-700 transition-all duration-300`}
                >
                  <ExternalLink className="h-5 w-5" />
                </motion.a>
              </div>
              
              {/* Platform Labels */}
              <div className="flex space-x-4 mt-2">
                <span className="text-xs text-muted-foreground">LinkedIn</span>
                <span className="text-xs text-muted-foreground ml-8">Upwork</span>
              </div>
            </motion.div>
          </div>

          {/* Services */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">{t('footer.services')}</h4>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={index}>
                    <a 
                      href={service.href} 
                      className="text-foreground hover:text-muted-foreground transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Industries */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">{t('footer.industries')}</h4>
              <ul className="space-y-2">
                {industries.map((industry, index) => (
                  <li key={index}>
                    <a 
                      href={industry.href} 
                      className="text-foreground hover:text-muted-foreground transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {industry.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Company */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">{t('footer.company')}</h4>
              <ul className="space-y-2">
                {portfolio.map((item, index) => (
                  <li key={index}>
                    <a 
                      href={item.href} 
                      className="text-foreground hover:text-muted-foreground transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              className="text-muted-foreground text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              © 2025 Sabaoon - React/Next.js Developer. {t('footer.allRightsReserved')}
            </motion.p>
            <motion.div 
              className="flex space-x-6 mt-4 md:mt-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm">
                {t('footer.privacyPolicy')}
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm">
                {t('footer.termsOfService')}
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm">
                {t('footer.cookiePolicy')}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
