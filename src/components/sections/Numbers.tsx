import { stats } from '@/data/content';
import { Counter } from '@/components/ui/Counter';
import { Reveal } from '@/components/ui/Reveal';

export function Numbers() {
  const items = stats.filter((s): s is typeof s & { value: number } => s.value !== null);
  if (!items.length) return null;
  return (
    <section aria-label="A clínica em números" className="container-site">
      <div className="hairline" />
      <dl className="grid divide-y divide-stone md:grid-flow-col md:auto-cols-fr md:divide-x md:divide-y-0">
        {items.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="flex flex-col gap-3 py-10 md:px-10 md:py-14 md:first:pl-0">
            <dt className="order-2 max-w-[22ch] text-ink-mute">{s.label}</dt>
            <dd className="order-1 font-serif text-[clamp(4rem,9vw,8rem)] leading-none tracking-tight text-ink">
              <Counter value={s.value} suffix={s.suffix} />
            </dd>
          </Reveal>
        ))}
      </dl>
      <div className="hairline" />
    </section>
  );
}
