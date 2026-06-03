import { motion } from 'framer-motion';
import ParticleField from '../../components/UI/ParticleField/ParticleField';
import Button from '../../components/UI/Button/Button';
import { GlassCard } from '../../components/UI/GlassCard/GlassCard';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/bg.css';
import './HeroSection.css';

const HeroSection = () => {
  const { t } = useLanguage();

  const handleCTAClick = () => {
    const ecosystem = document.getElementById('ecosystem');
    if (ecosystem) {
      ecosystem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div aria-hidden="true" className="hero__particles">
        <ParticleField count={50} />
      </div>

      <div className="hero__content">
        <motion.img
          className="hero__logo"
          src="/plynte logo2.png"
          alt="Plynte Labs"
          width={400}
          height={400}
          fetchPriority="high"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />

        <motion.h1
          className="hero__tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {t('hero.tagline')}
        </motion.h1>

        <motion.p
          className="hero__subtagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {t('hero.subtagline')}
        </motion.p>

        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
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
