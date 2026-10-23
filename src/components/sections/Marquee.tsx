import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity, wrap } from 'framer-motion';
import { treatments } from '@/data/treatments';

/** Faixa infinita com os tratamentos em serifada gigante; a velocidade reage à rolagem. */
export function Marquee({ baseVelocity = -2.2 }: { baseVelocity?: number }) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const direction = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * Math.abs(f);
    baseX.set(baseX.get() + move);
  });

  const row = (
    <span className="flex shrink-0 items-center">
      {treatments.map((t, i) => (
        <span key={t.slug} className="flex items-center">
          <span className={i % 2 ? 'text-outline-accent italic' : 'text-outline'}>{t.title}</span>
          <span className="mx-[0.35em] text-accent" aria-hidden>✦</span>
        </span>
      ))}
    </span>
  );

  return (
    <section aria-label="Tratamentos oferecidos" className="overflow-hidden border-y border-stone py-8 md:py-12">
      <motion.div className="flex w-max whitespace-nowrap font-serif text-[clamp(3.5rem,10vw,9.5rem)] leading-none tracking-tight" style={{ x }} aria-hidden>
        {row}
        {row}
      </motion.div>
      <p className="sr-only">{treatments.map((t) => t.title).join(', ')}</p>
    </section>
  );
}
