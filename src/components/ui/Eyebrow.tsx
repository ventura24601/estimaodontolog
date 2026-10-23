import { cn } from '@/lib/cn';

export function Eyebrow({ children, className, light }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <p className={cn('flex items-center gap-3 text-eyebrow font-medium uppercase', light ? 'text-base/70' : 'text-ink-mute', className)}>
      <span aria-hidden className={cn('h-px w-8', light ? 'bg-accent' : 'bg-accent-deep')} />
      {children}
    </p>
  );
}
