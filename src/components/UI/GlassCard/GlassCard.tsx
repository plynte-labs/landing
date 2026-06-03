import type { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import './GlassCard.css';

type MotionAttrs = Omit<HTMLMotionProps<'div'>, 'children' | 'className'>;

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  motionProps?: MotionAttrs;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  href,
  motionProps,
}) => {
  const combinedClass = ['glass-card', className].filter(Boolean).join(' ');

  // Both href and motionProps: wrap content in motion.div inside anchor
  if (href && motionProps) {
    return (
      <a
        href={href}
        className={combinedClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        <motion.div {...motionProps}>{children}</motion.div>
      </a>
    );
  }

  // Only href: render as semantic anchor
  if (href) {
    return (
      <a
        href={href}
        className={combinedClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  // Only motionProps: render as motion.div
  if (motionProps) {
    return (
      <motion.div className={combinedClass} {...motionProps}>
        {children}
      </motion.div>
    );
  }

  // Neither: plain div
  return <div className={combinedClass}>{children}</div>;
};
