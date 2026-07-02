import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import TextField from '../components/TextField'
import { supabase } from '../lib/supabaseClient'
import { translateAuthError } from '../lib/authErrors'

export default function RedefinirSenha() {
  const navigate = useNavigate()
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmeSenha, setConfirmeSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleRedefinir() {
    if (novaSenha.length < 8) {
      setErro('A senha precisa ter pelo menos 8 caracteres.')
      return
    }
    if (novaSenha !== confirmeSenha) {
      setErro('As senhas não coincidem.')
      return
    }

    setSubmitting(true)
    setErro(null)
    try {
      const { error } = await supabase.auth.updateUser({ password: novaSenha })
      if (error) throw error
      await supabase.auth.signOut()
      navigate('/login', { state: { senhaRedefinida: true } })
    } catch (err) {
      setErro(err instanceof Error ? translateAuthError(err.message) : 'Erro ao redefinir a senha.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col gap-6 px-6 py-8">
      <div>
        <h1 className="font-serif text-3xl text-brand-ink">Crie uma nova senha</h1>
        <p className="mt-1 text-brand-muted">Escolha uma senha nova para acessar sua conta.</p>
      </div>

      <TextField
        label="Nova senha"
        type="password"
        placeholder="Mínimo 8 caracteres"
        helperText="Use letras, números e ao menos um caractere especial."
        value={novaSenha}
        onChange={(e) => setNovaSenha(e.target.value)}
      />
      <TextField
        label="Confirme a nova senha"
        type="password"
        placeholder="Repita a senha"
        value={confirmeSenha}
        onChange={(e) => setConfirmeSenha(e.target.value)}
      />

      {erro && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{erro}</p>}

      <Button onClick={handleRedefinir} disabled={submitting}>
        {submitting ? 'Salvando...' : 'Salvar nova senha'}
      </Button>
    </div>
  )
}
