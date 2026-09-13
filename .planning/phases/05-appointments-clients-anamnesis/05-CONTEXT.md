# Phase 5: Agenda Operacional, Marcações & Ficha de Clientes / Anamnese — Context

**Phase:** 05-appointments-clients-anamnesis  
**Sprint:** SPRINT-005  
**Created:** 2026-09-13  

---

## 1. Visão Geral
A Fase 5 constrói a rotina operacional diária dos espaços de beleza: o controle de horários marcados e o prontuário dos clientes atendidos. Com ela, a recepcionista ou o próprio profissional (maquiadora, lash designer, nail designer, cabeleireira) pode agendar clientes, registrar preferências e disparar confirmações via WhatsApp.

---

## 2. Decisões Arquiteturais
- **Ficha de Anamnese Dinâmica (`JSONB`):** Permite salvar detalhes especializados sem alterar o schema do banco (ex: `{ lash_mapping: "Boneca", lash_curl: "D", lash_thickness: "0.07" }`).
- **Cálculo Automático de Término:** O `end_time` do agendamento é calculado somando `service.duration_minutes` ao `start_time`.
- **Status Operacional:** Indicadores claros em cores: `Confirmado` (Azul), `Em Atendimento` (Amarelo), `Concluído` (Verde), `Cancelado` (Cinza/Vermelho).
