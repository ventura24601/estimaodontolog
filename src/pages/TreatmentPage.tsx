import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getTreatment, nextTreatment } from '@/data/treatments';
import { Seo } from '@/components/layout/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { FinalCta } from '@/components/sections/FinalCta';
import { Placeholder } from '@/components/ui/Placeholder';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SplitTitle } from '@/components/ui/SplitTitle';
import { Reveal } from '@/components/ui/Reveal';
import { Faq } from '@/components/ui/Accordion';
import { ParallaxMedia } from '@/components/ui/ParallaxMedia';
import { Arrow } from '@/components/ui/Icons';
import { EASE } from '@/lib/motion';
import { site } from '@/lib/site';
import NotFound from './NotFound';

export default function TreatmentPage() {
  const { slug = '' } = useParams();
  const t = getTreatment(slug);
  if (!t) return <NotFound />;
  const next = nextTreatment(t.slug);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <Seo title={`${t.title} em ${site.city} | Estima Odontologia`} description={t.seoDescription} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PageHero eyebrow={t.title} title={t.headline} lead={t.summary} media={<Placeholder icon={t.icon} tone="ink" />} />

      {/* Introdução */}
      <section className="section container-site">
        <div className="grid gap-10 md:grid-cols-12">
          <Eyebrow className="md:col-span-3">Introdução</Eyebrow>
          <div className="md:col-span-8">
            {t.intro.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className={i === 0 ? 'font-serif text-h3 leading-snug' : 'mt-8 max-w-2xl text-lead text-ink-soft'}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Modalidades */}
      <section className="container-site pb-24 md:pb-36" aria-label="Modalidades">
        <ul className="grid border-t border-stone md:grid-cols-2">
          {t.options.map((o, i) => (
            <motion.li
              key={o.title}
              className="border-b border-stone py-10 md:odd:border-r md:odd:pr-12 md:even:pl-12"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1, ease: EASE, delay: (i % 2) * 0.1 }}
            >
              <h2 className="font-serif text-h3">{o.title}</h2>
              <p className="mt-4 max-w-lg text-ink-soft">{o.text}</p>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Para quem é indicado */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-site items-stretch md:grid-cols-2">
          <ParallaxMedia className="aspect-[4/3] md:aspect-auto md:min-h-[640px]">
            <Placeholder icon={t.icon} tone="stone" />
          </ParallaxMedia>
          <div className="px-5 py-20 md:px-16 md:py-28">
            <Eyebrow>Para quem é indicado</Eyebrow>
            <SplitTitle text="Quando *considerar* este tratamento" className="mt-6 text-h2" />
            <ul className="mt-10 border-t border-ink/15">
              {t.indications.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 0.06} className="flex gap-5 border-b border-ink/15 py-5">
                  <span className="mt-[0.6em] h-px w-5 shrink-0 bg-accent-deep" aria-hidden />
                  {item}
                </Reveal>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-mute">A indicação é sempre confirmada em consulta de avaliação.</p>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="section container-site">
        <div className="grid gap-8 md:grid-cols-12">
          <Eyebrow className="md:col-span-3">Como funciona</Eyebrow>
          <SplitTitle text="Etapa por *etapa*" className="text-h2 md:col-span-9" />
        </div>
        <ol className="mt-16 grid gap-px overflow-hidden rounded-media bg-stone md:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((s, i) => (
            <motion.li
              key={s.title}
              className="flex flex-col bg-base p-8 md:min-h-[320px] md:p-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.12 }}
            >
              <span className="font-serif text-6xl italic text-accent-deep">0{i + 1}</span>
              <h3 className="mt-auto pt-10 font-serif text-2xl">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-mute">{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="container-site pb-24 md:pb-36">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>Perguntas frequentes</Eyebrow>
            <SplitTitle text="Dúvidas *comuns*" className="mt-6 text-h2" />
          </div>
          <div className="md:col-span-8">
            <Faq items={t.faq} />
          </div>
        </div>
      </section>

      {/* Próximo tratamento */}
      <Link to={`/tratamentos/${next.slug}`} data-cursor="Ver" className="group block border-t border-stone">
        <div className="container-site flex items-center justify-between gap-8 py-16 md:py-24">
          <div>
            <p className="text-eyebrow uppercase text-ink-mute">Próximo tratamento</p>
            <p className="mt-4 font-serif text-h1 transition-colors duration-700 group-hover:text-accent-deep">{next.title}</p>
          </div>
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-ink/20 transition-all duration-700 ease-expo group-hover:scale-110 group-hover:border-accent group-hover:bg-accent md:h-24 md:w-24">
            <Arrow className="h-6 w-6" />
          </span>
        </div>
      </Link>

      <FinalCta title={`Vamos conversar sobre *${t.title.toLowerCase()}*?`} />
    </>
  );
}
