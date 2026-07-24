import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import TextField from '../components/TextField'
import { supabase } from '../lib/supabaseClient'
import { translateAuthError } from '../lib/authErrors'

export default function AlterarEmail() {
  const navigate = useNavigate()
  const [emailAtual, setEmailAtual] = useState('')
  const [novoEmail, setNovoEmail] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [salvando, setSalvando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  useEffect(() => {
    async function carregarEmailAtual() {
      const { data } = await supabase.auth.getSession()
      if (data.session?.user?.email) setEmailAtual(data.session.user.email)
    }
    carregarEmailAtual()
  }, [])

  async function handleSalvar() {
    if (!novoEmail.includes('@')) {
      setErro('Informe um e-mail válido.')
      return
    }

    setSalvando(true)
    setErro(null)
    try {
      const { error } = await supabase.auth.updateUser(
        { email: novoEmail },
        { emailRedirectTo: `${window.location.origin}/perfil/conta/email-confirmado` },
      )
      if (error) throw error
      setEnviado(true)
    } catch (err) {
      setErro(err instanceof Error ? translateAuthError(err.message) : 'Erro ao solicitar a troca de e-mail.')
    } finally {
      setSalvando(false)
    }
  }

  if (enviado) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-tint">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16v12H4z" />
              <path d="M4 7l8 6 8-6" />
            </svg>
          </div>
          <div>
            <h1 className="font-serif text-2xl text-brand-ink">Verifique seus e-mails</h1>
            <p className="mt-2 text-brand-muted">
              Por segurança, enviamos um link de confirmação para os dois e-mails:{' '}
              <span className="font-medium text-brand-ink">{emailAtual}</span> (atual) e{' '}
              <span className="font-medium text-brand-ink">{novoEmail}</span> (novo). Clicar em qualquer um dos dois
              já confirma a alteração — o outro fica só como aviso de segurança, caso não tenha sido você quem
              pediu a troca.
            </p>
          </div>
          <Button variant="secondary" onClick={() => navigate('/perfil/conta')}>
            Voltar para Conta
          </Button>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <button
        onClick={() => navigate('/perfil/conta')}
        className="flex w-fit items-center gap-1 text-sm font-medium text-brand-green"
      >
        <span aria-hidden>‹</span> Conta
      </button>

      <h1 className="font-serif text-3xl text-brand-ink">Alterar e-mail</h1>

      <TextField
        label="E-mail"
        type="email"
        inputMode="email"
        value={novoEmail}
        onChange={(e) => setNovoEmail(e.target.value)}
      />

      {erro && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{erro}</p>}

      <Button onClick={handleSalvar} disabled={salvando}>
        {salvando ? 'Enviando...' : 'Salvar alterações'}
      </Button>
    </AppLayout>
  )
}
