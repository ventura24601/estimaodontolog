import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { technology } from '@/data/content';
import { Placeholder } from '@/components/ui/Placeholder';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SplitTitle, renderRich } from '@/components/ui/SplitTitle';
import { Button } from '@/components/ui/Button';
import { EASE } from '@/lib/motion';

/** Storytelling fixado: imagem à esquerda troca com crossfade enquanto os blocos rolam à direita. */
export function TechStory({ showLink = true }: { showLink?: boolean }) {
  const [active, setActive] = useState(0);
  const current = technology[active];

  return (
    <section className="dark section bg-ink text-base" aria-label="Tecnologia e diagnóstico">
      <div className="container-site">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow light>Tecnologia e diagnóstico</Eyebrow>
          </div>
          <SplitTitle text="Ver com clareza para *tratar* com segurança" className="text-h2 md:col-span-7" />
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-12 md:gap-0">
          <div className="hidden md:col-span-5 md:block">
            <div className="sticky top-[15vh] aspect-[4/5] overflow-hidden rounded-media">
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={current.key}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: EASE }}
                >
                  <Placeholder icon={current.key} tone="ink" label={`${current.eyebrow} · imagem ilustrativa`} />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-5 right-5 flex gap-1.5" aria-hidden>
                {technology.map((t, i) => (
                  <span key={t.key} className={`h-1 rounded-full transition-all duration-700 ease-expo ${i === active ? 'w-8 bg-accent' : 'w-3 bg-base/30'}`} />
                ))}
              </div>
            </div>
          </div>

          <ol className="md:col-span-6 md:col-start-7">
            {technology.map((t, i) => (
              <Block key={t.key} index={i} onActive={setActive} active={i === active}>
                <div className="mb-8 aspect-[4/3] overflow-hidden rounded-media md:hidden">
                  <Placeholder icon={t.key} tone="ink" label={`${t.eyebrow} · imagem ilustrativa`} />
                </div>
                <p className="text-eyebrow uppercase text-accent">0{i + 1} — {t.eyebrow}</p>
                <h3 className="mt-5 font-serif text-h3">{renderRich(t.title)}</h3>
                <p className="mt-5 max-w-lg text-base/70">{t.text}</p>
              </Block>
            ))}
          </ol>
        </div>

        {showLink && (
          <div className="mt-16 md:ml-[calc(50%+2rem)]">
            <Button to="/tecnologia" variant="ghost-light">Tecnologia e diagnóstico</Button>
          </div>
        )}
      </div>
    </section>
  );
}

function Block({ children, index, onActive, active }: { children: React.ReactNode; index: number; onActive: (i: number) => void; active: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);
  return (
    <li ref={ref} className={`border-t border-base/15 py-12 transition-opacity duration-700 md:flex md:min-h-[70vh] md:flex-col md:justify-center md:py-0 ${active ? 'md:opacity-100' : 'md:opacity-35'}`}>
      {children}
    </li>
  );
}
