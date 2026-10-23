import { Seo } from '@/components/layout/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { FinalCta } from '@/components/sections/FinalCta';
import { Picture, type ImageName } from '@/components/ui/Picture';
import { ParallaxMedia } from '@/components/ui/ParallaxMedia';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SplitTitle } from '@/components/ui/SplitTitle';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';
import { site } from '@/lib/site';

const gallery: { name: ImageName; alt: string; className: string }[] = [
  { name: 'recepcao', alt: 'Recepção da Estima Odontologia', className: 'md:col-span-7 aspect-[4/3]' },
  { name: 'porta', alt: 'Entrada da clínica com o nome do Dr. Fernando J. Estima', className: 'md:col-span-5 md:mt-40 aspect-[4/5]' },
  { name: 'espera', alt: 'Sala de espera com poltronas', className: 'md:col-span-5 aspect-[4/5]' },
  { name: 'consultorio-1', alt: 'Sala de atendimento e conversa', className: 'md:col-span-7 md:mt-24 aspect-[4/3]' },
  { name: 'balcao', alt: 'Balcão de atendimento', className: 'md:col-span-6 md:col-start-4 aspect-[3/2]' },
];

export default function About() {
  return (
    <>
      <Seo
        title={`Sobre a clínica | Dentista em ${site.city} | Estima Odontologia`}
        description={`Conheça a Estima Odontologia, o ${site.responsible.name} (${site.responsible.cro}), a equipe e a estrutura da clínica em Pelotas/RS.`}
      />
      <PageHero
        eyebrow="Sobre"
        title="Precisão que *acolhe*"
        lead="Uma clínica pensada para que você se sinta à vontade do primeiro contato ao fim do tratamento."
        media={<Picture name="recepcao" alt="" priority />}
      />

      {/* História */}
      <section className="section container-site">
        <div className="grid gap-10 md:grid-cols-12">
          <Eyebrow className="md:col-span-3">Nossa história</Eyebrow>
          <div className="md:col-span-8">
            <SplitTitle text="Odontologia de perto, com *tempo* para cada pessoa" className="text-h2" />
            <Reveal delay={0.15}>
              <p className="mt-10 max-w-2xl text-lead text-ink-soft">
                A Estima Odontologia nasceu com um propósito simples: unir recursos de diagnóstico a um atendimento sem pressa,
                em que cada paciente entende o que está acontecendo e participa das decisões sobre o próprio tratamento.
              </p>
              <p className="mt-6 max-w-2xl text-ink-soft">[PREENCHER: ano de fundação e marcos reais da história da clínica.]</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Dr. Fernando */}
      <section className="dark bg-ink text-base">
        <div className="mx-auto grid max-w-site items-center md:grid-cols-12">
          <ParallaxMedia className="aspect-[4/5] md:col-span-5 md:aspect-auto md:h-[92vh]">
            <Picture name="dr-fernando" alt={site.responsible.name} sizes="(min-width: 768px) 42vw, 100vw" />
          </ParallaxMedia>
          <div className="px-5 py-20 md:col-span-6 md:col-start-7 md:px-0 md:py-28 md:pr-16">
            <Eyebrow light>Responsável técnico</Eyebrow>
            <SplitTitle text={'Dr. Fernando\n*Julio Estima*'} by="line" className="mt-6 text-h1" />
            <p className="mt-4 text-sm text-base/60">Cirurgião-dentista · {site.responsible.cro}</p>
            <Reveal delay={0.2}>
              <p className="mt-10 max-w-lg text-base/75">
                Conduz cada caso pessoalmente, do diagnóstico ao acompanhamento, com atenção ao conforto e à clareza das
                explicações.
              </p>
              <p className="mt-6 max-w-lg text-base/75">[PREENCHER: formação, especializações e cursos reais.]</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="section container-site">
        <div className="grid gap-10 md:grid-cols-12">
          <Eyebrow className="md:col-span-3">Equipe</Eyebrow>
          <div className="md:col-span-8">
            <SplitTitle text="Pessoas que *recebem* bem" className="text-h2" />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-2xl text-ink-soft">
                Da recepção ao consultório, a equipe trabalha para que cada visita seja tranquila e organizada.
              </p>
              <p className="mt-6 text-ink-mute">[PREENCHER: nomes, funções e fotos da equipe.]</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Estrutura */}
      <section className="container-site pb-24 md:pb-36" aria-label="Estrutura da clínica">
        <div className="grid gap-8 md:grid-cols-12">
          <Eyebrow className="md:col-span-3">Estrutura</Eyebrow>
          <SplitTitle text="Um espaço *calmo*, pensado nos detalhes" className="text-h2 md:col-span-9" />
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-12 md:gap-10">
          {gallery.map((g) => (
            <ParallaxMedia key={g.name} className={cn('rounded-media', g.className)}>
              <Picture name={g.name} alt={g.alt} sizes="(min-width: 768px) 55vw, 100vw" />
            </ParallaxMedia>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
