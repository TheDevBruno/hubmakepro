# SaaS Development OS v1.0

Base operacional e framework de governança rigorosa para engenharia de software SaaS com IA (Gemini Pro como agente executor no Google Antigravity e ChatGPT como agente revisor/orquestrador).

## 🚀 Premissa Central
> **O projeto possui uma única fonte de verdade.** Agentes executam o plano aprovado; não redefinem o plano durante a execução. **Não fazer alterações silenciosas.**

---

## 🏛️ Os 5 Níveis do Sistema Operacional

```text
LEVEL 1 — GOVERNANCE
├── SYSTEM_INSTRUCTION.md
├── docs/PROJECT.md
├── docs/PROJECT_STATE.md
├── docs/product/
└── docs/architecture/

LEVEL 2 — PLANNING
├── sprints/sprint-XXX/PLAN.md
├── sprints/sprint-XXX/TASKS.md
└── sprints/sprint-XXX/ACCEPTANCE.md

LEVEL 3 — EXECUTION
├── .agents/
├── .skills/
├── src/
├── supabase/
└── integrations/

LEVEL 4 — VALIDATION
├── tests/
├── sprints/sprint-XXX/VALIDATION.md
├── sprints/sprint-XXX/QA.md
└── security/

LEVEL 5 — DELIVERY
├── .github/
├── sprints/sprint-XXX/DEPLOY.md
├── sprints/sprint-XXX/REPORT.md
└── Vercel / Production
```

---

## 🔄 Fluxo de Desenvolvimento
1. **Contexto & Estado:** Leitura de `docs/PROJECT_STATE.md` e plano da Sprint ativa.
2. **Execução GSD:** Desenvolvimento estrito ao escopo aprovado com testes e sem duplicações.
3. **Validação Contínua:** Lint, Typecheck, Testes (Unit, Integration, E2E), RLS e Segurança.
4. **Validation Gate & QA:** Auditoria visual, funcional, segurança e aprovação do revisor.
5. **Entrega & Atualização:** Pull Request, Preview na Vercel, Smoke Test, Merge e atualização de `PROJECT_STATE.md`.

---

## 📋 Stack Oficial Padrão
- **Backend / Database / Auth / Storage:** Supabase (PostgreSQL, Supabase Auth, Storage, RLS)
- **Deployment:** Vercel (Preview + Production)
- **Versionamento:** GitHub (Gitflow: `feature/*` → `develop` → `main`)
- **Idioma Oficial Funcional:** `pt-BR`
