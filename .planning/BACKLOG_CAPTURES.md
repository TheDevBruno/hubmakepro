# BACKLOG DE EVOLUÇÃO & REFINAMENTO OPERACIONAL (v1.1 / v2.0)
Capturado via `/gsd-capture` em 2026-09-13.

---

### 1. Configurações Avançadas da Organização / Espaço
- [ ] **Informações de Contato:** WhatsApp principal, telefone secundário, e-mail comercial, redes sociais (Instagram, Facebook).
- [ ] **Horário de Funcionamento:** Grade semanal por dia (segunda a domingo), horário de abertura/fechamento e pausas/almoço.
- [ ] **Detalhes do Estabelecimento:** Endereço completo, link do Google Maps, regras de cancelamento e tolerância de atraso.
- [ ] **Segmentação de Serviços:** Ativação granular por nicho (Make, Lash, Nails, Hair, Sobrancelhas, Estética Facial/Corporal).

---

### 2. Gestão Completa de Especialistas & Profissionais
- [ ] **Contato & Perfil:** WhatsApp de contato, foto/avatar do especialista, bio e links sociais.
- [ ] **Horários de Atendimento Individuais:** Grade personalizada de disponibilidade (dias e horários específicos de cada profissional).
- [ ] **Vínculo Especialista x Serviços:** Associação direta dos procedimentos que cada profissional realiza.
- [ ] **Modais de Edição:** Edição inline/modal de percentual de comissão, status ativo/inativo e dados de contato.

---

### 3. Ficha de Clientes & Histórico 360°
- [ ] **Dados de Contato:** Endereço, CPF (opcional para NF), canal de preferência de contato.
- [ ] **Histórico Completo de Atendimentos:** Linha do tempo de todos os procedimentos realizados, valores pagos, especialista responsável e observações técnicas passadas.
- [ ] **Evolução da Anamnese:** Atualização contínua de fichas técnicas (curvatura lash, retoque de unhas, sensibilidade na pele).

---

### 4. Agenda Operacional Flexível & Edição Dinâmica
- [ ] **Edição de Atendimentos Existentes:** Modal para alterar horário (reagendamento), trocar especialista responsável e alterar/adicionar serviços na comanda.
- [ ] **Cards Interativos com Modal:** Clique em qualquer card de agendamento abre modal completo com edição de status, observações e dados do cliente.
- [ ] **Cancelamento e Reagendamento com WhatsApp:** Disparo de notificação de reagendamento para o cliente.

---

### 5. Performance & Otimização de Resposta (UX)
- [ ] **Otimização de Navegação entre Páginas:** Implementação de prefetching inteligente no Next.js (`Link prefetch`), Server Component caching e estados de loading instantâneos com `loading.tsx` e skeletons modernos para transições com zero atraso percebido.
