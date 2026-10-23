import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { nav, site } from '@/lib/site';
import { treatments } from '@/data/treatments';
import { FacebookIcon, InstagramIcon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="dark relative overflow-hidden bg-ink text-base">
      <div className="mx-auto max-w-site px-5 pb-10 pt-24 md:px-10 md:pt-32">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-serif text-h3 leading-tight">
              Precisão que <em className="italic text-accent">acolhe</em>.
            </p>
            <div className="mt-8 flex gap-3">
              <SocialLink href={site.social.instagram} label="Instagram"><InstagramIcon /></SocialLink>
              {site.social.facebook && <SocialLink href={site.social.facebook} label="Facebook"><FacebookIcon /></SocialLink>}
            </div>
          </div>

          <FooterCol title="Navegação" className="md:col-span-2">
            {nav.map((n) => (
              <li key={n.to}><Link className="footer-link" to={n.to}>{n.label}</Link></li>
            ))}
            <li><Link className="footer-link" to="/politica-de-privacidade">Privacidade</Link></li>
          </FooterCol>

          <FooterCol title="Tratamentos" className="md:col-span-3">
            {treatments.map((t) => (
              <li key={t.slug}><Link className="footer-link" to={`/tratamentos/${t.slug}`}>{t.title}</Link></li>
            ))}
          </FooterCol>

          <FooterCol title="Contato" className="md:col-span-3">
            <li><a className="footer-link" href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">WhatsApp {site.whatsapp.display}</a></li>
            <li><a className="footer-link" href={site.phone.href}>Telefone {site.phone.display}</a></li>
            <li><a className="footer-link break-all" href={`mailto:${site.email}`}>{site.email}</a></li>
            <li className="pt-3 text-base/60">{site.address.street}<br />{site.address.district}</li>
            {site.hours.map((h) => (
              <li key={h.days} className="text-base/60">{h.days} · {h.time}</li>
            ))}
          </FooterCol>
        </div>

        <Reveal className="mt-24 md:mt-32" y={60}>
          <Logo className="logo-outline w-full text-base" />
        </Reveal>

        <div className="mt-14 grid gap-4 border-t border-base/15 pt-8 text-[13px] leading-relaxed text-base/55 md:grid-cols-2">
          <div>
            <p>Responsável Técnico: {site.responsible.name} — {site.responsible.cro}</p>
            <p>{site.legal.companyName} · CNPJ {site.legal.cnpj}</p>
          </div>
          <div className="md:text-right">
            <p>© {year} {site.name}. Todos os direitos reservados.</p>
            <p><Link to="/politica-de-privacidade" className="underline-offset-4 hover:underline">Política de Privacidade</Link></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="mb-5 text-eyebrow uppercase text-base/50">{title}</p>
      <ul className="space-y-2 text-[15px]">{children}</ul>
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-12 w-12 place-items-center rounded-full border border-base/25 transition-colors duration-500 hover:border-accent hover:text-accent">
      {children}
    </a>
  );
}
