# SYSTEM ARCHITECTURE

## 1. Visão Geral
A arquitetura do **Hub MakePro** segue um modelo modular e desacoplado baseado em Next.js (App Router), TypeScript e o ecossistema gerenciado do Supabase (BaaS).

```text
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                         │
│  Next.js (App Router) / React / TailwindCSS / Lucide    │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                   APPLICATION LAYER                     │
│  Server Components / Server Actions / Route Handlers    │
│  Middleware (Auth & Session Verification)               │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                    DATA & AUTH LAYER                    │
│  Supabase Auth (JWT Cookies)                            │
│  Supabase PostgreSQL (RLS / Migrations / Triggers)      │
│  Supabase Storage (Buckets & Policies)                  │
└─────────────────────────────────────────────────────────┘
```

## 2. Camadas do Código (`src/`)
- `src/app/`: Rotas públicas, autenticadas (`(dashboard)`) e APIs (`api/`).
- `src/components/`: Componentes UI atômicos e blocos funcionais.
- `src/services/`: Lógica de negócio e integrações externas.
- `src/repositories/`: Acesso direto ao banco/Supabase client.
- `src/types/`: Definições e interfaces TypeScript centralizadas.
- `src/utils/`: Funções utilitárias puras.
- `src/lib/`: Configurações de clientes (Supabase client SSR/Browser).

## 3. Segurança & Multi-tenancy
- Isolamento garantido por `org_id` e políticas de Row Level Security (RLS) no PostgreSQL.
- Chave `service_role` restrita a jobs e server actions administrativas protegidas; **nunca** no frontend.
