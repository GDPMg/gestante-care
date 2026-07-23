import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import { supabase } from '../lib/supabaseClient'
import { formatISODateToBR, formatPhone } from '../lib/format'

export default function Conta() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [telefone, setTelefone] = useState('')

  useEffect(() => {
    async function carregarDados() {
      const { data: userData } = await supabase.auth.getUser()
      const id = userData.user?.id
      if (!id) return

      if (userData.user?.email) setEmail(userData.user.email)

      const { data: perfil } = await supabase
        .from('perfis')
        .select('data_nascimento, telefone')
        .eq('id', id)
        .single()

      if (perfil?.data_nascimento) setDataNascimento(perfil.data_nascimento)
      if (perfil?.telefone) setTelefone(perfil.telefone)
    }

    carregarDados()
  }, [])

  return (
    <AppLayout>
      <button
        onClick={() => navigate('/perfil')}
        className="flex w-fit items-center gap-1 text-sm font-medium text-brand-green"
      >
        <span aria-hidden>‹</span> Perfil
      </button>

      <h1 className="font-serif text-3xl text-brand-ink">Conta</h1>

      <div className="rounded-2xl border border-brand-border bg-white">
        <button
          onClick={() => navigate('/perfil/conta/email')}
          className="flex w-full items-center justify-between px-4 py-4 text-left"
        >
          <div>
            <p className="text-sm text-brand-muted">E-mail</p>
            <p className="mt-0.5 font-medium text-brand-ink">{email || '...'}</p>
          </div>
          <span className="text-brand-muted" aria-hidden>
            ›
          </span>
        </button>

        <hr className="border-brand-border" />

        <button
          onClick={() => navigate('/perfil/conta/nascimento')}
          className="flex w-full items-center justify-between px-4 py-4 text-left"
        >
          <div>
            <p className="text-sm text-brand-muted">Data de nascimento</p>
            <p className="mt-0.5 font-medium text-brand-ink">
              {dataNascimento ? formatISODateToBR(dataNascimento) : '...'}
            </p>
          </div>
          <span className="text-brand-muted" aria-hidden>
            ›
          </span>
        </button>

        <hr className="border-brand-border" />

        <button
          onClick={() => navigate('/perfil/conta/telefone')}
          className="flex w-full items-center justify-between px-4 py-4 text-left"
        >
          <div>
            <p className="text-sm text-brand-muted">Telefone</p>
            <p className="mt-0.5 font-medium text-brand-ink">{telefone ? formatPhone(telefone) : '...'}</p>
          </div>
          <span className="text-brand-muted" aria-hidden>
            ›
          </span>
        </button>
      </div>
    </AppLayout>
  )
}
