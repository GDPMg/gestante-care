export type CategoriaServico = 'exames' | 'saude' | 'cursos' | 'pos-parto'

export type Servico = {
  id: string
  categoria: CategoriaServico
  nome: string
  descricao: string
  quando: string
  paraQuemEhIndicado: string
  quandoDetalhe: string
}

export const CATEGORIAS_SERVICO: { id: 'todos' | CategoriaServico; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'exames', label: 'Exames e acompanhamento' },
  { id: 'saude', label: 'Saúde e bem-estar' },
  { id: 'cursos', label: 'Cursos' },
  { id: 'pos-parto', label: 'Pós-parto' },
]

// paraQuemEhIndicado/quandoDetalhe: só Ultrassom e Vitaminas e suplementação
// vieram das imagens reais enviadas; os demais são rascunho no mesmo tom,
// a revisar depois (ver PENDENCIAS.md).
export const servicosMock: Servico[] = [
  {
    id: 'ultrassom',
    categoria: 'exames',
    nome: 'Ultrassom',
    descricao: 'Acompanhe o desenvolvimento do bebê com imagens detalhadas.',
    quando: 'Todos os trimestres',
    paraQuemEhIndicado: 'Indicado para todas as gestantes, conforme o calendário do pré-natal e solicitações da sua equipe.',
    quandoDetalhe: 'Em momentos específicos da gestação — translucência nucal, morfológico e obstétrico.',
  },
  {
    id: 'laboratorio',
    categoria: 'exames',
    nome: 'Laboratório',
    descricao: 'Coleta de exames de sangue e urina no mesmo local.',
    quando: 'Conforme solicitação',
    paraQuemEhIndicado: 'Indicado para todas as gestantes, como parte do acompanhamento de rotina do pré-natal.',
    quandoDetalhe: 'Conforme solicitado pela sua equipe, geralmente a cada trimestre.',
  },
  {
    id: 'nutrologia',
    categoria: 'saude',
    nome: 'Nutrologia',
    descricao: 'Orientação alimentar personalizada para a gestação.',
    quando: 'A partir do 1º trimestre',
    paraQuemEhIndicado: 'Indicado para gestantes que querem orientação alimentar personalizada durante a gravidez.',
    quandoDetalhe: 'Pode começar a partir do 1º trimestre e continuar ao longo da gestação.',
  },
  {
    id: 'vitaminas-suplementacao',
    categoria: 'saude',
    nome: 'Vitaminas e suplementação',
    descricao: 'Suplementos sob orientação profissional.',
    quando: 'Conforme avaliação',
    paraQuemEhIndicado: 'Indicado individualmente, sempre validado pela sua equipe de saúde.',
    quandoDetalhe: 'Definido pela equipe conforme seus exames e necessidades.',
  },
  {
    id: 'preparacao-parto',
    categoria: 'saude',
    nome: 'Preparação para o parto',
    descricao: 'Fisioterapia e técnicas para o momento do parto.',
    quando: '3º trimestre',
    paraQuemEhIndicado: 'Indicado para gestantes que querem se preparar fisicamente e emocionalmente para o parto.',
    quandoDetalhe: 'Geralmente a partir do 3º trimestre.',
  },
  {
    id: 'curso-gestante',
    categoria: 'cursos',
    nome: 'Curso de gestante',
    descricao: 'Encontros sobre gravidez, parto e pós-parto.',
    quando: '2º e 3º trimestre',
    paraQuemEhIndicado: 'Indicado para gestantes e acompanhantes que querem se informar sobre gravidez, parto e pós-parto.',
    quandoDetalhe: 'Turmas abertas no 2º e 3º trimestre.',
  },
  {
    id: 'consulta-pos-parto',
    categoria: 'pos-parto',
    nome: 'Consulta pós-parto',
    descricao: 'Acompanhamento da sua recuperação após o nascimento.',
    quando: 'Pós-parto',
    paraQuemEhIndicado: 'Indicado para todas as mães, como parte do acompanhamento da recuperação após o parto.',
    quandoDetalhe: 'Nas primeiras semanas após o nascimento do bebê.',
  },
  {
    id: 'pediatria-inicial',
    categoria: 'pos-parto',
    nome: 'Pediatria inicial',
    descricao: 'Primeiras consultas do bebê com nossa equipe.',
    quando: 'Pós-parto',
    paraQuemEhIndicado: 'Indicado para o bebê, nas primeiras consultas de acompanhamento pediátrico.',
    quandoDetalhe: 'Nos primeiros dias e semanas após o nascimento.',
  },
]

// Card de destaque no topo da vitrine — conteúdo muda com frequência
// (campanhas), por isso fica isolado aqui, mesmo padrão do ofertaDestaqueMock.
export const destaqueServicosMock = {
  tag: 'Destaque',
  titulo: 'Garanta seu parto na Femina',
  descricao: 'Converse com nossa equipe para conhecer as opções de parto, estrutura, valores e formas de pagamento.',
  botao: 'Tenho interesse',
}

// Texto fixo (não varia por serviço) exibido na tela de detalhe.
export const disclaimerServicoDetalhe =
  'A indicação final deste serviço deve ser sempre validada pela sua equipe de saúde.'

export type Consulta = {
  id: string
  tipo: string
  data: string
  status: 'agendada' | 'realizada'
}

export const consultasMock: Consulta[] = [
  { id: '1', tipo: 'Consulta obstétrica', data: '2026-07-10', status: 'agendada' },
  { id: '2', tipo: 'Exame de sangue', data: '2026-07-18', status: 'agendada' },
]

export const perfilGestacionalMock = {
  dum: '2026-01-15',
  semanaAtual: 24,
}

// Conteúdo do banner de destaque da Home. Muda com frequência (ofertas,
// campanhas), por isso fica isolado aqui em vez de hardcoded na página.
export const ofertaDestaqueMock = {
  tag: 'Oferta da semana',
  titulo: 'Curso de gestante com 20% de desconto',
  descricao: 'Garanta sua vaga nas turmas de julho e prepare-se com tranquilidade para o parto.',
  botao: 'Ver oferta',
}

// Sem controle real de agenda ainda (ver PRODUCT_SPEC.md), então a Home
// mostra um conteúdo padrão em vez de dados de um backend de agendamento.
export const proximaConsultaMock = {
  dia: '22',
  mes: 'JUN',
  tipo: 'Pré-natal',
  horario: '14:30',
  selo: 'Hoje',
}

export const proximoExameMock = {
  nome: 'Ultrassom morfológico',
  status: 'A agendar',
}

export type Notificacao = {
  id: string
  categoria: string
  tempo: string
  titulo: string
  descricao: string
}

// Lista de notificações de exemplo — ainda não temos push real nem geração
// automática (ver PENDENCIAS.md). Tempos relativos ("há 2h") são texto fixo
// por enquanto, não calculados a partir de uma data real.
export const notificacoesMock: Notificacao[] = [
  {
    id: '1',
    categoria: 'Consulta',
    tempo: 'há 2h',
    titulo: 'Consulta hoje às 14:30',
    descricao: 'Unidade Centro · Dra. Helena Costa',
  },
  {
    id: '2',
    categoria: 'Pendência',
    tempo: 'há 1 dia',
    titulo: 'Agende seu ultrassom morfológico',
    descricao: 'Recomendado entre 20 e 24 semanas',
  },
  {
    id: '3',
    categoria: 'Exame',
    tempo: 'há 2 dias',
    titulo: 'Resultado de hemograma disponível',
    descricao: 'Toque para ver na aba Exames',
  },
  {
    id: '4',
    categoria: 'Femina',
    tempo: 'há 4 dias',
    titulo: 'Curso de gestante: novas turmas',
    descricao: 'Inscrições abertas para julho',
  },
]

export type InfoSemanaGestacional = {
  semana: number
  comprimentoCm: number
  pesoG: number
  oQueMuda: string
  oQuePodeSentir: string[]
  mereceAtencao: string[]
}

// Conteúdo educativo por semana gestacional (comprimento/peso do bebê,
// sintomas comuns, sinais de alerta). Ainda não temos essa base completa —
// só a semana 22 está preenchida como exemplo. Ver PENDENCIAS.md.
export const infoSemanaGestacionalMock: InfoSemanaGestacional[] = [
  {
    semana: 22,
    comprimentoCm: 27.8,
    pesoG: 430,
    oQueMuda:
      'É uma fase importante de crescimento. Os sentidos do bebê se desenvolvem e ele já reage a sons e à luz. Os movimentos ficam mais coordenados e frequentes.',
    oQuePodeSentir: [
      'Mais movimentos e chutes ao longo do dia',
      'Variações no sono e mais vontade de descansar',
      'Apetite mais regular do que nas primeiras semanas',
    ],
    mereceAtencao: [
      'Redução importante dos movimentos',
      'Sangramento ou perda de líquido',
      'Contrações ritmadas antes da hora',
    ],
  },
]
