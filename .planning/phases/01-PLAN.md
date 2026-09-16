# PLAN: Phase 1 — Design System Foundation

## Objetivo da Fase
Estabelecer a fundação de **Design System (Tokens + Componentes Atômicos)** do **Lab Beauty SaaS**, garantindo coerência visual de altíssimo padrão, tipografia moderna, paleta de cores HSL semântica, suporte a temas e os **5 estados de interface obrigatórios** em cada componente:
1. **Default** (Estado interativo normal)
2. **Loading** (Skeletons / Spinners integrados sem quebra de layout)
3. **Empty** (Ilustração / Mensagem contextual e CTA de ação)
4. **Error** (Bordas de destaque, mensagens acessíveis de validação)
5. **Success** (Feedback positivo e confirmações)

---

## 1. Escopo & Entregáveis

### 1.1 Tokens de Design & Tema Base (`src/lib/design-system/tokens.ts`)
- Configuração de tokens HSL no CSS e Tailwind (`primary`, `secondary`, `accent`, `background`, `surface`, `border`, `text-primary`, `text-muted`, `success`, `warning`, `danger`).
- Espaçamentos semânticos, raios de borda (`rounded-xl`, `rounded-2xl`), sombras com elevação (glow effect) e durações de transição padronizadas.
- Tipografia moderna via Google Fonts (Inter / Outfit) com hierarquia estrita de headings e labels (`pt-BR`).

### 1.2 Catálogo de Componentes Base (`src/components/ui/`)
Cada componente será criado com tipagem TypeScript estrita, acessibilidade (ARIA) e suporte explícito aos 5 estados:
1. **`Button`** (`src/components/ui/button.tsx`): Variantes `primary`, `secondary`, `outline`, `ghost`, `danger`, `accent`. Suporte a `isLoading`, ícones à esquerda/direita e feedback de sucesso.
2. **`Input` & `Textarea`** (`src/components/ui/input.tsx`, `src/components/ui/textarea.tsx`): Suporte a labels, helper text, máscara/prefixo (ex: R$), estado de erro com mensagem acessível e estado de sucesso.
3. **`Select`** (`src/components/ui/select.tsx`): Estilizado com teclado acessível, placeholder semântico e feedback de validação.
4. **`Badge` & `StatusTag`** (`src/components/ui/badge.tsx`): Tags coloridas para status (`pending`, `confirmed`, `in_progress`, `completed`, `cancelled`), nichos de beleza (`make`, `lash`, `nails`, `hair`, `esthetics`) e comissões.
5. **`Card`** (`src/components/ui/card.tsx`): Contêiner com elevação, header, content, footer e hover states suaves.
6. **`Modal` & `Dialog`** (`src/components/ui/modal.tsx`): Backdrop blur, animação de entrada fade/scale, fechamento via ESC / clique externo e foco aprisionado.
7. **`EmptyState`** (`src/components/ui/empty-state.tsx`): Componente padronizado para quando não houver dados (ícone temático de beleza, título, descrição e botão de ação primária).
8. **`Alert`** (`src/components/ui/alert.tsx`): Banners contextuais de aviso, erro, sucesso e informação com ícones correspondentes.
9. **`Skeleton`** (`src/components/ui/skeleton.tsx`): Estruturas em pulso para carregamento progressivo de cards, tabelas e formulários.

---

## 2. Dependências & Arquitetura
- **Dependências Externas:** Nenhuma biblioteca pesada; apenas Tailwind CSS + Lucide Icons (já instalados e otimizados).
- **Compatibilidade:** 100% compatível com Server Components e Client Components (React 19 + Next.js 15).
- **Sem Breaking Changes:** O design system será introduzido como biblioteca modular interna, sem quebrar os formulários atuais antes da migração da Phase 2.

---

## 3. Plano de Testes & Validação (Quality Gate)
- Criar suíte de testes unitários em `tests/unit/design-system.test.ts` validando:
  - Resolução correta de classes e variantes dos componentes (Button, Badge, Alert).
  - Comportamento de estados (`isLoading`, `hasError`, `disabled`).
  - Renderização consistente de tokens e classes semânticas.
- Executar `npx vitest run` e validar aprovação de 100% dos testes.

---

## 4. Rastreabilidade de Requisitos
- Atende aos requisitos: `DS-01`, `DS-02`, `DS-03`, `DS-04` especificados em `.planning/REQUIREMENTS.md`.
