# Arquitetura técnica — Gestante Care

Documento técnico complementar ao `PRODUCT_SPEC.md` (que descreve produto,
não implementação). Aqui ficam as decisões de stack, estrutura e banco de
dados.

## Stack

- **Frontend**: React + TypeScript + Vite, estilizado com Tailwind CSS v4
  (`@tailwindcss/vite`, sem `tailwind.config.js` — tokens de design definidos
  via `@theme` em `src/index.css`).
- **Roteamento**: React Router (`react-router-dom`).
- **Backend/Banco de dados**: Supabase (Postgres gerenciado + Auth + Storage).
  Escolhido em vez de um backend próprio para acelerar o MVP — auth pronta,
  banco relacional (que combina com as entidades do spec) e plano gratuito
  suficiente para essa fase.

## Estrutura de pastas

- `src/pages/` — uma tela por arquivo, nomes alinhados com a seção "Telas" do
  `PRODUCT_SPEC.md`.
- `src/components/` — elementos reutilizáveis de UI (`Button`, `TextField`,
  `SelectField`, `StepProgress`).
- `src/lib/` — `supabaseClient.ts` (cliente Supabase), `format.ts` (máscaras de
  CPF/telefone/data e cálculo de previsão de parto), `authErrors.ts` (tradução
  de erros do Supabase Auth para português).
- `src/data/mock.ts` — dados mockados usados pelas telas que ainda não têm
  integração real com o banco (Home, Jornada, Serviços, etc.).
- `supabase/schema.sql` — schema SQL das tabelas, rodado manualmente no SQL
  Editor do Supabase (não há CLI/migração automatizada por enquanto).

## Autenticação

- Supabase Auth, método **e-mail/senha** apenas no MVP (ver decisão de escopo
  no `PRODUCT_SPEC.md`).
- **Cadastro**: `supabase.auth.signUp()` cria a conta; em seguida o app insere
  nas tabelas `perfis`, `perfil_gestacional` e `consentimentos_lgpd` usando o
  `id` do usuário recém-criado.
- **Login**: `supabase.auth.signInWithPassword()`.
- **Recuperação de senha**: `supabase.auth.resetPasswordForEmail()` envia um
  link para `/redefinir-senha`. Nessa tela, com a sessão já autenticada pelo
  link, `supabase.auth.updateUser({ password })` grava a nova senha. Em
  seguida o app faz `signOut()` e redireciona para `/login` com uma mensagem
  de sucesso — por decisão de produto, não mantemos a usuária logada
  automaticamente após um reset de senha.
- **Configuração importante no dashboard do Supabase**: "Confirm email" está
  **desativado** por enquanto (Authentication → Providers → Email), para
  evitar o limite de envio de e-mail do plano gratuito durante testes.
  **Reativar antes de qualquer lançamento real**, junto com uma revisão geral
  das configurações de e-mail/rate limit.

## Banco de dados

Três tabelas (schema completo em `supabase/schema.sql`):

- **`perfis`** — `id` (FK para `auth.users`), `nome_completo`, `cpf`,
  `data_nascimento`, `telefone`.
- **`perfil_gestacional`** — `usuario_id` (FK), `semana_informada`,
  `dpp_estimada` (calculada no frontend a partir da semana, ver
  `lib/format.ts#calculateDueDate`).
- **`consentimentos_lgpd`** — `usuario_id` (FK), `versao_termos`,
  `aceito_em`.

Todas com **Row Level Security** habilitado: cada usuária só lê/escreve as
próprias linhas (`auth.uid() = id` ou `auth.uid() = usuario_id`).

**Gotcha encontrado**: RLS sozinho não basta — o Postgres também exige
permissão de operação na tabela (`GRANT`) para o role `authenticated`, senão
toda escrita retorna "permission denied" mesmo com as policies corretas. Os
`grant` necessários já estão no final do `supabase/schema.sql`.

## Variáveis de ambiente

- `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` em um `.env` local (fora do
  Git — ver `.env.example` para o formato).
- A `service role key` do Supabase **nunca** deve ir para o frontend nem para
  o `.env` deste projeto — ela ignora RLS e só deve ser usada em contexto de
  servidor/admin, que este MVP não possui ainda.

## Fora do escopo desta versão

- CLI do Supabase / migrações versionadas (mudanças de schema são aplicadas
  manualmente via SQL Editor por enquanto).
- Testes automatizados.
- CI/CD.
