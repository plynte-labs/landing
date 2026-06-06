import { motion, useReducedMotion } from 'framer-motion';
import { GlassCard } from '../../components/UI/GlassCard/GlassCard';
import { useLanguage } from '../../contexts/LanguageContext';
import { pillars } from '../../data/orgData';
import type { Pillar } from '../../types';
import './ArchitectureSection.css';

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
};

const ArchitectureSection = () => {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();

  return (
    <section id="architecture" className="architecture">
      <h2 className="architecture__heading">
        {t('architecture.heading')}
      </h2>

      <div className="architecture__grid">
        {pillars.map((pillar: Pillar) => (
          <motion.div
            key={pillar.key}
            className="architecture__card-wrap"
            variants={cardVariants}
            initial={reducedMotion ? "visible" : "hidden"}
            whileInView={reducedMotion ? undefined : "visible"}
            viewport={reducedMotion ? undefined : { once: true, margin: '-50px' }}
          >
            <GlassCard className="architecture__card">
              <span
                className="architecture__icon"
                aria-hidden="true"
              >
                {pillar.icon}
              </span>

              <h3 className="architecture__title">
                {t(`architecture.${pillar.key}.title`)}
              </h3>

              <p className="architecture__desc">
                {t(`architecture.${pillar.key}.desc`)}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ArchitectureSection;
