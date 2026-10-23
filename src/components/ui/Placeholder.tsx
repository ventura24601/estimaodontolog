import { icons } from './Icons';
import { cn } from '@/lib/cn';

type Props = {
  icon: keyof typeof icons;
  label?: string;
  tone?: 'sand' | 'stone' | 'ink';
  className?: string;
};

/** Placeholder editorial até a chegada das fotos reais. */
export function Placeholder({ icon, label = 'Imagem ilustrativa', tone = 'sand', className }: Props) {
  const Icon = icons[icon];
  const bg = {
    sand: 'bg-[radial-gradient(120%_90%_at_20%_10%,#F3EDE4_0%,#E9E1D6_45%,#D9CFC1_100%)] text-ink/70',
    stone: 'bg-[radial-gradient(120%_90%_at_80%_0%,#E9E1D6_0%,#CFC6B8_60%,#BDB2A2_100%)] text-ink/70',
    ink: 'bg-[radial-gradient(120%_90%_at_30%_0%,#3A3833_0%,#24231F_55%,#161614_100%)] text-base/70',
  }[tone];
  return (
    <div role="img" aria-label={label} className={cn('relative h-full w-full overflow-hidden', bg, className)}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <g fill="none" stroke="#C8A161" strokeOpacity=".55" strokeWidth=".8">
          <path d="M-20 420C80 250 240 220 420 300" />
          <path d="M-20 450C90 290 250 260 420 340" strokeOpacity=".3" />
          <circle cx="300" cy="120" r="90" strokeOpacity=".25" />
        </g>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <Icon width={72} height={72} strokeWidth={0.6} />
      </div>
      <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.2em] opacity-60">{label}</span>
    </div>
  );
}
