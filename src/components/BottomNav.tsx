import { useLocation, useNavigate } from 'react-router-dom'
import { ITENS } from './navIcons'

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-1/2 w-full max-w-md -translate-x-1/2 border-t border-brand-border bg-white px-6 py-3 lg:hidden">
      <div className="flex items-center justify-between">
        {ITENS.map(({ path, label, Icon }) => {
          const ativo = location.pathname === path
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-1 text-xs font-medium ${ativo ? 'text-brand-green' : 'text-brand-muted'}`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
