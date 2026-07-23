import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import TextField from '../components/TextField'
import { supabase } from '../lib/supabaseClient'

export default function DataPrevistaParto() {
  const navigate = useNavigate()
  const [userId, setUserId] = useState<string | null>(null)
  const [dpp, setDpp] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    async function carregarDados() {
      const { data: userData } = await supabase.auth.getUser()
      const id = userData.user?.id
      if (!id) return
      setUserId(id)

      const { data } = await supabase
        .from('perfil_gestacional')
        .select('dpp_confirmada')
        .eq('usuario_id', id)
        .single()

      if (data?.dpp_confirmada) setDpp(data.dpp_confirmada)
      setCarregando(false)
    }

    carregarDados()
  }, [])

  async function handleSalvar() {
    if (!userId) return
    setSalvando(true)
    await supabase.from('perfil_gestacional').update({ dpp_confirmada: dpp || null }).eq('usuario_id', userId)
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

      <h1 className="font-serif text-3xl text-brand-ink">Data prevista do parto</h1>

      {carregando ? (
        <p className="text-brand-muted">Carregando...</p>
      ) : (
        <>
          <TextField
            label="Data prevista do parto"
            type="date"
            value={dpp}
            onChange={(e) => setDpp(e.target.value)}
            helperText="Se não tiver certeza, tudo bem — a equipe ajusta com você nas consultas."
          />

          <Button onClick={handleSalvar} disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </>
      )}
    </AppLayout>
  )
}
