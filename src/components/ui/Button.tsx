import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { Arrow } from './Icons';
import { trackEvent } from '@/lib/analytics';

type Props = {
  children: React.ReactNode;
  to?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost-light';
  icon?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
};

/** Botão em pílula. Secundário com outline e seta que desliza no hover. */
export function Button({ children, to, href, variant = 'primary', icon, className, type = 'button', disabled, onClick }: Props) {
  const cls = cn(
    'group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full px-7 text-[15px] font-medium tracking-tight',
    'transition-[background-color,color,border-color,transform] duration-500 ease-expo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent',
    variant === 'primary' && 'bg-accent text-ink hover:bg-ink hover:text-base',
    variant === 'secondary' && 'border border-ink/25 text-ink hover:border-ink',
    variant === 'ghost-light' && 'border border-base/30 text-base hover:border-base',
    disabled && 'pointer-events-none opacity-60',
    className,
  );

  const inner = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {!icon && (
        <span className="relative h-4 w-4 overflow-hidden" aria-hidden>
          <Arrow className="absolute inset-0 h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-5" />
          <Arrow className="absolute inset-0 h-4 w-4 -translate-x-5 transition-transform duration-500 ease-expo group-hover:translate-x-0" />
        </span>
      )}
    </>
  );

  if (to) return <Link to={to} className={cls} onClick={onClick}>{inner}</Link>;
  if (href) {
    const external = /^https?:/.test(href);
    const handle = () => {
      if (href.includes('wa.me')) trackEvent('whatsapp_click');
      if (href.startsWith('tel:')) trackEvent('phone_click');
      onClick?.();
    };
    return (
      <a href={href} className={cls} onClick={handle} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    );
  }
  return <button type={type} className={cls} disabled={disabled} onClick={onClick}>{inner}</button>;
}
