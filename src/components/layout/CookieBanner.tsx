import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getConsent, loadTrackers, setConsent } from '@/lib/analytics';
import { EASE } from '@/lib/motion';

export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const c = getConsent();
    if (c === 'all') loadTrackers();
    if (!c) {
      const t = setTimeout(() => setOpen(true), 2500);
      return () => clearTimeout(t);
    }
  }, []);

  const choose = (v: 'all' | 'essential') => {
    setConsent(v);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="region"
          aria-label="Aviso de cookies"
          className="fixed bottom-5 left-5 right-24 z-40 max-w-[380px] rounded-2xl border border-stone/70 bg-base/95 p-5 text-sm text-ink-soft shadow-[0_20px_60px_-30px_rgba(28,28,26,.5)] backdrop-blur-xl md:bottom-8 md:left-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p>
            Usamos cookies essenciais e, com a sua permissão, cookies de medição para melhorar o site.{' '}
            <Link to="/politica-de-privacidade" className="underline underline-offset-4">Saiba mais</Link>.
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => choose('essential')} className="h-10 flex-1 rounded-full border border-ink/20 px-4 text-ink transition-colors hover:border-ink">
              Só essenciais
            </button>
            <button type="button" onClick={() => choose('all')} className="h-10 flex-1 rounded-full bg-ink px-4 text-base transition-colors hover:bg-accent hover:text-ink">
              Aceitar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
