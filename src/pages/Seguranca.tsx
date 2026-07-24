import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import TextField from '../components/TextField'
import { supabase } from '../lib/supabaseClient'
import { translateAuthError } from '../lib/authErrors'

export default function Seguranca() {
  const navigate = useNavigate()
  const [senhaAtual, setSenhaAtual] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmeSenha, setConfirmeSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [salvando, setSalvando] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  async function handleSalvar() {
    if (novaSenha.length < 8) {
      setErro('A nova senha precisa ter pelo menos 8 caracteres.')
      return
    }
    if (novaSenha !== confirmeSenha) {
      setErro('As senhas não coincidem.')
      return
    }

    setSalvando(true)
    setErro(null)
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const email = sessionData.session?.user?.email
      if (!email) throw new Error('Não foi possível identificar sua conta.')

      const { error: erroSenhaAtual } = await supabase.auth.signInWithPassword({ email, password: senhaAtual })
      if (erroSenhaAtual) {
        setErro('Senha atual incorreta.')
        return
      }

      const { error } = await supabase.auth.updateUser({ password: novaSenha })
      if (error) throw error
      setSucesso(true)
    } catch (err) {
      setErro(err instanceof Error ? translateAuthError(err.message) : 'Erro ao alterar a senha.')
    } finally {
      setSalvando(false)
    }
  }

  if (sucesso) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-tint">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h1 className="font-serif text-2xl text-brand-ink">Senha alterada!</h1>
            <p className="mt-2 text-brand-muted">Sua nova senha já está ativa. Use-a no seu próximo acesso.</p>
          </div>
          <Button onClick={() => navigate('/perfil')}>Voltar para Perfil</Button>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <button
        onClick={() => navigate('/perfil')}
        className="flex w-fit items-center gap-1 text-sm font-medium text-brand-green"
      >
        <span aria-hidden>‹</span> Perfil
      </button>

      <div>
        <h1 className="font-serif text-3xl text-brand-ink">Segurança</h1>
        <p className="mt-1 text-brand-muted">
          Altere sua senha sempre que quiser. Usamos essas informações apenas para proteger seus dados de saúde.
        </p>
      </div>

      <TextField
        label="Senha atual"
        type="password"
        placeholder="Digite sua senha atual"
        value={senhaAtual}
        onChange={(e) => setSenhaAtual(e.target.value)}
      />
      <TextField
        label="Nova senha"
        type="password"
        placeholder="Mínimo 8 caracteres"
        value={novaSenha}
        onChange={(e) => setNovaSenha(e.target.value)}
      />
      <TextField
        label="Confirme a nova senha"
        type="password"
        placeholder="Repita a nova senha"
        value={confirmeSenha}
        onChange={(e) => setConfirmeSenha(e.target.value)}
      />

      {erro && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{erro}</p>}

      <Button onClick={handleSalvar} disabled={salvando}>
        {salvando ? 'Salvando...' : 'Salvar nova senha'}
      </Button>

      <button
        onClick={() => navigate('/recuperar-senha')}
        className="text-center text-sm font-medium text-brand-green"
      >
        Esqueci minha senha
      </button>
    </AppLayout>
  )
}
