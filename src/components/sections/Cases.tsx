import { cases } from '@/data/content';
import { BeforeAfter } from '@/components/ui/BeforeAfter';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SplitTitle } from '@/components/ui/SplitTitle';
import { Reveal } from '@/components/ui/Reveal';

function CasePlaceholder({ stage }: { stage: 'before' | 'after' }) {
  const bg = stage === 'before' ? 'bg-[linear-gradient(135deg,#CFC6B8,#BDB2A2)]' : 'bg-[linear-gradient(135deg,#F3EDE4,#E9E1D6)]';
  return (
    <div className={`grid h-full w-full place-items-center ${bg}`}>
      <span className="text-[11px] uppercase tracking-[0.2em] text-ink/50">Ilustração · {stage === 'before' ? 'diagnóstico' : 'conclusão'}</span>
    </div>
  );
}

/** Casos clínicos conforme Res. CFO 196/2019: só casos próprios, com TCLE, nome e CRO do profissional. */
export function Cases() {
  const visible = cases.filter((c) => c.tcleOk);
  if (!visible.length) return null;

  return (
    <section className="section container-site" aria-label="Casos clínicos">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <Eyebrow>Casos clínicos</Eyebrow>
        </div>
        <div className="md:col-span-8">
          <SplitTitle text="Registros de *diagnóstico* e conclusão" className="text-h2" />
          <p className="mt-6 max-w-xl text-ink-soft">
            Casos realizados na clínica e publicados com autorização por escrito dos pacientes. Cada tratamento é único e
            os resultados variam de pessoa para pessoa.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-16">
        {visible.map((c) => (
          <Reveal key={c.id}>
            <figure className="grid gap-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <BeforeAfter
                  label={c.treatment}
                  before={c.before ? <img src={c.before} alt={`${c.treatment}: registro de diagnóstico`} className="h-full w-full object-cover" /> : <CasePlaceholder stage="before" />}
                  after={c.after ? <img src={c.after} alt={`${c.treatment}: registro de conclusão`} className="h-full w-full object-cover" /> : <CasePlaceholder stage="after" />}
                />
              </div>
              <figcaption className="border-t border-stone pt-6 md:col-span-4 md:mb-2">
                <p className="text-eyebrow uppercase text-ink-mute">{c.treatment}</p>
                <p className="mt-4 text-ink-soft">{c.caption}</p>
                <p className="mt-6 text-sm text-ink">{c.professional}<br /><span className="text-ink-mute">{c.cro}</span></p>
                {c.placeholder && (
                  <p className="mt-6 text-xs text-ink-mute">Imagens ilustrativas. Casos reais serão publicados somente com TCLE assinado.</p>
                )}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
