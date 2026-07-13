import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import TextField from '../components/TextField'
import SelectField from '../components/SelectField'
import StepProgress from '../components/StepProgress'
import AuthLayout from '../components/AuthLayout'
import {
  calculateDueDate,
  formatBirthDate,
  formatCPF,
  formatDueDateLabel,
  formatPhone,
  parseBirthDateToISO,
  toISODate,
} from '../lib/format'
import { supabase } from '../lib/supabaseClient'
import { translateAuthError } from '../lib/authErrors'

type FormState = {
  nomeCompleto: string
  cpf: string
  nascimento: string
  telefone: string
  email: string
  senha: string
  confirmeSenha: string
  semanaAtual: string
  aceitouTermos: boolean
}

const initialState: FormState = {
  nomeCompleto: '',
  cpf: '',
  nascimento: '',
  telefone: '',
  email: '',
  senha: '',
  confirmeSenha: '',
  semanaAtual: '',
  aceitouTermos: false,
}

export default function Cadastro() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormState>(initialState)
  const [stepError, setStepError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const semanaNumero = Number(form.semanaAtual)
  const semanaValida = Number.isFinite(semanaNumero) && semanaNumero > 0 && semanaNumero <= 42

  const previsaoParto = useMemo(
    () => (semanaValida ? formatDueDateLabel(calculateDueDate(semanaNumero)) : null),
    [semanaNumero, semanaValida],
  )

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleVoltar() {
    setStepError(null)
    if (step === 1) {
      navigate('/')
      return
    }
    setStep((prev) => prev - 1)
  }

  function handleContinuarStep1() {
    const cpfDigits = form.cpf.replace(/\D/g, '')
    const nascimentoISO = parseBirthDateToISO(form.nascimento)
    const telefoneDigits = form.telefone.replace(/\D/g, '')

    if (!form.nomeCompleto.trim()) return setStepError('Informe seu nome completo.')
    if (cpfDigits.length !== 11) return setStepError('CPF inválido.')
    if (!nascimentoISO) return setStepError('Data de nascimento inválida.')
    if (telefoneDigits.length < 10) return setStepError('Telefone inválido.')

    setStepError(null)
    setStep(2)
  }

  function handleContinuarStep2() {
    if (!form.email.includes('@')) return setStepError('Informe um e-mail válido.')
    if (form.senha.length < 8) return setStepError('A senha precisa ter pelo menos 8 caracteres.')
    if (form.senha !== form.confirmeSenha) return setStepError('As senhas não coincidem.')

    setStepError(null)
    setStep(3)
  }

  async function handleConcluir() {
    setSubmitting(true)
    setStepError(null)
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.senha,
      })
      if (error) throw error

      const userId = data.user?.id
      if (!userId) {
        setStepError('Verifique seu e-mail para confirmar a conta antes de continuar.')
        return
      }

      const { error: perfilError } = await supabase.from('perfis').insert({
        id: userId,
        nome_completo: form.nomeCompleto,
        cpf: form.cpf.replace(/\D/g, ''),
        data_nascimento: parseBirthDateToISO(form.nascimento),
        telefone: form.telefone.replace(/\D/g, ''),
      })
      if (perfilError) throw perfilError

      const dueDate = calculateDueDate(semanaNumero)
      const { error: gestacionalError } = await supabase.from('perfil_gestacional').insert({
        usuario_id: userId,
        semana_informada: semanaNumero,
        dpp_estimada: toISODate(dueDate),
      })
      if (gestacionalError) throw gestacionalError

      const { error: consentimentoError } = await supabase.from('consentimentos_lgpd').insert({
        usuario_id: userId,
        versao_termos: 'v1',
      })
      if (consentimentoError) throw consentimentoError

      navigate('/home')
    } catch (err) {
      setStepError(err instanceof Error ? translateAuthError(err.message) : 'Erro ao concluir cadastro.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout>
    <div className="mx-auto flex min-h-svh max-w-md flex-col gap-6 px-6 py-8 lg:justify-center">
      <button
        onClick={handleVoltar}
        className="flex w-fit items-center gap-1 text-sm font-medium text-brand-green"
      >
        <span aria-hidden>‹</span> Voltar
      </button>

      <StepProgress step={step} total={3} />

      {stepError && (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{stepError}</p>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-brand-muted">Etapa 1 de 3</p>
            <h1 className="font-serif text-3xl text-brand-ink">Vamos te conhecer</h1>
            <p className="mt-1 text-brand-muted">Comece com seus dados pessoais.</p>
          </div>

          <TextField
            label="Nome completo"
            value={form.nomeCompleto}
            onChange={(e) => updateField('nomeCompleto', e.target.value)}
          />
          <TextField
            label="CPF"
            inputMode="numeric"
            value={form.cpf}
            onChange={(e) => updateField('cpf', formatCPF(e.target.value))}
          />
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Nascimento"
              inputMode="numeric"
              placeholder="DD/MM/AAAA"
              value={form.nascimento}
              onChange={(e) => updateField('nascimento', formatBirthDate(e.target.value))}
            />
            <TextField
              label="Telefone"
              inputMode="numeric"
              value={form.telefone}
              onChange={(e) => updateField('telefone', formatPhone(e.target.value))}
            />
          </div>

          <Button onClick={handleContinuarStep1}>Continuar</Button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-brand-muted">Etapa 2 de 3</p>
            <h1 className="font-serif text-3xl text-brand-ink">Crie seu acesso</h1>
            <p className="mt-1 text-brand-muted">Use esses dados para entrar no app.</p>
          </div>

          <TextField
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
          />
          <TextField
            label="Senha"
            type="password"
            placeholder="Mínimo 8 caracteres"
            helperText="Use letras, números e ao menos um caractere especial."
            value={form.senha}
            onChange={(e) => updateField('senha', e.target.value)}
          />
          <TextField
            label="Confirme a senha"
            type="password"
            placeholder="Repita a senha"
            value={form.confirmeSenha}
            onChange={(e) => updateField('confirmeSenha', e.target.value)}
          />

          <Button onClick={handleContinuarStep2}>Continuar</Button>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-brand-muted">Etapa 3 de 3</p>
            <h1 className="font-serif text-3xl text-brand-ink">Sobre sua gestação</h1>
            <p className="mt-1 text-brand-muted">
              Se não souber, tudo bem — a equipe ajusta depois.
            </p>
          </div>

          <SelectField
            label="Semana atual"
            placeholder="Selecione a semana"
            value={form.semanaAtual}
            onChange={(value) => updateField('semanaAtual', value)}
            options={Array.from({ length: 42 }, (_, i) => i + 1).map((semana) => ({
              value: String(semana),
              label: `${semana}ª semana`,
            }))}
          />

          {previsaoParto && (
            <div className="flex items-start gap-3 rounded-2xl bg-brand-green-tint p-4">
              <span className="mt-0.5 text-xl" aria-hidden>📅</span>
              <div>
                <p className="font-semibold text-brand-ink">{previsaoParto}</p>
                <p className="text-sm text-brand-green">Calculada automaticamente</p>
                <p className="mt-2 text-xs text-brand-muted">
                  Estimamos pela sua semana atual. Você poderá confirmar a data
                  exata no seu perfil quando o parto for agendado.
                </p>
              </div>
            </div>
          )}

          <label className="flex items-start gap-3 rounded-2xl border border-brand-border bg-white p-4">
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 accent-brand-green"
              checked={form.aceitouTermos}
              onChange={(e) => updateField('aceitouTermos', e.target.checked)}
            />
            <span className="text-sm text-brand-ink">
              Li e aceito os{' '}
              <a href="/consentimento" className="font-semibold text-brand-green underline">
                Termos de Uso
              </a>{' '}
              e a{' '}
              <a href="/consentimento" className="font-semibold text-brand-green underline">
                Política de Privacidade
              </a>
              , autorizando o tratamento dos meus dados conforme a LGPD.
            </span>
          </label>

          <Button onClick={handleConcluir} disabled={!form.aceitouTermos || submitting}>
            {submitting ? 'Enviando...' : 'Concluir cadastro'}
          </Button>
        </div>
      )}
    </div>
    </AuthLayout>
  )
}
