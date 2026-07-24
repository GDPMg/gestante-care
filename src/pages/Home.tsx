import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Skeleton from '../components/Skeleton'
import { useUserData } from '../contexts/UserDataContext'
import { ofertaDestaqueMock, proximaConsultaMock, proximoExameMock } from '../data/mock'

function GestationRing({ semana }: { semana: number }) {
  const raio = 22
  const circunferencia = 2 * Math.PI * raio
  const progresso = Math.min(semana / 40, 1)
  const offset = circunferencia * (1 - progresso)

  return (
    <div className="relative h-14 w-14 shrink-0">
      <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90">
        <circle cx="28" cy="28" r={raio} fill="none" stroke="#d7ded4" strokeWidth="4" />
        <circle
          cx="28"
          cy="28"
          r={raio}
          fill="none"
          stroke="#5c8368"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circunferencia}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-brand-green-dark">
        {semana}ª
      </span>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { primeiroNome, semana: semanaAtual, loading } = useUserData()

  return (
    <AppLayout>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-brand-muted">Bem-vinda de volta</p>
          <h1 className="font-serif text-2xl text-brand-ink">
            {loading && !primeiroNome ? (
              <>Olá, <Skeleton className="h-6 w-28 align-middle" /></>
            ) : (
              <>Olá{primeiroNome && `, ${primeiroNome}`}</>
            )}
          </h1>
        </div>
        <button
          onClick={() => navigate('/notificacoes')}
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-border bg-white text-lg"
        >
          🔔
          <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
      </div>

      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-4">
        {semanaAtual ? (
          <button
            onClick={() => navigate('/semana-gestacional')}
            className="flex items-center gap-4 rounded-3xl bg-brand-green-tint p-4 text-left"
          >
            <GestationRing semana={semanaAtual} />
            <div className="flex-1">
              <p className="text-xs font-semibold tracking-wide text-brand-green">SUA GESTAÇÃO</p>
              <p className="font-medium text-brand-ink">Você está na {semanaAtual}ª semana</p>
            </div>
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand-muted" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        ) : (
          loading && (
            <div className="flex items-center gap-4 rounded-3xl bg-brand-green-tint p-4">
              <Skeleton className="h-14 w-14 shrink-0 rounded-full" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          )
        )}

        <button
          onClick={() => navigate('/servicos')}
          className="relative overflow-hidden rounded-3xl bg-[#c17a3f] p-5 text-left text-white"
        >
          <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/10" />
          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
            🏷️ {ofertaDestaqueMock.tag.toUpperCase()}
          </span>
          <h2 className="mt-3 font-serif text-xl leading-snug">{ofertaDestaqueMock.titulo}</h2>
          <p className="mt-2 text-sm text-white/85">{ofertaDestaqueMock.descricao}</p>
          <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#c17a3f]">
            {ofertaDestaqueMock.botao} ›
          </span>
        </button>
      </div>

      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-4">
        <section>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold text-brand-ink">Próxima consulta</h3>
            <button onClick={() => navigate('/jornada')} className="text-sm font-medium text-brand-green">
              Ver todas
            </button>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-brand-border bg-white p-4">
            <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-green-tint">
              <span className="text-[10px] font-semibold text-brand-green">{proximaConsultaMock.mes}</span>
              <span className="text-lg leading-none font-bold text-brand-green-dark">{proximaConsultaMock.dia}</span>
            </div>
            <p className="flex-1 font-medium text-brand-ink">
              {proximaConsultaMock.tipo} · {proximaConsultaMock.horario}
            </p>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
              {proximaConsultaMock.selo}
            </span>
          </div>
        </section>

        <section>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-semibold text-brand-ink">Próximo exame</h3>
            <button onClick={() => navigate('/jornada')} className="text-sm font-medium text-brand-green">
              Ver todas
            </button>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-brand-border bg-white p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-lg">
              🕐
            </div>
            <p className="flex-1 font-medium text-brand-ink">{proximoExameMock.nome}</p>
            <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              {proximoExameMock.status}
            </span>
          </div>
        </section>
      </div>
    </AppLayout>
  )
}
