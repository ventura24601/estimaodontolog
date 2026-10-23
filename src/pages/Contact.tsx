import { useSearchParams } from 'react-router-dom';
import { Seo } from '@/components/layout/Seo';
import { useHeaderTone } from '@/components/layout/Header';
import { ContactForm } from '@/components/form/ContactForm';
import { Location } from '@/components/sections/Location';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SplitTitle } from '@/components/ui/SplitTitle';
import { Reveal } from '@/components/ui/Reveal';
import { FacebookIcon, InstagramIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/Icons';
import { site } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';

export default function Contact() {
  useHeaderTone('light');
  const [params] = useSearchParams();

  const channels = [
    { label: 'WhatsApp', value: site.whatsapp.display, href: site.whatsapp.href, icon: <WhatsAppIcon width={18} height={18} />, external: true, onClick: () => trackEvent('whatsapp_click', { location: 'contact' }) },
    { label: 'Telefone fixo', value: site.phone.display, href: site.phone.href, icon: <PhoneIcon width={18} height={18} />, onClick: () => trackEvent('phone_click', { location: 'contact' }) },
    { label: 'E-mail', value: site.email, href: `mailto:${site.email}` },
    { label: 'Instagram', value: '@dentistafernandoestima', href: site.social.instagram, icon: <InstagramIcon width={18} height={18} />, external: true },
    ...(site.social.facebook ? [{ label: 'Facebook', value: 'Estima Odontologia', href: site.social.facebook, icon: <FacebookIcon width={18} height={18} />, external: true }] : []),
  ];

  return (
    <>
      <Seo title={`Contato | Dentista em ${site.city} | Estima Odontologia`} description="Agende sua avaliação na Estima Odontologia pelo WhatsApp (53) 99700-6047, telefone (53) 3224-6047 ou formulário." />
      <section className="container-site pb-24 pt-40 md:pb-36 md:pt-56">
        <Eyebrow>Contato</Eyebrow>
        <SplitTitle as="h1" animate text={'Vamos *conversar*'} className="mt-8 text-display" />

        <div className="mt-20 grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <ul className="divide-y divide-stone border-y border-stone">
              {channels.map((c) => (
                <li key={c.label}>
                  <a href={c.href} onClick={c.onClick} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex items-center justify-between gap-4 py-6">
                    <span>
                      <span className="block text-eyebrow uppercase text-ink-mute">{c.label}</span>
                      <span className="mt-2 block break-all font-serif text-2xl transition-colors duration-500 group-hover:text-accent-deep">{c.value}</span>
                    </span>
                    {c.icon && <span className="text-ink-mute transition-colors group-hover:text-accent-deep">{c.icon}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-7 md:col-start-6">
            <h2 className="font-serif text-h3">Envie uma mensagem</h2>
            <p className="mt-3 text-ink-mute">Responderemos para combinar dia e horário.</p>
            <div className="mt-8">
              <ContactForm defaultTreatment={params.get('tratamento') ?? ''} />
            </div>
          </Reveal>
        </div>
      </section>
      <Location />
    </>
  );
}
