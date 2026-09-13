# Regras de Desenvolvimento e Validação Contínua — Hub MakePro

## 1. Validação Pré-Commit Obrigatória (Quality Gates)
Antes de qualquer operação de `git commit` ou push, as seguintes validações devem ser executadas e aprovadas com sucesso:

1. **TypeScript Check:** `npx tsc --noEmit` (ou `npm run typecheck`) sem nenhum erro de tipo.
2. **Suíte de Testes Automatizados:** `npx vitest run` (ou `npm test`) com 100% dos testes unitários passando.
3. **Linting:** `npm run lint` sem erros impeditivos.

## 2. Cobertura de Testes por Domínio
- **Serviços & Especialistas:** Testar cálculos de comissões percentuais, nichos e conversão monetária (`tests/unit/beauty-services.test.ts`).
- **Autenticação & Multi-tenancy:** Testar regras de acesso, isolamento de tenant e sanitização de dados (`tests/unit/auth.test.ts`, `tests/unit/multi-tenant.test.ts`).
- **Agenda & Clientes:** Testar fluxos de marcação, anamnese técnica e transações financeiras (`tests/unit/appointments-clients.test.ts`, `tests/unit/financial-commissions.test.ts`).
