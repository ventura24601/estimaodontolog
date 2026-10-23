import { Picture } from '@/components/ui/Picture';
import { ParallaxMedia } from '@/components/ui/ParallaxMedia';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SplitTitle } from '@/components/ui/SplitTitle';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { site } from '@/lib/site';

export function AboutTeaser() {
  return (
    <section className="section overflow-hidden">
      <div className="mx-auto grid max-w-site items-center gap-12 md:grid-cols-12 md:gap-0">
        {/* Imagem sangrando para a borda esquerda */}
        <ParallaxMedia className="aspect-[4/5] rounded-r-media md:col-span-6 md:aspect-[5/6] lg:col-span-5">
          <Picture name="dr-fernando" alt={`${site.responsible.name} no consultório da Estima Odontologia`} sizes="(min-width: 768px) 45vw, 100vw" />
        </ParallaxMedia>
        <div className="px-5 md:col-span-5 md:col-start-8 md:px-0 md:pr-10">
          <Eyebrow>Quem cuida de você</Eyebrow>
          <SplitTitle text="Uma clínica feita de *escuta* e técnica" className="mt-6 text-h2" />
          <Reveal delay={0.2}>
            <p className="mt-8 text-ink-soft">
              À frente da Estima está o {site.responsible.name}, cirurgião-dentista que acredita em consultas sem pressa e em
              explicações claras. Cada plano de tratamento nasce de um diagnóstico detalhado e de uma conversa franca sobre
              as suas prioridades.
            </p>
            <p className="mt-4 text-sm text-ink-mute">{site.responsible.cro}</p>
            <div className="mt-10">
              <Button to="/sobre" variant="secondary">Conheça a clínica</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
