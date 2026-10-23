-- Leads do formulário de contato. Escrita apenas pela Edge Function (service role); sem acesso público.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 120),
  whatsapp text not null check (char_length(whatsapp) between 10 and 20),
  email text check (email is null or char_length(email) <= 160),
  treatment text,
  message text check (message is null or char_length(message) <= 3000),
  consent boolean not null check (consent = true),
  page text,
  email_sent boolean not null default false
);

alter table public.leads enable row level security;
-- Nenhuma policy para anon/authenticated: a tabela só é acessível pelo service role.

create index if not exists leads_created_at_idx on public.leads (created_at desc);
