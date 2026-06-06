import { lazy, Suspense, useRef } from 'react';
import HeroSection from '../../features/HeroSection/HeroSection';
import LazySection from '../../components/UI/LazySection/LazySection';
import { SEOHead } from '../../components/SEOHead';
import './LandingPage.css';

const EcosystemSection = lazy(() => import('../../features/EcosystemSection/EcosystemSection'));
const ArchitectureSection = lazy(() => import('../../features/ArchitectureSection/ArchitectureSection'));
const ContributeSection = lazy(() => import('../../features/ContributeSection/ContributeSection'));
const MissionSection = lazy(() => import('../../features/MissionSection/MissionSection'));

const LandingPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const architectureRef = useRef<HTMLDivElement>(null);
  const contributeRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="landing">
      <SEOHead />
      <div ref={heroRef} id="hero"><HeroSection /></div>

      <div ref={ecosystemRef} id="ecosystem">
        <LazySection rootMargin="300px">
          <Suspense fallback={<div className="section-skeleton" />}>
            <EcosystemSection />
          </Suspense>
        </LazySection>
      </div>

      <div ref={architectureRef} id="architecture">
        <LazySection rootMargin="300px">
          <Suspense fallback={<div className="section-skeleton" />}>
            <ArchitectureSection />
          </Suspense>
        </LazySection>
      </div>

      <div ref={contributeRef} id="contribute">
        <LazySection rootMargin="300px">
          <Suspense fallback={<div className="section-skeleton" />}>
            <ContributeSection />
          </Suspense>
        </LazySection>
      </div>

      <div ref={missionRef} id="mission">
        <LazySection rootMargin="300px">
          <Suspense fallback={<div className="section-skeleton" />}>
            <MissionSection />
          </Suspense>
        </LazySection>
      </div>
    </div>
  );
};

export default LandingPage;
