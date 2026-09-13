# GUIA DE DEPLOY EM PRODUÇÃO: HUB MAKEPRO

Este guia contém o passo a passo exato para subir o **Hub MakePro** em produção no **Supabase Cloud** e na **Vercel**.

---

## 1. Configuração do Backend (Supabase Cloud)

1. Acesse o painel [database.new](https://database.new) ou faça login em [supabase.com](https://supabase.com).
2. Crie um novo projeto com o nome **Hub MakePro**.
3. Guarde sua **Database Password** e copie as credenciais do projeto em **Project Settings > API**:
   - `Project URL` (Ex: `https://xyzcompany.supabase.co`)
   - `anon / public key` (Ex: `eyJhbGciOi...`)

### Aplicação das Migrations (SQL Editor do Supabase)
No painel do Supabase, acesse **SQL Editor > New query** e execute os scripts localizados em `supabase/migrations/` na seguinte ordem:

1. `20260904000000_initial_schema.sql` (Tabelas `profiles`, `organizations`, `organization_members` e triggers)
2. `20260913000000_multi_tenant_policies.sql` (Políticas de segurança RBAC)
3. `20260913010000_beauty_services_specialists.sql` (Tabelas `services`, `specialists`, `organization_settings`)
4. `20260913020000_appointments_and_clients.sql` (Tabelas `clients` com anamnese e `appointments`)
5. `20260913030000_financial_transactions.sql` (Tabela `financial_transactions` de caixa e comissões)

---

## 2. Configuração do Repositório no GitHub

1. No GitHub, crie um novo repositório (ex: `hub-makepro-saas`).
2. No seu terminal, vincule o repositório remoto e envie o código:
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/hub-makepro-saas.git
   git push -u origin main
   ```

---

## 3. Hospedagem do Frontend na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta do GitHub.
2. Clique em **Add New > Project** e importe o repositório `hub-makepro-saas`.
3. Na seção **Environment Variables**, adicione as seguintes variáveis:
   - `NEXT_PUBLIC_SUPABASE_URL`: sua URL do Supabase (copiada no Passo 1).
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: sua chave pública `anon` do Supabase.
4. Clique em **Deploy**.
5. Ao concluir o deploy, adicione a URL de produção da Vercel (ex: `https://hub-makepro.vercel.app`) em **Supabase > Authentication > URL Configuration > Site URL & Redirect URLs**.

---

## 4. Plano de Validação & Testes em Produção

Após o deploy, siga o checklist prático em `docs/TEST_PLAN_E2E.md` para validar todos os fluxos.
