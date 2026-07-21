import { Badge, type BadgeProps } from './ui/badge';

type ProjectStatus = 'idea' | 'building' | 'beta' | 'launched' | 'ipo';

const statusConfig: Record<ProjectStatus, BadgeProps['variant']> = {
  idea: 'idea',
  building: 'building',
  beta: 'beta',
  launched: 'launched',
  ipo: 'ipo',
};

const statusLabels: Record<ProjectStatus, string> = {
  idea: '💡 Idea',
  building: '🏗️ Building',
  beta: '🧪 Beta',
  launched: '🚀 Launched',
  ipo: '📈 IPO',
};

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge variant={statusConfig[status]} className={className}>
      {statusLabels[status]}
    </Badge>
  );
}
