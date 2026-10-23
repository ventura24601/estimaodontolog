// Edge Function: valida o lead, grava em public.leads e envia e-mail via Resend.
// Secrets: RESEND_API_KEY, LEAD_TO_EMAIL (padrão estimaodonto20@gmail.com), LEAD_FROM_EMAIL, ALLOWED_ORIGIN
import { createClient } from 'npm:@supabase/supabase-js@2';

const ALLOWED_ORIGIN = Deno.env.get('ALLOWED_ORIGIN') ?? '*';
const cors = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  // Honeypot: bots preenchem o campo invisível. Responde OK sem gravar.
  if (str(body.website, 200)) return json({ ok: true });

  const lead = {
    name: str(body.name, 120),
    whatsapp: str(body.whatsapp, 20),
    email: str(body.email, 160) || null,
    treatment: str(body.treatment, 80) || null,
    message: str(body.message, 3000) || null,
    consent: body.consent === true,
    page: str(body.page, 200) || null,
  };

  if (lead.name.length < 2 || lead.whatsapp.replace(/\D/g, '').length < 10 || !lead.consent) {
    return json({ error: 'invalid_fields' }, 422);
  }
  if (lead.email && !/^\S+@\S+\.\S+$/.test(lead.email)) return json({ error: 'invalid_email' }, 422);

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const { data, error } = await supabase.from('leads').insert(lead).select('id').single();
  if (error) {
    console.error(error);
    return json({ error: 'db_error' }, 500);
  }

  const apiKey = Deno.env.get('RESEND_API_KEY');
  if (apiKey) {
    const rows = [
      ['Nome', lead.name],
      ['WhatsApp', lead.whatsapp],
      ['E-mail', lead.email ?? '—'],
      ['Tratamento', lead.treatment ?? 'Ainda não sei'],
      ['Mensagem', lead.message ?? '—'],
      ['Página', lead.page ?? '—'],
    ];
    const html = `<h2 style="font-family:Georgia,serif">Novo contato pelo site</h2><table cellpadding="6">${rows
      .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>`)
      .join('')}</table>`;
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: Deno.env.get('LEAD_FROM_EMAIL') ?? 'Site Estima <onboarding@resend.dev>',
        to: [Deno.env.get('LEAD_TO_EMAIL') ?? 'estimaodonto20@gmail.com'],
        reply_to: lead.email ?? undefined,
        subject: `Novo contato pelo site: ${lead.name}${lead.treatment ? ` · ${lead.treatment}` : ''}`,
        html,
      }),
    });
    if (res.ok) await supabase.from('leads').update({ email_sent: true }).eq('id', data.id);
    else console.error('resend', res.status, await res.text());
  }

  return json({ ok: true });
});
