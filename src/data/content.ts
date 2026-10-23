import { site } from '@/lib/site';

/** Números da clínica. Use apenas dados reais; itens com `value: null` não aparecem. */
export const stats: { value: number | null; suffix?: string; label: string }[] = [
  { value: 60, suffix: 'x', label: 'de aumento na câmera intraoral' },
  { value: 6, label: 'áreas de tratamento em um só lugar' },
  { value: null, label: 'anos de clínica' }, // [PREENCHER] ex.: { value: 10, suffix: '+', ... }
  { value: null, label: 'pacientes atendidos' }, // [PREENCHER] somente se houver registro real
];

export type TechKey = 'camera' | 'xray' | 'endo' | 'sterile';

export const technology: { key: TechKey; eyebrow: string; title: string; text: string; image?: string }[] = [
  {
    key: 'camera',
    eyebrow: 'Diagnóstico visual',
    title: 'Câmera intraoral com *60x* de aumento',
    text: 'Imagens ampliadas aparecem em tempo real em uma tela durante a consulta. Você vê o que nós vemos e entende cada recomendação antes de decidir.',
  },
  {
    key: 'xray',
    eyebrow: 'Imagem no consultório',
    title: 'Raio-x periapical *na clínica*',
    text: 'Quando a radiografia é necessária, ela é feita no próprio consultório. O diagnóstico acontece na mesma consulta, sem deslocamento para outro endereço.',
  },
  {
    key: 'endo',
    eyebrow: 'Endodontia',
    title: 'Localizador apical e *limas rotatórias*',
    text: 'No tratamento de canal, o localizador mede o comprimento do canal com exatidão e as limas rotatórias trabalham de forma uniforme, com mais precisão e conforto.',
  },
  {
    key: 'sterile',
    eyebrow: 'Biossegurança',
    title: 'Esterilização *rigorosa*',
    text: 'Instrumentais processados em protocolo de limpeza, embalagem e esterilização a cada atendimento. [PREENCHER detalhes reais: autoclave, embalagens seladas, rastreabilidade].',
  },
];

export const differentials: { icon: TechKey | 'care'; title: string; text: string }[] = [
  { icon: 'camera', title: 'Câmera intraoral com 60x de aumento', text: 'Você acompanha as imagens da sua boca durante a consulta.' },
  { icon: 'xray', title: 'Raio-x periapical na clínica', text: 'Imagens feitas no consultório, sem sair para outro local.' },
  { icon: 'sterile', title: 'Esterilização e biossegurança rigorosas', text: '[PREENCHER detalhes reais do protocolo de biossegurança].' },
  { icon: 'endo', title: 'Canal com localizador apical e limas rotatórias', text: 'Recursos que trazem precisão ao tratamento endodôntico.' },
  { icon: 'care', title: 'Atendimento humanizado e personalizado', text: 'Tempo para ouvir, explicar e decidir com você cada etapa.' },
];

/**
 * Casos clínicos (Res. CFO 196/2019).
 * Publique SOMENTE casos realizados pelo profissional da clínica, com TCLE assinado (tcleOk: true),
 * apenas fotos de diagnóstico (antes) e conclusão (depois), sem filtros ou edição que alterem o resultado.
 * Coloque as fotos em public/img/casos/ e informe os caminhos abaixo.
 */
export type ClinicalCase = {
  id: string;
  treatment: string;
  caption: string;
  professional: string;
  cro: string;
  before?: string;
  after?: string;
  /** Controle interno: TCLE assinado pelo paciente. Casos sem TCLE nunca são exibidos. */
  tcleOk: boolean;
  /** Ilustração provisória até haver fotos aprovadas */
  placeholder?: boolean;
};

export const cases: ClinicalCase[] = [
  {
    id: 'exemplo-estetica',
    treatment: 'Estética dental',
    caption: 'Registro de diagnóstico e de conclusão do tratamento.',
    professional: site.responsible.name,
    cro: site.responsible.cro,
    tcleOk: true,
    placeholder: true,
  },
];

/** Depoimentos: somente reais (ex.: avaliações do Google), com autorização. Lista vazia oculta a seção. */
export const testimonials: { quote: string; author: string; source: string }[] = [];

export const manifesto =
  'Acreditamos que tecnologia só faz sentido quando aproxima. Cada consulta começa com escuta, segue com um diagnóstico que você enxerga e termina com você entendendo cada passo do próprio cuidado.';
