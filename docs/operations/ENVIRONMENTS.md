# AMBIENTES DE EXECUÇÃO

## 1. Topologia de Ambientes

| Ambiente | Provedor de App | Provedor de Banco/Auth | Branch Git | Propósito |
|---|---|---|---|---|
| **Development** | Local (`localhost:3000`) | Supabase Local / Dev Project | `feature/*`, `fix/*` | Desenvolvimento ativo e testes |
| **Preview** | Vercel Preview Deployments | Supabase Staging Project | Pull Requests → `develop` | Validação visual, QA e aprovação |
| **Production** | Vercel Production | Supabase Production Project | `main` | Usuários reais e dados em produção |

## 2. Isolamento de Dados
- **Regra Estrita:** Dados de produção **nunca** devem ser copiados descaracterizados para ambientes de desenvolvimento local.
- Seeds de teste (`supabase/seed.sql`) devem utilizar dados sintéticos e fictícios.
