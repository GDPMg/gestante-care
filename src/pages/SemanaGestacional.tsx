import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import { useUserData } from '../contexts/UserDataContext'
import { infoSemanaGestacionalMock } from '../data/mock'

function trimestre(semana: number) {
  if (semana <= 13) return '1º trimestre'
  if (semana <= 27) return '2º trimestre'
  return '3º trimestre'
}

export default function SemanaGestacional() {
  const navigate = useNavigate()
  const { semana: semanaUsuaria } = useUserData()
  // Estado local pra permitir navegar pelas semanas (‹ ›) sem alterar a semana
  // real da usuária. Começa na semana dela (vinda do cache central).
  const [semana, setSemana] = useState<number | null>(null)

  useEffect(() => {
    if (semanaUsuaria != null) setSemana(semanaUsuaria)
  }, [semanaUsuaria])

  const info = useMemo(
    () => infoSemanaGestacionalMock.find((item) => item.semana === semana),
    [semana],
  )

  if (!semana) {
    return (
      <AppLayout>
        <p className="text-brand-muted">Carregando...</p>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <button
        onClick={() => navigate('/home')}
        className="flex w-fit items-center gap-1 text-sm font-medium text-brand-green"
      >
        <span aria-hidden>‹</span> Início
      </button>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setSemana((s) => Math.max(1, (s ?? 1) - 1))}
          disabled={semana <= 1}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-border bg-white text-brand-ink disabled:opacity-40"
          aria-label="Semana anterior"
        >
          ‹
        </button>
        <div className="text-center">
          <p className="text-xs font-medium text-brand-muted">{trimestre(semana)}</p>
          <p className="font-serif text-2xl text-brand-ink">Semana {semana}</p>
        </div>
        <button
          onClick={() => setSemana((s) => Math.min(42, (s ?? 1) + 1))}
          disabled={semana >= 42}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-border bg-white text-brand-ink disabled:opacity-40"
          aria-label="Próxima semana"
        >
          ›
        </button>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-brand-border py-12 text-center">
        <span className="text-3xl" aria-hidden>
          🖼️
        </span>
        <p className="text-sm text-brand-muted">Ilustração da semana em breve</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-brand-border bg-white p-4">
          <p className="text-sm text-brand-muted">Comprimento aprox.</p>
          <p className="mt-1 text-xl font-semibold text-brand-green-dark">
            {info ? `${info.comprimentoCm} cm` : '—'}
          </p>
        </div>
        <div className="rounded-2xl border border-brand-border bg-white p-4">
          <p className="text-sm text-brand-muted">Peso aprox.</p>
          <p className="mt-1 text-xl font-semibold text-brand-green-dark">{info ? `${info.pesoG} g` : '—'}</p>
        </div>
      </div>

      {info ? (
        <>
          <div className="rounded-2xl border border-brand-border bg-white p-4">
            <p className="text-xs font-semibold tracking-wide text-brand-green">O QUE MUDA NESTA SEMANA</p>
            <p className="mt-2 text-brand-ink">{info.oQueMuda}</p>
          </div>

          <div className="rounded-2xl border border-brand-border bg-white p-4">
            <p className="text-xs font-semibold tracking-wide text-brand-green">O QUE VOCÊ PODE SENTIR</p>
            <ul className="mt-2 flex flex-col gap-2">
              {info.oQuePodeSentir.map((item) => (
                <li key={item} className="flex items-start gap-2 text-brand-ink">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-red-50 p-4">
            <p className="text-xs font-semibold tracking-wide text-red-700">MERECE ATENÇÃO</p>
            <ul className="mt-2 flex flex-col gap-2">
              {info.mereceAtencao.map((item) => (
                <li key={item} className="flex items-start gap-2 text-red-800">
                  <span aria-hidden>⚠️</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-red-600">
              Sentiu algo assim? Fale com sua equipe. Em urgência, procure atendimento presencial.
            </p>
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-brand-border p-6 text-center text-brand-muted">
          Conteúdo dessa semana ainda não disponível.
        </div>
      )}
    </AppLayout>
  )
}
