import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { EASE } from '@/lib/motion';

/** Count-up ao entrar na viewport. */
export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    const c = animate(0, value, { duration: 1.8, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref}>
      <span className="sr-only">{`${value}${suffix}`}</span>
      <span aria-hidden>
        {n}
        {suffix}
      </span>
    </span>
  );
}
