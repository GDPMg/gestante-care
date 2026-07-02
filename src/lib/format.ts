export function formatCPF(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim().replace(/-$/, '')
  }
  return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim().replace(/-$/, '')
}

export function formatBirthDate(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  return digits
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d{1,4})$/, '$1/$2')
}

const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]

export function calculateDueDate(semanaAtual: number, referenceDate = new Date()) {
  const weeksRemaining = 40 - semanaAtual
  const dueDate = new Date(referenceDate)
  dueDate.setDate(dueDate.getDate() + weeksRemaining * 7)
  return dueDate
}

export function formatDueDateLabel(dueDate: Date) {
  const day = dueDate.getDate()
  const parte = day <= 10 ? 'Início de' : day <= 20 ? 'Meio de' : 'Final de'
  return `${parte} ${MESES[dueDate.getMonth()]} de ${dueDate.getFullYear()}`
}

export function estimateDueDate(semanaAtual: number, referenceDate = new Date()) {
  return formatDueDateLabel(calculateDueDate(semanaAtual, referenceDate))
}

export function toISODate(date: Date) {
  return date.toISOString().slice(0, 10)
}

export function parseBirthDateToISO(value: string) {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!match) return null
  const [, day, month, year] = match
  return `${year}-${month}-${day}`
}
