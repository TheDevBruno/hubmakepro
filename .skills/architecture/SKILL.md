# SKILL: Architecture

## Objetivo
Manter a consistência arquitetural, separação de responsabilidades e cumprimento dos limites entre módulos.

## Protocolo
1. Respeitar as camadas definidas em `docs/architecture/ARCHITECTURE.md`.
2. Verificar a existência de componentes, services ou adapters antes de criar novos.
3. Se uma alteração exigir nova camada, integração não planejada ou quebra de contrato: gerar `ADR-XXX` ou `CR-XXX` e aguardar aprovação.
