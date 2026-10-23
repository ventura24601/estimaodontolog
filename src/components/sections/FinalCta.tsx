import { Eyebrow } from '@/components/ui/Eyebrow';
import { SplitTitle } from '@/components/ui/SplitTitle';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { PhoneIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { site } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';

export function FinalCta({ title = 'Agende sua *avaliação*' }: { title?: string }) {
  return (
    <section className="dark relative overflow-hidden bg-ink text-base" aria-label="Agendamento">
      <svg aria-hidden viewBox="0 0 800 800" className="pointer-events-none absolute -left-[20vw] -top-[30vw] w-[80vw] text-accent opacity-40">
        <circle cx="400" cy="400" r="380" fill="none" stroke="currentColor" strokeWidth=".8" />
      </svg>
      <div className="container-site relative py-28 md:py-44">
        <Eyebrow light>Próximo passo</Eyebrow>
        <SplitTitle text={title} as="h2" className="mt-8 max-w-[12ch] text-h1" />
        <Reveal delay={0.2} className="mt-14 grid gap-10 border-t border-base/15 pt-10 md:grid-cols-2">
          <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { location: 'final_cta' })} className="group block">
            <span className="flex items-center gap-3 text-eyebrow uppercase text-base/60"><WhatsAppIcon width={16} height={16} /> WhatsApp</span>
            <span className="mt-4 block font-serif text-[clamp(2.25rem,5vw,4.25rem)] leading-none transition-colors duration-500 group-hover:text-accent">{site.whatsapp.display}</span>
          </a>
          <a href={site.phone.href} onClick={() => trackEvent('phone_click', { location: 'final_cta' })} className="group block">
            <span className="flex items-center gap-3 text-eyebrow uppercase text-base/60"><PhoneIcon width={16} height={16} /> Telefone fixo</span>
            <span className="mt-4 block font-serif text-[clamp(2.25rem,5vw,4.25rem)] leading-none transition-colors duration-500 group-hover:text-accent">{site.phone.display}</span>
          </a>
        </Reveal>
        <Reveal delay={0.3} className="mt-14 flex flex-wrap gap-3">
          <Button href={site.whatsapp.href} icon={<WhatsAppIcon />}>Agendar pelo WhatsApp</Button>
          <Button to="/contato" variant="ghost-light">Enviar mensagem</Button>
        </Reveal>
      </div>
    </section>
  );
}
