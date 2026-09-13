# SKILL: Row Level Security (RLS)

## Objetivo
Implementar e auditar políticas de Row Level Security no PostgreSQL para garantir isolamento multi-tenant absoluto.

## Regras
1. Toda tabela deve ter `ALTER TABLE <nome_tabela> ENABLE ROW LEVEL SECURITY;`.
2. Criar policies explícitas para `SELECT`, `INSERT`, `UPDATE` e `DELETE`.
3. Validar que `auth.uid()` pertence à organização/tenant do recurso (`org_id` ou `user_id`).
4. Testar queries com usuários de tenants distintos para comprovar a inexistência de vazamento de dados.
