# Nome do app
Gestante Care

## Objetivo
O app serve para guiar as gestantes durante o período gestacional, mostrando os
próximos passos, próximas consultas e exames, e organizando a jornada da
gravidez de forma simples. Também oferece uma vitrine de serviços relacionados
(agendamento de ultrassom, suplementos/vitaminas e cursos).

**Importante:** o app oferece conteúdo educativo genérico e lembretes
organizacionais — ele **não** substitui acompanhamento médico profissional nem
oferece recomendação personalizada/diagnóstico. Isso deve ficar visível para a
usuária (disclaimer) em pontos-chave do app.

## Usuário principal
- **Gestante**: usuária final do app, acompanha sua jornada gestacional.
- **Admin/equipe interna**: usa o painel administrativo para cadastrar e manter
  clínicas, produtos/suplementos e cursos exibidos na vitrine de serviços.

## Problema que resolve
Resolve a dor da dúvida e pressão das grávidas no período gestacional, guiando
durante esse período e ajudando a passar por todo o processo de maneira mais
organizada e fácil, sem ansiedade de "o que vem agora".

## MVP
Telas iniciais de login e cadastro (com coleta de dado gestacional mínimo —
DUM ou DPP — para calcular a semana gestacional). Após cadastro, a gestante
entra na Home. As demais telas do MVP são: Jornada, Serviços e Perfil.

Pontos importantes do escopo do MVP:
- **Serviços é uma vitrine informativa**: mostra ultrassom, suplementos e
  cursos, mas **não processa pagamento real** e **não tem parceiros integrados**
  ainda. A ação da usuária é registrar "tenho interesse" (lead), não comprar.
- **Consentimento LGPD é obrigatório no cadastro**: por lidar com dado de saúde
  (dado sensível), a usuária precisa aceitar explicitamente os termos de uso e
  a política de privacidade antes de concluir o cadastro.
- **Painel Admin simples**: para o time interno cadastrar/editar clínicas,
  produtos e cursos exibidos na vitrine, sem precisar mexer direto no banco.

As telas de UI/UX já foram desenhadas antes deste refinamento. Os elementos
novos descritos abaixo (consentimento, disclaimer, "tenho interesse" no lugar
de checkout, recuperação de senha, painel admin) devem ser **adaptados/
adicionados aos designs existentes**, mantendo o visual original o máximo
possível — não é para recriar as telas do zero.

## Telas
1. Landing page
2. Login
3. Cadastro (+ etapa de dado gestacional: DUM ou DPP)
4. Consentimento/Termos de uso e Política de Privacidade (bloqueia o cadastro
   até o aceite explícito)
5. Home
6. Tela da Jornada (calendário, semana gestacional calculada a partir da DUM/DPP)
7. Tela Serviços (vitrine — ultrassom, suplementos, cursos)
8. Tela de detalhe do serviço + "tenho interesse" (lead — substitui checkout
   real por enquanto)
9. Perfil/configurações (+ acesso à política de privacidade e opção de excluir
   conta/dados, exigido pela LGPD)
10. Recuperação de senha
11. Painel Admin (backoffice): login separado, CRUD simples de clínicas,
    produtos/suplementos e cursos

## Entidades principais
- **Usuário** (conta: email, senha com hash, tipo: gestante | admin)
- **PerfilGestacional** (1:1 com Usuário gestante — DUM, DPP, semana gestacional
  atual calculada)
- **Consulta** (agendada manualmente pela gestante — data, tipo, status)
- **Exame** (similar à consulta — data, tipo, status)
- **Servico** (tipo: ultrassom | suplemento | curso; descrição, preço exibido,
  parceiro associado — se houver)
- **InteresseServico** (lead de uma gestante em um serviço — substitui "Pedido"
  com pagamento real no MVP)
- **ConsentimentoLGPD** (registro do aceite: usuário, versão dos termos,
  data/hora)

## Segurança e Privacidade
- Dado de saúde é dado sensível pela LGPD (art. 11) → consentimento explícito
  obrigatório, finalidade de uso declarada, e opção de exclusão de conta e dados
  a qualquer momento pelo Perfil.
- Disclaimer visível de que o app não substitui acompanhamento médico
  profissional (ex: na Home e na tela da Jornada).
- Senhas sempre armazenadas com hash, nunca em texto puro; sessão de login com
  expiração.
- Nenhum dado de cartão/pagamento é processado no MVP — isso evita todo o
  escopo de conformidade PCI-DSS até a fase 2, quando entrar um gateway de
  pagamento real.

## Fora de escopo do MVP (fase 2+)
- Pagamento real e checkout.
- Parceiros reais (clínicas, farmácias) integrados via API/contrato comercial.
- Orientação personalizada ou telemedicina (chat com profissional de saúde).
- Notificações push (fica como lembrete dentro do app na v1).
