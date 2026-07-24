import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { supabase } from '../lib/supabaseClient'

// Estado de autenticação usado pelos guards de rota (ver App.tsx).
// A sessão em si é persistida automaticamente pelo supabase-js (localStorage +
// autoRefreshToken, que são o padrão) — aqui só observamos se existe ou não,
// pra decidir o roteamento. 'loading' é o instante entre abrir o app e o
// getSession() (leitura local, rápida) responder.
type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

const AuthContext = createContext<AuthStatus>('loading')

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading')

  useEffect(() => {
    // getSession() lê o token do localStorage (sem ida à rede).
    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? 'authenticated' : 'unauthenticated')
    })

    // Reage a login, logout e renovação de token em tempo real.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setStatus(session ? 'authenticated' : 'unauthenticated')
    })

    return () => sub.subscription.unsubscribe()
  }, [])

  return <AuthContext.Provider value={status}>{children}</AuthContext.Provider>
}

export function useAuthStatus() {
  return useContext(AuthContext)
}
