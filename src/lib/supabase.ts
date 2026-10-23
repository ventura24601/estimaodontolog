const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export type LeadPayload = {
  name: string;
  whatsapp: string;
  email: string;
  treatment: string;
  message: string;
  consent: boolean;
  /** honeypot: precisa chegar vazio */
  website: string;
  page: string;
};

/** Envia o lead para a Edge Function `submit-lead`, que valida, grava na tabela `leads` e envia o e-mail (Resend). */
export async function submitLead(payload: LeadPayload) {
  if (!url || !key) {
    console.warn('[lead] Supabase não configurado (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). Simulando envio.', payload);
    await new Promise((r) => setTimeout(r, 900));
    return;
  }
  // Carregado sob demanda para não pesar no carregamento inicial
  const { createClient } = await import('@supabase/supabase-js');
  const { error } = await createClient(url, key).functions.invoke('submit-lead', { body: payload });
  if (error) throw error;
}
