# Phase 6: Página Pública de Agendamento Online (/book/[slug]) — Research

**Phase:** 06-public-booking-page  
**Sprint:** SPRINT-006  
**Date:** 2026-09-13  

---

## 1. Contexto & Requisitos
- **Requisito Central:** `BEAUTY-06` — Página pública em `/book/[slug]` onde os clientes podem escolher serviço, profissional e horário livre sem precisar de login, gerando link direto para confirmação no WhatsApp.
- **Jornada do Cliente Final:**
  1. Acessa o link `/book/[slug]` (compartilhado na Bio do Instagram ou WhatsApp do salão/maquiadora).
  2. Visualiza a identidade visual do salão/profissional (nome, nichos, contato).
  3. Escolhe o Procedimento / Serviço (preço, tempo, categoria).
  4. Escolhe o Profissional / Especialista (ou "Qualquer Profissional Disponível").
  5. Escolhe a Data e o Horário disponível.
  6. Preenche Nome e WhatsApp (cadastrando/vinculando como cliente automaticamente).
  7. Confirmação instantânea na tela + botão para notificar o salão pelo WhatsApp com os dados pré-preenchidos.

---

## 2. Decisões Técnicas & Segurança
- **Rota Pública (Next.js App Router):** `src/app/book/[slug]/page.tsx` fora do grupo autenticado `(dashboard)`.
- **Validação de Slug:** Busca o tenant ativo pelo `slug` em `public.organizations` e carrega seus serviços ativos e especialistas.
- **Server Action Pública (`src/app/actions/public-booking.ts`):** Cria/localiza o cliente na tabela `clients` e insere o agendamento em `appointments` com status `confirmed` ou `pending`.

---

## 3. Estratégia de Testes
- Testes unitários para busca e validação de slug público.
- Testes de criação de agendamento anônimo e geração de link de WhatsApp para cliente final.
