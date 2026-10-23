import { Seo } from '@/components/layout/Seo';
import { useHeaderTone } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { Manifesto } from '@/components/sections/Manifesto';
import { Numbers } from '@/components/sections/Numbers';
import { AboutTeaser } from '@/components/sections/AboutTeaser';
import { TreatmentsScroller } from '@/components/sections/TreatmentsScroller';
import { TechStory } from '@/components/sections/TechStory';
import { Differentials } from '@/components/sections/Differentials';
import { Cases } from '@/components/sections/Cases';
import { Testimonials } from '@/components/sections/Testimonials';
import { FinalCta } from '@/components/sections/FinalCta';
import { Location } from '@/components/sections/Location';

export default function Home() {
  useHeaderTone('dark');
  return (
    <>
      <Seo
        title="Dentista em Pelotas | Estima Odontologia"
        description="Clínica odontológica em Pelotas/RS: check-up, clínica geral, implantes, aparelhos ortodônticos, estética dental e tratamento de canal, com diagnóstico que você enxerga."
      />
      <Hero />
      <Manifesto />
      <Numbers />
      <AboutTeaser />
      <TreatmentsScroller />
      <TechStory />
      <Differentials />
      <Cases />
      <Testimonials />
      <FinalCta />
      <Location />
    </>
  );
}
