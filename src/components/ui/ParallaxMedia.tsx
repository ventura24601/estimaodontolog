import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/cn';
import { EASE, useParallaxFactor } from '@/lib/motion';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Revela com clip-path de baixo para cima + scale 1.2 → 1 */
  reveal?: boolean;
  /** Amplitude do parallax interno em % (padrão 10 → -10% a 10%) */
  amount?: number;
  cursor?: string;
};

/** Container de imagem com overflow hidden, reveal por clip-path e parallax interno. */
export function ParallaxMedia({ children, className, reveal = true, amount = 10, cursor }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const factor = useParallaxFactor();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-amount * factor}%`, `${amount * factor}%`]);

  return (
    <motion.div
      ref={ref}
      data-cursor={cursor}
      className={cn('relative overflow-hidden', className)}
      initial={reveal && !reduced ? { clipPath: 'inset(100% 0% 0% 0%)' } : reveal ? { opacity: 0 } : undefined}
      whileInView={reveal ? (reduced ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }) : undefined}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      <motion.div
        className="absolute inset-x-0 -inset-y-[12%]"
        style={{ y }}
        initial={reveal && !reduced ? { scale: 1.2 } : undefined}
        whileInView={reveal && !reduced ? { scale: 1 } : undefined}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
