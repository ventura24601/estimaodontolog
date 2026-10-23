import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { testimonials } from '@/data/content';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Arrow } from '@/components/ui/Icons';
import { EASE } from '@/lib/motion';

// Apenas para visualizar o layout em desenvolvimento. Nunca vai para produção.
const DEV_SAMPLE = [
  { quote: 'Exemplo de layout: substitua por depoimentos reais de pacientes, como avaliações do Google, com autorização.', author: 'Depoimento de exemplo', source: 'Somente em desenvolvimento' },
];

export function Testimonials() {
  const items = testimonials.length ? testimonials : import.meta.env.DEV ? DEV_SAMPLE : [];
  const [i, setI] = useState(0);
  if (!items.length) return null;
  const t = items[i];
  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);

  return (
    <section className="section bg-sand" aria-label="Depoimentos">
      <div className="container-site grid gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <Eyebrow>Depoimentos</Eyebrow>
        </div>
        <div className="relative md:col-span-9">
          <span aria-hidden className="pointer-events-none absolute -left-2 -top-24 select-none font-serif text-[16rem] leading-none text-accent/40 md:-left-10 md:-top-36 md:text-[22rem]">“</span>
          <div className="relative min-h-[16rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.figure key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.8, ease: EASE }}>
                <blockquote className="font-serif text-h3 leading-snug md:text-[2.6rem]">{t.quote}</blockquote>
                <figcaption className="mt-10 flex items-center gap-4">
                  <span className="h-px w-10 bg-accent-deep" aria-hidden />
                  <span>
                    <span className="block font-medium">{t.author}</span>
                    <span className="block text-sm text-ink-mute">{t.source}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          {items.length > 1 && (
            <div className="mt-12 flex items-center gap-3">
              <button type="button" onClick={() => go(-1)} aria-label="Depoimento anterior" className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 transition-colors hover:border-ink"><Arrow className="h-4 w-4 rotate-180" /></button>
              <button type="button" onClick={() => go(1)} aria-label="Próximo depoimento" className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 transition-colors hover:border-ink"><Arrow className="h-4 w-4" /></button>
              <span className="ml-4 text-sm text-ink-mute">{String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
