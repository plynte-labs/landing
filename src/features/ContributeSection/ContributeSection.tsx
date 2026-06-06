import { motion, useReducedMotion } from 'framer-motion';
import { GlassCard } from '../../components/UI/GlassCard/GlassCard';
import { useLanguage } from '../../contexts/LanguageContext';
import './ContributeSection.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
};

const STEP_KEYS = ['step1', 'step2', 'step3', 'step4'] as const;

const ContributeSection = () => {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();

  return (
    <section id="contribute" className="contribute">
      <h2 className="contribute__heading">{t('contribute.heading')}</h2>

      <motion.div
        className="contribute__content"
        variants={containerVariants}
        initial={reducedMotion ? "visible" : "hidden"}
        whileInView={reducedMotion ? undefined : "visible"}
        viewport={reducedMotion ? undefined : { once: true, margin: '-100px' }}
      >
        <motion.ol
          className="contribute__steps"
          variants={containerVariants}
          initial={reducedMotion ? "visible" : undefined}
        >
          {STEP_KEYS.map((key) => (
            <motion.li
              key={key}
              className="contribute__step"
              variants={itemVariants}
              initial={reducedMotion ? "visible" : undefined}
            >
              <span className="contribute__step-marker" aria-hidden="true" />
              <span>{t(`contribute.${key}`)}</span>
            </motion.li>
          ))}
        </motion.ol>

        <motion.div
          className="contribute__code-section"
          variants={itemVariants}
          initial={reducedMotion ? "visible" : undefined}
        >
          <GlassCard className="contribute__code-card">
            <pre className="contribute__code">
              <code>$ git commit -m "{t('contribute.codeExample')}"</code>
            </pre>
          </GlassCard>
        </motion.div>

        <motion.div
          className="contribute__community"
          variants={itemVariants}
          initial={reducedMotion ? "visible" : undefined}
        >
          <a
            href="https://github.com/plynte-labs"
            target="_blank"
            rel="noopener noreferrer"
            className="contribute__github-link"
          >
            {t('contribute.githubLink')} ↗
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContributeSection;
