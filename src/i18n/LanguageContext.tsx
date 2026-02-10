import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Language = 'en' | 'de' | 'ar' | 'ja' | 'zh' | 'id' | 'es' | 'fr' | 'ru';

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

// Arabic translations
const arTranslations: TranslationData = {
  "common": {
    "loading": "جاري التحميل...",
    "submit": "إرسال",
    "cancel": "إلغاء",
    "back": "رجوع",
    "next": "التالي",
    "close": "إغلاق",
    "save": "حفظ",
    "edit": "تعديل",
    "delete": "حذف",
    "confirm": "تأكيد",
    "language": "اللغة",
    "english": "الإنجليزية",
    "german": "الألمانية"
  },
  "navigation": {
    "home": "الرئيسية",
    "about": "حول",
    "services": "الخدمات",
    "contact": "اتصل بنا",
    "portfolio": "الأعمال",
    "technologies": "التقنيات",
    "clients": "العملاء",
    "industries": "الصناعات",
    "getInTouch": "تواصل معنا",
    "toggleMenu": "تبديل القائمة",
    "serviceCategories": {
      "developmentServices": "خدمات التطوير",
      "technologySolutions": "الحلول التقنية"
    },
    "serviceItems": {
      "customSoftware": "تطوير البرمجيات المخصصة",
      "enterpriseSolutions": "حلول المؤسسات",
      "performanceOptimization": "تحسين الأداء",
      "cloudSolutions": "الحلول السحابية",
      "aiMachineLearning": "الذكاء الاصطناعي والتعلم الآلي",
      "processAutomation": "أتمتة العمليات"
    },
    "industryItems": {
      "technology": "التكنولوجيا",
      "engineering": "الهندسة",
      "healthcare": "الرعاية الصحية",
      "manufacturing": "التصنيع",
      "mediaEntertainment": "الإعلام والترفيه",
      "professionalServices": "الخدمات المهنية"
    },
    "mobile": {
      "home": "الرئيسية",
      "contact": "اتصل"
    }
  },
  "contact": {
    "title": "لنعمل معاً",
    "subtitle": "هل لديك مشروع في ذهنك؟ دعنا نناقش كيف يمكنني مساعدتك في تحويل أفكارك إلى واقع بكود نظيف وتقنيات حديثة.",
    "form": {
      "name": { "label": "الاسم الكامل", "placeholder": "محمد أحمد", "required": true },
      "email": { "label": "البريد الإلكتروني", "placeholder": "mohamed@company.com", "required": true },
      "company": { "label": "الشركة", "placeholder": "شركتك", "required": false },
      "phone": { "label": "رقم الهاتف", "placeholder": "+966 50 123 4567", "required": false },
      "message": { "label": "تفاصيل المشروع", "placeholder": "أخبرني عن مشروعك والجدول الزمني وما تريد بناءه...", "required": true },
      "captcha": { "label": "التحقق الأمني مطلوب" },
      "submit": "إرسال الرسالة",
      "sending": "جاري الإرسال..."
    },
    "alerts": {
      "captchaRequired": "يرجى إكمال التحقق الأمني.",
      "success": "شكراً لك! تم إرسال رسالتك بنجاح. سأتواصل معك قريباً.",
      "error": "عذراً، حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى."
    }
  },
  "hero": {
    "title": "مطور ويب React/Next.js",
    "subtitle": "أقوم بإنشاء تطبيقات ويب حديثة باستخدام React و Next.js. خبير في TypeScript والتطوير الشامل وتنفيذ واجهات برمجة التطبيقات التي تقدم تجارب مستخدم سلسة.",
    "cta": "استكشف خدماتي",
    "learnMore": "اعرف المزيد"
  },
  "services": {
    "title": "خدمات تطوير الويب",
    "subtitle": "تطوير ويب حديث مع React و Next.js وتكاملات خلفية قوية",
    "customSoftware": {
      "title": "تطبيقات React & Next.js",
      "description": "تطبيقات ويب حديثة وسريعة وصديقة لمحركات البحث مبنية بـ React و Next.js للأداء الأمثل.",
      "features": ["تطبيقات iOS و Android", "قاعدة كود واحدة", "أداء أصلي", "تصميم UI/UX مخصص"]
    },
    "webDevelopment": {
      "title": "تكامل الخلفية",
      "description": "خدمات خلفية قوية مع Node.js وقواعد البيانات وواجهات برمجة التطبيقات المخصصة.",
      "features": ["تكامل Firebase", "إعداد Supabase", "واجهات RESTful", "مزامنة البيانات في الوقت الفعلي"]
    },
    "mobileDevelopment": {
      "title": "نشر متجر التطبيقات",
      "description": "تقديم كامل لمتجر التطبيقات وتحسينه لـ Google Play و Apple App Store.",
      "features": ["Google Play Store", "Apple App Store", "تحسين متجر التطبيقات", "الامتثال للمتجر"]
    },
    "cloudSolutions": {
      "title": "الميزات المتقدمة",
      "description": "ميزات تطبيقات ويب معقدة بما في ذلك التحديثات الفورية والمصادقة ولوحات المعلومات التفاعلية.",
      "features": ["بث الصوت", "وظائف غير متصلة", "إشعارات فورية", "تحديثات فورية"]
    },
    "aiMl": {
      "title": "تصميم UI/UX",
      "description": "واجهات جميلة وبديهية توفر تجارب مستخدم استثنائية على جميع الأجهزة.",
      "features": ["تصميم Material", "تصميم Cupertino", "رسوم متحركة مخصصة", "تخطيطات متجاوبة"]
    },
    "consulting": {
      "title": "تحسين التطبيقات",
      "description": "تحسين الأداء والصيانة لكل من منصات iOS و Android.",
      "features": ["ضبط الأداء", "تحسين الذاكرة", "صيانة التطبيق", "إصلاحات الأخطاء والتحديثات"]
    }
  },
  "technologies": {
    "title": "مجموعة تقنيات تطوير الويب",
    "subtitle": "أدوات وأطر عمل حديثة لبناء تطبيقات استثنائية",
    "impact": {
      "title": "بناء حلول تقنية مهمة",
      "subtitle": "أستفيد من تقنية React و Next.js المتطورة لإنشاء تطبيقات ويب تقدم قيمة حقيقية للمستخدمين والشركات."
    },
    "items": {
      "flutter": { "name": "React", "description": "بناء واجهات تفاعلية مع بنية قائمة على المكونات. سريع ومرن ومثالي لتطبيقات الويب الحديثة.", "heading": "إطار عمل الواجهة الأمامية" },
      "firebase": { "name": "Next.js", "description": "إطار عمل React كامل مع العرض من جانب الخادم ومسارات API وأداء محسن.", "heading": "إطار عمل React" },
      "angular": { "name": "TypeScript", "description": "JavaScript آمن النوع يكتشف الأخطاء مبكراً ويحسن جودة الكود مع أدوات وتوثيق أفضل.", "heading": "JavaScript آمن النوع" },
      "odoo": { "name": "Tailwind CSS", "description": "إطار عمل CSS قائم على الأدوات المساعدة للتطوير السريع للواجهة. بناء تصاميم مخصصة دون مغادرة HTML.", "heading": "إطار عمل CSS" }
    },
    "additionalInfo": "بالإضافة إلى Node.js و PostgreSQL و MongoDB و REST APIs و GraphQL و Git وممارسات DevOps الحديثة"
  },
  "about": {
    "title": "حول صباعون",
    "subtitle": "مطور ويب React/Next.js",
    "description": "أنا صباعون، مطور React/Next.js شغوف متخصص في تطبيقات الويب الحديثة مع تكاملات خلفية قوية.",
    "expertise": "تمتد خبرتي عبر دورة تطوير الويب الكاملة، من التصور إلى النشر.",
    "globalPresence": "متاح للعمل عن بُعد في جميع أنحاء العالم، أقدم تطبيقات ويب حديثة تعمل بسلاسة على جميع الأجهزة.",
    "visualCard": { "title": "تطوير ويب حديث", "subtitle": "تحويل الأفكار إلى تطبيقات ويب متقنة" },
    "stats": { "yearsExperience": "سنوات التميز", "projectsDelivered": "التطبيقات المنشورة", "teamMembers": "تغطية المنصات", "countriesServed": "عمليات نشر متجر التطبيقات" },
    "mission": "تحويل مفاهيم التطبيقات إلى واقع سهل الاستخدام يوفر تجارب استثنائية.",
    "vision": "أن أكون معروفاً كمطور React/Next.js رائد يقدم تطبيقات ويب عالية الجودة.",
    "values": { "innovation": "الابتكار", "quality": "الجودة", "performance": "الأداء", "usability": "سهولة الاستخدام" }
  },
  "clients": {
    "title": "مشاريع ويب بارزة",
    "subtitle": "عرض لتطبيقات ويب ناجحة مع ميزات متقدمة وتجارب مستخدم سلسة",
    "cta": { "description": "هل أنت مستعد لتحويل فكرة تطبيقك إلى واقع؟", "button": "ابدأ مشروعك" },
    "companies": {
      "ecommerce": { "name": "ShopFlow", "description": "منصة تجارة إلكترونية حديثة مبنية بـ Next.js مع تكامل Stripe.", "industry": "التجارة الإلكترونية" },
      "dashboard": { "name": "DataViz Pro", "description": "لوحة تحكم تحليلية تفاعلية مع تصور البيانات في الوقت الفعلي.", "industry": "SaaS / التحليلات" },
      "social": { "name": "ConnectHub", "description": "منصة تواصل اجتماعي مع الرسائل الفورية ومشاركة المنشورات.", "industry": "وسائل التواصل الاجتماعي" }
    }
  },
  "footer": {
    "company": "الأعمال",
    "services": "الخدمات",
    "contact": "اتصل",
    "followUs": "تابعني",
    "allRightsReserved": "جميع الحقوق محفوظة.",
    "privacyPolicy": "سياسة الخصوصية",
    "termsOfService": "شروط الخدمة",
    "industries": "الصناعات",
    "description": "مطور React/Next.js شغوف بإنشاء تطبيقات ويب حديثة تحدث فرقاً حقيقياً.",
    "businessHours": "متاح: الإثنين - الجمعة، 9:00 ص - 6:00 م (UTC)",
    "cookiePolicy": "سياسة ملفات تعريف الارتباط",
    "links": { "aboutMe": "عني", "myServices": "خدماتي", "technologies": "التقنيات", "portfolio": "الأعمال", "contactMe": "اتصل بي", "customSoftware": "تطوير البرمجيات المخصصة", "webDevelopment": "تطوير الويب", "mobileDevelopment": "تطوير الجوال", "cloudSolutions": "الحلول السحابية", "aiMachineLearning": "الذكاء الاصطناعي والتعلم الآلي", "technicalConsulting": "الاستشارات التقنية", "frontend": "تطوير الواجهة الأمامية", "backend": "تطوير الخلفية", "fullstack": "تطوير Full Stack", "database": "تصميم قواعد البيانات", "api": "تطوير API", "deployment": "النشر و DevOps" }
  }
};

// Japanese translations
const jaTranslations: TranslationData = {
  "common": {
    "loading": "読み込み中...",
    "submit": "送信",
    "cancel": "キャンセル",
    "back": "戻る",
    "next": "次へ",
    "close": "閉じる",
    "save": "保存",
    "edit": "編集",
    "delete": "削除",
    "confirm": "確認",
    "language": "言語",
    "english": "英語",
    "german": "ドイツ語"
  },
  "navigation": {
    "home": "ホーム",
    "about": "概要",
    "services": "サービス",
    "contact": "お問い合わせ",
    "portfolio": "ポートフォリオ",
    "technologies": "技術",
    "clients": "クライアント",
    "industries": "業界",
    "getInTouch": "お問い合わせ",
    "toggleMenu": "メニュー切替",
    "serviceCategories": { "developmentServices": "開発サービス", "technologySolutions": "テクノロジーソリューション" },
    "serviceItems": { "customSoftware": "カスタムソフトウェア開発", "enterpriseSolutions": "エンタープライズソリューション", "performanceOptimization": "パフォーマンス最適化", "cloudSolutions": "クラウドソリューション", "aiMachineLearning": "AI・機械学習", "processAutomation": "プロセス自動化" },
    "industryItems": { "technology": "テクノロジー", "engineering": "エンジニアリング", "healthcare": "ヘルスケア", "manufacturing": "製造業", "mediaEntertainment": "メディア・エンターテイメント", "professionalServices": "プロフェッショナルサービス" },
    "mobile": { "home": "ホーム", "contact": "連絡" }
  },
  "contact": {
    "title": "一緒に仕事をしましょう",
    "subtitle": "プロジェクトをお考えですか？クリーンでスケーラブルなコードと最新技術でアイデアを実現するお手伝いをさせてください。",
    "form": {
      "name": { "label": "氏名", "placeholder": "山田太郎", "required": true },
      "email": { "label": "メールアドレス", "placeholder": "taro@company.com", "required": true },
      "company": { "label": "会社名", "placeholder": "御社名", "required": false },
      "phone": { "label": "電話番号", "placeholder": "+81 90-1234-5678", "required": false },
      "message": { "label": "プロジェクト詳細", "placeholder": "プロジェクト、スケジュール、構築したいものについてお聞かせください...", "required": true },
      "captcha": { "label": "セキュリティ認証が必要です" },
      "submit": "メッセージを送信",
      "sending": "送信中..."
    },
    "alerts": {
      "captchaRequired": "CAPTCHA認証を完了してください。",
      "success": "ありがとうございます！メッセージが正常に送信されました。すぐにご連絡いたします。",
      "error": "申し訳ございません、メッセージの送信中にエラーが発生しました。もう一度お試しください。"
    }
  },
  "hero": {
    "title": "React/Next.js ウェブ開発者",
    "subtitle": "ReactとNext.jsを使用してモダンなウェブアプリケーションを作成します。TypeScript、フルスタック開発、シームレスなユーザー体験を提供するAPI実装のエキスパートです。",
    "cta": "サービスを見る",
    "learnMore": "詳しく見る"
  },
  "services": {
    "title": "ウェブ開発サービス",
    "subtitle": "React、Next.jsと堅牢なバックエンド統合によるモダンなウェブ開発",
    "customSoftware": { "title": "React & Next.jsアプリ", "description": "最適なパフォーマンスのためにReactとNext.jsで構築された、モダンで高速、SEOフレンドリーなウェブアプリケーション。", "features": ["iOS & Androidアプリ", "シングルコードベース", "ネイティブパフォーマンス", "カスタムUI/UXデザイン"] },
    "webDevelopment": { "title": "バックエンド統合", "description": "Node.js、データベース、カスタムAPIによる堅牢なバックエンドサービス。", "features": ["Firebase統合", "Supabaseセットアップ", "RESTful API", "リアルタイムデータ同期"] },
    "mobileDevelopment": { "title": "アプリストア展開", "description": "Google PlayストアとApple App Storeへの完全なアプリストア提出と最適化。", "features": ["Google Playストア", "Apple App Store", "アプリストア最適化", "ストアコンプライアンス"] },
    "cloudSolutions": { "title": "高度な機能", "description": "リアルタイム更新、認証、インタラクティブダッシュボードを含む複雑なウェブアプリ機能。", "features": ["オーディオストリーミング", "オフライン機能", "プッシュ通知", "リアルタイム更新"] },
    "aiMl": { "title": "UI/UXデザイン", "description": "すべてのデバイスで優れたユーザー体験を提供する、美しく直感的なインターフェース。", "features": ["マテリアルデザイン", "Cupertinoデザイン", "カスタムアニメーション", "レスポンシブレイアウト"] },
    "consulting": { "title": "アプリ最適化", "description": "iOSとAndroidプラットフォーム両方のパフォーマンス最適化とメンテナンス。", "features": ["パフォーマンスチューニング", "メモリ最適化", "アプリメンテナンス", "バグ修正・更新"] }
  },
  "technologies": {
    "title": "ウェブ開発技術スタック",
    "subtitle": "優れたアプリケーションを構築するためのモダンな開発ツールとフレームワーク",
    "impact": { "title": "重要なソリューションを構築", "subtitle": "最先端のReactとNext.js技術を活用して、ユーザーとビジネスに真の価値を提供するウェブアプリケーションを作成します。" },
    "items": {
      "flutter": { "name": "React", "description": "コンポーネントベースのアーキテクチャでインタラクティブなUIを構築。高速で柔軟、モダンなウェブアプリケーションに最適。", "heading": "フロントエンドフレームワーク" },
      "firebase": { "name": "Next.js", "description": "サーバーサイドレンダリング、APIルート、最適化されたパフォーマンスを備えたフルスタックReactフレームワーク。", "heading": "Reactフレームワーク" },
      "angular": { "name": "TypeScript", "description": "エラーを早期に検出し、より良いツールとドキュメントでコード品質を向上させる型安全なJavaScript。", "heading": "型安全なJavaScript" },
      "odoo": { "name": "Tailwind CSS", "description": "高速UI開発のためのユーティリティファーストCSSフレームワーク。HTMLを離れずにカスタムデザインを構築。", "heading": "CSSフレームワーク" }
    },
    "additionalInfo": "さらにNode.js、PostgreSQL、MongoDB、REST API、GraphQL、Git、モダンなDevOpsプラクティス"
  },
  "about": {
    "title": "Sabaoonについて",
    "subtitle": "React/Next.js ウェブ開発者",
    "description": "私はSabaoon、堅牢なバックエンド統合を備えたモダンなウェブアプリケーションを専門とする情熱的なReact/Next.js開発者です。",
    "expertise": "私の専門知識は、コンセプト作成からデプロイメントまでのウェブ開発ライフサイクル全体に及びます。",
    "globalPresence": "世界中でリモートワーク可能。すべてのデバイスでシームレスに動作するモダンなウェブアプリケーションを提供します。",
    "visualCard": { "title": "モダンウェブ開発", "subtitle": "アイデアを洗練されたウェブアプリに変換" },
    "stats": { "yearsExperience": "年間の実績", "projectsDelivered": "リリースしたアプリ", "teamMembers": "プラットフォームカバレッジ", "countriesServed": "アプリストアデプロイ" },
    "mission": "アプリのコンセプトを、すべてのプラットフォームで優れた体験を提供する洗練されたユーザーフレンドリーな現実に変換すること。",
    "vision": "クライアントの期待を超える高品質なウェブアプリケーションを提供する一流のReact/Next.js開発者として認められること。",
    "values": { "innovation": "イノベーション", "quality": "品質", "performance": "パフォーマンス", "usability": "ユーザビリティ" }
  },
  "clients": {
    "title": "注目のウェブプロジェクト",
    "subtitle": "高度な機能とシームレスなユーザー体験を備えた成功したウェブアプリケーションのショーケース",
    "cta": { "description": "アプリのアイデアを実現する準備はできていますか？", "button": "プロジェクトを始める" },
    "companies": {
      "ecommerce": { "name": "ShopFlow", "description": "Next.jsとStripe統合で構築されたモダンなeコマースプラットフォーム。", "industry": "eコマース" },
      "dashboard": { "name": "DataViz Pro", "description": "リアルタイムデータ可視化を備えたインタラクティブな分析ダッシュボード。", "industry": "SaaS / アナリティクス" },
      "social": { "name": "ConnectHub", "description": "リアルタイムメッセージングと投稿共有を備えたソーシャルネットワーキングプラットフォーム。", "industry": "ソーシャルメディア" }
    }
  },
  "footer": {
    "company": "ポートフォリオ",
    "services": "サービス",
    "contact": "お問い合わせ",
    "followUs": "フォローする",
    "allRightsReserved": "全著作権所有。",
    "privacyPolicy": "プライバシーポリシー",
    "termsOfService": "利用規約",
    "industries": "業界",
    "description": "真の違いを生み出すモダンなウェブアプリケーションの作成に情熱を持つReact/Next.js開発者。",
    "businessHours": "対応時間: 月曜〜金曜、9:00〜18:00 (UTC)",
    "cookiePolicy": "Cookieポリシー",
    "links": { "aboutMe": "自己紹介", "myServices": "サービス", "technologies": "技術", "portfolio": "ポートフォリオ", "contactMe": "お問い合わせ", "customSoftware": "カスタムソフトウェア開発", "webDevelopment": "ウェブ開発", "mobileDevelopment": "モバイル開発", "cloudSolutions": "クラウドソリューション", "aiMachineLearning": "AI・機械学習", "technicalConsulting": "技術コンサルティング", "frontend": "フロントエンド開発", "backend": "バックエンド開発", "fullstack": "フルスタック開発", "database": "データベース設計", "api": "API開発", "deployment": "デプロイ・DevOps" }
  }
};

// Chinese translations
const zhTranslations: TranslationData = {
  "common": {
    "loading": "加载中...",
    "submit": "提交",
    "cancel": "取消",
    "back": "返回",
    "next": "下一步",
    "close": "关闭",
    "save": "保存",
    "edit": "编辑",
    "delete": "删除",
    "confirm": "确认",
    "language": "语言",
    "english": "英语",
    "german": "德语"
  },
  "navigation": {
    "home": "首页",
    "about": "关于",
    "services": "服务",
    "contact": "联系",
    "portfolio": "作品集",
    "technologies": "技术",
    "clients": "客户",
    "industries": "行业",
    "getInTouch": "联系我们",
    "toggleMenu": "切换菜单",
    "serviceCategories": { "developmentServices": "开发服务", "technologySolutions": "技术解决方案" },
    "serviceItems": { "customSoftware": "定制软件开发", "enterpriseSolutions": "企业解决方案", "performanceOptimization": "性能优化", "cloudSolutions": "云解决方案", "aiMachineLearning": "人工智能与机器学习", "processAutomation": "流程自动化" },
    "industryItems": { "technology": "科技", "engineering": "工程", "healthcare": "医疗", "manufacturing": "制造业", "mediaEntertainment": "媒体与娱乐", "professionalServices": "专业服务" },
    "mobile": { "home": "首页", "contact": "联系" }
  },
  "contact": {
    "title": "让我们一起合作",
    "subtitle": "有项目想法？让我们讨论如何用简洁、可扩展的代码和现代技术将您的想法变为现实。",
    "form": {
      "name": { "label": "姓名", "placeholder": "张三", "required": true },
      "email": { "label": "电子邮件", "placeholder": "zhangsan@company.com", "required": true },
      "company": { "label": "公司", "placeholder": "您的公司", "required": false },
      "phone": { "label": "电话号码", "placeholder": "+86 138 1234 5678", "required": false },
      "message": { "label": "项目详情", "placeholder": "告诉我您的项目、时间表以及您想构建的内容...", "required": true },
      "captcha": { "label": "需要安全验证" },
      "submit": "发送消息",
      "sending": "发送中..."
    },
    "alerts": {
      "captchaRequired": "请完成验证码验证。",
      "success": "谢谢！您的消息已成功发送。我会尽快回复您。",
      "error": "抱歉，发送消息时出错。请重试。"
    }
  },
  "hero": {
    "title": "React/Next.js 网页开发者",
    "subtitle": "我使用React和Next.js创建现代Web应用程序。精通TypeScript、全栈开发和API实现，提供无缝的用户体验。",
    "cta": "探索我的服务",
    "learnMore": "了解更多"
  },
  "services": {
    "title": "网页开发服务",
    "subtitle": "使用React、Next.js和强大的后端集成进行现代网页开发",
    "customSoftware": { "title": "React & Next.js 应用", "description": "使用React和Next.js构建的现代、快速、SEO友好的Web应用程序，性能最优。", "features": ["iOS & Android 应用", "单一代码库", "原生性能", "定制UI/UX设计"] },
    "webDevelopment": { "title": "后端集成", "description": "使用Node.js、数据库和自定义API的强大后端服务。", "features": ["Firebase集成", "Supabase设置", "RESTful API", "实时数据同步"] },
    "mobileDevelopment": { "title": "应用商店部署", "description": "完整的Google Play商店和Apple App Store提交和优化。", "features": ["Google Play商店", "Apple App Store", "应用商店优化", "商店合规"] },
    "cloudSolutions": { "title": "高级功能", "description": "复杂的Web应用功能，包括实时更新、身份验证和交互式仪表板。", "features": ["音频流", "离线功能", "推送通知", "实时更新"] },
    "aiMl": { "title": "UI/UX 设计", "description": "美观、直观的界面，在所有设备上提供卓越的用户体验。", "features": ["Material设计", "Cupertino设计", "自定义动画", "响应式布局"] },
    "consulting": { "title": "应用优化", "description": "iOS和Android平台的性能优化和维护。", "features": ["性能调优", "内存优化", "应用维护", "Bug修复与更新"] }
  },
  "technologies": {
    "title": "网页开发技术栈",
    "subtitle": "用于构建卓越应用程序的现代开发工具和框架",
    "impact": { "title": "构建重要的解决方案", "subtitle": "我利用尖端的React和Next.js技术创建为用户和企业提供真正价值的Web应用程序。" },
    "items": {
      "flutter": { "name": "React", "description": "使用基于组件的架构构建交互式UI。快速、灵活，非常适合现代Web应用程序。", "heading": "前端框架" },
      "firebase": { "name": "Next.js", "description": "具有服务器端渲染、API路由和开箱即用的优化性能的全栈React框架。", "heading": "React框架" },
      "angular": { "name": "TypeScript", "description": "类型安全的JavaScript，可早期捕获错误，通过更好的工具和文档提高代码质量。", "heading": "类型安全的JavaScript" },
      "odoo": { "name": "Tailwind CSS", "description": "用于快速UI开发的实用优先CSS框架。无需离开HTML即可构建自定义设计。", "heading": "CSS框架" }
    },
    "additionalInfo": "还有Node.js、PostgreSQL、MongoDB、REST API、GraphQL、Git和现代DevOps实践"
  },
  "about": {
    "title": "关于 Sabaoon",
    "subtitle": "React/Next.js 网页开发者",
    "description": "我是Sabaoon，一位热情的React/Next.js开发者，专注于具有强大后端集成的现代Web应用程序。",
    "expertise": "我的专业知识涵盖整个Web开发生命周期，从概念化到部署。",
    "globalPresence": "可在全球范围内进行远程工作，提供在所有设备上无缝运行的现代Web应用程序。",
    "visualCard": { "title": "现代网页开发", "subtitle": "将想法转化为精美的Web应用" },
    "stats": { "yearsExperience": "年卓越经验", "projectsDelivered": "已发布应用", "teamMembers": "平台覆盖", "countriesServed": "应用商店部署" },
    "mission": "将应用概念转化为精美、用户友好的现实，在所有平台上提供卓越的体验。",
    "vision": "成为公认的领先React/Next.js开发者，提供超越客户期望的高质量Web应用程序。",
    "values": { "innovation": "创新", "quality": "质量", "performance": "性能", "usability": "易用性" }
  },
  "clients": {
    "title": "知名网页项目",
    "subtitle": "展示具有高级功能和无缝用户体验的成功Web应用程序",
    "cta": { "description": "准备好将您的应用想法变为现实了吗？", "button": "开始您的项目" },
    "companies": {
      "ecommerce": { "name": "ShopFlow", "description": "使用Next.js和Stripe集成构建的现代电商平台。", "industry": "电子商务" },
      "dashboard": { "name": "DataViz Pro", "description": "具有实时数据可视化的交互式分析仪表板。", "industry": "SaaS / 分析" },
      "social": { "name": "ConnectHub", "description": "具有实时消息和帖子分享功能的社交网络平台。", "industry": "社交媒体" }
    }
  },
  "footer": {
    "company": "作品集",
    "services": "服务",
    "contact": "联系",
    "followUs": "关注我",
    "allRightsReserved": "版权所有。",
    "privacyPolicy": "隐私政策",
    "termsOfService": "服务条款",
    "industries": "行业",
    "description": "热衷于创建真正有影响力的现代Web应用程序的React/Next.js开发者。",
    "businessHours": "可用时间：周一至周五，9:00-18:00 (UTC)",
    "cookiePolicy": "Cookie政策",
    "links": { "aboutMe": "关于我", "myServices": "我的服务", "technologies": "技术", "portfolio": "作品集", "contactMe": "联系我", "customSoftware": "定制软件开发", "webDevelopment": "网页开发", "mobileDevelopment": "移动开发", "cloudSolutions": "云解决方案", "aiMachineLearning": "人工智能与机器学习", "technicalConsulting": "技术咨询", "frontend": "前端开发", "backend": "后端开发", "fullstack": "全栈开发", "database": "数据库设计", "api": "API开发", "deployment": "部署与DevOps" }
  }
};

// Indonesian translations
const idTranslations: TranslationData = {
  "common": {
    "loading": "Memuat...",
    "submit": "Kirim",
    "cancel": "Batal",
    "back": "Kembali",
    "next": "Selanjutnya",
    "close": "Tutup",
    "save": "Simpan",
    "edit": "Edit",
    "delete": "Hapus",
    "confirm": "Konfirmasi",
    "language": "Bahasa",
    "english": "Inggris",
    "german": "Jerman"
  },
  "navigation": {
    "home": "Beranda",
    "about": "Tentang",
    "services": "Layanan",
    "contact": "Kontak",
    "portfolio": "Portofolio",
    "technologies": "Teknologi",
    "clients": "Klien",
    "industries": "Industri",
    "getInTouch": "Hubungi Kami",
    "toggleMenu": "Toggle Menu",
    "serviceCategories": { "developmentServices": "Layanan Pengembangan", "technologySolutions": "Solusi Teknologi" },
    "serviceItems": { "customSoftware": "Pengembangan Perangkat Lunak Kustom", "enterpriseSolutions": "Solusi Enterprise", "performanceOptimization": "Optimasi Kinerja", "cloudSolutions": "Solusi Cloud", "aiMachineLearning": "AI & Machine Learning", "processAutomation": "Otomatisasi Proses" },
    "industryItems": { "technology": "Teknologi", "engineering": "Teknik", "healthcare": "Kesehatan", "manufacturing": "Manufaktur", "mediaEntertainment": "Media & Hiburan", "professionalServices": "Layanan Profesional" },
    "mobile": { "home": "Beranda", "contact": "Kontak" }
  },
  "contact": {
    "title": "Mari Bekerja Sama",
    "subtitle": "Punya proyek dalam pikiran? Mari diskusikan bagaimana saya dapat membantu mewujudkan ide Anda dengan kode yang bersih, skalabel, dan teknologi modern.",
    "form": {
      "name": { "label": "Nama Lengkap", "placeholder": "Budi Santoso", "required": true },
      "email": { "label": "Alamat Email", "placeholder": "budi@perusahaan.com", "required": true },
      "company": { "label": "Perusahaan", "placeholder": "Perusahaan Anda", "required": false },
      "phone": { "label": "Nomor Telepon", "placeholder": "+62 812 3456 7890", "required": false },
      "message": { "label": "Detail Proyek", "placeholder": "Ceritakan tentang proyek Anda, timeline, dan apa yang ingin Anda bangun...", "required": true },
      "captcha": { "label": "Verifikasi keamanan diperlukan" },
      "submit": "Kirim Pesan",
      "sending": "Mengirim..."
    },
    "alerts": {
      "captchaRequired": "Harap selesaikan verifikasi CAPTCHA.",
      "success": "Terima kasih! Pesan Anda berhasil dikirim. Saya akan segera menghubungi Anda.",
      "error": "Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi."
    }
  },
  "hero": {
    "title": "Pengembang Web React/Next.js",
    "subtitle": "Saya membuat aplikasi web modern dengan React dan Next.js. Ahli dalam TypeScript, pengembangan full-stack, dan implementasi API yang memberikan pengalaman pengguna yang mulus.",
    "cta": "Jelajahi Layanan Saya",
    "learnMore": "Pelajari Lebih Lanjut"
  },
  "services": {
    "title": "Layanan Pengembangan Web",
    "subtitle": "Pengembangan web modern dengan React, Next.js dan integrasi backend yang kuat",
    "customSoftware": { "title": "Aplikasi React & Next.js", "description": "Aplikasi web modern, cepat, dan SEO-friendly yang dibangun dengan React dan Next.js untuk kinerja optimal.", "features": ["Aplikasi iOS & Android", "Satu Codebase", "Kinerja Native", "Desain UI/UX Kustom"] },
    "webDevelopment": { "title": "Integrasi Backend", "description": "Layanan backend yang kuat dengan Node.js, database, dan API kustom.", "features": ["Integrasi Firebase", "Setup Supabase", "RESTful API", "Sinkronisasi Data Real-time"] },
    "mobileDevelopment": { "title": "Deployment App Store", "description": "Pengajuan dan optimasi app store lengkap untuk Google Play Store dan Apple App Store.", "features": ["Google Play Store", "Apple App Store", "Optimasi App Store", "Kepatuhan Store"] },
    "cloudSolutions": { "title": "Fitur Lanjutan", "description": "Fitur aplikasi web kompleks termasuk pembaruan real-time, autentikasi, dan dashboard interaktif.", "features": ["Streaming Audio", "Fungsi Offline", "Push Notification", "Pembaruan Real-time"] },
    "aiMl": { "title": "Desain UI/UX", "description": "Antarmuka yang indah dan intuitif yang memberikan pengalaman pengguna luar biasa di semua perangkat.", "features": ["Material Design", "Cupertino Design", "Animasi Kustom", "Layout Responsif"] },
    "consulting": { "title": "Optimasi Aplikasi", "description": "Optimasi kinerja dan pemeliharaan untuk platform iOS dan Android.", "features": ["Tuning Kinerja", "Optimasi Memori", "Pemeliharaan Aplikasi", "Perbaikan Bug & Update"] }
  },
  "technologies": {
    "title": "Stack Teknologi Pengembangan Web",
    "subtitle": "Alat dan framework pengembangan modern untuk membangun aplikasi luar biasa",
    "impact": { "title": "Membangun Solusi yang Berarti", "subtitle": "Saya memanfaatkan teknologi React dan Next.js terdepan untuk membuat aplikasi web yang memberikan nilai nyata bagi pengguna dan bisnis." },
    "items": {
      "flutter": { "name": "React", "description": "Bangun UI interaktif dengan arsitektur berbasis komponen. Cepat, fleksibel, dan sempurna untuk aplikasi web modern.", "heading": "Framework Frontend" },
      "firebase": { "name": "Next.js", "description": "Framework React full-stack dengan server-side rendering, API routes, dan kinerja teroptimasi.", "heading": "Framework React" },
      "angular": { "name": "TypeScript", "description": "JavaScript yang type-safe yang menangkap error lebih awal dan meningkatkan kualitas kode dengan tooling dan dokumentasi yang lebih baik.", "heading": "JavaScript Type-safe" },
      "odoo": { "name": "Tailwind CSS", "description": "Framework CSS utility-first untuk pengembangan UI yang cepat. Bangun desain kustom tanpa meninggalkan HTML.", "heading": "Framework CSS" }
    },
    "additionalInfo": "Plus Node.js, PostgreSQL, MongoDB, REST API, GraphQL, Git, dan praktik DevOps modern"
  },
  "about": {
    "title": "Tentang Sabaoon",
    "subtitle": "Pengembang Web React/Next.js",
    "description": "Saya Sabaoon, pengembang React/Next.js yang passionate yang mengkhususkan diri dalam aplikasi web modern dengan integrasi backend yang kuat.",
    "expertise": "Keahlian saya mencakup seluruh siklus pengembangan web, dari konseptualisasi hingga deployment.",
    "globalPresence": "Tersedia untuk pekerjaan remote di seluruh dunia, saya memberikan aplikasi web modern yang bekerja mulus di semua perangkat.",
    "visualCard": { "title": "Pengembangan Web Modern", "subtitle": "Mengubah ide menjadi aplikasi web yang sempurna" },
    "stats": { "yearsExperience": "Tahun Keunggulan", "projectsDelivered": "Aplikasi Diluncurkan", "teamMembers": "Cakupan Platform", "countriesServed": "Deployment App Store" },
    "mission": "Mengubah konsep aplikasi menjadi realitas yang ramah pengguna yang memberikan pengalaman luar biasa di semua platform.",
    "vision": "Diakui sebagai pengembang React/Next.js terkemuka yang memberikan aplikasi web berkualitas tinggi yang melebihi ekspektasi klien.",
    "values": { "innovation": "Inovasi", "quality": "Kualitas", "performance": "Kinerja", "usability": "Kegunaan" }
  },
  "clients": {
    "title": "Proyek Web Terkemuka",
    "subtitle": "Showcase aplikasi web sukses dengan fitur canggih dan pengalaman pengguna yang mulus",
    "cta": { "description": "Siap mewujudkan ide aplikasi Anda?", "button": "Mulai Proyek Anda" },
    "companies": {
      "ecommerce": { "name": "ShopFlow", "description": "Platform e-commerce modern yang dibangun dengan Next.js dan integrasi Stripe.", "industry": "E-Commerce" },
      "dashboard": { "name": "DataViz Pro", "description": "Dashboard analitik interaktif dengan visualisasi data real-time.", "industry": "SaaS / Analytics" },
      "social": { "name": "ConnectHub", "description": "Platform jejaring sosial dengan pesan real-time dan berbagi postingan.", "industry": "Media Sosial" }
    }
  },
  "footer": {
    "company": "Portofolio",
    "services": "Layanan",
    "contact": "Kontak",
    "followUs": "Ikuti Saya",
    "allRightsReserved": "Hak cipta dilindungi.",
    "privacyPolicy": "Kebijakan Privasi",
    "termsOfService": "Syarat Layanan",
    "industries": "Industri",
    "description": "Pengembang React/Next.js yang passionate dalam menciptakan aplikasi web modern yang membuat perbedaan nyata.",
    "businessHours": "Tersedia: Senin - Jumat, 9:00 - 18:00 (UTC)",
    "cookiePolicy": "Kebijakan Cookie",
    "links": { "aboutMe": "Tentang Saya", "myServices": "Layanan Saya", "technologies": "Teknologi", "portfolio": "Portofolio", "contactMe": "Hubungi Saya", "customSoftware": "Pengembangan Software Kustom", "webDevelopment": "Pengembangan Web", "mobileDevelopment": "Pengembangan Mobile", "cloudSolutions": "Solusi Cloud", "aiMachineLearning": "AI & Machine Learning", "technicalConsulting": "Konsultasi Teknis", "frontend": "Pengembangan Frontend", "backend": "Pengembangan Backend", "fullstack": "Pengembangan Full Stack", "database": "Desain Database", "api": "Pengembangan API", "deployment": "Deployment & DevOps" }
  }
};

// Spanish translations
const esTranslations: TranslationData = {
  "common": {
    "loading": "Cargando...",
    "submit": "Enviar",
    "cancel": "Cancelar",
    "back": "Atrás",
    "next": "Siguiente",
    "close": "Cerrar",
    "save": "Guardar",
    "edit": "Editar",
    "delete": "Eliminar",
    "confirm": "Confirmar",
    "language": "Idioma",
    "english": "Inglés",
    "german": "Alemán"
  },
  "navigation": {
    "home": "Inicio",
    "about": "Acerca de",
    "services": "Servicios",
    "contact": "Contacto",
    "portfolio": "Portafolio",
    "technologies": "Tecnologías",
    "clients": "Clientes",
    "industries": "Industrias",
    "getInTouch": "Contáctanos",
    "toggleMenu": "Alternar Menú",
    "serviceCategories": { "developmentServices": "Servicios de Desarrollo", "technologySolutions": "Soluciones Tecnológicas" },
    "serviceItems": { "customSoftware": "Desarrollo de Software Personalizado", "enterpriseSolutions": "Soluciones Empresariales", "performanceOptimization": "Optimización de Rendimiento", "cloudSolutions": "Soluciones en la Nube", "aiMachineLearning": "IA y Aprendizaje Automático", "processAutomation": "Automatización de Procesos" },
    "industryItems": { "technology": "Tecnología", "engineering": "Ingeniería", "healthcare": "Salud", "manufacturing": "Manufactura", "mediaEntertainment": "Medios y Entretenimiento", "professionalServices": "Servicios Profesionales" },
    "mobile": { "home": "Inicio", "contact": "Contacto" }
  },
  "contact": {
    "title": "Trabajemos Juntos",
    "subtitle": "¿Tienes un proyecto en mente? Hablemos sobre cómo puedo ayudarte a dar vida a tus ideas con código limpio, escalable y tecnologías modernas.",
    "form": {
      "name": { "label": "Nombre Completo", "placeholder": "Juan García", "required": true },
      "email": { "label": "Correo Electrónico", "placeholder": "juan@empresa.com", "required": true },
      "company": { "label": "Empresa", "placeholder": "Tu Empresa", "required": false },
      "phone": { "label": "Número de Teléfono", "placeholder": "+34 612 345 678", "required": false },
      "message": { "label": "Detalles del Proyecto", "placeholder": "Cuéntame sobre tu proyecto, cronograma y qué quieres construir...", "required": true },
      "captcha": { "label": "Se requiere verificación de seguridad" },
      "submit": "Enviar Mensaje",
      "sending": "Enviando..."
    },
    "alerts": {
      "captchaRequired": "Por favor completa la verificación CAPTCHA.",
      "success": "¡Gracias! Tu mensaje se ha enviado correctamente. Me pondré en contacto contigo pronto.",
      "error": "Lo siento, hubo un error al enviar tu mensaje. Por favor intenta de nuevo."
    }
  },
  "hero": {
    "title": "Desarrollador Web React/Next.js",
    "subtitle": "Creo aplicaciones web modernas con React y Next.js. Experto en TypeScript, desarrollo full-stack e implementaciones de API que ofrecen experiencias de usuario fluidas.",
    "cta": "Explora Mis Servicios",
    "learnMore": "Saber Más"
  },
  "services": {
    "title": "Servicios de Desarrollo Web",
    "subtitle": "Desarrollo web moderno con React, Next.js e integraciones backend robustas",
    "customSoftware": { "title": "Apps React & Next.js", "description": "Aplicaciones web modernas, rápidas y SEO-friendly construidas con React y Next.js para un rendimiento óptimo.", "features": ["Apps iOS & Android", "Código Único", "Rendimiento Nativo", "Diseño UI/UX Personalizado"] },
    "webDevelopment": { "title": "Integración Backend", "description": "Servicios backend robustos con Node.js, bases de datos y APIs personalizadas.", "features": ["Integración Firebase", "Configuración Supabase", "APIs RESTful", "Sincronización en Tiempo Real"] },
    "mobileDevelopment": { "title": "Despliegue en App Store", "description": "Envío completo y optimización para Google Play Store y Apple App Store.", "features": ["Google Play Store", "Apple App Store", "Optimización de App Store", "Cumplimiento de Tienda"] },
    "cloudSolutions": { "title": "Funciones Avanzadas", "description": "Funciones complejas de apps web incluyendo actualizaciones en tiempo real, autenticación y dashboards interactivos.", "features": ["Streaming de Audio", "Funcionalidad Offline", "Notificaciones Push", "Actualizaciones en Tiempo Real"] },
    "aiMl": { "title": "Diseño UI/UX", "description": "Interfaces hermosas e intuitivas que proporcionan experiencias de usuario excepcionales en todos los dispositivos.", "features": ["Material Design", "Diseño Cupertino", "Animaciones Personalizadas", "Layouts Responsivos"] },
    "consulting": { "title": "Optimización de Apps", "description": "Optimización de rendimiento y mantenimiento para plataformas iOS y Android.", "features": ["Ajuste de Rendimiento", "Optimización de Memoria", "Mantenimiento de App", "Corrección de Bugs y Actualizaciones"] }
  },
  "technologies": {
    "title": "Stack de Tecnologías Web",
    "subtitle": "Herramientas y frameworks de desarrollo modernos para crear aplicaciones excepcionales",
    "impact": { "title": "Construyendo Soluciones que Importan", "subtitle": "Aprovecho la tecnología de vanguardia de React y Next.js para crear aplicaciones web que ofrecen valor real a usuarios y empresas." },
    "items": {
      "flutter": { "name": "React", "description": "Construye UIs interactivas con arquitectura basada en componentes. Rápido, flexible y perfecto para aplicaciones web modernas.", "heading": "Framework Frontend" },
      "firebase": { "name": "Next.js", "description": "Framework React full-stack con renderizado del lado del servidor, rutas API y rendimiento optimizado.", "heading": "Framework React" },
      "angular": { "name": "TypeScript", "description": "JavaScript con tipos que detecta errores tempranamente y mejora la calidad del código con mejores herramientas y documentación.", "heading": "JavaScript con Tipos" },
      "odoo": { "name": "Tailwind CSS", "description": "Framework CSS utility-first para desarrollo UI rápido. Construye diseños personalizados sin salir de tu HTML.", "heading": "Framework CSS" }
    },
    "additionalInfo": "Además de Node.js, PostgreSQL, MongoDB, REST APIs, GraphQL, Git y prácticas modernas de DevOps"
  },
  "about": {
    "title": "Sobre Sabaoon",
    "subtitle": "Desarrollador Web React/Next.js",
    "description": "Soy Sabaoon, un apasionado desarrollador React/Next.js especializado en aplicaciones web modernas con integraciones backend robustas.",
    "expertise": "Mi experiencia abarca todo el ciclo de desarrollo web, desde la conceptualización hasta el despliegue.",
    "globalPresence": "Disponible para trabajo remoto en todo el mundo, ofrezco aplicaciones web modernas que funcionan perfectamente en todos los dispositivos.",
    "visualCard": { "title": "Desarrollo Web Moderno", "subtitle": "Transformando ideas en apps web pulidas" },
    "stats": { "yearsExperience": "Años de Excelencia", "projectsDelivered": "Apps Lanzadas", "teamMembers": "Cobertura de Plataformas", "countriesServed": "Despliegues en App Store" },
    "mission": "Transformar conceptos de apps en realidades pulidas y amigables que proporcionen experiencias excepcionales en todas las plataformas.",
    "vision": "Ser reconocido como un desarrollador líder de React/Next.js que ofrece aplicaciones web de alta calidad que superan las expectativas del cliente.",
    "values": { "innovation": "Innovación", "quality": "Calidad", "performance": "Rendimiento", "usability": "Usabilidad" }
  },
  "clients": {
    "title": "Proyectos Web Destacados",
    "subtitle": "Muestra de aplicaciones web exitosas con funciones avanzadas y experiencias de usuario fluidas",
    "cta": { "description": "¿Listo para dar vida a tu idea de app?", "button": "Inicia Tu Proyecto" },
    "companies": {
      "ecommerce": { "name": "ShopFlow", "description": "Plataforma de comercio electrónico moderna construida con Next.js e integración Stripe.", "industry": "E-Commerce" },
      "dashboard": { "name": "DataViz Pro", "description": "Dashboard analítico interactivo con visualización de datos en tiempo real.", "industry": "SaaS / Analytics" },
      "social": { "name": "ConnectHub", "description": "Plataforma de redes sociales con mensajería en tiempo real y compartir publicaciones.", "industry": "Redes Sociales" }
    }
  },
  "footer": {
    "company": "Portafolio",
    "services": "Servicios",
    "contact": "Contacto",
    "followUs": "Sígueme",
    "allRightsReserved": "Todos los derechos reservados.",
    "privacyPolicy": "Política de Privacidad",
    "termsOfService": "Términos de Servicio",
    "industries": "Industrias",
    "description": "Desarrollador React/Next.js apasionado por crear aplicaciones web modernas que marcan una diferencia real.",
    "businessHours": "Disponible: Lunes - Viernes, 9:00 - 18:00 (UTC)",
    "cookiePolicy": "Política de Cookies",
    "links": { "aboutMe": "Sobre Mí", "myServices": "Mis Servicios", "technologies": "Tecnologías", "portfolio": "Portafolio", "contactMe": "Contáctame", "customSoftware": "Desarrollo de Software Personalizado", "webDevelopment": "Desarrollo Web", "mobileDevelopment": "Desarrollo Móvil", "cloudSolutions": "Soluciones en la Nube", "aiMachineLearning": "IA y Aprendizaje Automático", "technicalConsulting": "Consultoría Técnica", "frontend": "Desarrollo Frontend", "backend": "Desarrollo Backend", "fullstack": "Desarrollo Full Stack", "database": "Diseño de Base de Datos", "api": "Desarrollo de API", "deployment": "Despliegue y DevOps" }
  }
};

// French translations
const frTranslations: TranslationData = {
  "common": {
    "loading": "Chargement...",
    "submit": "Envoyer",
    "cancel": "Annuler",
    "back": "Retour",
    "next": "Suivant",
    "close": "Fermer",
    "save": "Enregistrer",
    "edit": "Modifier",
    "delete": "Supprimer",
    "confirm": "Confirmer",
    "language": "Langue",
    "english": "Anglais",
    "german": "Allemand"
  },
  "navigation": {
    "home": "Accueil",
    "about": "À propos",
    "services": "Services",
    "contact": "Contact",
    "portfolio": "Portfolio",
    "technologies": "Technologies",
    "clients": "Clients",
    "industries": "Industries",
    "getInTouch": "Nous Contacter",
    "toggleMenu": "Basculer le Menu",
    "serviceCategories": { "developmentServices": "Services de Développement", "technologySolutions": "Solutions Technologiques" },
    "serviceItems": { "customSoftware": "Développement Logiciel Sur Mesure", "enterpriseSolutions": "Solutions d'Entreprise", "performanceOptimization": "Optimisation des Performances", "cloudSolutions": "Solutions Cloud", "aiMachineLearning": "IA et Apprentissage Automatique", "processAutomation": "Automatisation des Processus" },
    "industryItems": { "technology": "Technologie", "engineering": "Ingénierie", "healthcare": "Santé", "manufacturing": "Fabrication", "mediaEntertainment": "Médias et Divertissement", "professionalServices": "Services Professionnels" },
    "mobile": { "home": "Accueil", "contact": "Contact" }
  },
  "contact": {
    "title": "Travaillons Ensemble",
    "subtitle": "Vous avez un projet en tête ? Discutons de la façon dont je peux vous aider à concrétiser vos idées avec un code propre, évolutif et des technologies modernes.",
    "form": {
      "name": { "label": "Nom Complet", "placeholder": "Jean Dupont", "required": true },
      "email": { "label": "Adresse Email", "placeholder": "jean@entreprise.com", "required": true },
      "company": { "label": "Entreprise", "placeholder": "Votre Entreprise", "required": false },
      "phone": { "label": "Numéro de Téléphone", "placeholder": "+33 6 12 34 56 78", "required": false },
      "message": { "label": "Détails du Projet", "placeholder": "Parlez-moi de votre projet, du calendrier et de ce que vous souhaitez construire...", "required": true },
      "captcha": { "label": "Vérification de sécurité requise" },
      "submit": "Envoyer le Message",
      "sending": "Envoi en cours..."
    },
    "alerts": {
      "captchaRequired": "Veuillez compléter la vérification CAPTCHA.",
      "success": "Merci ! Votre message a été envoyé avec succès. Je vous recontacterai bientôt.",
      "error": "Désolé, une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer."
    }
  },
  "hero": {
    "title": "Développeur Web React/Next.js",
    "subtitle": "Je crée des applications web modernes avec React et Next.js. Expert en TypeScript, développement full-stack et implémentations d'API offrant des expériences utilisateur fluides.",
    "cta": "Découvrir Mes Services",
    "learnMore": "En Savoir Plus"
  },
  "services": {
    "title": "Services de Développement Web",
    "subtitle": "Développement web moderne avec React, Next.js et des intégrations backend robustes",
    "customSoftware": { "title": "Apps React & Next.js", "description": "Applications web modernes, rapides et optimisées SEO construites avec React et Next.js pour des performances optimales.", "features": ["Apps iOS & Android", "Code Unique", "Performance Native", "Design UI/UX Personnalisé"] },
    "webDevelopment": { "title": "Intégration Backend", "description": "Services backend robustes avec Node.js, bases de données et APIs personnalisées.", "features": ["Intégration Firebase", "Configuration Supabase", "APIs RESTful", "Synchronisation Temps Réel"] },
    "mobileDevelopment": { "title": "Déploiement App Store", "description": "Soumission complète et optimisation pour Google Play Store et Apple App Store.", "features": ["Google Play Store", "Apple App Store", "Optimisation App Store", "Conformité Store"] },
    "cloudSolutions": { "title": "Fonctionnalités Avancées", "description": "Fonctionnalités d'applications web complexes incluant mises à jour en temps réel, authentification et tableaux de bord interactifs.", "features": ["Streaming Audio", "Fonctionnalité Hors Ligne", "Notifications Push", "Mises à Jour Temps Réel"] },
    "aiMl": { "title": "Design UI/UX", "description": "Interfaces belles et intuitives offrant des expériences utilisateur exceptionnelles sur tous les appareils.", "features": ["Material Design", "Design Cupertino", "Animations Personnalisées", "Layouts Responsifs"] },
    "consulting": { "title": "Optimisation d'Apps", "description": "Optimisation des performances et maintenance pour les plateformes iOS et Android.", "features": ["Réglage des Performances", "Optimisation Mémoire", "Maintenance d'App", "Corrections de Bugs et Mises à Jour"] }
  },
  "technologies": {
    "title": "Stack de Technologies Web",
    "subtitle": "Outils et frameworks de développement modernes pour créer des applications exceptionnelles",
    "impact": { "title": "Construire des Solutions qui Comptent", "subtitle": "J'exploite la technologie de pointe React et Next.js pour créer des applications web qui apportent une vraie valeur aux utilisateurs et aux entreprises." },
    "items": {
      "flutter": { "name": "React", "description": "Construisez des UIs interactives avec une architecture basée sur les composants. Rapide, flexible et parfait pour les applications web modernes.", "heading": "Framework Frontend" },
      "firebase": { "name": "Next.js", "description": "Framework React full-stack avec rendu côté serveur, routes API et performances optimisées.", "heading": "Framework React" },
      "angular": { "name": "TypeScript", "description": "JavaScript typé qui détecte les erreurs tôt et améliore la qualité du code avec de meilleurs outils et documentation.", "heading": "JavaScript Typé" },
      "odoo": { "name": "Tailwind CSS", "description": "Framework CSS utility-first pour un développement UI rapide. Construisez des designs personnalisés sans quitter votre HTML.", "heading": "Framework CSS" }
    },
    "additionalInfo": "Plus Node.js, PostgreSQL, MongoDB, APIs REST, GraphQL, Git et pratiques DevOps modernes"
  },
  "about": {
    "title": "À Propos de Sabaoon",
    "subtitle": "Développeur Web React/Next.js",
    "description": "Je suis Sabaoon, un développeur React/Next.js passionné spécialisé dans les applications web modernes avec des intégrations backend robustes.",
    "expertise": "Mon expertise couvre l'ensemble du cycle de développement web, de la conceptualisation au déploiement.",
    "globalPresence": "Disponible pour le travail à distance dans le monde entier, je livre des applications web modernes qui fonctionnent parfaitement sur tous les appareils.",
    "visualCard": { "title": "Développement Web Moderne", "subtitle": "Transformer les idées en apps web soignées" },
    "stats": { "yearsExperience": "Années d'Excellence", "projectsDelivered": "Apps Lancées", "teamMembers": "Couverture Plateforme", "countriesServed": "Déploiements App Store" },
    "mission": "Transformer les concepts d'apps en réalités soignées et conviviales offrant des expériences exceptionnelles sur toutes les plateformes.",
    "vision": "Être reconnu comme un développeur React/Next.js de premier plan livrant des applications web de haute qualité dépassant les attentes des clients.",
    "values": { "innovation": "Innovation", "quality": "Qualité", "performance": "Performance", "usability": "Utilisabilité" }
  },
  "clients": {
    "title": "Projets Web Remarquables",
    "subtitle": "Vitrine d'applications web réussies avec des fonctionnalités avancées et des expériences utilisateur fluides",
    "cta": { "description": "Prêt à donner vie à votre idée d'app ?", "button": "Démarrer Votre Projet" },
    "companies": {
      "ecommerce": { "name": "ShopFlow", "description": "Plateforme e-commerce moderne construite avec Next.js et intégration Stripe.", "industry": "E-Commerce" },
      "dashboard": { "name": "DataViz Pro", "description": "Tableau de bord analytique interactif avec visualisation de données en temps réel.", "industry": "SaaS / Analytics" },
      "social": { "name": "ConnectHub", "description": "Plateforme de réseau social avec messagerie en temps réel et partage de publications.", "industry": "Réseaux Sociaux" }
    }
  },
  "footer": {
    "company": "Portfolio",
    "services": "Services",
    "contact": "Contact",
    "followUs": "Suivez-moi",
    "allRightsReserved": "Tous droits réservés.",
    "privacyPolicy": "Politique de Confidentialité",
    "termsOfService": "Conditions d'Utilisation",
    "industries": "Industries",
    "description": "Développeur React/Next.js passionné par la création d'applications web modernes qui font une vraie différence.",
    "businessHours": "Disponible : Lundi - Vendredi, 9h00 - 18h00 (UTC)",
    "cookiePolicy": "Politique de Cookies",
    "links": { "aboutMe": "À Propos de Moi", "myServices": "Mes Services", "technologies": "Technologies", "portfolio": "Portfolio", "contactMe": "Me Contacter", "customSoftware": "Développement Logiciel Sur Mesure", "webDevelopment": "Développement Web", "mobileDevelopment": "Développement Mobile", "cloudSolutions": "Solutions Cloud", "aiMachineLearning": "IA et Apprentissage Automatique", "technicalConsulting": "Conseil Technique", "frontend": "Développement Frontend", "backend": "Développement Backend", "fullstack": "Développement Full Stack", "database": "Conception de Base de Données", "api": "Développement API", "deployment": "Déploiement et DevOps" }
  }
};

// Russian translations
const ruTranslations: TranslationData = {
  "common": {
    "loading": "Загрузка...",
    "submit": "Отправить",
    "cancel": "Отмена",
    "back": "Назад",
    "next": "Далее",
    "close": "Закрыть",
    "save": "Сохранить",
    "edit": "Редактировать",
    "delete": "Удалить",
    "confirm": "Подтвердить",
    "language": "Язык",
    "english": "Английский",
    "german": "Немецкий"
  },
  "navigation": {
    "home": "Главная",
    "about": "О нас",
    "services": "Услуги",
    "contact": "Контакты",
    "portfolio": "Портфолио",
    "technologies": "Технологии",
    "clients": "Клиенты",
    "industries": "Отрасли",
    "getInTouch": "Связаться",
    "toggleMenu": "Переключить меню",
    "serviceCategories": { "developmentServices": "Услуги разработки", "technologySolutions": "Технологические решения" },
    "serviceItems": { "customSoftware": "Разработка ПО на заказ", "enterpriseSolutions": "Корпоративные решения", "performanceOptimization": "Оптимизация производительности", "cloudSolutions": "Облачные решения", "aiMachineLearning": "ИИ и машинное обучение", "processAutomation": "Автоматизация процессов" },
    "industryItems": { "technology": "Технологии", "engineering": "Инженерия", "healthcare": "Здравоохранение", "manufacturing": "Производство", "mediaEntertainment": "Медиа и развлечения", "professionalServices": "Профессиональные услуги" },
    "mobile": { "home": "Главная", "contact": "Контакты" }
  },
  "contact": {
    "title": "Давайте работать вместе",
    "subtitle": "Есть проект? Давайте обсудим, как я могу помочь воплотить ваши идеи в жизнь с чистым, масштабируемым кодом и современными технологиями.",
    "form": {
      "name": { "label": "Полное имя", "placeholder": "Иван Петров", "required": true },
      "email": { "label": "Email адрес", "placeholder": "ivan@company.com", "required": true },
      "company": { "label": "Компания", "placeholder": "Ваша компания", "required": false },
      "phone": { "label": "Номер телефона", "placeholder": "+7 (999) 123-45-67", "required": false },
      "message": { "label": "Детали проекта", "placeholder": "Расскажите о вашем проекте, сроках и что вы хотите создать...", "required": true },
      "captcha": { "label": "Требуется проверка безопасности" },
      "submit": "Отправить сообщение",
      "sending": "Отправка..."
    },
    "alerts": {
      "captchaRequired": "Пожалуйста, пройдите проверку CAPTCHA.",
      "success": "Спасибо! Ваше сообщение успешно отправлено. Я свяжусь с вами в ближайшее время.",
      "error": "Извините, произошла ошибка при отправке сообщения. Пожалуйста, попробуйте снова."
    }
  },
  "hero": {
    "title": "React/Next.js Веб-разработчик",
    "subtitle": "Я создаю современные веб-приложения с React и Next.js. Эксперт в TypeScript, full-stack разработке и реализации API, обеспечивающих бесшовный пользовательский опыт.",
    "cta": "Мои услуги",
    "learnMore": "Узнать больше"
  },
  "services": {
    "title": "Услуги веб-разработки",
    "subtitle": "Современная веб-разработка с React, Next.js и надёжной backend-интеграцией",
    "customSoftware": { "title": "Приложения React & Next.js", "description": "Современные, быстрые, SEO-оптимизированные веб-приложения на React и Next.js для оптимальной производительности.", "features": ["iOS & Android приложения", "Единая кодовая база", "Нативная производительность", "Кастомный UI/UX дизайн"] },
    "webDevelopment": { "title": "Backend-интеграция", "description": "Надёжные backend-сервисы с Node.js, базами данных и кастомными API.", "features": ["Интеграция Firebase", "Настройка Supabase", "RESTful API", "Синхронизация в реальном времени"] },
    "mobileDevelopment": { "title": "Публикация в App Store", "description": "Полная подготовка и оптимизация для Google Play Store и Apple App Store.", "features": ["Google Play Store", "Apple App Store", "Оптимизация App Store", "Соответствие требованиям"] },
    "cloudSolutions": { "title": "Расширенные функции", "description": "Сложные функции веб-приложений: обновления в реальном времени, аутентификация, интерактивные дашборды.", "features": ["Аудио-стриминг", "Офлайн-функционал", "Push-уведомления", "Обновления в реальном времени"] },
    "aiMl": { "title": "UI/UX Дизайн", "description": "Красивые, интуитивные интерфейсы, обеспечивающие исключительный пользовательский опыт на всех устройствах.", "features": ["Material Design", "Cupertino Design", "Кастомные анимации", "Адаптивные макеты"] },
    "consulting": { "title": "Оптимизация приложений", "description": "Оптимизация производительности и поддержка для платформ iOS и Android.", "features": ["Настройка производительности", "Оптимизация памяти", "Поддержка приложений", "Исправление багов и обновления"] }
  },
  "technologies": {
    "title": "Технологический стек",
    "subtitle": "Современные инструменты и фреймворки для создания исключительных приложений",
    "impact": { "title": "Создание важных решений", "subtitle": "Я использую передовые технологии React и Next.js для создания веб-приложений, которые приносят реальную ценность пользователям и бизнесу." },
    "items": {
      "flutter": { "name": "React", "description": "Создавайте интерактивные UI с компонентной архитектурой. Быстрый, гибкий, идеальный для современных веб-приложений.", "heading": "Frontend-фреймворк" },
      "firebase": { "name": "Next.js", "description": "Full-stack React-фреймворк с серверным рендерингом, API-маршрутами и оптимизированной производительностью.", "heading": "React-фреймворк" },
      "angular": { "name": "TypeScript", "description": "Типизированный JavaScript, который находит ошибки на ранней стадии и улучшает качество кода.", "heading": "Типизированный JavaScript" },
      "odoo": { "name": "Tailwind CSS", "description": "Utility-first CSS-фреймворк для быстрой разработки UI. Создавайте кастомные дизайны прямо в HTML.", "heading": "CSS-фреймворк" }
    },
    "additionalInfo": "А также Node.js, PostgreSQL, MongoDB, REST API, GraphQL, Git и современные DevOps-практики"
  },
  "about": {
    "title": "О Sabaoon",
    "subtitle": "React/Next.js Веб-разработчик",
    "description": "Я Sabaoon, увлечённый React/Next.js разработчик, специализирующийся на современных веб-приложениях с надёжной backend-интеграцией.",
    "expertise": "Мой опыт охватывает весь цикл веб-разработки, от концепции до развёртывания.",
    "globalPresence": "Доступен для удалённой работы по всему миру, создаю современные веб-приложения, работающие безупречно на всех устройствах.",
    "visualCard": { "title": "Современная веб-разработка", "subtitle": "Превращаю идеи в качественные веб-приложения" },
    "stats": { "yearsExperience": "Лет опыта", "projectsDelivered": "Запущено приложений", "teamMembers": "Охват платформ", "countriesServed": "Публикаций в App Store" },
    "mission": "Превращать концепции приложений в качественные, удобные решения с исключительным пользовательским опытом.",
    "vision": "Быть признанным ведущим React/Next.js разработчиком, создающим высококачественные веб-приложения.",
    "values": { "innovation": "Инновации", "quality": "Качество", "performance": "Производительность", "usability": "Удобство" }
  },
  "clients": {
    "title": "Избранные веб-проекты",
    "subtitle": "Витрина успешных веб-приложений с продвинутыми функциями и бесшовным пользовательским опытом",
    "cta": { "description": "Готовы воплотить идею приложения в жизнь?", "button": "Начать проект" },
    "companies": {
      "ecommerce": { "name": "ShopFlow", "description": "Современная e-commerce платформа на Next.js с интеграцией Stripe.", "industry": "E-Commerce" },
      "dashboard": { "name": "DataViz Pro", "description": "Интерактивный аналитический дашборд с визуализацией данных в реальном времени.", "industry": "SaaS / Аналитика" },
      "social": { "name": "ConnectHub", "description": "Платформа социальной сети с сообщениями в реальном времени и публикациями.", "industry": "Социальные сети" }
    }
  },
  "footer": {
    "company": "Портфолио",
    "services": "Услуги",
    "contact": "Контакты",
    "followUs": "Подписаться",
    "allRightsReserved": "Все права защищены.",
    "privacyPolicy": "Политика конфиденциальности",
    "termsOfService": "Условия использования",
    "industries": "Отрасли",
    "description": "React/Next.js разработчик, увлечённый созданием современных веб-приложений, которые делают реальную разницу.",
    "businessHours": "Доступен: Пн - Пт, 9:00 - 18:00 (UTC)",
    "cookiePolicy": "Политика cookies",
    "links": { "aboutMe": "Обо мне", "myServices": "Мои услуги", "technologies": "Технологии", "portfolio": "Портфолио", "contactMe": "Связаться", "customSoftware": "Разработка ПО на заказ", "webDevelopment": "Веб-разработка", "mobileDevelopment": "Мобильная разработка", "cloudSolutions": "Облачные решения", "aiMachineLearning": "ИИ и машинное обучение", "technicalConsulting": "Техническое консультирование", "frontend": "Frontend-разработка", "backend": "Backend-разработка", "fullstack": "Full Stack разработка", "database": "Проектирование БД", "api": "Разработка API", "deployment": "Развёртывание и DevOps" }
  }
};

const translations = {
  en: enTranslations,
  de: deTranslations,
  ar: arTranslations,
  ja: jaTranslations,
  zh: zhTranslations,
  id: idTranslations,
  es: esTranslations,
  fr: frTranslations,
  ru: ruTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

const SUPPORTED_LANGUAGES: Language[] = ['en', 'de', 'ar', 'ja', 'zh', 'id', 'es', 'fr', 'ru'];

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get initial language from localStorage or default to 'en'
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferred-language');
      if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage as Language)) {
        return savedLanguage as Language;
      }
      // Try to detect browser language
      const browserLanguage = navigator.language.toLowerCase();
      if (browserLanguage.startsWith('de')) return 'de';
      if (browserLanguage.startsWith('ar')) return 'ar';
      if (browserLanguage.startsWith('ja')) return 'ja';
      if (browserLanguage.startsWith('zh')) return 'zh';
      if (browserLanguage.startsWith('id')) return 'id';
      if (browserLanguage.startsWith('es')) return 'es';
      if (browserLanguage.startsWith('fr')) return 'fr';
      if (browserLanguage.startsWith('ru')) return 'ru';
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
