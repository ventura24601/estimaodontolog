import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useHeaderTone } from '@/components/layout/Header';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SplitTitle } from '@/components/ui/SplitTitle';
import { EASE, useParallaxFactor } from '@/lib/motion';

type Props = { eyebrow: string; title: string; lead?: string; media: React.ReactNode };

/** Hero das páginas internas: imagem em parallax com zoom, eyebrow e título com reveal. */
export function PageHero({ eyebrow, title, lead, media }: Props) {
  useHeaderTone('dark');
  const ref = useRef<HTMLElement>(null);
  const f = useParallaxFactor();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${30 * f}%`]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 + 0.1 * f]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', `${40 * f}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="dark relative flex h-[88svh] min-h-[560px] items-end overflow-hidden bg-ink text-base">
      <motion.div className="absolute inset-0" style={{ y, scale }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, ease: EASE }}>
        {media}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,28,26,.5)_0%,rgba(28,28,26,.2)_45%,rgba(28,28,26,.85)_100%)]" />
      </motion.div>
      <motion.div className="container-site relative pb-16 md:pb-24" style={{ y: contentY, opacity }}>
        <Eyebrow light>{eyebrow}</Eyebrow>
        <SplitTitle as="h1" text={title} animate delay={0.25} className="mt-6 max-w-[16ch] text-h1" />
        {lead && (
          <motion.p className="mt-8 max-w-xl text-lead text-base/80" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.6 }}>
            {lead}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
