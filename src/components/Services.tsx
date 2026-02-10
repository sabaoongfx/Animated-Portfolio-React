import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cloud,
  Code,
  Cog,
  Building,
  Zap,
  Brain
} from 'lucide-react';
import { colorClasses } from '../config/colors';
import { useTranslation } from '../i18n/LanguageContext';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`h-full rounded-lg border border-border bg-card/50 backdrop-blur-sm text-card-foreground shadow-lg transition-all duration-300 hover:shadow-xl ${colorClasses.shadow.accentHover} hover:-translate-y-1 ${colorClasses.hover.borderAccent}`}>
        <div className="flex flex-col space-y-1.5 p-6">
          {/* Icon */}
          <motion.div
            className={`w-12 h-12 rounded-lg ${colorClasses.bg.accent} text-white flex items-center justify-center mb-4 shadow-lg`}
            animate={{
              rotateY: isHovered ? 180 : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.6 }}
          >
            {icon}
          </motion.div>

          <h3 className={`text-2xl font-semibold leading-none tracking-tight text-foreground ${colorClasses.hover.textAccent} transition-colors`}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="p-6 pt-0">
          {/* Features */}
          <ul className="space-y-2 mb-6">
            {features.map((feature, featureIndex) => (
              <motion.li
                key={featureIndex}
                className="flex items-center text-sm text-muted-foreground"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: (index * 0.1) + (featureIndex * 0.1) }}
                viewport={{ once: true }}
              >
                <div className={`w-2 h-2 ${colorClasses.bg.accent} rounded-full mr-3`} />
                {feature}
              </motion.li>
            ))}
          </ul>


        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: t('services.customSoftware.title'),
      description: t('services.customSoftware.description'),
      features: t('services.customSoftware.features') as unknown as string[]
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: t('services.webDevelopment.title'),
      description: t('services.webDevelopment.description'),
      features: t('services.webDevelopment.features') as unknown as string[]
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: t('services.mobileDevelopment.title'),
      description: t('services.mobileDevelopment.description'),
      features: t('services.mobileDevelopment.features') as unknown as string[]
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: t('services.cloudSolutions.title'),
      description: t('services.cloudSolutions.description'),
      features: t('services.cloudSolutions.features') as unknown as string[]
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: t('services.aiMl.title'),
      description: t('services.aiMl.description'),
      features: t('services.aiMl.features') as unknown as string[]
    },
    {
      icon: <Cog className="h-8 w-8" />,
      title: t('services.consulting.title'),
      description: t('services.consulting.description'),
      features: t('services.consulting.features') as unknown as string[]
    }
  ];

  return (
    <section id="services" className="py-24 bg-background relative">

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] mb-6 text-foreground">
            {(() => {
              const title = t('services.title');
              const parts = title.split(' ');
              const lastWord = parts[parts.length - 1];
              const firstPart = parts.slice(0, -1).join(' ');
              return (
                <>
                  {firstPart}{' '}
                  <span className={colorClasses.text.accent}>
                    {lastWord}
                  </span>
                </>
              );
            })()} 
          </h2>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              index={index}
            />
          ))}
        </div>


      </div>
    </section>
  );
};

export default Services;
