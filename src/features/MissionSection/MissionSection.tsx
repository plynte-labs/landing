import { motion, useReducedMotion } from 'framer-motion';
import { GlassCard } from '../../components/UI/GlassCard/GlassCard';
import { useLanguage } from '../../contexts/LanguageContext';
import './MissionSection.css';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
};

const MissionSection = () => {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();

  return (
    <section id="mission" className="mission">
      <h2 className="mission__heading">{t('mission.heading')}</h2>

      <motion.div
        className="mission__content"
        variants={fadeInVariants}
        initial={reducedMotion ? "visible" : "hidden"}
        whileInView={reducedMotion ? undefined : "visible"}
        viewport={reducedMotion ? undefined : { once: true, margin: '-80px' }}
      >
        <p className="mission__statement">{t('mission.statement')}</p>

        <GlassCard className="mission__mit-notice">
          <p className="mission__mit-text">{t('mission.mitNotice')}</p>
        </GlassCard>

        <div className="mission__maintainer">
          <span className="mission__maintainer-name">
            {t('mission.maintainer.name')}
          </span>
          <span className="mission__maintainer-role">
            {t('mission.maintainer.role')}
          </span>
          <a
            href={t('mission.maintainer.github')}
            target="_blank"
            rel="noopener noreferrer"
            className="mission__maintainer-github"
          >
            GitHub ↗
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default MissionSection;
