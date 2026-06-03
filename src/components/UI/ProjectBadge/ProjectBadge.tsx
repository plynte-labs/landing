import './ProjectBadge.css';

interface ProjectBadgeProps {
  label: string;
  variant?: 'green' | 'blue' | 'purple';
  className?: string;
}

export const ProjectBadge: React.FC<ProjectBadgeProps> = ({
  label,
  variant = 'green',
  className,
}) => {
  const classes = [
    'project-badge',
    `project-badge--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{label}</span>;
};
