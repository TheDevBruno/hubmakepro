# PRODUCT REQUIREMENTS

## Requisitos Funcionais (RF)
- **RF-001:** O sistema deve permitir autenticação via Email/Senha e Provedores OAuth suportados pelo Supabase.
- **RF-002:** O sistema deve suportar estrutura multi-tenant (Organizações e Membros).
- **RF-003:** O sistema deve gerenciar perfis de usuários, permissões de acesso (Admin, Membro, Visualizador).
- **RF-004:** O sistema deve oferecer um Dashboard operacional com visão em tempo real de status de projetos e tarefas.
- **RF-005:** O sistema deve permitir upload e gestão de arquivos seguros via Supabase Storage.

## Requisitos Não Funcionais (RNF)
- **RNF-001 (Segurança):** 100% das tabelas devem ter Row Level Security (RLS) ativo e políticas testadas.
- **RNF-002 (Idioma):** Toda interface e comunicação voltada ao usuário em português do Brasil (`pt-BR`).
- **RNF-003 (Performance):** Tempo de resposta de APIs e páginas inferior a 300ms em média.
- **RNF-004 (Disponibilidade & CI/CD):** Pipeline com build, typecheck, lint e testes automatizados a cada PR na Vercel.
