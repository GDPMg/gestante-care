// Placeholder cinza animado, usado no lugar do conteúdo enquanto os dados
// carregam pela primeira vez (quando ainda não há nada no cache).
export default function Skeleton({ className = '' }: { className?: string }) {
  return <span className={`inline-block animate-pulse rounded-md bg-brand-border/70 ${className}`} />
}
