import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { treatments } from '@/data/treatments';
import { submitLead } from '@/lib/supabase';
import { trackEvent } from '@/lib/analytics';
import { site, whatsappLink } from '@/lib/site';
import { Button } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';
import { Link } from 'react-router-dom';

type Status = 'idle' | 'sending' | 'success' | 'error';

const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

export function ContactForm({ defaultTreatment = '' }: { defaultTreatment?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get('name') ?? '').trim(),
      whatsapp: String(fd.get('whatsapp') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      treatment: String(fd.get('treatment') ?? ''),
      message: String(fd.get('message') ?? '').trim(),
      consent: fd.get('consent') === 'on',
      website: String(fd.get('website') ?? ''),
      page: window.location.pathname,
    };

    const errs: Record<string, string> = {};
    if (data.name.length < 2) errs.name = 'Informe seu nome.';
    if (data.whatsapp.replace(/\D/g, '').length < 10) errs.whatsapp = 'Informe um WhatsApp com DDD.';
    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) errs.email = 'E-mail inválido.';
    if (!data.consent) errs.consent = 'É necessário autorizar o contato.';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    // Honeypot preenchido: finge sucesso sem enviar
    if (data.website) return setStatus('success');

    setStatus('sending');
    try {
      await submitLead(data);
      trackEvent('generate_lead', { treatment: data.treatment || 'não informado' });
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="ok"
            role="status"
            className="flex min-h-[520px] flex-col items-start justify-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <svg viewBox="0 0 80 80" className="h-20 w-20 text-accent-deep" aria-hidden>
              <motion.circle cx="40" cy="40" r="38" fill="none" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: EASE }} />
              <motion.path d="M26 41l9 9 19-20" fill="none" stroke="currentColor" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: EASE, delay: 0.7 }} />
            </svg>
            <h3 className="mt-8 font-serif text-h2">Mensagem <em className="italic text-accent-deep">recebida</em>.</h3>
            <p className="mt-5 max-w-md text-ink-soft">Obrigado pelo contato. Nossa equipe retorna em breve pelo WhatsApp ou e-mail informado.</p>
            <div className="mt-10">
              <Button href={site.whatsapp.href} icon={<WhatsAppIcon />}>Prefere falar agora? Chame no WhatsApp</Button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease: EASE }} className="grid gap-x-8 gap-y-2 md:grid-cols-2">
            {/* Honeypot anti-spam: invisível para pessoas */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label>Site <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>

            <Field name="name" label="Nome" autoComplete="name" error={errors.name} required />
            <Field
              name="whatsapp"
              label="WhatsApp"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(v) => setPhone(maskPhone(v))}
              error={errors.whatsapp}
              required
            />
            <Field name="email" label="E-mail (opcional)" type="email" autoComplete="email" error={errors.email} className="md:col-span-2" />

            <div className="relative md:col-span-2">
              <select
                id="treatment"
                name="treatment"
                defaultValue={defaultTreatment}
                className="peer h-16 w-full appearance-none border-b border-ink/25 bg-transparent pt-5 text-[17px] outline-none transition-colors focus:border-ink"
              >
                <option value="">Ainda não sei</option>
                {treatments.map((t) => <option key={t.slug} value={t.title}>{t.title}</option>)}
              </select>
              <label htmlFor="treatment" className="pointer-events-none absolute left-0 top-1 text-xs uppercase tracking-[0.15em] text-ink-mute">Tratamento de interesse</label>
              <svg width="12" height="8" viewBox="0 0 12 8" className="pointer-events-none absolute right-1 top-8" aria-hidden><path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
            </div>

            <Field name="message" label="Mensagem" textarea className="md:col-span-2" />

            <div className="mt-6 md:col-span-2">
              <label className="flex cursor-pointer items-start gap-4 text-[15px] text-ink-soft">
                <input type="checkbox" name="consent" className="peer sr-only" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'consent-err' : undefined} />
                <span aria-hidden className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-ink/30 transition-colors peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
                  <svg width="12" height="10" viewBox="0 0 12 10"><path d="M1 5l3.5 3.5L11 1" fill="none" stroke="#1C1C1A" strokeWidth="1.5" /></svg>
                </span>
                <span>
                  Autorizo a Estima Odontologia a usar meus dados para retornar este contato, conforme a{' '}
                  <Link to="/politica-de-privacidade" className="underline underline-offset-4">Política de Privacidade</Link> (LGPD).
                </span>
              </label>
              {errors.consent && <p id="consent-err" className="mt-2 text-sm text-[#9B3B2A]">{errors.consent}</p>}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 md:col-span-2">
              <Button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : 'Enviar mensagem'}</Button>
              {status === 'error' && (
                <p role="alert" className="text-sm text-[#9B3B2A]">
                  Não foi possível enviar agora.{' '}
                  <a className="underline underline-offset-4" href={whatsappLink()} target="_blank" rel="noopener noreferrer">Fale pelo WhatsApp</a>.
                </p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

type FieldProps = {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
  autoComplete?: string;
  inputMode?: 'tel' | 'email' | 'text';
  value?: string;
  onChange?: (v: string) => void;
};

/** Campo com label flutuante e linha que se desenha no foco. */
function Field({ name, label, type = 'text', textarea, required, error, className, autoComplete, inputMode, value, onChange }: FieldProps) {
  const common = {
    id: name,
    name,
    placeholder: ' ',
    required,
    autoComplete,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${name}-err` : undefined,
    className: 'peer w-full bg-transparent pt-6 text-[17px] text-ink outline-none placeholder-transparent',
    ...(value !== undefined ? { value, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange?.(e.target.value) } : {}),
  };
  return (
    <div className={cn('relative', className)}>
      <div className="relative border-b border-ink/25">
        {textarea ? <textarea {...common} rows={4} className={cn(common.className, 'resize-none pb-3')} /> : <input {...common} type={type} inputMode={inputMode} className={cn(common.className, 'h-16')} />}
        <label
          htmlFor={name}
          className="pointer-events-none absolute left-0 top-5 origin-left text-[17px] text-ink-mute transition-all duration-500 ease-expo peer-focus:top-1 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.15em] peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.15em]"
        >
          {label}
        </label>
        <span aria-hidden className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-accent-deep transition-transform duration-700 ease-expo peer-focus:scale-x-100" />
      </div>
      <p id={`${name}-err`} className="min-h-[1.5rem] pt-1 text-sm text-[#9B3B2A]">{error}</p>
    </div>
  );
}
