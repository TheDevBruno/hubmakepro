# SKILL: Vercel Deployments

## Objetivo
Gerenciar a integração, builds, previews e deployments na Vercel.

## Diretrizes
- Configuração de Environment Variables isoladas por ambiente (Preview vs Production).
- Monitoramento de logs de build e execução de Serverless/Edge functions.
- Validação do deployment de Preview a cada Pull Request.
- Execução de Smoke Test na URL gerada pela Vercel antes de aprovar o deploy para Produção.
