import { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Picture } from '@/components/ui/Picture';
import { SplitTitle } from '@/components/ui/SplitTitle';
import { Button } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/Icons';
import { site } from '@/lib/site';
import { hasStaticHero, useIntro } from '@/lib/intro';
import { EASE, useParallaxFactor } from '@/lib/motion';

/** Hero em três camadas: foto (0.3x + zoom), título (0.6x + fade) e arco dourado em velocidade própria. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { done: ready } = useIntro();
  const [instant] = useState(hasStaticHero);
  const from = <T,>(v: T) => (instant ? false : v);
  const f = useParallaxFactor();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const bgY = useTransform(p, [0, 1], ['0%', `${30 * f}%`]);
  const bgScale = useTransform(p, [0, 1], [1, 1 + 0.12 * f]);
  const titleY = useTransform(p, [0, 1], ['0vh', `${60 * f}vh`]);
  const titleOpacity = useTransform(p, [0, 0.6], [1, 0]);
  const arcY = useTransform(p, [0, 1], ['0%', `${-45 * f}%`]);
  const arcRotate = useTransform(p, [0, 1], [0, -18 * f]);

  return (
    <section ref={ref} className="dark relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-base">
      {/* Camada 1 — fotografia */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY, scale: bgScale }}>
        <Picture name="consultorio-2" alt="Consultório da Estima Odontologia em Pelotas" priority sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,28,26,.55)_0%,rgba(28,28,26,.25)_40%,rgba(28,28,26,.85)_100%)]" />
        <div className="absolute inset-0 bg-[#6b4e2a] mix-blend-color opacity-25" />
      </motion.div>

      {/* Camada 3 — arco dourado flutuante */}
      <motion.svg
        aria-hidden
        viewBox="0 0 800 800"
        className="pointer-events-none absolute -right-[18vw] top-[8vh] w-[min(90vw,980px)] text-accent"
        style={{ y: arcY, rotate: arcRotate }}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ duration: 1.6, ease: EASE, delay: 0.5 }}
      >
        <motion.circle
          cx="400" cy="400" r="380" fill="none" stroke="currentColor" strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={ready ? { pathLength: 0.62 } : undefined}
          transition={{ duration: 2.4, ease: EASE, delay: 0.5 }}
          style={{ rotate: 120 }}
        />
        <motion.circle
          cx="400" cy="400" r="300" fill="none" stroke="currentColor" strokeOpacity=".35" strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={ready ? { pathLength: 0.4 } : undefined}
          transition={{ duration: 2.4, ease: EASE, delay: 0.8 }}
          style={{ rotate: 160 }}
        />
      </motion.svg>

      {/* Camada 2 — conteúdo */}
      <motion.div className="container-site relative flex h-full flex-col justify-end pb-28 md:pb-32" style={{ y: titleY, opacity: titleOpacity }}>
        <motion.p
          className="mb-8 flex items-center gap-3 text-eyebrow uppercase text-base/75"
          initial={from({ opacity: 0, y: 12 })}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, ease: EASE }}
        >
          <span className="h-px w-8 bg-accent" aria-hidden /> Odontologia em {site.city}
        </motion.p>
        <SplitTitle as="h1" by="line" animate={ready} instant={instant} delay={0.1} text={'Seu sorriso,\n*cuidado* com precisão.'} className="max-w-[14ch] text-display text-base" />
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-md text-lead text-base/80"
            initial={from({ opacity: 0, y: 16 })}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: EASE, delay: 0.6 }}
          >
            Diagnóstico que você enxerga e cuidado que você sente, do check-up ao implante.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3"
            initial={from({ opacity: 0, y: 16 })}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: EASE, delay: 0.75 }}
          >
            <Button href={site.whatsapp.href} icon={<WhatsAppIcon />}>Agendar pelo WhatsApp</Button>
            <Button to="/tratamentos" variant="ghost-light">Conhecer tratamentos</Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Indicador de rolagem */}
      <motion.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-base/60 md:flex"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 1.2, duration: 1 }}
      >
        Role para descobrir
        <span className="relative h-12 w-px overflow-hidden bg-base/20">
          <span className="absolute inset-0 bg-accent [animation:scrollLine_2.4s_cubic-bezier(.22,1,.36,1)_infinite]" />
        </span>
      </motion.div>
    </section>
  );
}
