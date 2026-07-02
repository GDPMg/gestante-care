import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Consentimento from './pages/Consentimento'
import Home from './pages/Home'
import Jornada from './pages/Jornada'
import Servicos from './pages/Servicos'
import ServicoDetalhe from './pages/ServicoDetalhe'
import Perfil from './pages/Perfil'
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
        <Route path="/jornada" element={<Jornada />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/servicos/:id" element={<ServicoDetalhe />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
