import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { site } from '@/lib/site';
import { WhatsAppIcon } from '@/components/ui/Icons';
import { trackEvent } from '@/lib/analytics';
import { EASE } from '@/lib/motion';

/** Botão flutuante que entra depois do hero, com pulso sutil a cada 8s. */
export function WhatsAppFloat() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > window.innerHeight * 0.8));

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={site.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { location: 'float' })}
          aria-label="Conversar pelo WhatsApp"
          className="wa-pulse fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-ink text-base shadow-[0_12px_40px_-12px_rgba(28,28,26,.6)] transition-colors duration-500 hover:bg-accent hover:text-ink md:bottom-8 md:right-8 md:h-16 md:w-16"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <WhatsAppIcon width={26} height={26} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
