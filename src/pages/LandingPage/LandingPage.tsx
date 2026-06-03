import { useRef } from 'react';
import HeroSection from '../../features/HeroSection/HeroSection';
import LazySection from '../../components/UI/LazySection/LazySection';
import EcosystemSection from '../../features/EcosystemSection/EcosystemSection';
import ArchitectureSection from '../../features/ArchitectureSection/ArchitectureSection';
import ContributeSection from '../../features/ContributeSection/ContributeSection';
import MissionSection from '../../features/MissionSection/MissionSection';
import './LandingPage.css';

const LandingPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const architectureRef = useRef<HTMLDivElement>(null);
  const contributeRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="landing">
      <div ref={heroRef} id="hero"><HeroSection /></div>

      <div ref={ecosystemRef} id="ecosystem">
        <LazySection rootMargin="300px">
          <EcosystemSection />
        </LazySection>
      </div>

      <div ref={architectureRef} id="architecture">
        <LazySection rootMargin="300px">
          <ArchitectureSection />
        </LazySection>
      </div>

      <div ref={contributeRef} id="contribute">
        <LazySection rootMargin="300px">
          <ContributeSection />
        </LazySection>
      </div>

      <div ref={missionRef} id="mission">
        <LazySection rootMargin="300px">
          <MissionSection />
        </LazySection>
      </div>
    </div>
  );
};

export default LandingPage;
