# 🚀 Guia de Deploy Online: Hub MakePro (Beauty SaaS)

Este guia contém as etapas e credenciais para conectar o backend Supabase e publicar o frontend na Vercel.

---

## 1. Configuração do Backend (Supabase Online)

- **URL do Projeto:** `https://ylxknebhkqdhrftuyzye.supabase.co`
- **Chave Pública (Anon):** `sb_publishable_RzDsR2gQukV84ZtEiqfdEw_1mkRIseV`

### Execução do Schema PostgreSQL no Supabase:
1. Acesse o dashboard do seu projeto no Supabase: [https://supabase.com/dashboard/project/ylxknebhkqdhrftuyzye](https://supabase.com/dashboard/project/ylxknebhkqdhrftuyzye)
2. No menu lateral esquerdo, clique em **SQL Editor**.
3. Clique em **New Query**.
4. Copie todo o conteúdo do arquivo [`supabase/schema_completo_online.sql`](file:///z:/DevOps%20-%20FullStack/Hub%20MakePro/supabase/schema_completo_online.sql) e cole no editor.
5. Clique no botão **Run** (Executar) no canto inferior direito.
6. Todas as 10 tabelas (`profiles`, `organizations`, `organization_members`, `organization_settings`, `services`, `specialists`, `specialist_services`, `clients`, `appointments`, `financial_transactions`), triggers e políticas de RLS estarão 100% criadas.

---

## 2. Configuração do Frontend (Vercel)

- **Repositório GitHub:** `https://github.com/TheDevBruno/hubmakepro.git`
- **Project ID Vercel:** `prj_PCtBk0gV5HNwOOcAOyNgi24H0kUV`

### Como Conectar e Deployar na Vercel:
1. Acesse [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique em **Add New...** > **Project**.
3. Importe o repositório **TheDevBruno/hubmakepro**.
4. Na seção **Environment Variables**, adicione as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://ylxknebhkqdhrftuyzye.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `sb_publishable_RzDsR2gQukV84ZtEiqfdEw_1mkRIseV`
   - `NEXT_PUBLIC_APP_URL` = `https://hubmakepro.vercel.app` (ou a URL gerada pela Vercel)
5. Clique em **Deploy**.

---

## 3. Roteiro Prático de Testes & Validação E2E

Siga este roteiro após o deploy:

| Etapa | Ação a Realizar | Resultado Esperado |
| :--- | :--- | :--- |
| **1. Cadastro** | Acessar `/register` e criar uma conta | Perfil criado automaticamente em `profiles` |
| **2. Login & Tenant** | Acessar `/login` e criar o primeiro salão (ex: "Studio Bella") | Redirecionado para o Dashboard com a Org ativa |
| **3. Serviços** | Acessar `/services` e cadastrar serviços (Make, Lash, Nails) | Procedimentos listados com preço formatado em BRL |
| **4. Especialistas**| Acessar `/specialists` e cadastrar profissional com comissão | Profissional listado com percentual de comissão |
| **5. Agendamento Online** | Abrir `/book/[slug-do-seu-salao]` em aba anônima | Formulário público carrega serviços e horários |
| **6. Agendar Cliente** | Preencher formulário público e clicar em Agendar | Horário marcado e botão de WhatsApp abre mensagem pronta |
| **7. Agenda Interna** | Acessar `/appointments` no painel | Novo agendamento aparece em tempo real |
| **8. Fechamento de Caixa**| Concluir agendamento e acessar `/financial` | Comissão e lucro líquido calculados e exibidos |
