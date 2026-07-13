import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import TextField from '../components/TextField'
import AuthLayout from '../components/AuthLayout'
import { supabase } from '../lib/supabaseClient'
import { translateAuthError } from '../lib/authErrors'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const senhaRedefinida = Boolean((location.state as { senhaRedefinida?: boolean } | null)?.senhaRedefinida)

  async function handleEntrar() {
    setSubmitting(true)
    setErro(null)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
      if (error) throw error
      navigate('/home')
    } catch (err) {
      setErro(err instanceof Error ? translateAuthError(err.message) : 'Erro ao entrar.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout>
    <div className="mx-auto flex min-h-svh max-w-md flex-col gap-6 px-6 py-8 lg:justify-center">
      <button
        onClick={() => navigate('/')}
        className="flex w-fit items-center gap-1 text-sm font-medium text-brand-green"
      >
        <span aria-hidden>‹</span> Voltar
      </button>

      <div>
        <h1 className="font-serif text-3xl text-brand-ink">Acesse sua conta</h1>
        <p className="mt-1 text-brand-muted">Use seus dados de cadastro para entrar com segurança.</p>
      </div>

      {senhaRedefinida && (
        <p className="rounded-2xl bg-brand-green-tint px-4 py-3 text-sm text-brand-green-dark">
          Senha redefinida com sucesso! Faça login com sua nova senha.
        </p>
      )}

      <TextField
        label="E-mail"
        type="email"
        inputMode="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="flex flex-col gap-2">
        <TextField
          label="Senha"
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button
          onClick={() => navigate('/recuperar-senha')}
          className="self-end text-sm font-medium text-brand-green"
        >
          Esqueci minha senha
        </button>
      </div>

      {erro && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{erro}</p>}

      <Button onClick={handleEntrar} disabled={submitting}>
        {submitting ? 'Entrando...' : 'Entrar'}
      </Button>

      <div className="flex items-start gap-2 rounded-2xl bg-brand-green-tint p-4">
        <span className="mt-0.5" aria-hidden>🛡️</span>
        <p className="text-sm text-brand-ink">
          Seus dados são sensíveis e tratados com sigilo, conforme a LGPD. Nunca
          compartilhe seu código de acesso.
        </p>
      </div>
    </div>
    </AuthLayout>
  )
}
