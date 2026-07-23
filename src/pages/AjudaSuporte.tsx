import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import { WhatsAppIcon } from '../components/icons'

export default function AjudaSuporte() {
  const navigate = useNavigate()

  return (
    <AppLayout>
      <button
        onClick={() => navigate('/perfil')}
        className="flex w-fit items-center gap-1 text-sm font-medium text-brand-green"
      >
        <span aria-hidden>‹</span> Perfil
      </button>

      <div>
        <h1 className="font-serif text-3xl text-brand-ink">Fale com a gente</h1>
        <p className="mt-1 text-brand-muted">
          Fale com a nossa equipe pelo WhatsApp para tirar dúvidas ou qualquer assunto sobre o app.
        </p>
      </div>

      {/* Sem número de WhatsApp definido ainda — botão fica sem destino (ver PENDENCIAS.md) */}
      <Button className="flex items-center justify-center gap-2">
        <WhatsAppIcon className="h-5 w-5" />
        Falar pelo WhatsApp
      </Button>

      <div className="rounded-2xl border border-brand-border bg-white p-4">
        <p className="font-semibold text-brand-ink">Horário de atendimento</p>
        <p className="mt-1 text-brand-muted">Segunda a sexta, das 8h às 18h · Sábado, das 8h às 12h</p>
      </div>

      <div className="rounded-2xl bg-red-50 p-4">
        <p className="text-red-800">
          <span className="font-semibold">⚠️ Em caso de urgência</span>, não aguarde resposta pelo app. Procure
          atendimento médico presencial ou o pronto-socorro mais próximo.
        </p>
      </div>
    </AppLayout>
  )
}
