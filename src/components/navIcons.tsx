export function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10.5L12 4l8 6.5" />
      <path d="M6 9.5V19a1 1 0 001 1h3v-5h4v5h3a1 1 0 001-1V9.5" />
    </svg>
  )
}

export function JornadaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M14.8 9.2L12.8 12l-1.6 3.6L13.2 12l1.6-2.8z" />
    </svg>
  )
}

export function ServicosIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20s-6.5-4.2-9.2-8C1 9.2 1.4 6 3.8 4.6c2.2-1.3 4.7-.6 6.2 1.4 1.5-2 4-2.7 6.2-1.4 2.4 1.4 2.8 4.6.9 7.4C18.5 15.8 12 20 12 20z" />
    </svg>
  )
}

export function PerfilIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6" />
    </svg>
  )
}

export const ITENS = [
  { path: '/home', label: 'Início', Icon: HomeIcon },
  { path: '/jornada', label: 'Jornada', Icon: JornadaIcon },
  { path: '/servicos', label: 'Serviços', Icon: ServicosIcon },
  { path: '/perfil', label: 'Perfil', Icon: PerfilIcon },
]

// Rotas que não são a Home em si, mas são acessadas a partir dela e devem
// manter o item "Início" destacado na navegação (ex: detalhe da semana
// gestacional).
const SUB_ROTAS_INICIO = ['/semana-gestacional', '/notificacoes']

export function isNavItemAtivo(path: string, pathname: string) {
  if (pathname === path || pathname.startsWith(`${path}/`)) return true
  if (path === '/home') return SUB_ROTAS_INICIO.includes(pathname)
  return false
}
