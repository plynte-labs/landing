import { useMemo } from 'react';

const ParticleField = ({ count = 150, reducedMotion = false }: { count?: number; reducedMotion?: boolean }) => {
  if (reducedMotion) return null;

  const particles = useMemo(() => Array.from({ length: count }).map((_, i) => {
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = 15 + Math.random() * 35;
    const size = Math.random() * 3 + 10.5;
    const opacity = Math.random() * 0.1 + 0.05;

    return (
      <div
        key={i}
        className="particle"
        aria-hidden="true"
        style={{
          top: `${top}%`,
          left: `${left}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: opacity,
        }}
      />
    );
  }), [count]);

  return <>{particles}</>;
};

export default ParticleField;
