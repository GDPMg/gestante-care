import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import SelectField from '../components/SelectField'
import { supabase } from '../lib/supabaseClient'

const CONFIGURACOES = ['Conta', 'Segurança', 'Termos e privacidade', 'Ajuda e suporte']

export default function Perfil() {
  const navigate = useNavigate()
  const [userId, setUserId] = useState<string | null>(null)
  const [nomeCompleto, setNomeCompleto] = useState('')
  const [semana, setSemana] = useState<number | null>(null)
  const [dppConfirmada, setDppConfirmada] = useState('')
  const [editandoSemana, setEditandoSemana] = useState(false)

  useEffect(() => {
    async function carregarDados() {
      const { data: userData } = await supabase.auth.getUser()
      const id = userData.user?.id
      if (!id) return
      setUserId(id)

      const [{ data: perfil }, { data: gestacional }] = await Promise.all([
        supabase.from('perfis').select('nome_completo').eq('id', id).single(),
        supabase.from('perfil_gestacional').select('semana_informada, dpp_confirmada').eq('usuario_id', id).single(),
      ])

      if (perfil?.nome_completo) setNomeCompleto(perfil.nome_completo)
      if (gestacional?.semana_informada) setSemana(gestacional.semana_informada)
      if (gestacional?.dpp_confirmada) setDppConfirmada(gestacional.dpp_confirmada)
    }

    carregarDados()
  }, [])

  async function handleAlterarDpp(valor: string) {
    setDppConfirmada(valor)
    if (!userId) return
    await supabase.from('perfil_gestacional').update({ dpp_confirmada: valor || null }).eq('usuario_id', userId)
  }

  async function handleAlterarSemana(valor: string) {
    const novaSemana = Number(valor)
    setSemana(novaSemana)
    setEditandoSemana(false)
    if (!userId) return
    await supabase.from('perfil_gestacional').update({ semana_informada: novaSemana }).eq('usuario_id', userId)
  }

  async function handleSairDaConta() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const inicial = nomeCompleto.trim().charAt(0).toUpperCase() || '?'

  return (
    <AppLayout>
      <div className="flex flex-col items-center gap-1 text-center">
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-green text-3xl font-semibold text-white">
            {inicial}
          </div>
          <button
            className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm shadow"
            aria-label="Editar foto de perfil"
          >
            ✏️
          </button>
        </div>
        <h1 className="mt-2 font-serif text-2xl text-brand-ink">{nomeCompleto || '...'}</h1>
        {semana && <p className="text-sm font-medium text-brand-green">{semana}ª semana</p>}
        <button className="text-sm font-semibold text-brand-green">Editar perfil</button>
      </div>

      <section>
        <p className="mb-2 text-xs font-semibold tracking-wide text-brand-muted">GESTAÇÃO</p>
        <div className="rounded-2xl border border-brand-border bg-white p-4">
          <label htmlFor="dpp-confirmada" className="text-sm text-brand-muted">
            Data prevista do parto
          </label>
          <input
            id="dpp-confirmada"
            type="date"
            value={dppConfirmada}
            onChange={(e) => handleAlterarDpp(e.target.value)}
            className="mt-1 block w-full bg-transparent text-brand-ink focus:outline-none"
          />

          <hr className="my-4 border-brand-border" />

          {editandoSemana ? (
            <SelectField
              label="Semana de gestação"
              value={semana ? String(semana) : ''}
              onChange={handleAlterarSemana}
              options={Array.from({ length: 42 }, (_, i) => i + 1).map((n) => ({
                value: String(n),
                label: `${n}ª semana`,
              }))}
            />
          ) : (
            <button
              onClick={() => setEditandoSemana(true)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="text-brand-ink">Semana de gestação</span>
              <span className="flex items-center gap-1 font-semibold text-brand-green">
                {semana ?? '—'}ª
                <span aria-hidden>›</span>
              </span>
            </button>
          )}
        </div>
      </section>

      <section>
        <p className="mb-2 text-xs font-semibold tracking-wide text-brand-muted">CONFIGURAÇÕES</p>
        <div className="rounded-2xl border border-brand-border bg-white">
          {CONFIGURACOES.map((item, index) => (
            <button
              key={item}
              className={`flex w-full items-center justify-between px-4 py-4 text-left ${
                index > 0 ? 'border-t border-brand-border' : ''
              }`}
            >
              <span className="text-brand-ink">{item}</span>
              <span className="text-brand-muted" aria-hidden>
                ›
              </span>
            </button>
          ))}
        </div>
      </section>

      <button className="flex items-center justify-center gap-1.5 text-sm text-brand-muted">
        <span aria-hidden>♡</span> Informar fim da gestação
      </button>

      <button
        onClick={handleSairDaConta}
        className="rounded-full border border-brand-border bg-white py-4 text-center text-sm font-semibold text-red-600"
      >
        Sair da conta
      </button>
    </AppLayout>
  )
}
