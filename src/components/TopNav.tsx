import { useLocation, useNavigate } from 'react-router-dom'
import { ITENS } from './navIcons'

export default function TopNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-10 hidden border-b border-brand-border bg-white lg:block">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-10 py-4">
        <span className="font-serif text-xl text-brand-ink">Gestante Care</span>
        <div className="flex items-center gap-8">
          {ITENS.map(({ path, label, Icon }) => {
            const ativo = location.pathname === path
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`flex items-center gap-2 border-b-2 py-1 text-sm font-medium ${
                  ativo ? 'border-brand-green text-brand-green' : 'border-transparent text-brand-muted'
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
