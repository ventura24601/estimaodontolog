// Dados institucionais centralizados. Itens marcados com [PREENCHER] aguardam informação da clínica.

const WHATSAPP_NUMBER = '5553997006047';
const WHATSAPP_DEFAULT_MESSAGE = 'Olá! Gostaria de agendar uma avaliação na Estima Odontologia.';

export const site = {
  name: 'Estima Odontologia',
  url: import.meta.env.VITE_SITE_URL || 'https://estimaodonto.com.br',
  city: 'Pelotas',
  responsible: {
    name: 'Dr. Fernando Julio Estima',
    cro: 'CRO-RS 23.475',
  },
  legal: {
    companyName: '[PREENCHER razão social]',
    cnpj: '[PREENCHER CNPJ]',
  },
  whatsapp: {
    display: '(53) 99700-6047',
    href: whatsappLink(),
  },
  phone: { display: '(53) 3224-6047', href: 'tel:+555332246047' },
  email: 'estimaodonto20@gmail.com',
  social: {
    instagram: 'https://www.instagram.com/dentistafernandoestima/',
    facebook: '', // [PREENCHER URL da nova página do Facebook]
  },
  address: {
    street: 'Av. Dom Joaquim, 1515 · sala 309',
    district: 'CEP 96020-260 · Pelotas/RS',
    mapsHref: 'https://www.google.com/maps/dir/?api=1&destination=Av.+Dom+Joaquim+1515+Pelotas+RS',
    embed: 'https://www.google.com/maps?q=Av.+Dom+Joaquim+1515,+Pelotas+-+RS&output=embed',
  },
  hours: [
    { days: '[PREENCHER dias]', time: '[PREENCHER horário]' },
  ],
} as const;

export function whatsappLink(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { label: 'Início', to: '/' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Tratamentos', to: '/tratamentos', mega: true },
  { label: 'Tecnologia', to: '/tecnologia' },
  { label: 'Contato', to: '/contato' },
] as const;
