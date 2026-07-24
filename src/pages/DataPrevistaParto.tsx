import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import TextField from '../components/TextField'
import { supabase } from '../lib/supabaseClient'
import { useUserData } from '../contexts/UserDataContext'

export default function DataPrevistaParto() {
  const navigate = useNavigate()
  const { dppConfirmada, loading, refresh } = useUserData()
  const [dpp, setDpp] = useState('')
  const [salvando, setSalvando] = useState(false)

  // Semeia o campo com o valor do cache central assim que ele chega.
  useEffect(() => {
    if (dppConfirmada) setDpp(dppConfirmada)
  }, [dppConfirmada])

  const carregando = loading && !dppConfirmada

  async function handleSalvar() {
    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user?.id
    if (!userId) return
    setSalvando(true)
    await supabase.from('perfil_gestacional').update({ dpp_confirmada: dpp || null }).eq('usuario_id', userId)
    await refresh()
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
