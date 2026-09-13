# SKILL: Git Standards

## Objetivo
Padronizar o uso de Git com commits semânticos, branches organizadas e histórico limpo.

## Padrão de Branches
- `main`: Produção estável
- `develop`: Integração contínua
- `feature/sprint-XXX-nome`: Novas funcionalidades
- `fix/sprint-XXX-nome`: Correções de bugs
- `hotfix/vX.X.X-nome`: Correções emergenciais em produção

## Padrão de Commits
- `feat: <descrição>` (Nova funcionalidade)
- `fix: <descrição>` (Correção de bug)
- `test: <descrição>` (Adição ou correção de testes)
- `refactor: <descrição>` (Refatoração sem alteração funcional)
- `docs: <descrição>` (Alteração em documentação)
- `chore: <descrição>` (Manutenção de build, config, deps)
- `security: <descrição>` (Ajuste de segurança ou vulnerabilidade)
