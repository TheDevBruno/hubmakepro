# SYSTEM CONTEXT (C4 Model - Nível 1)

```text
                                ┌─────────────────┐
                                │     USUÁRIO     │
                                │  (Dev/TechLead) │
                                └────────┬────────┘
                                         │
                                         ▼ HTTPS
                                ┌─────────────────┐
                                │   HUB MAKEPRO   │
                                │   (SaaS Core)   │
                                └────┬───────┬────┘
                                     │       │
                        Supabase API │       │ Webhooks / REST
                                     ▼       ▼
                        ┌────────────────┐ ┌────────────────┐
                        │    SUPABASE    │ │  INTEGRAÇÕES   │
                        │ (PostgreSQL /  │ │ (Stripe/Resend/│
                        │  Auth/Storage) │ │    GitHub)     │
                        └────────────────┘ └────────────────┘
```
