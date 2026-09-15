# REQUISITOS DO MARCO v2.0 — Lab Beauty SaaS: Organization-Driven Architecture & UI/UX Design System

## 1. Visão Geral do Marco
Transformar o Hub MakePro em uma plataforma SaaS multi-tenant altamente configurável e orientada a organizações (**Organization-Driven**), com reestruturação completa de UI/UX baseada em Design System escalável, templates de tipos de negócio (Salão, Lash, Make, Nails, Clínica de Estética, Barbearia), ativação granular de módulos/players e governança estrita de segurança RLS.

---

## 2. Requisitos por Domínio

### A. Design System & UI/UX Foundation (DS)
- [ ] **DS-01**: Design Tokens centralizados (cores HSL semânticas, tipografia moderna, espaçamentos, elevação e transições).
- [ ] **DS-02**: Componentes atômicos reutilizáveis com suporte a 5 estados obrigatórios: `Default`, `Loading` (skeletons), `Empty` (ilustrações e CTAs), `Error` (alertas de validação) e `Success` (feedback).
- [ ] **DS-03**: Acessibilidade (WCAG 2.1 AA), contraste rigoroso, navegação por teclado e semântica HTML.
- [ ] **DS-04**: Testes de regressão visual e consistência de responsividade (Mobile First -> Desktop).

### B. Shell da Aplicação & Navegação (SHELL)
- [ ] **SHELL-01**: Shell responsivo com Sidebar colapsável, Header dinâmico e Bottom Bar para dispositivos móveis.
- [ ] **SHELL-02**: Menu de navegação adaptativo renderizado dinamicamente com base nos módulos/players ativos da organização.
- [ ] **SHELL-03**: Seletor e switcher contextual de organização com feedback visual instantâneo e reidratação de estado.

### C. Domínio da Organização & Multi-Tenant Foundation (ORG-CORE)
- [ ] **ORG-CORE-01**: Isolamento rigoroso de tenant via `organization_id` validado no servidor (zero confiança no cliente).
- [ ] **ORG-CORE-02**: Separação clara entre Platform (SaaS global), Tenant (dados da organização) e Shared (recursos públicos como agendamento).
- [ ] **ORG-CORE-03**: Matriz de papéis e permissões (RBAC) granular: `Owner`, `Admin`, `Specialist`, `Receptionist`, `Financial`.
- [ ] **ORG-CORE-04**: Políticas de Row Level Security (RLS) atualizadas sem bypass de segurança.

### D. Arquitetura de Tipos de Negócio & Templates (BIZ-TMPL)
- [ ] **BIZ-TMPL-01**: Catálogo de Business Types: `beauty_salon` (Salão Completo), `lash_designer` (Cílios), `makeup_artist` (Maquiadora), `nail_designer` (Unhas), `esthetics_clinic` (Clínica de Estética), `barbershop` (Barbearia).
- [ ] **BIZ-TMPL-02**: Templates pré-configurados que injetam automaticamente: serviços padrão com duração/preço sugerido, ficha de anamnese customizada do nicho e nomenclatura de termos.
- [ ] **BIZ-TMPL-03**: Engine de inicialização automática ao selecionar o template durante a criação do tenant.

### E. Módulos / Players & Feature Flags (MOD-FLAGS)
- [ ] **MOD-FLAGS-01**: Engine de habilitação e desabilitação dinâmica de módulos da organização: `appointments` (Agenda), `clients` (Clientes/Anamnese), `services` (Serviços), `team` (Especialistas), `commissions` (Comissões), `cash_flow` (Fluxo de Caixa), `online_booking` (Agendamento Público), `inventory` (Estoque).
- [ ] **MOD-FLAGS-02**: Bloqueio de rotas e Server Actions se o módulo correspondente estiver inativo para a organização atual.

### F. Configuração de Regras de Negócio do Tenant (BIZ-RULES)
- [ ] **BIZ-RULES-01**: Configurações operacionais: política de cancelamento, antecedência mínima, tolerância a atrasos, intervalo de limpeza entre atendimentos (buffer time).
- [ ] **BIZ-RULES-02**: Regras financeiras do espaço: cálculo de split de comissão (bruto vs líquido de taxas), controle de formas de pagamento aceitas (Pix, Cartão, Dinheiro).

### G. Temas & Customização de Layout (THEME-CUSTOM)
- [ ] **THEME-CUSTOM-01**: Suporte a personalização de identidade visual do salão: cor de destaque (accent color), logotipo/banner, layout da página pública de agendamento.
- [ ] **THEME-CUSTOM-02**: Injeção dinâmica de tokens de tema via CSS variables no contexto do tenant.

### H. Wizard de Onboarding da Organização (ONBOARD-WIZARD)
- [ ] **ONBOARD-WIZARD-01**: Fluxo guiado passo a passo de criação do espaço:
  1. Identidade (Nome, Slug e Contato)
  2. Tipo de Negócio & Seleção de Template
  3. Módulos/Players desejados
  4. Horários de funcionamento
- [ ] **ONBOARD-WIZARD-02**: Aplicação atômica e provisionamento do template no banco de dados.

### I. Dashboard Orientado à Configuração do Tenant (DASH-DRIVEN)
- [ ] **DASH-DRIVEN-01**: Dashboard modular que renderiza widgets e métricas exclusivamente baseados nos módulos habilitados.
- [ ] **DASH-DRIVEN-02**: Cards de atalhos e avisos contextuais adaptados ao tipo de negócio (ex: alerta de manutenção de cílios para Lash, noivas para Make).

### J. Migração Progressiva de Módulos (MIG-MODULES)
- [ ] **MIG-MODULES-01**: Refatoração progressiva da Agenda (`/appointments`) para o novo Design System e regras de buffer time.
- [ ] **MIG-MODULES-02**: Refatoração progressiva de Clientes (`/clients`) com campos dinâmicos por template de anamnese.
- [ ] **MIG-MODULES-03**: Refatoração progressiva de Serviços, Equipe, Caixa e Agendamento Online.
