import { Suspense, useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { LenisProvider, useLenis } from '@/lib/lenis';
import { IntroContext } from '@/lib/intro';
import { trackPageView } from '@/lib/analytics';
import { Header, HeaderToneContext } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { Cursor } from '@/components/layout/Cursor';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { CookieBanner } from '@/components/layout/CookieBanner';
import Home from '@/pages/Home';

import About from '@/pages/About';
import Treatments from '@/pages/Treatments';
import TreatmentPage from '@/pages/TreatmentPage';
import Technology from '@/pages/Technology';
import Contact from '@/pages/Contact';
import Privacy from '@/pages/Privacy';
import NotFound from '@/pages/NotFound';

export default function App() {
  const [intro, setIntro] = useState({ done: false });

  // Preloader e revelação do hero são estáticos (index.html), rodando em paralelo ao download do JS.
  // Aqui só removemos as camadas quando terminam: a cortina aos 1.2s e o hero estático quando o React
  // já está por baixo no estado final (fim da animação CSS ou primeira rolagem).
  useEffect(() => {
    const since = (ms: number) => Math.max(0, ms - performance.now());
    const curtain = setTimeout(() => {
      const el = document.getElementById('boot');
      // Fora da home a cortina espera o React; ao montar, sobe com a mesma animação
      if (el?.classList.contains('np')) {
        el.style.animation = 'bootLift .45s cubic-bezier(.22,1,.36,1) forwards';
        setTimeout(() => el.remove(), 450);
      } else el?.remove();
      setIntro({ done: true });
    }, since(1200));
    const removeHero = () => {
      const el = document.getElementById('boot-hero');
      if (!el) return;
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 400);
    };
    const heroTimer = setTimeout(removeHero, since(3000));
    window.addEventListener('scroll', removeHero, { once: true, passive: true });
    return () => {
      clearTimeout(curtain);
      clearTimeout(heroTimer);
      window.removeEventListener('scroll', removeHero);
    };
  }, []);

  const [tone, setTone] = useState<'light' | 'dark'>('dark');
  const setHeaderTone = useCallback((t: 'light' | 'dark') => setTone(t), []);

  return (
    // reducedMotion="user": com prefers-reduced-motion, transforms são desativados e só os fades permanecem
    <MotionConfig reducedMotion="user">
      <LenisProvider>
        <IntroContext.Provider value={intro}>
          <HeaderToneContext.Provider value={setHeaderTone}>
            <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-base">
              Pular para o conteúdo
            </a>
            <Header tone={tone} />
            <AnimatedRoutes />
            <WhatsAppFloat />
            <CookieBanner />
            <Cursor />
            <div className="grain" aria-hidden />
          </HeaderToneContext.Provider>
        </IntroContext.Provider>
      </LenisProvider>
    </MotionConfig>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  const onExitComplete = () => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
      <PageTransition key={location.pathname}>
        <Suspense fallback={<div className="min-h-screen" />}>
          <main id="conteudo">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/tratamentos" element={<Treatments />} />
              <Route path="/tratamentos/:slug" element={<TreatmentPage />} />
              <Route path="/tecnologia" element={<Technology />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/politica-de-privacidade" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </Suspense>
      </PageTransition>
    </AnimatePresence>
  );
}
