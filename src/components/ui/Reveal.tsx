import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';

type Props = { children: React.ReactNode; delay?: number; className?: string; y?: number; as?: 'div' | 'li' };

/** Fade + leve subida ao entrar na viewport. */
export function Reveal({ children, delay = 0, className, y = 32, as = 'div' }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}
