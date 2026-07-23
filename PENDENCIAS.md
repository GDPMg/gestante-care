# Pendências e decisões em aberto

Lista de coisas discutidas mas ainda não decididas/implementadas, por tela.
Vai crescendo conforme novas telas forem construídas.

## Home

1. **Loading do nome e da semana gestacional** — hoje a Home renderiza antes
   dos dados chegarem do Supabase, então "Olá" e o card de gestação aparecem
   vazios por um instante e só depois preenchem. Alternativas discutidas:
   skeleton loading (recomendado), tela de carregamento cheia antes de exibir
   a Home, buscar os dados já no login/cadastro antes de navegar, ou um cache
   central dos dados do usuário compartilhado entre telas. Nada implementado
   ainda — assunto pausado por enquanto.

2. **Bolinha vermelha do sino é sempre fixa** — não reflete uma contagem
   real de não lidas, porque as notificações ainda não existem de verdade
   (ver seção "Notificações" abaixo). (O destino do botão já foi resolvido:
   leva para `/notificacoes`, assim como o 🙂 leva para
   `/semana-gestacional`.)

3. ~~Destino do banner "Sua gestação"~~ — resolvido: leva para
   `/semana-gestacional`, igual ao botão 🙂.

4. **"Próxima consulta" e "Próximo exame" são conteúdo fixo (mock)** — ainda
   não decidimos como vai funcionar o controle real de agendamento de
   consultas/exames (quem cadastra, de onde vêm os dados).

5. **Conteúdo do banner de oferta é fixo no código** (`ofertaDestaqueMock` em
   `src/data/mock.ts`) — no futuro provavelmente precisa vir do Painel Admin,
   pra dar pra trocar sem mexer em código.

6. **Sem proteção de rota** — qualquer pessoa consegue abrir `/home` direto
   pela URL sem estar logada. Não é específico da Home, vale pra todas as
   telas internas do app (Jornada, Serviços, Perfil também vão precisar
   disso).

## Semana Gestacional (`/semana-gestacional`, destino do botão 🙂 da Home)

7. **Sem ilustração do bebê na barriga** — a tela sempre deveria mostrar uma
   imagem (padrão/genérica, não upload da usuária) representando como o bebê
   está naquela semana. Ainda não temos esse banco de imagens, então por
   enquanto aparece um placeholder ("Ilustração da semana em breve").

8. **Conteúdo por semana incompleto** — comprimento, peso, "o que muda",
   "o que você pode sentir" e "merece atenção" só existem (mockados) pra
   semana 22, em `infoSemanaGestacionalMock` (`src/data/mock.ts`). Precisamos
   decidir/escrever esse conteúdo pra todas as 42 semanas (provavelmente com
   revisão de alguém da área de saúde, já que é conteúdo educativo sensível).
   Semanas sem dado mostram um fallback ("Conteúdo dessa semana ainda não
   disponível") em vez de quebrar.

## Notificações (`/notificacoes`, destino do botão 🔔 da Home)

9. **Só a tela existe — nada funciona de verdade ainda.** A lista vem de
   `notificacoesMock` (`src/data/mock.ts`), com 4 notificações de exemplo e
   tempos relativos fixos ("há 2h", "há 1 dia") que não são calculados a
   partir de datas reais.

10. **Arquitetura de push notifications reais já foi desenhada, mas não
    implementada** — decidimos (nesta conversa) que a versão real vai usar
    Web Push de verdade (aparece na bandeja do celular mesmo com o app
    fechado), gerado por um job agendado no servidor, não só quando o app
    abre. Isso envolve: tabelas `push_subscriptions`/`notificacoes`/
    `notificacoes_semana_templates`, chaves VAPID, um service worker
    customizado (troca de `generateSW` pra `injectManifest` no
    `vite-plugin-pwa`), uma Supabase Edge Function pra disparar os envios, e
    `pg_cron` pra rodar o job diariamente. Retomar quando o usuário decidir
    avançar pra fazer funcionar de verdade.

11. **Notificação avulsa/pontual** ("decidido na hora, manda uma vez só") —
    no desenho da arquitetura acima, isso seria feito invocando a Edge
    Function manualmente (via dashboard do Supabase) com o texto e o(s)
    destinatário(s). Não existe UI de admin pra isso ainda.

12. **Lembretes de consulta/exame chegando** — dependem de agendamento real
    (item 4 da seção Home), que ainda não existe. Bloqueado até essa decisão.

13. **Sem contagem real de não lidas** — a Home mostra a bolinha vermelha do
    sino sempre fixa (item 2 acima); isso só faz sentido resolver depois que
    a tabela `notificacoes` existir de verdade.

## Serviços (`/servicos`)

14. **Botões "Tenho interesse" (WhatsApp) sem número definido** — tanto o
    card de destaque da vitrine quanto o botão no final de **cada** tela de
    detalhe de serviço (`/servicos/:id`) já têm o visual certo (ícone +
    "Tenho interesse"), mas ainda **não temos o número de telefone** pra
    onde encaminhar. Quando tivermos, os botões viram links
    `https://wa.me/55XXXXXXXXXXX?text=...`.

15. **Vitrine e telas de detalhe ainda são só mockadas** (`servicosMock` em
    `src/data/mock.ts`, incluindo os campos `paraQuemEhIndicado` e
    `quandoDetalhe` usados no detalhe) — virar dado real de banco está
    amarrado à construção do Painel Admin (quem vai cadastrar/editar isso
    sem mexer em código). Ver também item 5 da seção Home (mesmo raciocínio
    já vale pro banner de oferta).

16. **Conteúdo de "para quem é indicado"/"quando costuma ser feito" é
    rascunho pra 6 dos 8 serviços** — só Ultrassom e Vitaminas e
    suplementação vieram das imagens reais enviadas; os outros 6 (Laboratório,
    Nutrologia, Preparação para o parto, Curso de gestante, Consulta
    pós-parto, Pediatria inicial) foram escritos no mesmo tom como exemplo,
    precisam de revisão (mesmo cuidado já registrado pro conteúdo da Semana
    Gestacional).

17. **Sem imagem real por serviço na tela de detalhe** — mesmo placeholder
    (ícone de coração) usado em todos, mesma situação já registrada pra
    Semana Gestacional.

## Perfil (`/perfil`)

18. **Upload de foto de perfil não é funcional** — o botão de editar (lápis)
    aparece, mas ainda não faz nada. A "foto" hoje é sempre a inicial do
    nome num círculo verde.

19. **"Editar perfil" sem destino definido** — link visível abaixo do nome,
    ainda sem navegação/comportamento.

20. **Os 4 itens de "Configurações" (Conta, Segurança, Termos e
    privacidade, Ajuda e suporte) não levam a lugar nenhum** — só visual
    por enquanto, aguardando o usuário explicar o que cada um deve fazer.

21. **"Atualizar minha gestação" sem comportamento definido** (antes
    chamado "Informar fim da gestação") — link visível, sem ação ao tocar.

**Atualização**: editar a "Data prevista do parto" e a "Semana de
gestação" deixou de ser inline — agora cada uma abre sua própria tela
(`/perfil/data-prevista-parto` e `/perfil/semana`), com botão "Salvar
alterações". A de semana usa um seletor de +/- (não o dropdown do
Cadastro).

O que **já funciona de verdade** nesta tela (testado ponta a ponta): editar
e salvar a data prevista do parto (`dpp_confirmada`, coluna em
`perfil_gestacional`), editar e salvar a semana gestacional, e "Sair da
conta" (encerra a sessão e volta pro Login).

## Conta (`/perfil/conta`, dentro de Configurações)

22. **Alterar e-mail funciona de verdade** — usa o fluxo nativo do Supabase
    Auth (`updateUser` + link de confirmação por e-mail, `emailRedirectTo`
    apontando pra `/perfil/conta/email-confirmado`). Depende da Redirect URL
    (`/**`) cadastrada em Authentication → URL Configuration. Decisão do
    usuário: **manter "Secure email change" ativado** — o link de
    confirmação vai tanto pro e-mail antigo quanto pro novo, mas testamos na
    prática e **confirmar em qualquer um dos dois já efetiva a troca**
    (não precisa dos dois). As telas já foram ajustadas pra refletir isso.

23. **Alterar telefone é só visual, sem SMS real** — mesmo motivo já
    registrado antes (falta provedor de SMS configurado no Supabase, tipo
    Twilio). O fluxo completo (tela de telefone → código de 6 dígitos →
    sucesso) existe e funciona visualmente, mas nenhuma etapa chama o
    Supabase de verdade nem valida o código — qualquer coisa digitada
    "confirma". Quando decidirmos configurar um provedor de SMS, dá pra
    trocar por `supabase.auth.updateUser({ phone })` +
    `verifyOtp({ type: 'phone_change' })`.

24. **Alterar data de nascimento funciona de verdade** — atualiza
    `perfis.data_nascimento` direto, sem verificação (como planejado, já
    que não é um dado sensível de autenticação).
