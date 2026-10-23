import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SplitTitle } from '@/components/ui/SplitTitle';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { ParallaxMedia } from '@/components/ui/ParallaxMedia';
import { site } from '@/lib/site';

export function Location() {
  const mapRef = useRef<HTMLDivElement>(null);
  const near = useInView(mapRef, { once: true, margin: '400px 0px' });

  return (
    <section className="section container-site" aria-label="Localização">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Eyebrow>Localização</Eyebrow>
          <SplitTitle text="No coração de *Pelotas*" className="mt-6 text-h2" />
          <Reveal delay={0.15}>
            <dl className="mt-10 divide-y divide-stone border-y border-stone">
              <div className="grid grid-cols-3 gap-4 py-5">
                <dt className="text-eyebrow uppercase text-ink-mute">Endereço</dt>
                <dd className="col-span-2">{site.address.street}<br />{site.address.district}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4 py-5">
                <dt className="text-eyebrow uppercase text-ink-mute">Horários</dt>
                <dd className="col-span-2">{site.hours.map((h) => <span key={h.days} className="block">{h.days} · {h.time}</span>)}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4 py-5">
                <dt className="text-eyebrow uppercase text-ink-mute">Contato</dt>
                <dd className="col-span-2"><a href={site.phone.href} className="hover:text-accent-deep">{site.phone.display}</a><br /><a href={`mailto:${site.email}`} className="break-all hover:text-accent-deep">{site.email}</a></dd>
              </div>
            </dl>
            <div className="mt-10">
              <Button href={site.address.mapsHref} variant="secondary">Como chegar</Button>
            </div>
          </Reveal>
        </div>
        <div ref={mapRef} className="md:col-span-7">
          <ParallaxMedia className="aspect-[4/3] rounded-media bg-sand md:aspect-auto md:h-full md:min-h-[520px]" amount={0}>
            {near && (
              <iframe
                title="Mapa da Estima Odontologia em Pelotas"
                src={site.address.embed}
                className="map-neutral h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            )}
          </ParallaxMedia>
        </div>
      </div>
    </section>
  );
}
