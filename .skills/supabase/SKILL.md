# SKILL: Supabase Integration

## Objetivo
Configurar e operar o ecossistema Supabase (Auth, Database, Storage e Realtime) com segurança e boas práticas.

## Diretrizes
- Utilizar os clientes oficiais `@supabase/supabase-js` e `@supabase/ssr` para Next.js.
- Nunca expor variáveis com `SERVICE_ROLE_KEY` no browser.
- Manter o schema local e as migrations sincronizadas via Supabase CLI (`supabase db diff`, `supabase migration`).
