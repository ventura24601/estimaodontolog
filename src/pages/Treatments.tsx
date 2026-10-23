import { Link } from 'react-router-dom';
import { treatments } from '@/data/treatments';
import { Seo } from '@/components/layout/Seo';
import { useHeaderTone } from '@/components/layout/Header';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SplitTitle } from '@/components/ui/SplitTitle';
import { Placeholder } from '@/components/ui/Placeholder';
import { ParallaxMedia } from '@/components/ui/ParallaxMedia';
import { Reveal } from '@/components/ui/Reveal';
import { Arrow } from '@/components/ui/Icons';
import { Marquee } from '@/components/sections/Marquee';
import { FinalCta } from '@/components/sections/FinalCta';
import { cn } from '@/lib/cn';
import { site } from '@/lib/site';

export default function Treatments() {
  useHeaderTone('light');
  return (
    <>
      <Seo
        title={`Tratamentos odontológicos em ${site.city} | Estima Odontologia`}
        description="Check-up, clínica geral, implantes dentários, aparelhos ortodônticos, estética dental e tratamento de canal em Pelotas/RS."
      />
      <section className="container-site pb-20 pt-40 md:pb-28 md:pt-56">
        <Eyebrow>Tratamentos</Eyebrow>
        <SplitTitle as="h1" animate text={'Seis caminhos para\num sorriso *saudável*'} className="mt-8 text-display" />
        <Reveal delay={0.4}>
          <p className="mt-10 max-w-xl text-lead text-ink-soft">Conheça cada tratamento, para quem ele é indicado e como funciona na prática.</p>
        </Reveal>
      </section>

      <section className="container-site pb-24 md:pb-36" aria-label="Lista de tratamentos">
        <ul className="grid gap-x-10 gap-y-20 md:grid-cols-2">
          {treatments.map((t, i) => (
            <li key={t.slug} className={cn(i % 2 === 1 && 'md:mt-32')}>
              <Link to={`/tratamentos/${t.slug}`} data-cursor="Ver" className="group block">
                <ParallaxMedia className={cn('rounded-media', i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[5/4]')}>
                  <div className="h-full w-full transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.05]">
                    <Placeholder icon={t.icon} tone={i % 2 ? 'stone' : 'sand'} />
                  </div>
                </ParallaxMedia>
                <div className="mt-6 flex items-start justify-between gap-6 border-t border-stone pt-6">
                  <div>
                    <span className="text-eyebrow uppercase text-ink-mute">0{i + 1}</span>
                    <h2 className="mt-3 font-serif text-h3">{t.title}</h2>
                    <p className="mt-3 max-w-md text-ink-mute">{t.summary}</p>
                  </div>
                  <span className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/20 transition-colors duration-500 group-hover:border-accent group-hover:bg-accent">
                    <Arrow className="h-4 w-4 -rotate-45 transition-transform duration-500 ease-expo group-hover:rotate-0" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Marquee />
      <FinalCta />
    </>
  );
}
