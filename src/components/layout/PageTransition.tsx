import { motion } from 'framer-motion';
import { Logo } from './Logo';
import { EASE } from '@/lib/motion';

let firstRender = true;

/** Cortina areia com o logo entre páginas (0.3s cobrindo + 0.3s revelando). */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const skipEnter = firstRender;
  firstRender = false;
  const curtain = 'pointer-events-none fixed inset-0 z-[90] grid place-items-center bg-sand';
  const logo = <Logo className="w-[200px] text-navy" />;
  return (
    <>
      {children}
      <motion.div
        aria-hidden
        className={curtain}
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        exit={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        {logo}
      </motion.div>
      {!skipEnter && (
        <motion.div
          aria-hidden
          className={curtain}
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.3, ease: EASE, delay: 0.05 }}
        >
          {logo}
        </motion.div>
      )}
    </>
  );
}
