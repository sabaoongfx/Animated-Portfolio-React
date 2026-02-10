import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Language = 'en' | 'de';

interface TranslationData {
  [key: string]: any;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: TranslationData;
  t: (key: string) => string;
}

const enTranslations: TranslationData = {
  "common": {
    "loading": "Loading...",
    "submit": "Submit",
    "cancel": "Cancel",
    "back": "Back",
    "next": "Next",
    "close": "Close",
    "save": "Save",
    "edit": "Edit",
    "delete": "Delete",
    "confirm": "Confirm",
    "language": "Language",
    "english": "English",
    "german": "German"
  },
  "navigation": {
    "home": "Home",
    "about": "About",
    "services": "Services",
    "contact": "Contact",
    "portfolio": "Portfolio",
    "technologies": "Technologies",
    "clients": "Clients",
    "industries": "Industries",
    "getInTouch": "Get in Touch",
    "toggleMenu": "Toggle Menu",
    "serviceCategories": {
      "developmentServices": "Development Services",
      "technologySolutions": "Technology Solutions"
    },
    "serviceItems": {
      "customSoftware": "Custom Software Development",
      "enterpriseSolutions": "Enterprise Solutions",
      "performanceOptimization": "Performance Optimization",
      "cloudSolutions": "Cloud Solutions",
      "aiMachineLearning": "AI & Machine Learning",
      "processAutomation": "Process Automation"
    },
    "industryItems": {
      "technology": "Technology",
      "engineering": "Engineering",
      "healthcare": "Healthcare",
      "manufacturing": "Manufacturing",
      "mediaEntertainment": "Media & Entertainment",
      "professionalServices": "Professional Services"
    },
    "mobile": {
      "home": "Home",
      "contact": "Contact"
    }
  },
  "contact": {
    "title": "Let's Work Together",
    "subtitle": "Have a project in mind? Let's discuss how I can help bring your ideas to life with clean, scalable code and modern technologies.",
    "form": {
      "name": {
        "label": "Full Name",
        "placeholder": "John Doe",
        "required": true
      },
      "email": {
        "label": "Email Address",
        "placeholder": "john@company.com",
        "required": true
      },
      "company": {
        "label": "Company",
        "placeholder": "Your Company",
        "required": false
      },
      "phone": {
        "label": "Phone Number",
        "placeholder": "+1 (555) 123-4567",
        "required": false
      },
      "message": {
        "label": "Project Details",
        "placeholder": "Tell me about your project, timeline, and what you're looking to build...",
        "required": true
      },
      "captcha": {
        "label": "Security verification required"
      },
      "submit": "Send Message",
      "sending": "Sending..."
    },
    "alerts": {
      "captchaRequired": "Please complete the CAPTCHA verification.",
      "success": "Thank you! Your message has been sent successfully. I'll get back to you soon.",
      "error": "Sorry, there was an error sending your message. Please try again."
    }
  },
  "hero": {
    "title": "React/Next.js Web Developer",
    "subtitle": "I create modern web applications with React and Next.js. Expert in TypeScript, full-stack development, and API implementations that deliver seamless user experiences.",
    "cta": "Explore My Services",
    "learnMore": "Learn More"
  },
  "services": {
    "title": "My Web Development Services",
    "subtitle": "Modern web development with React, Next.js and robust backend integrations",
    "customSoftware": {
      "title": "React & Next.js Apps",
      "description": "Modern, fast, and SEO-friendly web applications built with React and Next.js for optimal performance.",
      "features": [
        "iOS & Android Apps",
        "Single Codebase", 
        "Native Performance",
        "Custom UI/UX Design"
      ]
    },
    "webDevelopment": {
      "title": "Backend Integration",
      "description": "Robust backend services with Node.js, databases, and custom APIs for your web applications.",
      "features": [
        "Firebase Integration",
        "Supabase Setup",
        "RESTful APIs",
        "Real-time Data Sync"
      ]
    },
    "mobileDevelopment": {
      "title": "App Store Deployment", 
      "description": "Complete app store submission and optimization for Google Play Store and Apple App Store.",
      "features": [
        "Google Play Store",
        "Apple App Store",
        "App Store Optimization",
        "Store Compliance"
      ]
    },
    "cloudSolutions": {
      "title": "Advanced Features",
      "description": "Complex web app features including real-time updates, authentication, and interactive dashboards.",
      "features": [
        "Audio Streaming",
        "Offline Functionality",
        "Push Notifications",
        "Real-time Updates"
      ]
    },
    "aiMl": {
      "title": "UI/UX Design",
      "description": "Beautiful, intuitive mobile interfaces that provide exceptional user experiences across all devices.",
      "features": [
        "Material Design",
        "Cupertino Design",
        "Custom Animations",
        "Responsive Layouts"
      ]
    },
    "consulting": {
      "title": "App Optimization",
      "description": "Performance optimization and maintenance for both iOS and Android platforms.",
      "features": [
        "Performance Tuning",
        "Memory Optimization",
        "App Maintenance",
        "Bug Fixes & Updates"
      ]
    }
  },
  "technologies": {
    "title": "My Web Development Stack",
    "subtitle": "Modern web development tools and frameworks for building exceptional applications",
    "impact": {
      "title": "Building Mobile Solutions That Matter",
      "subtitle": "I leverage cutting-edge React and Next.js technology to create web applications that deliver real value to users and businesses."
    },
    "items": {
      "flutter": {
        "name": "React",
        "description": "Build interactive UIs with component-based architecture. Fast, flexible, and perfect for modern web applications.",
        "heading": "Frontend framework"
      },
      "firebase": {
        "name": "Next.js",
        "description": "Full-stack React framework with server-side rendering, API routes, and optimized performance out of the box.",
        "heading": "React framework"
      },
      "angular": {
        "name": "TypeScript",
        "description": "Type-safe JavaScript that catches errors early and improves code quality with better tooling and documentation.",
        "heading": "Type-safe JavaScript"
      },
      "odoo": {
        "name": "Tailwind CSS",
        "description": "Utility-first CSS framework for rapid UI development. Build custom designs without leaving your HTML.",
        "heading": "CSS framework"
      }
    },
    "additionalInfo": "Plus Node.js, PostgreSQL, MongoDB, REST APIs, GraphQL, Git, and modern DevOps practices"
  },
  "about": {
    "title": "About Sabaoon",
    "subtitle": "React/Next.js Web Developer",
    "description": "I'm Sabaoon, a passionate React/Next.js developer specializing in modern web applications with robust backend integrations. I excel at building scalable, efficient web solutions that seamlessly integrate with various backend systems.",
    "expertise": "My expertise spans the entire web development lifecycle, from conceptualization to deployment. I'm proficient in React, Next.js, and TypeScript, with advanced knowledge of backend services, databases, and RESTful APIs. I have experience implementing complex features such as real-time updates, authentication, and interactive dashboards.",
    "globalPresence": "Available for remote work worldwide, I deliver modern web applications that work seamlessly across all devices. I'm committed to clean code, performance optimization, and staying current with web development trends.",
    "visualCard": {
      "title": "Modern Web Development",
      "subtitle": "Transforming ideas into polished web apps"
    },
    "stats": {
      "yearsExperience": "Years of Excellence",
      "projectsDelivered": "Apps Launched",
      "teamMembers": "Platform Coverage",
      "countriesServed": "App Store Deployments"
    },
    "mission": "To transform app concepts into polished, user-friendly realities that provide exceptional mobile experiences across all platforms.",
    "vision": "To be recognized as a leading React/Next.js developer who delivers high-quality web applications that exceed client expectations.",
    "values": {
      "innovation": "Innovation",
      "quality": "Quality",
      "performance": "Performance",
      "usability": "Usability"
    }
  },
  "clients": {
    "title": "Notable Web Projects",
    "subtitle": "Showcase of successful web applications with advanced features and seamless user experiences",
    "cta": {
      "description": "Ready to bring your app idea to life?",
      "button": "Start Your Project"
    },
    "companies": {
      "ecommerce": {
        "name": "ShopFlow",
        "description": "A modern e-commerce platform built with Next.js and Stripe integration. Features include real-time inventory, cart management, and seamless checkout experience.",
        "industry": "E-Commerce"
      },
      "dashboard": {
        "name": "DataViz Pro",
        "description": "Interactive analytics dashboard with real-time data visualization, custom reports, and role-based access control. Built with React and D3.js.",
        "industry": "SaaS / Analytics"
      },
      "social": {
        "name": "ConnectHub",
        "description": "A social networking platform with real-time messaging, post sharing, and user authentication. Features infinite scroll and optimistic UI updates.",
        "industry": "Social Media"
      }
    }
  },
  "footer": {
    "company": "Portfolio",
    "services": "Services",
    "contact": "Contact",
    "followUs": "Follow Me",
    "allRightsReserved": "All rights reserved.",
    "privacyPolicy": "Privacy Policy",
    "termsOfService": "Terms of Service",
    "industries": "Industries",
    "description": "React/Next.js Developer passionate about creating modern web applications that make a real difference. Specializing in React, Next.js, TypeScript, and full-stack development for seamless user experiences.",
    "businessHours": "Available: Monday - Friday, 9:00 AM - 6:00 PM (UTC)",
    "cookiePolicy": "Cookie Policy",
    "links": {
      "aboutMe": "About Me",
      "myServices": "My Services",
      "technologies": "Technologies",
      "portfolio": "Portfolio",
      "contactMe": "Contact Me",
      "customSoftware": "Custom Software Development",
      "webDevelopment": "Web Development",
      "mobileDevelopment": "Mobile Development",
      "cloudSolutions": "Cloud Solutions",
      "aiMachineLearning": "AI & Machine Learning",
      "technicalConsulting": "Technical Consulting",
      "frontend": "Frontend Development",
      "backend": "Backend Development",
      "fullstack": "Full Stack Development",
      "database": "Database Design",
      "api": "API Development",
      "deployment": "Deployment & DevOps"
    }
  }
};

const deTranslations: TranslationData = {
  "common": {
    "loading": "Lädt...",
    "submit": "Senden",
    "cancel": "Abbrechen",
    "back": "Zurück",
    "next": "Weiter",
    "close": "Schließen",
    "save": "Speichern",
    "edit": "Bearbeiten",
    "delete": "Löschen",
    "confirm": "Bestätigen",
    "language": "Sprache",
    "english": "Englisch",
    "german": "Deutsch"
  },
  "navigation": {
    "home": "Startseite",
    "about": "Über uns",
    "services": "Leistungen",
    "contact": "Kontakt",
    "portfolio": "Portfolio",
    "technologies": "Technologien",
    "clients": "Kunden",
    "industries": "Branchen",
    "getInTouch": "Kontakt aufnehmen",
    "toggleMenu": "Menü umschalten",
    "serviceCategories": {
      "developmentServices": "Entwicklungsdienstleistungen",
      "technologySolutions": "Technologielösungen"
    },
    "serviceItems": {
      "customSoftware": "Individuelle Software-Entwicklung",
      "enterpriseSolutions": "Unternehmenslösungen",
      "performanceOptimization": "Performance-Optimierung",
      "cloudSolutions": "Cloud-Lösungen",
      "aiMachineLearning": "KI & Machine Learning",
      "processAutomation": "Prozess-Automatisierung"
    },
    "industryItems": {
      "technology": "Technologie",
      "engineering": "Ingenieurwesen",
      "healthcare": "Gesundheitswesen",
      "manufacturing": "Fertigung",
      "mediaEntertainment": "Medien & Unterhaltung",
      "professionalServices": "Professionelle Dienstleistungen"
    },
    "mobile": {
      "home": "Startseite",
      "contact": "Kontakt"
    }
  },
  "contact": {
    "title": "Kontakt aufnehmen",
    "subtitle": "Bereit, Ihr Unternehmen mit modernster Technologie zu transformieren? Lassen Sie uns besprechen, wie wir Ihnen beim Erreichen Ihrer Ziele helfen können.",
    "form": {
      "name": {
        "label": "Vollständiger Name",
        "placeholder": "Max Mustermann",
        "required": true
      },
      "email": {
        "label": "E-Mail-Adresse",
        "placeholder": "max@unternehmen.de",
        "required": true
      },
      "company": {
        "label": "Unternehmen",
        "placeholder": "Ihr Unternehmen",
        "required": false
      },
      "phone": {
        "label": "Telefonnummer",
        "placeholder": "+49 (30) 123-4567",
        "required": false
      },
      "message": {
        "label": "Nachricht",
        "placeholder": "Erzählen Sie uns von Ihrem Projekt oder wie wir Ihnen helfen können...",
        "required": true
      },
      "captcha": {
        "label": "Sicherheitsverifikation erforderlich"
      },
      "submit": "Nachricht senden",
      "sending": "Wird gesendet..."
    },
    "alerts": {
      "captchaRequired": "Bitte vervollständigen Sie die CAPTCHA-Verifikation.",
      "success": "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns bald bei Ihnen.",
      "error": "Entschuldigung, beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."
    }
  },
  "hero": {
    "title": "Ideen in digitale Realität verwandeln",
    "subtitle": "Wir liefern modernste Software-Lösungen, die Innovation vorantreiben und das Unternehmenswachstum weltweit beschleunigen.",
    "cta": "Projekt starten",
    "learnMore": "Mehr erfahren"
  },
  "services": {
    "title": "Unsere Dienstleistungen",
    "subtitle": "Umfassende Software-Lösungen, maßgeschneidert für Ihre Geschäftsanforderungen",
    "customSoftware": {
      "title": "Individuelle Software-Entwicklung",
      "description": "Maßgeschneiderte Lösungen, die speziell für Ihre einzigartigen Geschäftsanforderungen und Arbeitsabläufe entwickelt wurden.",
      "features": [
        "Web-Anwendungen",
        "Mobile Apps",
        "Desktop-Software", 
        "API-Entwicklung"
      ]
    },
    "webDevelopment": {
      "title": "Web-Entwicklung",
      "description": "Moderne, responsive Webanwendungen, die außergewöhnliche Benutzererfahrungen bieten.",
      "features": [
        "ERP-Systeme",
        "CRM-Lösungen",
        "Workflow-Automatisierung",
        "Business Intelligence"
      ]
    },
    "mobileDevelopment": {
      "title": "Mobile Entwicklung",
      "description": "Native und plattformübergreifende mobile Apps, die Benutzer auf jedem Gerät begeistern.",
      "features": [
        "Performance-Audits",
        "Datenbank-Optimierung",
        "Last-Tests",
        "Skalierbarkeits-Lösungen"
      ]
    },
    "cloudSolutions": {
      "title": "Cloud-Lösungen",
      "description": "Skalierbare Cloud-Infrastruktur und Migrationsdienste für moderne Unternehmen.",
      "features": [
        "Cloud-Architektur",
        "Migrations-Services",
        "Serverless-Lösungen",
        "Cloud-Integration"
      ]
    },
    "aiMl": {
      "title": "KI & Machine Learning",
      "description": "Intelligente Lösungen, die Prozesse automatisieren und wertvolle Einblicke liefern.",
      "features": [
        "KI-Modell-Entwicklung",
        "Datenanalyse & Einblicke",
        "Natural Language Processing",
        "Computer Vision Lösungen"
      ]
    },
    "consulting": {
      "title": "Technische Beratung",
      "description": "Expertenberatung zu Technologiestrategie, Architektur und Implementierung.",
      "features": [
        "Workflow-Automatisierung",
        "RPA-Implementierung",
        "Prozess-Optimierung",
        "Digitale Transformation"
      ]
    }
  },
  "technologies": {
    "title": "Unser Technologie-Stack",
    "subtitle": "Modernste Tools und Frameworks für überlegene Software-Lösungen",
    "impact": {
      "title": "Technologie in positive Wirkung übersetzen",
      "subtitle": "Wir nutzen die Kraft moderner Technologie, um Lösungen zu schaffen, die einen echten Unterschied im Leben der Menschen und in Unternehmen bewirken."
    },
    "items": {
      "flutter": {
        "name": "Flutter",
        "description": "Bringen Sie Ihre Marke schneller in die Hände Ihrer Kunden mit einer einzigen, hochwertigen App, die überall funktioniert.",
        "heading": "Plattformübergreifende App-Entwicklung"
      },
      "firebase": {
        "name": "Firebase",
        "description": "Konzentrieren Sie sich auf Ihr Unternehmenswachstum, während wir die gesamte komplexe Infrastruktur mit Unternehmensgrade-Zuverlässigkeit handhaben.",
        "heading": "Backend- und Cloud-Services"
      },
      "angular": {
        "name": "Angular",
        "description": "Erhalten Sie eine zuverlässige, zukunftssichere Webanwendung, die sich nahtlos in Ihre Unternehmenssysteme integriert.",
        "heading": "Unternehmens-Webanwendungen"
      },
      "odoo": {
        "name": "Odoo",
        "description": "Optimieren Sie Ihren gesamten Geschäftsbetrieb mit einer einzigen, integrierten Plattform, die mit Ihren Anforderungen wächst.",
        "heading": "Geschäftsmanagement-Lösungen"
      }
    },
    "additionalInfo": "Und viele weitere Technologien einschließlich React, Node.js, Python, .NET und Cloud-Plattformen"
  },
  "about": {
    "title": "Über Alamgir Software International",
    "subtitle": "Software-Exzellenz seit unserer Gründung",
    "description": "Gegründet im Jahr 2008 vom deutschen Software-Berater Aurangseb Malik in Rawalpindi, Pakistan, hat sich Alamgir Software International zu einem vertrauenswürdigen Anbieter von individuellen Software-Lösungen entwickelt.",
    "expertise": "Unsere Expertise erstreckt sich über Web-, Mobile- und Unternehmensanwendungen mit einem starken Fokus auf Performance-Optimierung und skalierbare Architektur. Unser Engagement für wartbare und skalierbare Lösungen ermöglicht es uns, modernste Technologie zu liefern, die jahrelang zuverlässig funktioniert und sich nahtlos an Ihre wachsenden Anforderungen anpasst.",
    "globalPresence": "Mit einer globalen Präsenz, die Kunden in Pakistan und Deutschland bedient, spezialisieren wir uns auf individuelle Software-Entwicklung, Unternehmenslösungen, Performance-Optimierung und Cloud-Services.",
    "visualCard": {
      "title": "Innovationsgetrieben",
      "subtitle": "Die Zukunft mit Technologie gestalten"
    },
    "stats": {
      "yearsExperience": "Jahre Exzellenz",
      "projectsDelivered": "Projekte geliefert",
      "teamMembers": "Experten-Team-Mitglieder",
      "countriesServed": "Bediente Länder"
    },
    "mission": "Unternehmen weltweit mit modernsten Software-Lösungen zu stärken, die Wachstum, Effizienz und Innovation fördern.",
    "vision": "Der globale Marktführer in der individuellen Software-Entwicklung zu sein, anerkannt für unsere Innovation, Qualität und den Erfolg unserer Kunden.",
    "values": {
      "innovation": "Innovation",
      "quality": "Qualität",
      "collaboration": "Zusammenarbeit",
      "excellence": "Exzellenz"
    }
  },
  "clients": {
    "title": "Vertraut von Branchenführern",
    "subtitle": "Wir arbeiten mit Unternehmen aus verschiedenen Branchen zusammen, um außergewöhnliche Ergebnisse zu liefern",
    "cta": {
      "description": "Bereit, unserer wachsenden Liste zufriedener Kunden beizutreten?",
      "button": "Starten Sie Ihr Projekt heute"
    },
    "companies": {
      "nasheedStation": {
        "name": "Nasheed Station",
        "description": "Islamische Musik-Streaming-App mit Flutter entwickelt, mit Audio-Streaming, Offline-Wiedergabe, Wiedergabelisten und Benutzer-Favoriten. Erfolgreich im Google Play Store und Apple App Store mit Firebase-Backend-Integration veröffentlicht.",
        "industry": "Medien & Unterhaltung"
      },
      "janzeto": {
        "name": "Janzeto",
        "description": "Ein Netzwerk von Premium-Konditoreien in Astana.",
        "industry": "Lebensmittel & Einzelhandel"
      },
      "jaidarman": {
        "name": "Jaidarman",
        "description": "Eine beliebte Jugend-Comedy-Bewegung, die Humor mit sozialen und kulturellen Themen verbindet.",
        "industry": "Unterhaltung & Medien"
      }
    }
  },
  "footer": {
    "company": "Unternehmen",
    "services": "Dienstleistungen",
    "contact": "Kontakt",
    "followUs": "Folgen Sie uns",
    "allRightsReserved": "Alle Rechte vorbehalten.",
    "privacyPolicy": "Datenschutzrichtlinie",
    "termsOfService": "Nutzungsbedingungen",
    "industries": "Branchen",
    "description": "Wir unterstützen Unternehmen weltweit mit innovativen Technologielösungen, die digitale Transformation vorantreiben und nachhaltige Wettbewerbsvorteile schaffen.",
    "businessHours": "Geschäftszeiten: Montag - Freitag, 9:00 - 17:00 Uhr (PKT)",
    "cookiePolicy": "Cookie-Richtlinie",
    "links": {
      "aboutUs": "Über uns",
      "ourServices": "Unsere Dienstleistungen",
      "technologies": "Technologien",
      "clientPortfolio": "Kunden-Portfolio",
      "contactUs": "Kontakt",
      "customSoftware": "Individuelle Software-Entwicklung",
      "enterpriseSolutions": "Unternehmenslösungen",
      "performanceOptimization": "Performance-Optimierung",
      "cloudSolutions": "Cloud-Lösungen",
      "aiMachineLearning": "KI & Machine Learning",
      "processAutomation": "Prozess-Automatisierung",
      "technology": "Technologie",
      "engineering": "Ingenieurwesen",
      "healthcare": "Gesundheitswesen",
      "manufacturing": "Fertigung",
      "mediaEntertainment": "Medien & Unterhaltung",
      "professionalServices": "Professionelle Dienstleistungen"
    }
  }
};

const translations = {
  en: enTranslations,
  de: deTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get initial language from localStorage or default to 'en'
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferred-language');
      if (savedLanguage === 'en' || savedLanguage === 'de') {
        return savedLanguage;
      }
      // Try to detect browser language
      const browserLanguage = navigator.language.toLowerCase();
      if (browserLanguage.startsWith('de')) {
        return 'de';
      }
    }
    return 'en';
  });

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', newLanguage);
    }
  };

  const currentTranslations = translations[language];

  // Helper function to get nested translation values
  const getNestedTranslation = (obj: any, path: string): string => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : null;
    }, obj);
  };

  const t = (key: string): string => {
    const translation = getNestedTranslation(currentTranslations, key);
    if (translation === null) {
      console.warn(`Translation missing for key: ${key}`);
      return key; // Return the key if translation is missing
    }
    return translation;
  };

  const value = {
    language,
    setLanguage,
    translations: currentTranslations,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Custom hook for easier translation access
export const useTranslation = () => {
  const { t, language, setLanguage } = useLanguage();
  return { t, language, setLanguage };
};
