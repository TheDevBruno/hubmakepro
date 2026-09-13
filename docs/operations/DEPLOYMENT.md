# GUIA DE DEPLOYMENT E RELEASE

## 1. Pipeline de Integração e Entrega (CI/CD)

```text
[ Feature Branch ] ──► [ Push / PR ] ──► [ GitHub Actions CI (Lint/Typecheck/Test) ]
                                                        │
                                                        ▼ (Pass)
                                              [ Vercel Preview Deploy ]
                                                        │
                                                        ▼
                                              [ Smoke Test & QA Review ]
                                                        │
                                                        ▼ (Pass)
                                              [ Merge to develop / main ]
                                                        │
                                                        ▼
                                              [ Vercel Production Deploy ]
                                                        │
                                                        ▼
                                              [ Post-Deploy Smoke Test ]
```

## 2. Checklist Pré-Deploy em Produção
- [ ] Todas as migrations executadas e verificadas no Supabase de Produção.
- [ ] Variáveis de ambiente configuradas na Vercel (Production Environment).
- [ ] Build e testes passando sem erros.
- [ ] Smoke test executado na URL de Preview.
- [ ] Validation Gate da Sprint aprovado.

## 3. Plano de Rollback
Em caso de falha crítica pós-deploy:
1. Reverter deployment instantaneamente pelo dashboard da Vercel para a versão anterior estável (Instant Rollback).
2. Se houver migration destrutiva, aplicar script de rollback versionado no Supabase.
3. Notificar o time e registrar o incidente.
