// Conteúdo dos tratamentos. Tom acolhedor e claro, sem promessa de resultado ou de prazo (Código de Ética Odontológica).

export type IconKey = 'checkup' | 'general' | 'implant' | 'ortho' | 'aesthetic' | 'endo';

export type Treatment = {
  slug: string;
  title: string;
  /** Título editorial com trecho em itálico entre asteriscos */
  headline: string;
  icon: IconKey;
  summary: string;
  seoDescription: string;
  intro: string[];
  options: { title: string; text: string }[];
  indications: string[];
  steps: { title: string; text: string }[];
  faq: { q: string; a: string }[];
};

export const treatments: Treatment[] = [
  {
    slug: 'check-up-odontologico',
    title: 'Check-up odontológico',
    headline: 'Prevenir é o *primeiro* cuidado',
    icon: 'checkup',
    summary: 'Avaliação completa e preventiva, com imagens que você acompanha em tempo real.',
    seoDescription:
      'Check-up odontológico em Pelotas com exame clínico, câmera intraoral de 60x e raio-x periapical na clínica. Prevenção e consultas regulares.',
    intro: [
      'O check-up é o ponto de partida de qualquer cuidado com a saúde bucal. Em uma consulta sem pressa, avaliamos dentes, gengiva e mordida para entender o seu momento e identificar alterações ainda no início.',
      'Consultas regulares permitem tratamentos mais simples e conservadores, porque pequenas alterações são percebidas antes de se tornarem um problema maior.',
    ],
    options: [
      { title: 'Exame clínico', text: 'Avaliação detalhada de dentes, gengiva, tecidos moles e articulação, com registro do que foi observado.' },
      { title: 'Câmera intraoral 60x', text: 'Imagens ampliadas exibidas em uma tela durante a consulta, para que você veja o que está acontecendo na sua boca.' },
      { title: 'Raio-x periapical na clínica', text: 'Quando necessário, a radiografia é feita no próprio consultório, sem deslocamento para outro local.' },
      { title: 'Orientação de cuidados', text: 'Recomendações individuais de escovação, uso do fio dental e hábitos, de acordo com a sua rotina.' },
    ],
    indications: [
      'Quem está há mais de seis meses sem ir ao dentista',
      'Quem deseja manter a saúde bucal em dia de forma preventiva',
      'Quem sente sensibilidade, sangramento gengival ou desconforto',
      'Quem vai iniciar outro tratamento e precisa de um diagnóstico completo',
    ],
    steps: [
      { title: 'Conversa inicial', text: 'Ouvimos suas queixas, seu histórico de saúde e o que você espera da consulta.' },
      { title: 'Exame e imagens', text: 'Exame clínico com apoio da câmera intraoral e, se indicado, raio-x periapical.' },
      { title: 'Diagnóstico explicado', text: 'Mostramos as imagens e explicamos cada achado em linguagem clara.' },
      { title: 'Plano e orientações', text: 'Definimos juntos as prioridades e a frequência ideal das próximas consultas.' },
    ],
    faq: [
      { q: 'Com que frequência devo fazer o check-up?', a: 'A frequência é definida individualmente na avaliação. Para muitas pessoas o intervalo é de seis meses, mas ele pode variar conforme a sua condição bucal.' },
      { q: 'O raio-x é feito em todas as consultas?', a: 'Não. A radiografia periapical é solicitada apenas quando há indicação clínica, e é realizada na própria clínica.' },
      { q: 'A câmera intraoral causa algum desconforto?', a: 'Não. É um dispositivo pequeno, semelhante a uma caneta, que capta imagens sem contato incômodo.' },
    ],
  },
  {
    slug: 'clinica-geral',
    title: 'Clínica geral',
    headline: 'O cuidado de *todos* os dias',
    icon: 'general',
    summary: 'Limpeza profissional, restaurações e extração de sisos com acompanhamento próximo.',
    seoDescription:
      'Clínica geral odontológica em Pelotas: profilaxia, restaurações e extração de sisos, com orientação de pós-operatório.',
    intro: [
      'A clínica geral reúne os procedimentos que mantêm a boca saudável e funcional ao longo da vida. É onde tratamos cáries, cuidamos da gengiva e resolvemos situações que causam dor ou desconforto.',
    ],
    options: [
      { title: 'Profilaxia', text: 'Limpeza profissional que remove placa bacteriana e tártaro de áreas que a escovação diária não alcança.' },
      { title: 'Restaurações', text: 'Tratamento de cáries e recuperação de dentes desgastados ou fraturados, devolvendo forma e função.' },
      { title: 'Extração de sisos', text: 'Indicada quando o siso não tem espaço para erupcionar, causa dor, inflamação ou prejudica dentes vizinhos. Realizada com anestesia local e acompanhada de orientações para o pós-operatório.' },
    ],
    indications: [
      'Quem percebe acúmulo de tártaro ou sangramento ao escovar',
      'Quem tem cáries, restaurações antigas ou dentes lascados',
      'Quem sente dor ou pressão na região do siso',
      'Quem busca manutenção periódica da saúde bucal',
    ],
    steps: [
      { title: 'Avaliação', text: 'Exame clínico e, se necessário, radiografia para entender a causa da queixa.' },
      { title: 'Planejamento', text: 'Explicamos o procedimento indicado, o que esperar e como se preparar.' },
      { title: 'Procedimento', text: 'Atendimento com anestesia local quando indicado e atenção ao seu conforto.' },
      { title: 'Pós-consulta', text: 'Orientações por escrito e canal aberto para dúvidas nos dias seguintes.' },
    ],
    faq: [
      { q: 'A limpeza profissional desgasta os dentes?', a: 'Não. A profilaxia remove placa e tártaro sem desgastar o esmalte saudável.' },
      { q: 'Todo siso precisa ser extraído?', a: 'Não. A extração é indicada apenas quando há falta de espaço, inflamação recorrente ou risco para os dentes vizinhos, o que é avaliado em consulta.' },
      { q: 'Quais são os cuidados após a extração do siso?', a: 'Repouso nas primeiras horas, compressas frias, alimentação morna e pastosa e uso da medicação prescrita. Você recebe as orientações completas por escrito.' },
    ],
  },
  {
    slug: 'implantes-dentarios',
    title: 'Implantes dentários',
    headline: 'Repor dentes com *naturalidade*',
    icon: 'implant',
    summary: 'Do implante unitário à reabilitação de arcada completa sobre implantes.',
    seoDescription:
      'Implantes dentários em Pelotas: implante unitário, reabilitação parcial e prótese protocolo sobre implantes.',
    intro: [
      'O implante é uma raiz artificial que serve de base para uma prótese fixa. Ele permite repor desde um único dente até uma arcada completa, devolvendo a função de mastigar e a segurança para sorrir.',
      'Cada caso é planejado a partir de exames e da avaliação da saúde óssea e gengival, para definir a solução adequada para você.',
    ],
    options: [
      { title: 'Implante unitário', text: 'Repõe um único dente perdido, sem a necessidade de desgastar os dentes vizinhos.' },
      { title: 'Reabilitação parcial', text: 'Quando faltam alguns dentes em sequência, poucos implantes podem sustentar uma prótese fixa. Por exemplo, dois implantes sustentando uma prótese de três dentes.' },
      { title: 'Prótese protocolo', text: 'Reabilitação de uma arcada completa com uma prótese fixa parafusada sobre implantes.' },
    ],
    indications: [
      'Quem perdeu um ou mais dentes',
      'Quem usa prótese removível e busca uma alternativa fixa',
      'Quem tem dentes condenados que precisam ser substituídos',
      'Pessoas com condição de saúde geral e óssea compatível, avaliada em consulta',
    ],
    steps: [
      { title: 'Avaliação e exames', text: 'Exame clínico e exames de imagem para analisar a quantidade e a qualidade óssea.' },
      { title: 'Planejamento', text: 'Definimos o número de implantes e o tipo de prótese mais indicado para o seu caso.' },
      { title: 'Instalação do implante', text: 'Procedimento cirúrgico com anestesia local, seguido do período de integração ao osso.' },
      { title: 'Prótese definitiva', text: 'Confecção e instalação da prótese, com ajustes e consultas de manutenção.' },
    ],
    faq: [
      { q: 'Qualquer pessoa pode colocar implante?', a: 'A indicação depende da saúde geral, da quantidade de osso e de outros fatores avaliados em consulta. Em alguns casos são necessários procedimentos complementares.' },
      { q: 'O procedimento dói?', a: 'A instalação é feita com anestesia local. No pós-operatório pode haver algum desconforto, controlado com a medicação e os cuidados orientados.' },
      { q: 'Quanto tempo leva o tratamento completo?', a: 'O tempo varia de acordo com cada caso, principalmente pela integração do implante ao osso. O cronograma é apresentado no planejamento.' },
    ],
  },
  {
    slug: 'aparelhos-ortodonticos',
    title: 'Aparelhos ortodônticos',
    headline: 'Alinhar com *conforto* e discrição',
    icon: 'ortho',
    summary: 'Aparelho fixo autoligado ou alinhadores transparentes, conforme a sua rotina.',
    seoDescription:
      'Ortodontia em Pelotas: aparelho fixo autoligado e alinhadores transparentes. Avaliação para definir a opção adequada ao seu caso.',
    intro: [
      'A ortodontia corrige a posição dos dentes e a relação entre as arcadas, com benefícios para a mastigação, a higiene e a estética do sorriso.',
      'A escolha do aparelho considera o seu diagnóstico, a sua rotina e as suas preferências.',
    ],
    options: [
      { title: 'Aparelho fixo autoligado', text: 'Opção fixa moderna, em que os braquetes têm um sistema próprio de travamento do fio, dispensando as borrachinhas que prendem o arco.' },
      { title: 'Alinhadores transparentes', text: 'O aparelho "invisível": placas transparentes removíveis, trocadas em sequência. Discretas e confortáveis, permitem retirar para comer e escovar.' },
    ],
    indications: [
      'Dentes apinhados, separados ou girados',
      'Mordida cruzada, aberta ou profunda',
      'Adultos e adolescentes que desejam alinhar o sorriso',
      'Preparação para tratamentos restauradores ou com implantes',
    ],
    steps: [
      { title: 'Documentação', text: 'Fotos, radiografias e registro da mordida para um diagnóstico preciso.' },
      { title: 'Plano de tratamento', text: 'Apresentamos as opções de aparelho indicadas e respondemos às suas dúvidas.' },
      { title: 'Instalação', text: 'Colocação do aparelho fixo ou entrega dos primeiros alinhadores, com orientações de uso.' },
      { title: 'Acompanhamento', text: 'Consultas periódicas de ajuste e, ao final, contenção para manter o alinhamento.' },
    ],
    faq: [
      { q: 'Existe idade limite para usar aparelho?', a: 'Não há idade limite. Adultos com dentes e gengiva saudáveis também podem fazer tratamento ortodôntico.' },
      { q: 'Os alinhadores servem para qualquer caso?', a: 'Atendem a muitas situações, mas não a todas. A indicação é definida na avaliação ortodôntica.' },
      { q: 'Preciso usar contenção depois?', a: 'Sim. A contenção ajuda a manter os dentes na nova posição e faz parte do tratamento.' },
    ],
  },
  {
    slug: 'estetica-dental',
    title: 'Estética dental',
    headline: 'Harmonia em *cada* detalhe',
    icon: 'aesthetic',
    summary: 'Facetas, clareamento e plástica gengival, planejados para o seu sorriso.',
    seoDescription:
      'Estética dental em Pelotas: facetas em cerâmica e em resina, clareamento dental e plástica gengival.',
    intro: [
      'A estética dental cuida da cor, da forma e da proporção dos dentes e da gengiva. O planejamento parte das características do seu rosto e do que você deseja, sempre preservando a saúde dos dentes.',
    ],
    options: [
      { title: 'Facetas em cerâmica', text: 'Lâminas finas de cerâmica confeccionadas em laboratório, com boa estabilidade de cor e resistência.' },
      { title: 'Facetas em resina', text: 'Aplicadas diretamente no consultório, permitem ajustes de forma e cor de maneira conservadora.' },
      { title: 'Clareamento dental', text: 'Técnicas de consultório ou caseiras supervisionadas, indicadas após avaliação da saúde dos dentes e da gengiva.' },
      { title: 'Plástica gengival', text: 'Ajuste do contorno da gengiva para equilibrar a proporção entre dentes e gengiva no sorriso.' },
    ],
    indications: [
      'Dentes escurecidos ou com manchas',
      'Dentes com formato, tamanho ou proporção que incomodam',
      'Pequenos espaços entre os dentes',
      'Sorriso com exposição gengival acentuada',
    ],
    steps: [
      { title: 'Avaliação estética', text: 'Análise do sorriso, fotos e conversa sobre as suas expectativas.' },
      { title: 'Planejamento', text: 'Definição da técnica mais indicada e, quando aplicável, simulação do resultado planejado.' },
      { title: 'Execução', text: 'Procedimentos realizados em etapas, com atenção à saúde dos dentes e da gengiva.' },
      { title: 'Manutenção', text: 'Orientações de cuidado e consultas periódicas para preservar o tratamento.' },
    ],
    faq: [
      { q: 'O clareamento deixa os dentes sensíveis?', a: 'Pode haver sensibilidade temporária. O protocolo é ajustado para cada pessoa e acompanhado durante todo o processo.' },
      { q: 'Qual a diferença entre faceta de resina e de cerâmica?', a: 'A resina é aplicada diretamente no consultório; a cerâmica é feita em laboratório. Cada uma tem indicações próprias, discutidas na avaliação.' },
      { q: 'Facetas exigem desgaste dos dentes?', a: 'Depende do caso e da técnica. Sempre que possível, optamos por abordagens conservadoras.' },
    ],
  },
  {
    slug: 'tratamento-de-canal',
    title: 'Tratamento de canal',
    headline: 'Canal sem *medo*, com precisão',
    icon: 'endo',
    summary: 'Endodontia com localizador apical e limas rotatórias, mais precisão e conforto.',
    seoDescription:
      'Tratamento de canal em Pelotas com localizador apical e limas rotatórias. Endodontia moderna e mais confortável.',
    intro: [
      'O tratamento de canal, ou endodontia, trata a parte interna do dente quando a polpa está inflamada ou infectada. Ele permite conservar o dente natural e aliviar a dor.',
      'Muita gente ainda associa o canal a sofrimento. Hoje o procedimento é feito com anestesia local e com recursos que tornam o atendimento mais previsível e confortável.',
    ],
    options: [
      { title: 'Localizador apical', text: 'Aparelho eletrônico que mede o comprimento do canal com precisão, ajudando a tratar o dente em toda a sua extensão.' },
      { title: 'Limas rotatórias', text: 'Instrumentos acionados por motor que limpam e modelam o canal de forma mais uniforme e em menos tempo de cadeira.' },
    ],
    indications: [
      'Dor intensa ou espontânea em um dente',
      'Sensibilidade prolongada ao quente ou ao frio',
      'Dente escurecido após trauma',
      'Inchaço ou abscesso na gengiva',
    ],
    steps: [
      { title: 'Diagnóstico', text: 'Exame clínico e raio-x periapical na clínica para avaliar o dente e os canais.' },
      { title: 'Anestesia e isolamento', text: 'Anestesia local e isolamento do dente para um campo limpo e seguro.' },
      { title: 'Limpeza e modelagem', text: 'Uso de localizador apical e limas rotatórias para tratar o interior do canal.' },
      { title: 'Obturação e restauração', text: 'Selamento dos canais e orientação sobre a restauração definitiva do dente.' },
    ],
    faq: [
      { q: 'Tratamento de canal dói?', a: 'O procedimento é feito com anestesia local. Depois, pode haver uma sensibilidade leve por alguns dias, controlada com as orientações recebidas.' },
      { q: 'Quantas sessões são necessárias?', a: 'Depende da complexidade do dente e da presença de infecção. O número de sessões é informado após o diagnóstico.' },
      { q: 'O dente fica fraco depois do canal?', a: 'O dente tratado precisa de uma restauração adequada para recuperar a resistência. Indicamos a opção adequada para cada caso.' },
    ],
  },
];

export const getTreatment = (slug: string) => treatments.find((t) => t.slug === slug);
export const nextTreatment = (slug: string) => {
  const i = treatments.findIndex((t) => t.slug === slug);
  return treatments[(i + 1) % treatments.length];
};
