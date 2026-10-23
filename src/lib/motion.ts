import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1] as const;
export const DURATION = 1;

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');

/**
 * Intensidade do parallax: 0 com prefers-reduced-motion, 0.5 no mobile, 1 no desktop.
 */
export function useParallaxFactor() {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  if (reduced) return 0;
  return mobile ? 0.5 : 1;
}
