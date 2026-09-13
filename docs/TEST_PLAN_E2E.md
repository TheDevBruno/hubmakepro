# PLANO DE TESTES PRÁTICOS E VALIDAÇÃO E2E EM PRODUÇÃO

Este roteiro valida a integridade operacional de ponta a ponta do **Hub MakePro** em ambiente online.

---

## 📋 Cenário 1: Cadastro do Salão / Profissional e Login SSR
- [ ] **Passo 1.1:** Acessar a tela `/register` e cadastrar uma nova conta de e-mail e senha.
- [ ] **Passo 1.2:** Verificar se o redirecionamento automático para o `/dashboard` ocorre com sucesso.
- [ ] **Passo 1.3:** Testar persistência da sessão recarregando a página (`F5`).
- [ ] **Passo 1.4:** Clicar no botão "+ Nova Org" no seletor de organização e criar um espaço (ex: "Studio Bella Make & Lash").

---

## 💄 Cenário 2: Configuração de Catálogo e Equipe
- [ ] **Passo 2.1:** Acessar `/services` e cadastrar procedimentos:
  - Serviço 1: "Make Noiva Premium" (Duração: 90 min, Valor: R$ 250,00, Categoria: Maquiagem).
  - Serviço 2: "Extensão de Cílios Volume Russo" (Duração: 120 min, Valor: R$ 180,00, Categoria: Cílios/Lash).
- [ ] **Passo 2.2:** Acessar `/specialists` e cadastrar profissionais:
  - Profissional 1: "Camila Make" (Comissão: 60%, Especialidades: Maquiagem).
  - Profissional 2: "Beatriz Lash" (Comissão: 50%, Especialidades: Cílios).

---

## 🌐 Cenário 3: Agendamento Público Online 24h
- [ ] **Passo 3.1:** Acessar a rota pública em uma aba anônima: `/book/[slug-do-seu-espaco]`.
- [ ] **Passo 3.2:** Selecionar o serviço "Make Noiva Premium".
- [ ] **Passo 3.3:** Selecionar a especialista "Camila Make".
- [ ] **Passo 3.4:** Escolher data e horário.
- [ ] **Passo 3.5:** Preencher nome do cliente ("Luciana Rocha") e WhatsApp ("11999998888").
- [ ] **Passo 3.6:** Clicar em "Confirmar Agendamento Online" e verificar se a tela de sucesso surge com o botão de WhatsApp.
- [ ] **Passo 3.7:** Clicar no botão de WhatsApp e verificar se o texto é gerado com a mensagem formatada.

---

## 📅 Cenário 4: Operação de Agenda e Ficha de Anamnese
- [ ] **Passo 4.1:** Retornar ao painel administrativo e acessar `/appointments`.
- [ ] **Passo 4.2:** Confirmar que o agendamento da cliente "Luciana Rocha" está visível com status `Confirmado` e horários corretos.
- [ ] **Passo 4.3:** Acessar `/clients`, localizar "Luciana Rocha" e preencher a ficha de anamnese (tipo de pele, alergias, formato preferido).

---

## 💰 Cenário 5: Fechamento de Comanda & Divisão de Comissões
- [ ] **Passo 5.1:** Acessar `/financial` e verificar se a transação foi registrada após o fechamento do atendimento.
- [ ] **Passo 5.2:** Conferir o cálculo:
  - Faturamento Bruto: R$ 250,00
  - Comissão da Especialista (60%): R$ 150,00
  - Lucro Líquido do Salão (40%): R$ 100,00
- [ ] **Passo 5.3:** Conferir a discriminação por método de pagamento (Pix / Cartão / Dinheiro).
