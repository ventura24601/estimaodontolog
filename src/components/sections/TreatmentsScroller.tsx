import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { treatments, type Treatment } from '@/data/treatments';
import { Placeholder } from '@/components/ui/Placeholder';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SplitTitle } from '@/components/ui/SplitTitle';
import { Arrow } from '@/components/ui/Icons';
import { useIsMobile } from '@/lib/motion';

/** Seção fixada: os 6 cards deslizam na horizontal conforme o scroll vertical. No mobile vira carrossel com swipe. */
export function TreatmentsScroller() {
  const mobile = useIsMobile();
  const reduced = useReducedMotion();
  return mobile || reduced ? <Carousel /> : <Pinned />;
}

function Intro() {
  return (
    <div className="flex shrink-0 flex-col justify-between md:w-[34vw] md:max-w-[480px] md:pr-10">
      <div>
        <Eyebrow>Tratamentos</Eyebrow>
        <SplitTitle text="Cuidado *completo*, em um só lugar" className="mt-6 text-h2" />
      </div>
      <p className="mt-6 max-w-sm text-ink-soft md:mt-0">
        Da prevenção à reabilitação, cada tratamento começa com um diagnóstico claro e um plano feito para você.
      </p>
    </div>
  );
}

function Pinned() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.3 });
  const x = useTransform(progress, [0, 1], [0, -distance]);

  useLayoutEffect(() => {
    const measure = () => track.current && setDistance(track.current.scrollWidth - window.innerWidth);
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <section ref={section} aria-label="Tratamentos" style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex w-max items-stretch gap-6 pl-10 pr-[8vw] lg:pl-16">
          <Intro />
          {treatments.map((t, i) => (
            <Card key={t.slug} t={t} index={i} progress={progress} className="w-[min(30vw,420px)]" />
          ))}
        </motion.div>
        <div className="container-site mt-12 flex items-center gap-6">
          <div className="relative h-px flex-1 bg-stone">
            <motion.div className="absolute inset-0 origin-left bg-ink" style={{ scaleX: progress }} />
          </div>
          <span className="text-eyebrow uppercase text-ink-mute">0{treatments.length} tratamentos</span>
        </div>
      </div>
    </section>
  );
}

function Carousel() {
  return (
    <section aria-label="Tratamentos" className="section">
      <div className="container-site"><Intro /></div>
      <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:px-10">
        {treatments.map((t, i) => (
          <Card key={t.slug} t={t} index={i} className="w-[78vw] max-w-[360px] snap-start" />
        ))}
      </div>
    </section>
  );
}

function Card({ t, index, progress, className }: { t: Treatment; index: number; progress?: MotionValue<number>; className?: string }) {
  return (
    <Link to={`/tratamentos/${t.slug}`} data-cursor="Ver" className={`group block shrink-0 ${className}`}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-media">
        <CardMedia t={t} index={index} progress={progress} />
        <span className="absolute left-5 top-5 font-serif text-xl text-ink/60">0{index + 1}</span>
      </div>
      <div className="mt-6 flex items-start justify-between gap-4 border-t border-stone pt-5">
        <div>
          <h3 className="font-serif text-h3">{t.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-mute">{t.summary}</p>
        </div>
        <span className="mt-2 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/20 transition-colors duration-500 group-hover:border-accent group-hover:bg-accent">
          <Arrow className="h-4 w-4 -rotate-45 transition-transform duration-500 ease-expo group-hover:rotate-0" />
        </span>
      </div>
    </Link>
  );
}

function CardMedia({ t, index, progress }: { t: Treatment; index: number; progress?: MotionValue<number> }) {
  const fallback = useMotionValue(0);
  const center = (index + 1) / (treatments.length + 1);
  const shift = useTransform(progress ?? fallback, [center - 0.5, center + 0.5], ['10%', '-10%']);
  return (
    <motion.div className="absolute -inset-x-[12%] inset-y-0" style={progress ? { x: shift } : undefined}>
      <div className="h-full w-full transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.06]">
        <Placeholder icon={t.icon} tone={index % 2 ? 'stone' : 'sand'} />
      </div>
    </motion.div>
  );
}
