# SKILL: Deployment Operations

## Objetivo
Padronizar a esteira de entrega contínua, gates de promoção e planos de rollback.

## Fluxo
1. **Branch Feature:** Desenvolvimento e testes locais.
2. **Preview Environment:** Deploy automático na Vercel via PR para validação e QA.
3. **Smoke Test:** Teste dos fluxos vitais no ambiente de Preview.
4. **Production Deploy:** Merge para `main` após aprovação total do Validation Gate.
5. **Post-Deploy Smoke Test:** Validação final e monitoramento de métricas.
6. **Rollback Plan:** Procedimento documentado para reverter instantaneamente caso ocorra incidente.
