import { createContext, useContext } from 'react';

/** done: o preloader estático terminou — animações que dependem da abertura começam depois disso. */
export const IntroContext = createContext({ done: false });
export const useIntro = () => useContext(IntroContext);

/** true no primeiro carregamento da home, quando o hero estático do index.html já faz a revelação. */
export const hasStaticHero = () => typeof document !== 'undefined' && !!document.getElementById('boot-hero');
