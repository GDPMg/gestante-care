export type Servico = {
  id: string
  tipo: 'ultrassom' | 'suplemento' | 'curso'
  nome: string
  descricao: string
  precoExibido: string
}

export const servicosMock: Servico[] = [
  {
    id: '1',
    tipo: 'ultrassom',
    nome: 'Ultrassom morfológico',
    descricao: 'Exame de imagem detalhado indicado entre a 20ª e 24ª semana.',
    precoExibido: 'R$ 250',
  },
  {
    id: '2',
    tipo: 'suplemento',
    nome: 'Vitamina pré-natal',
    descricao: 'Suplemento com ácido fólico, ferro e vitaminas essenciais na gestação.',
    precoExibido: 'R$ 60',
  },
  {
    id: '3',
    tipo: 'curso',
    nome: 'Curso de gestação tranquila',
    descricao: 'Conteúdo em vídeo sobre os principais cuidados em cada trimestre.',
    precoExibido: 'R$ 120',
  },
]

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
