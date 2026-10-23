import { Seo } from '@/components/layout/Seo';
import { useHeaderTone } from '@/components/layout/Header';
import { site } from '@/lib/site';

export default function Privacy() {
  useHeaderTone('light');
  return (
    <article className="container-site max-w-3xl pb-32 pt-40 md:pt-56">
      <Seo title="Política de Privacidade | Estima Odontologia" description="Como a Estima Odontologia trata os seus dados pessoais, conforme a LGPD." />
      <p className="text-eyebrow uppercase text-ink-mute">Documento</p>
      <h1 className="mt-6 font-serif text-h1">Política de Privacidade</h1>
      <div className="mt-12 space-y-6 text-ink-soft [&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-ink">
        <p>Esta política explica como a {site.name} ({site.legal.companyName}, CNPJ {site.legal.cnpj}) coleta e utiliza dados pessoais neste site, em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018).</p>
        <h2>Dados coletados</h2>
        <p>Pelo formulário de contato: nome, WhatsApp, e-mail (opcional), tratamento de interesse e mensagem. Esses dados são usados exclusivamente para retornar o seu contato e agendar atendimentos.</p>
        <h2>Cookies</h2>
        <p>Usamos cookies essenciais ao funcionamento do site. Cookies de medição (Google Analytics e Meta Pixel) são ativados somente com o seu consentimento, pelo aviso exibido na primeira visita.</p>
        <h2>Armazenamento e compartilhamento</h2>
        <p>Os dados ficam armazenados em provedores de infraestrutura com medidas de segurança adequadas e não são vendidos nem compartilhados para fins de marketing de terceiros.</p>
        <h2>Seus direitos</h2>
        <p>Você pode solicitar acesso, correção ou exclusão dos seus dados pelo e-mail <a className="underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>.</p>
        <p className="text-sm text-ink-mute">[PREENCHER: revisar com assessoria jurídica e indicar o encarregado (DPO).]</p>
      </div>
    </article>
  );
}
