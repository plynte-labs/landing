import { useRef } from 'react';
import HeroSection from '../../features/HeroSection/HeroSection';
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
    <main className="landing">
      <div ref={heroRef}><HeroSection /></div>
      <div ref={ecosystemRef}><EcosystemSection /></div>
      <div ref={architectureRef}><ArchitectureSection /></div>
      <div ref={contributeRef}><ContributeSection /></div>
      <div ref={missionRef}><MissionSection /></div>
    </main>
  );
};

export default LandingPage;
