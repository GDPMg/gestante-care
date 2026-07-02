import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import TextField from '../components/TextField'
import { supabase } from '../lib/supabaseClient'
import { translateAuthError } from '../lib/authErrors'

export default function RecuperarSenha() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [enviado, setEnviado] = useState(false)

  async function handleEnviar() {
    if (!email.includes('@')) {
      setErro('Informe um e-mail válido.')
      return
    }

    setSubmitting(true)
    setErro(null)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/redefinir-senha`,
      })
      if (error) throw error
      setEnviado(true)
    } catch (err) {
      setErro(err instanceof Error ? translateAuthError(err.message) : 'Erro ao enviar o link.')
    } finally {
      setSubmitting(false)
    }
  }

  if (enviado) {
    return (
      <div className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-6 px-6 py-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-tint">
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16v12H4z" />
            <path d="M4 7l8 6 8-6" />
          </svg>
        </div>

        <div>
          <h1 className="font-serif text-3xl text-brand-ink">E-mail enviado</h1>
          <p className="mt-2 text-brand-muted">
            Enviamos um link de recuperação para <span className="font-medium text-brand-ink">{email}</span>.
            Verifique sua caixa de entrada e também o spam.
          </p>
        </div>

        <Button onClick={() => navigate('/login')}>Voltar para o login</Button>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col gap-6 px-6 py-8">
      <button
        onClick={() => navigate('/login')}
        className="flex w-fit items-center gap-1 text-sm font-medium text-brand-green"
      >
        <span aria-hidden>‹</span> Voltar
      </button>

      <div>
        <h1 className="font-serif text-3xl text-brand-ink">Recuperar senha</h1>
        <p className="mt-1 text-brand-muted">
          Informe o e-mail cadastrado e enviaremos um link para você criar uma nova senha.
        </p>
      </div>

      <TextField
        label="E-mail"
        type="email"
        inputMode="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {erro && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{erro}</p>}

      <Button onClick={handleEnviar} disabled={submitting}>
        {submitting ? 'Enviando...' : 'Enviar link de recuperação'}
      </Button>
    </div>
  )
}
