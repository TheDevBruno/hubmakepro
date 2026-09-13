# SKILL: Storage Management

## Objetivo
Gerenciar arquivos, uploads e buckets no Supabase Storage com controle de acesso rigoroso.

## Diretrizes
- Definir se o bucket é público ou privado de acordo com o caso de uso.
- Configurar RLS policies na tabela `storage.objects`.
- Validar tipos MIME permitidos no upload (ex: `image/png`, `image/jpeg`, `application/pdf`).
- Limitar o tamanho máximo de arquivo (max file size).
- Sanitizar o nome dos arquivos e organizar paths por pastas com o identificador do tenant/usuário (ex: `org-id/uploads/avatar.png`).
