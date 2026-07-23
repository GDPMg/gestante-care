import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import TextField from '../components/TextField'
import { supabase } from '../lib/supabaseClient'

export default function AlterarDataNascimento() {
  const navigate = useNavigate()
  const [userId, setUserId] = useState<string | null>(null)
  const [dataNascimento, setDataNascimento] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    async function carregarDados() {
      const { data: userData } = await supabase.auth.getUser()
      const id = userData.user?.id
      if (!id) return
      setUserId(id)

      const { data } = await supabase.from('perfis').select('data_nascimento').eq('id', id).single()
      if (data?.data_nascimento) setDataNascimento(data.data_nascimento)
      setCarregando(false)
    }

    carregarDados()
  }, [])

  async function handleSalvar() {
    if (!userId) return
    setSalvando(true)
    await supabase.from('perfis').update({ data_nascimento: dataNascimento }).eq('id', userId)
    setSalvando(false)
    navigate('/perfil/conta')
  }

  return (
    <AppLayout>
      <button
        onClick={() => navigate('/perfil/conta')}
        className="flex w-fit items-center gap-1 text-sm font-medium text-brand-green"
      >
        <span aria-hidden>‹</span> Conta
      </button>

      <h1 className="font-serif text-3xl text-brand-ink">Data de nascimento</h1>

      {carregando ? (
        <p className="text-brand-muted">Carregando...</p>
      ) : (
        <>
          <TextField
            label="Data de nascimento"
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />

          <Button onClick={handleSalvar} disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </>
      )}
    </AppLayout>
  )
}
