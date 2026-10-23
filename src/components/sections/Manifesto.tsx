import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { manifesto } from '@/data/content';

/** Frase que "acende" palavra por palavra conforme o scroll (opacidade 0.15 → 1). */
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = manifesto.split(' ');

  return (
    <section className="section container-site">
      <div className="grid gap-10 md:grid-cols-12">
        <Eyebrow className="md:col-span-3 md:pt-4">Manifesto</Eyebrow>
        <p ref={ref} className="font-serif text-h2 md:col-span-9">
          <span className="sr-only">{manifesto}</span>
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const highlight = /tecnologia|escuta|enxerga|cuidado/i.test(children);
  return (
    <motion.span aria-hidden style={{ opacity }} className={highlight ? 'italic text-accent-deep' : undefined}>
      {children}{' '}
    </motion.span>
  );
}
