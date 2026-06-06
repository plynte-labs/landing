import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import './GlassCard.css';

// -------------------------------
// Internal base — not exported
// -------------------------------

interface GlassCardBaseProps {
  as?: React.ElementType;
  children: ReactNode;
  className?: string;
  // Allow passthrough props (href, target, rel, motion attrs) for polymorphic rendering
  [key: string]: unknown;
}

const GlassCardBase: React.FC<GlassCardBaseProps> = ({
  as: Component = 'div',
  children,
  className,
  ...rest
}) => {
  const combinedClass = ['glass-card', className].filter(Boolean).join(' ');
  return (
    <Component className={combinedClass} {...rest}>
      {children}
    </Component>
  );
};

// -------------------------------
// Public variant: GlassCard (plain <div>)
// -------------------------------

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
}) => (
  <GlassCardBase className={className}>
    {children}
  </GlassCardBase>
);

// -------------------------------
// Public variant: GlassCardLink (<a> target="_blank")
// -------------------------------

export interface GlassCardLinkProps {
  children: ReactNode;
  className?: string;
  href: string;
}

export const GlassCardLink: React.FC<GlassCardLinkProps> = ({
  children,
  className,
  href,
}) => (
  <GlassCardBase
    as="a"
    className={className}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </GlassCardBase>
);

// -------------------------------
// Public variant: GlassCardMotion (<motion.div>)
// -------------------------------

export interface GlassCardMotionProps {
  children: ReactNode;
  className?: string;
}

export const GlassCardMotion: React.FC<GlassCardMotionProps> = ({
  children,
  className,
  ...motionProps
}) => (
  <GlassCardBase as={motion.div} className={className} {...motionProps}>
    {children}
  </GlassCardBase>
);

// -------------------------------
// Public variant: GlassCardMotionLink (<a> > <motion.div>)
// -------------------------------

export interface GlassCardMotionLinkProps {
  children: ReactNode;
  className?: string;
  href: string;
}

export const GlassCardMotionLink: React.FC<GlassCardMotionLinkProps> = ({
  children,
  className,
  href,
  ...motionProps
}) => (
  <GlassCardBase
    as="a"
    className={className}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <motion.div {...motionProps}>{children}</motion.div>
  </GlassCardBase>
);
