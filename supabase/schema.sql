-- Gestante Care - schema inicial (Login/Cadastro)
-- Rodar no Supabase Dashboard: Project > SQL Editor > New query > colar e "Run"

-- 1. Perfil da usuária (dados coletados na Etapa 1 do Cadastro)
create table if not exists public.perfis (
  id uuid primary key references auth.users (id) on delete cascade,
  nome_completo text not null,
  cpf text not null unique,
  data_nascimento date not null,
  telefone text not null,
  created_at timestamptz not null default now()
);

-- 2. Dados gestacionais (coletados na Etapa 3 do Cadastro)
create table if not exists public.perfil_gestacional (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null unique references auth.users (id) on delete cascade,
  semana_informada int not null check (semana_informada > 0 and semana_informada <= 42),
  dpp_estimada date not null,
  created_at timestamptz not null default now()
);

-- 3. Registro de aceite dos Termos/Política (consentimento LGPD, Etapa 3)
create table if not exists public.consentimentos_lgpd (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references auth.users (id) on delete cascade,
  versao_termos text not null default 'v1',
  aceito_em timestamptz not null default now()
);

-- Habilita Row Level Security: cada usuária só acessa os próprios dados
alter table public.perfis enable row level security;
alter table public.perfil_gestacional enable row level security;
alter table public.consentimentos_lgpd enable row level security;

create policy "usuaria le o proprio perfil" on public.perfis
  for select using (auth.uid() = id);
create policy "usuaria cria o proprio perfil" on public.perfis
  for insert with check (auth.uid() = id);
create policy "usuaria atualiza o proprio perfil" on public.perfis
  for update using (auth.uid() = id);

create policy "usuaria le o proprio perfil gestacional" on public.perfil_gestacional
  for select using (auth.uid() = usuario_id);
create policy "usuaria cria o proprio perfil gestacional" on public.perfil_gestacional
  for insert with check (auth.uid() = usuario_id);
create policy "usuaria atualiza o proprio perfil gestacional" on public.perfil_gestacional
  for update using (auth.uid() = usuario_id);

create policy "usuaria le o proprio consentimento" on public.consentimentos_lgpd
  for select using (auth.uid() = usuario_id);
create policy "usuaria cria o proprio consentimento" on public.consentimentos_lgpd
  for insert with check (auth.uid() = usuario_id);

-- RLS restringe QUAIS linhas, mas o Postgres também exige permissão para a
-- operação em si na tabela. Sem isso, toda escrita cai em "permission denied".
grant select, insert, update on public.perfis to authenticated;
grant select, insert, update on public.perfil_gestacional to authenticated;
grant select, insert on public.consentimentos_lgpd to authenticated;

-- 5. Data prevista do parto confirmada pela usuária (tela Perfil) — separada
-- da dpp_estimada (calculada automaticamente no cadastro a partir da semana
-- informada, usada em Home/Semana Gestacional). Começa em branco (null) e só
-- é preenchida quando a usuária souber a data real. Sem RLS/grant novo:
-- perfil_gestacional já tem update liberado pra dona dos dados.
alter table public.perfil_gestacional
  add column if not exists dpp_confirmada date;
