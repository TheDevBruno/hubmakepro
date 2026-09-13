# SKILL: Code Review

## Objetivo
Processo formal e estruturado de revisão de código e conformidade de Sprint (protocolo ChatGPT Reviewer).

## Itens Auditados
1. Aderência aos Critérios de Aceitação da Sprint.
2. Preservação da integridade arquitetural (sem bypass de camadas).
3. Qualidade de código, tipagens rigorosas e ausência de dead code.
4. Migrations, índices e RLS no banco de dados.
5. Ausência de falhas de segurança e exposição indevida de dados.
6. Cobertura e assertividade dos testes automatizados.

## Retorno
- `PASS` (Aprovado para prosseguir)
- `FAIL` (Necessita correção com itens listados em `REVIEW FINDING`)
