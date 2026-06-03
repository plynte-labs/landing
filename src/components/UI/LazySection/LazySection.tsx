import { useState, useRef, useEffect, type ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  rootMargin?: string;
}

/**
 * Only renders children when the section is within rootMargin of the viewport.
 * Reduces initial JS execution and DOM nodes for below-the-fold content.
 */
const LazySection = ({ children, rootMargin = '200px' }: LazySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: '100px' }}>
      {isVisible ? children : null}
    </div>
  );
};

export default LazySection;
