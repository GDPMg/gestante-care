import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { supabase } from '../lib/supabaseClient'

// Dados da usuária compartilhados entre telas (Home, Perfil, Semana Gestacional...).
// Buscados UMA vez após o login e guardados em memória + localStorage, pra a
// navegação entre telas ser instantânea e a abertura do app não "piscar" vazia.
// Ver PENDENCIAS.md (item 1) — este provider resolve aquele lag.

type StatusGestacao = 'em_andamento' | 'bebe_nasceu' | 'interrompida'

type UserData = {
  nomeCompleto: string
  semana: number | null
  dppConfirmada: string
  status: StatusGestacao
}

type UserDataContextValue = UserData & {
  loading: boolean
  refresh: () => Promise<void>
}

const EMPTY: UserData = {
  nomeCompleto: '',
  semana: null,
  dppConfirmada: '',
  status: 'em_andamento',
}

const STORAGE_KEY = 'gc_user_data'

const UserDataContext = createContext<UserDataContextValue | null>(null)

function lerCache(): (UserData & { userId: string }) | null {
  try {
    const bruto = localStorage.getItem(STORAGE_KEY)
    return bruto ? JSON.parse(bruto) : null
  } catch {
    return null
  }
}

export function UserDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<UserData>(EMPTY)
  // Se já há algo no cache, começamos SEM loading (mostra na hora e revalida por trás).
  const [loading, setLoading] = useState(() => lerCache() === null)

  const refresh = useCallback(async () => {
    // getSession() lê o token do localStorage (sem ida à rede), diferente de
    // getUser() que revalida o token no servidor. Aqui só precisamos do id.
    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user?.id

    if (!userId) {
      setData(EMPTY)
      setLoading(false)
      localStorage.removeItem(STORAGE_KEY)
      return
    }

    const [{ data: perfil }, { data: gestacional }] = await Promise.all([
      supabase.from('perfis').select('nome_completo').eq('id', userId).single(),
      supabase
        .from('perfil_gestacional')
        .select('semana_informada, dpp_confirmada, status_gestacao')
        .eq('usuario_id', userId)
        .single(),
    ])

    const proximo: UserData = {
      nomeCompleto: perfil?.nome_completo ?? '',
      semana: gestacional?.semana_informada ?? null,
      dppConfirmada: gestacional?.dpp_confirmada ?? '',
      status: (gestacional?.status_gestacao as StatusGestacao) ?? 'em_andamento',
    }

    setData(proximo)
    setLoading(false)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ userId, ...proximo }))
  }, [])

  useEffect(() => {
    // 1. Hidrata na hora com o último dado conhecido (se houver).
    const cache = lerCache()
    if (cache) {
      setData({
        nomeCompleto: cache.nomeCompleto,
        semana: cache.semana,
        dppConfirmada: cache.dppConfirmada,
        status: cache.status,
      })
    }

    // 2. Busca o dado fresco por trás.
    refresh()

    // 3. Reage a login/logout/atualização de conta.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setData(EMPTY)
        setLoading(false)
        localStorage.removeItem(STORAGE_KEY)
      } else if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        refresh()
      }
    })

    return () => sub.subscription.unsubscribe()
  }, [refresh])

  return (
    <UserDataContext.Provider value={{ ...data, loading, refresh }}>{children}</UserDataContext.Provider>
  )
}

export function useUserData() {
  const ctx = useContext(UserDataContext)
  if (!ctx) throw new Error('useUserData deve ser usado dentro de <UserDataProvider>')
  const primeiroNome = ctx.nomeCompleto.trim().split(' ')[0] ?? ''
  return { ...ctx, primeiroNome }
}
