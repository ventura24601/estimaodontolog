import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { Logo } from './Logo';
import { nav, site } from '@/lib/site';
import { treatments } from '@/data/treatments';
import { icons, WhatsAppIcon } from '@/components/ui/Icons';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';

/** Páginas com hero escuro pedem header claro enquanto está no topo. */
export const HeaderToneContext = createContext<(tone: 'light' | 'dark') => void>(() => {});
export const useHeaderTone = (tone: 'light' | 'dark') => {
  const set = useContext(HeaderToneContext);
  useEffect(() => set(tone), [set, tone]);
};

export function Header({ tone }: { tone: 'light' | 'dark' }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const last = useRef(0);
  const location = useLocation();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const diff = y - last.current;
    setScrolled(y > 40);
    if (Math.abs(diff) > 6) setHidden(diff > 0 && y > 240 && !mega);
    last.current = y;
  });

  useEffect(() => {
    setMega(false);
    setMobileOpen(false);
  }, [location.pathname]);

  const onDark = tone === 'dark' && !scrolled && !mega;

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.7, ease: EASE }}
      onMouseLeave={() => setMega(false)}
    >
      <div
        className={cn(
          'absolute inset-0 -z-10 transition-[background-color,backdrop-filter,border-color] duration-700 ease-expo',
          scrolled || mega ? 'border-b border-stone/60 bg-base/75 backdrop-blur-xl' : 'border-b border-transparent',
        )}
      />
      <div className={cn('mx-auto flex h-20 max-w-site items-center justify-between px-5 md:px-10 lg:h-24', onDark ? 'text-base' : 'text-navy')}>
        <Link to="/" aria-label="Estima Odontologia, página inicial" className="w-[150px] lg:w-[178px]">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className={cn('flex items-center gap-9 text-[15px]', onDark ? 'text-base/90' : 'text-ink')}>
            {nav.map((item) => (
              <li key={item.to} className="relative">
                {'mega' in item ? (
                  <div className="flex items-center gap-1" onMouseEnter={() => setMega(true)}>
                    <NavLink to={item.to} className="nav-link">{item.label}</NavLink>
                    <button
                      type="button"
                      aria-expanded={mega}
                      aria-controls="mega-menu"
                      aria-label="Abrir lista de tratamentos"
                      onClick={() => setMega((v) => !v)}
                      className="grid h-6 w-6 place-items-center"
                    >
                      <svg width="10" height="6" viewBox="0 0 10 6" className={cn('transition-transform duration-500', mega && 'rotate-180')} aria-hidden>
                        <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <NavLink to={item.to} end={item.to === '/'} className="nav-link" onMouseEnter={() => setMega(false)}>
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button href={site.whatsapp.href} className="hidden !h-12 !px-6 md:inline-flex">
            Agendar avaliação
          </Button>
          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger className={cn('grid h-12 w-12 place-items-center rounded-full border lg:hidden', onDark ? 'border-base/30' : 'border-ink/20')} aria-label="Abrir menu">
              <span className="flex w-5 flex-col gap-[6px]" aria-hidden>
                <span className="h-px w-full bg-current" />
                <span className="h-px w-3/5 bg-current" />
              </span>
            </Dialog.Trigger>
            <MobileMenu onClose={() => setMobileOpen(false)} />
          </Dialog.Root>
        </div>
      </div>

      <AnimatePresence>
        {mega && (
          <motion.div
            id="mega-menu"
            className="absolute inset-x-0 top-full hidden border-b border-stone/60 bg-base/95 backdrop-blur-xl lg:block"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <ul className="mx-auto grid max-w-site grid-cols-3 gap-x-10 gap-y-2 px-10 py-10">
              {treatments.map((t, i) => {
                const Icon = icons[t.icon];
                return (
                  <motion.li key={t.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i, duration: 0.6, ease: EASE }}>
                    <Link to={`/tratamentos/${t.slug}`} className="group flex items-center gap-5 rounded-2xl p-3 transition-colors duration-500 hover:bg-sand/70">
                      <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-[radial-gradient(120%_90%_at_20%_10%,#F3EDE4_0%,#E9E1D6_50%,#D9CFC1_100%)] text-ink/70 transition-transform duration-700 ease-expo group-hover:scale-105">
                        <Icon width={28} height={28} strokeWidth={0.9} />
                      </span>
                      <span>
                        <span className="block font-serif text-2xl leading-tight text-ink">{t.title}</span>
                        <span className="mt-1 block text-sm text-ink-mute">{t.summary.split(',')[0]}</span>
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/40 data-[state=open]:animate-[fade_.4s_ease]" />
      <Dialog.Content className="fixed inset-0 z-[61] flex flex-col overflow-y-auto bg-base px-6 pb-10 pt-6 data-[state=open]:animate-[slideDown_.6s_cubic-bezier(.22,1,.36,1)]">
        <div className="flex items-center justify-between">
          <Dialog.Title className="w-[150px] text-navy"><Logo /></Dialog.Title>
          <Dialog.Close className="grid h-12 w-12 place-items-center rounded-full border border-ink/20" aria-label="Fechar menu">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden><path d="M2 2l12 12M14 2 2 14" stroke="currentColor" strokeWidth="1.2" /></svg>
          </Dialog.Close>
        </div>
        <Dialog.Description className="sr-only">Navegação principal do site</Dialog.Description>
        <nav aria-label="Menu móvel" className="mt-10">
          <ul className="divide-y divide-stone/70 border-y border-stone/70">
            {nav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} onClick={onClose} className="block py-4 font-serif text-4xl text-ink">{item.label}</Link>
                {'mega' in item && (
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 pb-5">
                    {treatments.map((t) => (
                      <li key={t.slug}>
                        <Link to={`/tratamentos/${t.slug}`} onClick={onClose} className="text-[15px] text-ink-soft">{t.title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-10">
          <Button href={site.whatsapp.href} icon={<WhatsAppIcon />} className="w-full justify-center">Agendar avaliação</Button>
          <a href={site.phone.href} className="mt-4 block text-center text-ink-soft">{site.phone.display}</a>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
