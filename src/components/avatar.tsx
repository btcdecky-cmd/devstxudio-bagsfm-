import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
};

export function Avatar({ src, alt, size = 'md', className }: AvatarProps) {
  return (
    <div
      className={cn(
        'rounded-full overflow-hidden bg-gradient-to-br from-gold to-gold-light flex items-center justify-center',
        sizeMap[size],
        className,
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span className="text-xs font-bold text-ink-900">
          {alt
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </span>
      )}
    </div>
  );
}

interface StatProps {
  label: string;
  value: number | string;
}

export function Stat({ label, value }: StatProps) {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold text-gold">{value}</p>
      <p className="text-xs text-neutral-500 uppercase tracking-wider">{label}</p>
    </div>
  );
}
