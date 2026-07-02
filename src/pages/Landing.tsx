import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-8 px-6 py-10">
      <div className="relative h-64 overflow-hidden rounded-3xl bg-brand-green-tint">
        <div className="absolute -top-8 -right-10 h-40 w-40 rounded-full bg-white/50" />
        <div className="absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-brand-green-tint/80 ring-8 ring-white/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span className="h-4 w-4 rounded-full bg-brand-gold" />
          <svg viewBox="0 0 24 24" className="h-14 w-14 fill-brand-green">
            <path d="M12 21s-6.7-4.35-9.5-8.28C.7 10.1 1 6.6 3.6 4.9 6 3.3 8.9 4.1 12 7.3c3.1-3.2 6-4 8.4-2.4 2.6 1.7 2.9 5.2 1.1 7.82C18.7 16.65 12 21 12 21z" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="font-serif text-4xl leading-tight text-brand-ink">
          Do primeiro dia da gestação para toda a vida
        </h1>
        <p className="text-brand-muted">
          Consultas, exames, orientações e próximos passos do pré-natal — tudo
          reunido em um só lugar, com calma e cuidado.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button onClick={() => navigate('/cadastro')}>Começar</Button>
        <Button variant="secondary" onClick={() => navigate('/login')}>
          Já tenho cadastro
        </Button>
      </div>
    </div>
  )
}
