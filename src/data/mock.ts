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
