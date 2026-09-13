# POLÍTICA E DIRETRIZES DE SEGURANÇA

## 1. Princípios Inegociáveis
1. **Defesa em Profundidade:** Validação em todas as camadas (Client, Middleware, Server Action/API, PostgreSQL RLS).
2. **Menor Privilégio:** Usuários e serviços acessam estritamente o necessário para desempenhar suas funções.
3. **Nenhum Segredo Exposto:** Chaves secretas (`service_role`, credenciais de banco) nunca devem chegar ao bundle de frontend ou repositório.

## 2. Padrões de Segurança por Domínio

### Autenticação & Sessão
- Supabase Auth com cookies `httpOnly`, `secure` e `SameSite=Lax`.
- Refresh token gerenciado de forma transparente e segura pelo middleware.

### Autorização & PostgreSQL RLS
- Toda tabela exposta na API/PostgREST deve ter RLS ativado.
- Não usar colunas editáveis pelo usuário no client como critério de permissão.
- Consultas com filtros em queries não substituem RLS: o banco é a última e soberana linha de defesa.

### Validação de Entrada & Proteção Contra Injeção
- Validação estrita de schemas em todas as mutações e Server Actions (via Zod).
- Sanitização de inputs para evitar ataques de Cross-Site Scripting (XSS).
- PostgreSQL com queries parametrizadas (eliminando SQL Injection).

### Storage & Uploads
- Validação de magic bytes / MIME types antes de aceitar uploads.
- Nomes de arquivos sanitizados com UUIDs aleatórios para evitar sobrescritas maliciosas ou directory traversal.
