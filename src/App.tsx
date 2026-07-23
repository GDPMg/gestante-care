import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import RecuperarSenha from './pages/RecuperarSenha'
import RedefinirSenha from './pages/RedefinirSenha'
import Admin from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/consentimento" element={<Consentimento />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
        <Route path="/home" element={<Home />} />
        <Route path="/semana-gestacional" element={<SemanaGestacional />} />
        <Route path="/notificacoes" element={<Notificacoes />} />
        <Route path="/jornada" element={<Jornada />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/servicos/:id" element={<ServicoDetalhe />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil/data-prevista-parto" element={<DataPrevistaParto />} />
        <Route path="/perfil/semana" element={<SemanaGestacao />} />
        <Route path="/perfil/conta" element={<Conta />} />
        <Route path="/perfil/conta/email" element={<AlterarEmail />} />
        <Route path="/perfil/conta/email-confirmado" element={<EmailConfirmado />} />
        <Route path="/perfil/conta/telefone" element={<AlterarTelefone />} />
        <Route path="/perfil/conta/nascimento" element={<AlterarDataNascimento />} />
        <Route path="/perfil/seguranca" element={<Seguranca />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
