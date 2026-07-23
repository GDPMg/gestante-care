import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import { supabase } from '../lib/supabaseClient'
import { formatISODateToBR } from '../lib/format'

const CONFIGURACOES: { label: string; rota?: string }[] = [
  { label: 'Conta', rota: '/perfil/conta' },
  { label: 'Segurança' },
  { label: 'Termos e privacidade' },
  { label: 'Ajuda e suporte' },
]

export default function Perfil() {
  const navigate = useNavigate()
  const [nomeCompleto, setNomeCompleto] = useState('')
  const [semana, setSemana] = useState<number | null>(null)
  const [dppConfirmada, setDppConfirmada] = useState('')

  useEffect(() => {
    async function carregarDados() {
      const { data: userData } = await supabase.auth.getUser()
      const id = userData.user?.id
      if (!id) return

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
        <div className="rounded-2xl border border-brand-border bg-white">
          <button
            onClick={() => navigate('/perfil/data-prevista-parto')}
            className="flex w-full items-center justify-between px-4 py-4 text-left"
          >
            <div>
              <p className="text-sm text-brand-muted">Data prevista do parto</p>
              <p className="mt-0.5 font-medium text-brand-ink">
                {dppConfirmada ? formatISODateToBR(dppConfirmada) : 'Adicionar data'}
              </p>
            </div>
            <span className="text-brand-muted" aria-hidden>
              ›
            </span>
          </button>

          <hr className="border-brand-border" />

          <button
            onClick={() => navigate('/perfil/semana')}
            className="flex w-full items-center justify-between px-4 py-4 text-left"
          >
            <span className="text-brand-ink">Semana de gestação</span>
            <span className="flex items-center gap-1 font-semibold text-brand-green">
              {semana ?? '—'}ª
              <span aria-hidden>›</span>
            </span>
          </button>
        </div>
      </section>

      <section>
        <p className="mb-2 text-xs font-semibold tracking-wide text-brand-muted">CONFIGURAÇÕES</p>
        <div className="rounded-2xl border border-brand-border bg-white">
          {CONFIGURACOES.map((item, index) => (
            <button
              key={item.label}
              onClick={item.rota ? () => navigate(item.rota!) : undefined}
              className={`flex w-full items-center justify-between px-4 py-4 text-left ${
                index > 0 ? 'border-t border-brand-border' : ''
              }`}
            >
              <span className="text-brand-ink">{item.label}</span>
              <span className="text-brand-muted" aria-hidden>
                ›
              </span>
            </button>
          ))}
        </div>
      </section>

      <button className="flex items-center justify-center gap-1.5 text-sm text-brand-muted">
        <span aria-hidden>♡</span> Atualizar minha gestação
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
