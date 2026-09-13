# SPRINT 001 — CRITÉRIOS DE ACEITAÇÃO (ACCEPTANCE CRITERIA)

## AC-001: Governança do OS Operacional
- [ ] Todos os 10 agentes possuem instruções claras em `.agents/`.
- [ ] Todas as 20 skills estão documentadas em `.skills/`.
- [ ] A pasta `docs/` contém `PROJECT.md`, `PROJECT_STATE.md`, arquitetura e políticas de segurança.
- [ ] `SYSTEM_INSTRUCTION.md` está posicionado na raiz com as 32 regras operacionais.

## AC-002: Fluxo de Autenticação Funcional
- [ ] O usuário consegue criar conta informando email e senha.
- [ ] O usuário consegue efetuar login e ser redirecionado para `/dashboard`.
- [ ] Tentativas de acesso a rotas privadas sem autenticação redirecionam para `/login`.
- [ ] O usuário consegue realizar logout com encerramento de sessão seguro.

## AC-003: Banco de Dados & RLS
- [ ] As tabelas `profiles`, `organizations` e `organization_members` são criadas via migration versionada.
- [ ] Todas as tabelas possuem `ENABLE ROW LEVEL SECURITY`.
- [ ] Usuários só podem visualizar e editar registros vinculados à sua organização.

## AC-004: Qualidade Visual e UX (pt-BR)
- [ ] Todos os formulários, botões, títulos e mensagens de validação estão em português brasileiro.
- [ ] Feedbacks de carregamento (loading states) e erros amigáveis são exibidos.
- [ ] Interface responsiva em telas Desktop, Tablet e Mobile.

## AC-005: Qualidade de Engenharia & Build
- [ ] `npm run lint` executa sem erros ou warnings bloqueantes.
- [ ] `npm run typecheck` não reporta nenhum erro de tipagem.
- [ ] `npm test` passa com 100% de sucesso.
- [ ] `npm run build` gera o pacote de produção sem falhas.
