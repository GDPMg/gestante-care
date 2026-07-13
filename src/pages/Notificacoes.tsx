import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import { notificacoesMock } from '../data/mock'

export default function Notificacoes() {
  const navigate = useNavigate()

  return (
    <AppLayout>
      <button
        onClick={() => navigate('/home')}
        className="flex w-fit items-center gap-1 text-sm font-medium text-brand-green"
      >
        <span aria-hidden>‹</span> Início
      </button>

      <h1 className="font-serif text-3xl text-brand-ink">Notificações</h1>

      <div className="flex flex-col gap-4">
        {notificacoesMock.map((item) => (
          <div key={item.id} className="flex gap-3 rounded-2xl border border-brand-border bg-white p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green-tint text-lg">
              🔔
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold tracking-wide text-brand-green">
                {item.categoria.toUpperCase()} <span className="font-normal text-brand-muted">· {item.tempo}</span>
              </p>
              <p className="mt-1 font-semibold text-brand-ink">{item.titulo}</p>
              <p className="mt-0.5 text-sm text-brand-muted">{item.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
