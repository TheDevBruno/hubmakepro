# SKILL: Database Management

## Objetivo
Padronizar a criação, migração e manutenção do banco de dados relacional PostgreSQL.

## Diretrizes
- Toda tabela deve ter `id` (UUID ou BIGINT), `created_at` e `updated_at`.
- Uso de foreign keys explícitas com regras de `ON DELETE` definidas.
- Criação de índices para colunas frequentemente filtradas ou usadas em `JOIN`.
- Criação e aplicação estrita de migrations versionadas.
