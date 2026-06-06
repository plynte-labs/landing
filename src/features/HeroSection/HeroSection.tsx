import { useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ParticleField from '../../components/UI/ParticleField/ParticleField';
import Button from '../../components/UI/Button/Button';
import { GlassCard } from '../../components/UI/GlassCard/GlassCard';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/bg.css';
import './HeroSection.css';

const TRANSITION_LOGO = { duration: 0.6, ease: 'easeOut' } as const;
const TRANSITION_TAGLINE = { delay: 0.3, duration: 0.5 } as const;
const TRANSITION_SUBTAGLINE = { delay: 0.5, duration: 0.5 } as const;
const TRANSITION_CTA = { delay: 0.7, duration: 0.5 } as const;
const TRANSITION_NONE = { duration: 0 } as const;

const HeroSection = () => {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const shouldAnimate = !reducedMotion;

  const handleCTAClick = useCallback(() => {
    const ecosystem = document.getElementById('ecosystem');
    if (ecosystem) {
      ecosystem.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section className="hero">
      <div aria-hidden="true" className="hero__particles">
        <ParticleField count={50} reducedMotion={reducedMotion ?? false} />
      </div>

      <div className="hero__content">
        <motion.img
          className="hero__logo"
          src="/plynte logo2.png"
          alt="Plynte Labs"
          width={400}
          height={400}
          fetchPriority="high"
          draggable={false}
          initial={shouldAnimate ? { scale: 0.8, opacity: 0 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={shouldAnimate ? TRANSITION_LOGO : TRANSITION_NONE}
        />

        <motion.h1
          className="hero__tagline"
          initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldAnimate ? TRANSITION_TAGLINE : TRANSITION_NONE}
        >
          {t('hero.tagline')}
        </motion.h1>

        <motion.p
          className="hero__subtagline"
          initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldAnimate ? TRANSITION_SUBTAGLINE : TRANSITION_NONE}
        >
          {t('hero.subtagline')}
        </motion.p>

        <motion.div
          className="hero__cta"
          initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldAnimate ? TRANSITION_CTA : TRANSITION_NONE}
        >
          <Button variant="primary" onClick={handleCTAClick}>
            {t('hero.cta')}
          </Button>

          <GlassCard className="hero__mit-badge">
            {t('hero.mitBadge')}
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
