# Phase 4: Segmentação por Nicho, Serviços & Especialistas — Context

**Phase:** 04-beauty-services-specialists  
**Sprint:** SPRINT-004  
**Created:** 2026-09-13  

---

## 1. Visão Geral
A Fase 4 inicia a construção dos fluxos específicos de Beleza e Estética do SaaS Hub MakePro. O salão ou profissional autônomo (Lash, Make, Nails, Cabeleireira) configura seu portfólio de serviços, valores, tempos de atendimento e equipe de especialistas com comissões.

---

## 2. Decisões Arquiteturais
- **Moeda e Preços:** Armazenamento em centavos (`price_cents`) no banco de dados para evitar erros de ponto flutuante, com formatação nativa em `BRL` (R$) na interface.
- **Isolamento de Segurança (RLS):** Todas as tabelas (`services`, `specialists`, `specialist_services`, `organization_settings`) vinculadas obrigatoriamente a `organization_id` com checagem de membro ativo.
- **Design Adaptativo:** A interface do catálogo e cadastro adapta ícones e categorias de acordo com os nichos cadastrados na organização.
