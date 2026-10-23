import { motion } from 'framer-motion';
import { differentials } from '@/data/content';
import { icons } from '@/components/ui/Icons';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SplitTitle } from '@/components/ui/SplitTitle';
import { EASE } from '@/lib/motion';

export function Differentials() {
  return (
    <section className="section container-site">
      <div className="grid gap-8 md:grid-cols-12">
        <Eyebrow className="md:col-span-4">Diferenciais</Eyebrow>
        <SplitTitle text="O que torna cada consulta *diferente*" className="text-h2 md:col-span-8" />
      </div>
      <ul className="mt-16 grid border-t border-stone sm:grid-cols-2 lg:grid-cols-5">
        {differentials.map((d, i) => {
          const Icon = icons[d.icon];
          return (
            <motion.li
              key={d.title}
              className="group flex flex-col gap-6 border-b border-stone py-10 sm:pr-8 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
            >
              <span className="grid h-14 w-14 place-items-center rounded-full border border-stone text-accent-deep transition-colors duration-700 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                <Icon width={26} height={26} />
              </span>
              <span className="font-serif text-2xl leading-snug">{d.title}</span>
              <span className="text-[15px] leading-relaxed text-ink-mute">{d.text}</span>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
