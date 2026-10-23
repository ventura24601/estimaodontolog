import { Seo } from '@/components/layout/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { TechStory } from '@/components/sections/TechStory';
import { FinalCta } from '@/components/sections/FinalCta';
import { Picture } from '@/components/ui/Picture';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SplitTitle } from '@/components/ui/SplitTitle';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/lib/site';

const benefits = [
  { title: 'Você participa', text: 'As imagens ficam visíveis durante a consulta, o que torna as decisões compartilhadas.' },
  { title: 'Menos deslocamentos', text: 'Quando indicada, a radiografia periapical é feita no próprio consultório.' },
  { title: 'Mais previsibilidade', text: 'Instrumentos de precisão apoiam cada etapa dos procedimentos.' },
];

export default function Technology() {
  return (
    <>
      <Seo
        title={`Tecnologia e diagnóstico | Dentista em ${site.city} | Estima Odontologia`}
        description="Câmera intraoral com 60x de aumento, raio-x periapical na clínica, localizador apical, limas rotatórias e esterilização rigorosa."
      />
      <PageHero
        eyebrow="Tecnologia e diagnóstico"
        title="Ver *antes* de decidir"
        lead="Recursos de diagnóstico e de tratamento que trazem clareza para você e precisão para cada etapa."
        media={<Picture name="consultorio-1" alt="" priority />}
      />

      <section className="section container-site">
        <div className="grid gap-10 md:grid-cols-12">
          <Eyebrow className="md:col-span-3">Por que importa</Eyebrow>
          <div className="md:col-span-9">
            <SplitTitle text="Tecnologia a serviço da *conversa*" className="text-h2" />
            <ul className="mt-14 grid gap-10 border-t border-stone pt-10 md:grid-cols-3">
              {benefits.map((b, i) => (
                <Reveal as="li" key={b.title} delay={i * 0.1}>
                    <span className="font-serif text-5xl italic text-accent-deep">0{i + 1}</span>
                    <h3 className="mt-6 font-serif text-2xl">{b.title}</h3>
                    <p className="mt-3 text-ink-mute">{b.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <TechStory showLink={false} />
      <FinalCta />
    </>
  );
}
