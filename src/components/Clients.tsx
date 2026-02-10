import { motion } from 'framer-motion';
import { ShoppingCart, BarChart3, Users } from 'lucide-react';
import { colorClasses } from '../config/colors';
import { useTranslation } from '../i18n/LanguageContext';

interface ClientProps {
  name: string;
  description: string;
  industry: string;
  index: number;
  icon: React.ReactNode;
  gradient: string;
}

const ClientCard: React.FC<ClientProps> = ({ name, description, industry, index, icon, gradient }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className={`h-full rounded-lg border border-border bg-card/50 backdrop-blur-sm text-card-foreground shadow-lg transition-all duration-300 hover:shadow-xl ${colorClasses.shadow.accentHover} hover:-translate-y-1 ${colorClasses.hover.borderAccent} overflow-hidden`}>
        {/* Project Image Placeholder */}
        <div className={`relative h-48 ${gradient} flex items-center justify-center p-6`}>
          <motion.div
            className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 rounded-lg bg-white/10"></div>
        </div>

        {/* Client Info */}
        <div className="p-6">
          <div className="mb-2">
            <span className={`inline-block px-2 py-1 text-xs font-medium ${colorClasses.bg.accentOpacity} ${colorClasses.text.accent} rounded-full border ${colorClasses.border.accentOpacity}`}>
              {industry}
            </span>
          </div>

          <h3 className={`text-xl font-semibold text-foreground ${colorClasses.hover.textAccent} transition-colors mb-2`}>
            {name}
          </h3>

          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Clients = () => {
  const { t } = useTranslation();

  const projects = [
    {
      name: t('clients.companies.ecommerce.name'),
      description: t('clients.companies.ecommerce.description'),
      industry: t('clients.companies.ecommerce.industry'),
      icon: <ShoppingCart className="w-10 h-10 text-white" />,
      gradient: 'bg-gradient-to-br from-purple-500 to-indigo-600'
    },
    {
      name: t('clients.companies.dashboard.name'),
      description: t('clients.companies.dashboard.description'),
      industry: t('clients.companies.dashboard.industry'),
      icon: <BarChart3 className="w-10 h-10 text-white" />,
      gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600'
    },
    {
      name: t('clients.companies.social.name'),
      description: t('clients.companies.social.description'),
      industry: t('clients.companies.social.industry'),
      icon: <Users className="w-10 h-10 text-white" />,
      gradient: 'bg-gradient-to-br from-orange-500 to-rose-600'
    }
  ];

  return (
    <section id="clients" className="py-24 bg-background relative">
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
              const title = t('clients.title');
              const parts = title.split(' ');
              const lastTwo = parts.slice(-2).join(' ');
              const firstPart = parts.slice(0, -2).join(' ');
              return (
                <>
                  {firstPart}{' '}
                  <span className={colorClasses.text.accent}>
                    {lastTwo}
                  </span>
                </>
              );
            })()}
          </h2>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl mx-auto">
            {t('clients.subtitle')}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <ClientCard
              key={project.name}
              name={project.name}
              description={project.description}
              industry={project.industry}
              icon={project.icon}
              gradient={project.gradient}
              index={index}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-muted-foreground mb-6">
            {t('clients.cta.description')}
          </p>
          <motion.a
            href="#contact"
            className={`inline-flex items-center px-6 py-3 ${colorClasses.bg.accent} text-white rounded-lg font-medium ${colorClasses.hover.bgAccent} transition-all duration-300 shadow-lg hover:shadow-xl`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('clients.cta.button')}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
