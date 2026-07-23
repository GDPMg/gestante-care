import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import { supabase } from '../lib/supabaseClient'

export default function SemanaGestacao() {
  const navigate = useNavigate()
  const [userId, setUserId] = useState<string | null>(null)
  const [semana, setSemana] = useState<number | null>(null)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    async function carregarDados() {
      const { data: userData } = await supabase.auth.getUser()
      const id = userData.user?.id
      if (!id) return
      setUserId(id)

      const { data } = await supabase
        .from('perfil_gestacional')
        .select('semana_informada')
        .eq('usuario_id', id)
        .single()

      setSemana(data?.semana_informada ?? 1)
    }

    carregarDados()
  }, [])

  async function handleSalvar() {
    if (!userId) return
    setSalvando(true)
    await supabase.from('perfil_gestacional').update({ semana_informada: semana }).eq('usuario_id', userId)
    setSalvando(false)
    navigate('/perfil')
  }

  return (
    <AppLayout>
      <button
        onClick={() => navigate('/perfil')}
        className="flex w-fit items-center gap-1 text-sm font-medium text-brand-green"
      >
        <span aria-hidden>‹</span> Perfil
      </button>

      <h1 className="font-serif text-3xl text-brand-ink">Semana de gestação</h1>

      {semana === null ? (
        <p className="text-brand-muted">Carregando...</p>
      ) : (
        <>
          <div className="flex items-center justify-center gap-6 py-4">
            <button
              onClick={() => setSemana((s) => Math.max(1, (s ?? 1) - 1))}
              disabled={semana <= 1}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-white text-xl text-brand-ink disabled:opacity-40"
              aria-label="Diminuir semana"
            >
              −
            </button>
            <div className="flex flex-col items-center">
              <p className="font-serif text-4xl text-brand-ink">{semana}ª</p>
              <p className="text-sm text-brand-muted">semana</p>
            </div>
            <button
              onClick={() => setSemana((s) => Math.min(42, (s ?? 1) + 1))}
              disabled={semana >= 42}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-white text-xl text-brand-ink disabled:opacity-40"
              aria-label="Aumentar semana"
            >
              +
            </button>
          </div>

          <Button onClick={handleSalvar} disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </>
      )}
    </AppLayout>
  )
}
