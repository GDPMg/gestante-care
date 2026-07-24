import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuthStatus } from './contexts/AuthContext'
import Splash from './components/Splash'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Consentimento from './pages/Consentimento'
import Home from './pages/Home'
import SemanaGestacional from './pages/SemanaGestacional'
import Notificacoes from './pages/Notificacoes'
import Jornada from './pages/Jornada'
import Servicos from './pages/Servicos'
import ServicoDetalhe from './pages/ServicoDetalhe'
import Perfil from './pages/Perfil'
import DataPrevistaParto from './pages/DataPrevistaParto'
import SemanaGestacao from './pages/SemanaGestacao'
import Conta from './pages/Conta'
import AlterarEmail from './pages/AlterarEmail'
import EmailConfirmado from './pages/EmailConfirmado'
import AlterarTelefone from './pages/AlterarTelefone'
import AlterarDataNascimento from './pages/AlterarDataNascimento'
import Seguranca from './pages/Seguranca'
import AjudaSuporte from './pages/AjudaSuporte'
import AtualizarGestacao from './pages/AtualizarGestacao'
import RecuperarSenha from './pages/RecuperarSenha'
import RedefinirSenha from './pages/RedefinirSenha'
import Admin from './pages/Admin'

// Rota interna: exige sessão. Sem sessão → manda pro Login.
function ProtectedRoute({ children }: { children: ReactNode }) {
  const status = useAuthStatus()
  if (status === 'loading') return <Splash />
  if (status === 'unauthenticated') return <Navigate to="/login" replace />
  return <>{children}</>
}

// Rota de entrada (Landing/Login): se já está logada, pula direto pra Home —
// é o que faz "abrir o app e já estar dentro".
function PublicRoute({ children }: { children: ReactNode }) {
  const status = useAuthStatus()
  if (status === 'loading') return <Splash />
  if (status === 'authenticated') return <Navigate to="/home" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Entrada — redireciona pra Home se já estiver logada */}
        <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

        {/* Abertas — precisam funcionar mesmo com/sem sessão:
            - /cadastro cria a sessão no meio do fluxo (signUp)
            - /redefinir-senha abre já autenticada, via link de recuperação
            - /consentimento é conteúdo institucional (Termos/Privacidade) */}
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/consentimento" element={<Consentimento />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />

        {/* Internas — exigem sessão */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/semana-gestacional" element={<ProtectedRoute><SemanaGestacional /></ProtectedRoute>} />
        <Route path="/notificacoes" element={<ProtectedRoute><Notificacoes /></ProtectedRoute>} />
        <Route path="/jornada" element={<ProtectedRoute><Jornada /></ProtectedRoute>} />
        <Route path="/servicos" element={<ProtectedRoute><Servicos /></ProtectedRoute>} />
        <Route path="/servicos/:id" element={<ProtectedRoute><ServicoDetalhe /></ProtectedRoute>} />
        <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
        <Route path="/perfil/data-prevista-parto" element={<ProtectedRoute><DataPrevistaParto /></ProtectedRoute>} />
        <Route path="/perfil/semana" element={<ProtectedRoute><SemanaGestacao /></ProtectedRoute>} />
        <Route path="/perfil/conta" element={<ProtectedRoute><Conta /></ProtectedRoute>} />
        <Route path="/perfil/conta/email" element={<ProtectedRoute><AlterarEmail /></ProtectedRoute>} />
        <Route path="/perfil/conta/email-confirmado" element={<ProtectedRoute><EmailConfirmado /></ProtectedRoute>} />
        <Route path="/perfil/conta/telefone" element={<ProtectedRoute><AlterarTelefone /></ProtectedRoute>} />
        <Route path="/perfil/conta/nascimento" element={<ProtectedRoute><AlterarDataNascimento /></ProtectedRoute>} />
        <Route path="/perfil/seguranca" element={<ProtectedRoute><Seguranca /></ProtectedRoute>} />
        <Route path="/perfil/ajuda-suporte" element={<ProtectedRoute><AjudaSuporte /></ProtectedRoute>} />
        <Route path="/perfil/atualizar-gestacao" element={<ProtectedRoute><AtualizarGestacao /></ProtectedRoute>} />

        {/* Backoffice — proteção por papel fica pra depois (ver PENDENCIAS.md) */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
