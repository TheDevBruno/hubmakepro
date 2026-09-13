# Papéis de Agentes Especializados (.agents/)

Esta pasta contém as diretrizes e limites operacionais de cada agente do **SaaS Development OS v1.0**.

Nenhum agente possui autoridade para alterar silenciosamente decisões arquiteturais, banco de dados ou regras aprovadas sem Change Request formal.

## Agentes Cadastrados
1. **Architect (`architect/AGENT.md`):** Arquitetura, boundaries, ADRs e integridade do sistema.
2. **Planner (`planner/AGENT.md`):** Planejamento de Sprints, decomposição de tarefas e critérios de aceitação.
3. **Developer (`developer/AGENT.md`):** Implementação objetiva em conformidade com o escopo e padrões.
4. **Database (`database/AGENT.md`):** Modelagem PostgreSQL, migrations, RLS, indexes e constraints no Supabase.
5. **Tester (`tester/AGENT.md`):** Testes unitários, de integração, E2E, banco e regressão.
6. **QA (`qa/AGENT.md`):** Avaliação de ponta a ponta sob o ponto de vista do usuário final.
7. **Security (`security/AGENT.md`):** Auditoria de Auth, RLS, IDOR/BOLA, sanitização e segredos.
8. **UX (`ux/AGENT.md`):** Usabilidade, estados de feedback, consistência visual e acessibilidade.
9. **Deploy (`deploy/AGENT.md`):** Gestão de Git, pipelines CI/CD, Vercel Preview/Production e smoke tests.
10. **Reviewer (`reviewer/AGENT.md`):** Revisão e validação independente (papel primordial do ChatGPT).
