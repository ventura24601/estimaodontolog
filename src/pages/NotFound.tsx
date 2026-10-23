import { Seo } from '@/components/layout/Seo';
import { useHeaderTone } from '@/components/layout/Header';
import { SplitTitle } from '@/components/ui/SplitTitle';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  useHeaderTone('light');
  return (
    <section className="container-site flex min-h-[80vh] flex-col justify-center pt-32">
      <Seo title="Página não encontrada | Estima Odontologia" description="A página que você procura não existe." />
      <meta name="robots" content="noindex" />
      <p className="text-eyebrow uppercase text-ink-mute">Erro 404</p>
      <SplitTitle as="h1" animate text="Esta página *não* existe" className="mt-6 text-h1" />
      <div className="mt-10"><Button to="/">Voltar ao início</Button></div>
    </section>
  );
}
