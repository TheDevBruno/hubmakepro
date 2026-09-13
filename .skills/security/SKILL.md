# SKILL: Security Auditing & Hardening

## Objetivo
Identificar, mitigar e auditar riscos e vulnerabilidades na aplicação SaaS.

## Checklist de Segurança
- [ ] RLS ativado e testado em 100% das tabelas criadas.
- [ ] Proteção contra IDOR (Insecure Direct Object Reference) nos endpoints e server actions.
- [ ] Sanitização e validação de schemas de entrada (ex: Zod).
- [ ] Headers de segurança HTTP configurados (CSP, X-Content-Type-Options, etc.).
- [ ] Nenhum segredo em repositório ou exposto para o client-side.
- [ ] Rate limiting em rotas sensíveis (login, recuperação de senha, envio de emails).
