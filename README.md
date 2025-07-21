# Jordanha Advocacia - Website

## Configuração do Email

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

\`\`\`env
# Gmail (recomendado)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app-do-gmail
SMTP_FROM=noreply@jordanhaadvocacia.com.br
CONTACT_EMAIL=contato@jordanhaadvocacia.com.br
\`\`\`

### Configuração do Gmail

1. Ative a verificação em duas etapas na sua conta Google
2. Gere uma "Senha de app" específica para este projeto
3. Use essa senha de app na variável `SMTP_PASS`

### Outros Provedores SMTP

#### Outlook/Hotmail
\`\`\`env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
\`\`\`

#### Yahoo
\`\`\`env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
\`\`\`

### Rate Limiting

- Cada IP pode enviar apenas 1 email a cada 30 minutos
- O sistema armazena tentativas em memória (para produção, use Redis)
- Mensagens de erro informativas para o usuário

### Funcionalidades

- ✅ Validação de campos obrigatórios
- ✅ Validação de formato de email
- ✅ Rate limiting (1 email/30min por IP)
- ✅ Feedback visual para o usuário
- ✅ Loading states
- ✅ Mensagens de erro/sucesso
- ✅ Template HTML elegante para emails
- ✅ Fallback para WhatsApp em caso de erro
