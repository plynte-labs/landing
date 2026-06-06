import { motion } from 'framer-motion';
import { GlassCard } from '../../components/UI/GlassCard/GlassCard';
import { ProjectBadge } from '../../components/UI/ProjectBadge/ProjectBadge';
import { useLanguage } from '../../contexts/LanguageContext';
import { projects } from '../../data/orgData';
import type { Project } from '../../types';
import './EcosystemSection.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
};

const badgeVariantMap: Record<string, 'green' | 'blue' | 'purple'> = {
  TypeScript: 'blue',
  Canvas: 'purple',
  React: 'blue',
  Whisper: 'green',
  Python: 'blue',
  'Real-time': 'green',
  Ollama: 'purple',
  QwenTTS: 'green',
  Tauri: 'purple',
};

const getBadgeVariant = (label: string): 'green' | 'blue' | 'purple' => {
  return badgeVariantMap[label] ?? 'green';
};

const EcosystemSection = () => {
  const { t } = useLanguage();

  return (
    <section id="ecosystem" className="ecosystem">
      <h2 className="ecosystem__heading">{t('ecosystem.heading')}</h2>

      <motion.div
        className="ecosystem__grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {projects.map((project: Project) => {
          const isLive = project.status === 'live';
          const isFeatured = project.key === 'opencohost';

          return (
            <motion.div
              key={project.key}
              className={`ecosystem__card-wrap${isFeatured ? ' ecosystem__card-wrap--featured' : ''}`}
              variants={cardVariants}
            >
              <GlassCard
                href={isLive ? project.github : undefined}
                className="ecosystem__card"
              >
                <h3 className="ecosystem__card-name">
                  {t(`ecosystem.${project.key}.name`)}
                </h3>

                {isFeatured ? (
                  <p
                    className="ecosystem__card-desc ecosystem__card-desc--featured"
                    dangerouslySetInnerHTML={{
                      __html: t(`ecosystem.${project.key}.desc`) as string,
                    }}
                  />
                ) : (
                  <p className="ecosystem__card-desc">
                    {t(`ecosystem.${project.key}.desc`)}
                  </p>
                )}

                <div className="ecosystem__badges">
                  {project.tech.map((techLabel: string) => (
                    <ProjectBadge
                      key={techLabel}
                      label={techLabel}
                      variant={getBadgeVariant(techLabel)}
                    />
                  ))}
                </div>

                <div className={`ecosystem__card-footer${!isLive && project.website ? ' ecosystem__card-footer--featured' : ''}`}>
                  {isLive ? (
                    <span className="ecosystem__github-link">
                      {t('ecosystem.viewOnGithub')} ↗
                    </span>
                  ) : (
                    <>
                      <span className="ecosystem__coming-soon">
                        {t('ecosystem.comingSoon')}
                      </span>
                      {project.website && (
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ecosystem__website-link"
                        >
                          {project.website.replace(/^https?:\/\//, '')}
                          <span className="ecosystem__website-link-arrow">↗</span>
                        </a>
                      )}
                    </>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default EcosystemSection;
