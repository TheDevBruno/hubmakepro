# SKILL: Sprint Validation

## Objetivo
Validar uma Sprint antes do encerramento oficial e liberação para produção.

## Processo
1. Ler `sprints/sprint-XXX/PLAN.md` e `sprints/sprint-XXX/ACCEPTANCE.md`.
2. Inspecionar implementação e código-fonte produzido.
3. Executar suíte completa de testes (`npm test`, `npm run test:e2e`).
4. Validar preservação da arquitetura e boundaries.
5. Validar integridade do banco, migrations e RLS.
6. Validar segurança (Auth, BOLA, IDOR, Secrets).
7. Validar UX, usabilidade e idioma pt-BR.
8. Validar lint, typecheck e build de produção (`npm run build`).
9. Validar ambiente de Preview na Vercel.
10. Executar smoke test nos fluxos principais.

## Resultado
- **PASS:** Todos os critérios foram atendidos sem pendências críticas.
- **FAIL:** Um ou mais critérios não foram atendidos (bloqueia o encerramento da Sprint).
