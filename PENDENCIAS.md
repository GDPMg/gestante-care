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

2. **Destino do botão 🔔 (notificação)** — ainda sem navegação definida. O
   sino também sempre mostra uma bolinha vermelha fixa, não ligada a
   notificações reais. (O botão 🙂 já foi resolvido: leva para
   `/semana-gestacional`.)

3. **Destino do banner "Sua gestação"** — é clicável, mas ainda não decidimos
   pra qual tela ele deve levar.

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
