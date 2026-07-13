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
