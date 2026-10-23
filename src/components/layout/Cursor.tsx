import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useFinePointer } from '@/lib/motion';

/** Cursor customizado (desktop): cresce e mostra o rótulo de `data-cursor` ("Ver", "Arraste"). */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-cursor');
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]');
      setLabel(el?.dataset.cursor ?? null);
    };
    const leave = () => setVisible(false);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[120] grid place-items-center rounded-full bg-accent text-[11px] font-medium uppercase tracking-[0.15em] text-ink mix-blend-normal"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: label ? 84 : 10, height: label ? 84 : 10, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span animate={{ opacity: label ? 1 : 0, scale: label ? 1 : 0.6 }} transition={{ duration: 0.3 }}>
        {label}
      </motion.span>
    </motion.div>
  );
}
