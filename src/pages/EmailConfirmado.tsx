import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'

export default function EmailConfirmado() {
  const navigate = useNavigate()

  return (
    <AppLayout>
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-tint">
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h1 className="font-serif text-2xl text-brand-ink">E-mail atualizado!</h1>
          <p className="mt-2 text-brand-muted">
            Sua alteração já foi confirmada e está valendo. Se você não pediu essa troca, entre em contato com a
            gente o quanto antes.
          </p>
        </div>
        <Button onClick={() => navigate('/perfil/conta')}>Voltar para Conta</Button>
      </div>
    </AppLayout>
  )
}
