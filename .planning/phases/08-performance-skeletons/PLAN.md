# PLANO DE FASE 8: Performance, Skeletons & Navegação Instantânea

## Objetivo da Fase
Eliminar qualquer percepção de lentidão ou congelamento na navegação entre as telas do painel do salão (`/dashboard`, `/appointments`, `/clients`, `/services`, `/specialists`, `/financial`, `/settings/organization`, `/settings/profile`), fornecendo carregamento instantâneo via **Next.js App Router `loading.tsx`**, skeletons animados estilizados em Tailwind CSS, e prefetching inteligente nos links de navegação.

---

## Entregáveis & Arquivos da Fase

### 1. Componentes de Skeleton Reutilizáveis
- [ ] **`src/components/ui/skeletons.tsx`**:
  - `CardSkeleton`: Skeleton para blocos de métricas e totalizadores.
  - `TableSkeleton`: Skeleton para listagens de clientes, serviços, profissionais e extrato financeiro.
  - `FormSkeleton`: Skeleton para formulários de criação/edição.
  - `AgendaGridSkeleton`: Skeleton com slots de horários operacionais.

### 2. Estados de Carregamento Instantâneo (`loading.tsx`) no Next.js
- [ ] **`src/app/(dashboard)/loading.tsx`**: Loading padrão para transições de layout geral.
- [ ] **`src/app/(dashboard)/appointments/loading.tsx`**: Loading com estrutura da Agenda Operacional.
- [ ] **`src/app/(dashboard)/clients/loading.tsx`**: Loading para a tela de Clientes & Ficha de Anamnese.
- [ ] **`src/app/(dashboard)/services/loading.tsx`**: Loading para o Catálogo de Procedimentos.
- [ ] **`src/app/(dashboard)/specialists/loading.tsx`**: Loading para a tela de Especialistas & Comissões.
- [ ] **`src/app/(dashboard)/financial/loading.tsx`**: Loading para o Caixa Operacional e Métricas.
- [ ] **`src/app/(dashboard)/settings/organization/loading.tsx`**: Loading para Configurações do Salão.

### 3. Otimização de Prefetching e Navegação
- [ ] **`src/components/dashboard-sidebar.tsx`**:
  - Garantir `prefetch={true}` em todos os `Link` da barra lateral.
  - Indicador de transição de rota (`useTransition` ou feedback visual ativo no clique).

---

## Quality Gate & Verificação Automatizada
1. **Testes Unitários:** Adicionar teste de renderização e estrutura dos skeletons em `tests/unit/performance-skeletons.test.ts`.
2. **Execução Obrigatória:** `npx vitest run` (100% de aprovação).
3. **Validação de Tipagem:** `npx tsc --noEmit`.
