import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import TextField from '../components/TextField'
import { formatPhone } from '../lib/format'

type Etapa = 'form' | 'codigo' | 'sucesso'

// Ainda não temos provedor de SMS configurado no Supabase (ver PENDENCIAS.md)
// — este fluxo é só visual por enquanto, não envia SMS de verdade nem
// atualiza o telefone no banco.
export default function AlterarTelefone() {
  const navigate = useNavigate()
  const [etapa, setEtapa] = useState<Etapa>('form')
  const [novoTelefone, setNovoTelefone] = useState('')
  const [codigo, setCodigo] = useState('')

  if (etapa === 'sucesso') {
    return (
      <AppLayout>
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green-tint">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h1 className="font-serif text-2xl text-brand-ink">Telefone atualizado!</h1>
            <p className="mt-2 text-brand-muted">Seu novo telefone já está confirmado e vinculado à sua conta.</p>
          </div>
          <Button onClick={() => navigate('/perfil/conta')}>Voltar para Conta</Button>
        </div>
      </AppLayout>
    )
  }

  if (etapa === 'codigo') {
    return (
      <AppLayout>
        <button
          onClick={() => setEtapa('form')}
          className="flex w-fit items-center gap-1 text-sm font-medium text-brand-green"
        >
          <span aria-hidden>‹</span> Voltar
        </button>

        <div>
          <h1 className="font-serif text-2xl text-brand-ink">Confirme o código</h1>
          <p className="mt-1 text-brand-muted">
            Enviamos um SMS com um código de 6 dígitos para o novo telefone. Digite abaixo para confirmar a alteração.
          </p>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 6 }, (_, i) => (
            <input
              key={i}
              maxLength={1}
              inputMode="numeric"
              value={codigo[i] ?? ''}
              onChange={(e) => {
                const digito = e.target.value.replace(/\D/g, '').slice(0, 1)
                setCodigo((prev) => (prev.slice(0, i) + digito + prev.slice(i + 1)).slice(0, 6))
              }}
              className="h-14 rounded-2xl border border-brand-border bg-white text-center text-lg text-brand-ink focus:border-brand-green focus:outline-none"
            />
          ))}
        </div>

        <Button onClick={() => setEtapa('sucesso')}>Confirmar</Button>
        <button className="text-center text-sm font-medium text-brand-green">Reenviar código</button>
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

      <h1 className="font-serif text-3xl text-brand-ink">Telefone</h1>

      <TextField
        label="Telefone"
        inputMode="numeric"
        value={novoTelefone}
        onChange={(e) => setNovoTelefone(formatPhone(e.target.value))}
      />

      <Button onClick={() => setEtapa('codigo')}>Salvar alterações</Button>
    </AppLayout>
  )
}
