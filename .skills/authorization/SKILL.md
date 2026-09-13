# SKILL: Authorization

## Objetivo
Controlar o acesso a recursos e funcionalidades com base no papel e permissão do usuário.

## Diretrizes
- Responde à pergunta: **"O que o usuário pode fazer?"**
- Modelos: RBAC (Role-Based Access Control) ou ABAC.
- **Regra Fundamental:** Nunca confiar em informações enviadas pelo client (ex: campos editáveis em formulários ou dados de local storage) para decidir permissões. A validação deve ocorrer no backend e no banco.
