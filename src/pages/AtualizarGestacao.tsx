import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import TextField from '../components/TextField'
import { supabase } from '../lib/supabaseClient'
import { useUserData } from '../contexts/UserDataContext'

type Etapa = 'inicio' | 'bebe-nasceu' | 'outra-situacao' | 'sucesso'

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 21s-6.7-4.35-9.5-8.28C.7 10.1 1 6.6 3.6 4.9 6 3.3 8.9 4.1 12 7.3c3.1-3.2 6-4 8.4-2.4 2.6 1.7 2.9 5.2 1.1 7.82C18.7 16.65 12 21 12 21z" />
    </svg>
  )
}

function VoltarPerfil({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  return (
    <button
      onClick={() => navigate('/perfil')}
      className="flex w-fit items-center gap-1 text-sm font-medium text-brand-green"
    >
      <span aria-hidden>‹</span> Perfil
    </button>
  )
}

export default function AtualizarGestacao() {
  const navigate = useNavigate()
  const { refresh } = useUserData()
  const [etapa, setEtapa] = useState<Etapa>('inicio')
  const [dataNascimentoBebe, setDataNascimentoBebe] = useState('')
  const [salvando, setSalvando] = useState(false)

  async function confirmarStatus(status: 'bebe_nasceu' | 'interrompida', dataBebe?: string) {
    setSalvando(true)
    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user?.id
    if (userId) {
      await supabase
        .from('perfil_gestacional')
        .update({ status_gestacao: status, data_nascimento_bebe: dataBebe ?? null })
        .eq('usuario_id', userId)
      await refresh()
    }
    setSalvando(false)
    setEtapa('sucesso')
  }

  if (etapa === 'sucesso') {
    return (
      <AppLayout>
        <VoltarPerfil navigate={navigate} />
        <div className="flex flex-col items-center gap-4 pt-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-tint">
            <HeartIcon className="h-6 w-6 text-brand-green" />
          </div>
          <div>
            <h1 className="font-serif text-2xl text-brand-ink">Obrigada por confiar na gente</h1>
            <p className="mt-2 text-brand-muted">
              Obrigada por compartilhar esse momento com a gente. Estamos por perto no que você precisar.
            </p>
          </div>
          <Button onClick={() => navigate('/perfil')}>Voltar ao perfil</Button>
        </div>
      </AppLayout>
    )
  }

  if (etapa === 'bebe-nasceu') {
    return (
      <AppLayout>
        <VoltarPerfil navigate={navigate} />
        <button
          onClick={() => setEtapa('inicio')}
          className="flex w-fit items-center gap-1 text-sm font-medium text-brand-green"
        >
          <span aria-hidden>‹</span> Voltar
        </button>

        <div className="flex flex-col items-center gap-4 pt-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-tint">
            <HeartIcon className="h-6 w-6 text-brand-green" />
          </div>
          <div>
            <h1 className="font-serif text-2xl text-brand-ink">Parabéns!</h1>
            <p className="mt-2 text-brand-muted">
              Nos conte quando seu bebê nasceu para ajustarmos seu cuidado a partir de agora.
            </p>
          </div>
        </div>

        <TextField
          label="Data de nascimento do bebê"
          type="date"
          value={dataNascimentoBebe}
          onChange={(e) => setDataNascimentoBebe(e.target.value)}
        />

        <Button onClick={() => confirmarStatus('bebe_nasceu', dataNascimentoBebe)} disabled={salvando}>
          {salvando ? 'Salvando...' : 'Confirmar'}
        </Button>
      </AppLayout>
    )
  }

  if (etapa === 'outra-situacao') {
    return (
      <AppLayout>
        <VoltarPerfil navigate={navigate} />
        <button
          onClick={() => setEtapa('inicio')}
          className="flex w-fit items-center gap-1 text-sm font-medium text-brand-green"
        >
          <span aria-hidden>‹</span> Voltar
        </button>

        <div className="flex flex-col items-center gap-4 pt-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <HeartIcon className="h-6 w-6 text-red-300" />
          </div>
          <div>
            <h1 className="font-serif text-2xl text-brand-ink">Estamos com você</h1>
            <p className="mt-2 text-brand-muted">
              Sentimos muito por este momento. Você não está sozinha — cuide de você com todo o carinho, no seu
              tempo.
            </p>
          </div>
        </div>

        <button
          onClick={() => confirmarStatus('interrompida')}
          disabled={salvando}
          className="flex items-center gap-3 rounded-2xl border border-brand-border bg-white p-4 text-left"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-lg">
            <HeartIcon className="h-5 w-5 text-red-300" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-brand-ink">Minha gestação foi interrompida</p>
            <p className="mt-0.5 text-sm text-brand-muted">Registrar para pausarmos os lembretes do pré-natal.</p>
          </div>
          <span className="text-brand-muted" aria-hidden>
            ›
          </span>
        </button>

        <button
          onClick={() => navigate('/perfil/ajuda-suporte')}
          className="text-center text-sm font-medium text-brand-green"
        >
          Prefiro falar com alguém primeiro
        </button>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <VoltarPerfil navigate={navigate} />

      <div className="flex flex-col items-center gap-4 pt-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-tint">
          <HeartIcon className="h-6 w-6 text-brand-green" />
        </div>
        <div>
          <h1 className="font-serif text-2xl text-brand-ink">Chegou a hora de atualizar</h1>
          <p className="mt-2 text-brand-muted">
            Quando sentir que é o momento, conte para a gente como está sua gestação agora — no seu tempo, sem
            pressa.
          </p>
        </div>
      </div>

      <button
        onClick={() => setEtapa('bebe-nasceu')}
        className="flex items-center gap-3 rounded-2xl border border-brand-border bg-white p-4 text-left"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green-tint text-lg">
          👶
        </div>
        <div className="flex-1">
          <p className="font-semibold text-brand-ink">Meu bebê nasceu</p>
          <p className="mt-0.5 text-sm text-brand-muted">Que momento especial. Vamos cuidar de vocês dois.</p>
        </div>
        <span className="text-brand-muted" aria-hidden>
          ›
        </span>
      </button>

      <button
        onClick={() => setEtapa('outra-situacao')}
        className="text-center text-sm font-medium text-brand-muted underline"
      >
        Minha situação foi outra
      </button>
    </AppLayout>
  )
}
