import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import { cancelFrame, frame, useReducedMotion } from 'framer-motion';

const LenisContext = createContext<Lenis | null>(null);

/** Smooth scroll inercial sincronizado ao loop de frames do Framer Motion. */
export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;
    const instance = new Lenis({ lerp: 0.08, smoothWheel: true, anchors: true });
    const update = ({ timestamp }: { timestamp: number }) => instance.raf(timestamp);
    frame.update(update, true);
    setLenis(instance);
    return () => {
      cancelFrame(update);
      instance.destroy();
      setLenis(null);
    };
  }, [reduced]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export const useLenis = () => useContext(LenisContext);
