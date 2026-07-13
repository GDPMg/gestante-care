import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import { ServicosIcon } from '../components/navIcons'
import { WhatsAppIcon } from '../components/icons'
import { CATEGORIAS_SERVICO, destaqueServicosMock, servicosMock, type CategoriaServico } from '../data/mock'

export default function Servicos() {
  const navigate = useNavigate()
  const [categoriaAtiva, setCategoriaAtiva] = useState<'todos' | CategoriaServico>('todos')

  const categoriasVisiveis = useMemo(() => {
    const categorias =
      categoriaAtiva === 'todos'
        ? CATEGORIAS_SERVICO.filter((c) => c.id !== 'todos')
        : CATEGORIAS_SERVICO.filter((c) => c.id === categoriaAtiva)

    return categorias.map((categoria) => ({
      ...categoria,
      servicos: servicosMock.filter((servico) => servico.categoria === categoria.id),
    }))
  }, [categoriaAtiva])

  return (
    <AppLayout>
      <div>
        <p className="text-sm text-brand-muted">A Femina com você</p>
        <h1 className="font-serif text-3xl text-brand-ink">Serviços</h1>
      </div>

      <div className="flex items-start gap-2 rounded-2xl bg-brand-green-tint p-4">
        <ServicosIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
        <p className="text-sm text-brand-ink">
          Todos os serviços aqui são <span className="font-semibold">opcionais</span>. Escolha o que fizer sentido
          para você e converse com nossa equipe para receber orientação.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIAS_SERVICO.map((categoria) => (
          <button
            key={categoria.id}
            onClick={() => setCategoriaAtiva(categoria.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              categoriaAtiva === categoria.id
                ? 'bg-brand-green text-white'
                : 'border border-brand-border bg-white text-brand-ink'
            }`}
          >
            {categoria.label}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-brand-green-dark p-5 text-white">
        <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/10" />
        <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-green-dark">
          ★ {destaqueServicosMock.tag.toUpperCase()}
        </span>
        <h2 className="mt-3 font-serif text-xl leading-snug">{destaqueServicosMock.titulo}</h2>
        <p className="mt-2 text-sm text-white/85">{destaqueServicosMock.descricao}</p>
        {/* Sem número de WhatsApp definido ainda — botão fica sem destino (ver PENDENCIAS.md) */}
        <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-green-dark">
          <WhatsAppIcon className="h-4 w-4" />
          {destaqueServicosMock.botao}
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {categoriasVisiveis.map((categoria) => (
          <section key={categoria.id}>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-brand-green">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" aria-hidden />
              {categoria.label.toUpperCase()}
            </p>
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
              {categoria.servicos.map((servico) => (
                <div key={servico.id} className="rounded-2xl border border-brand-border bg-white p-4">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green-tint">
                      <ServicosIcon className="h-5 w-5 text-brand-green" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-brand-ink">{servico.nome}</p>
                      <p className="mt-0.5 text-sm text-brand-muted">{servico.descricao}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-sm font-medium text-brand-green">{servico.quando}</p>
                    <button
                      onClick={() => navigate(`/servicos/${servico.id}`)}
                      className="rounded-full bg-brand-green-tint px-4 py-2 text-sm font-semibold text-brand-green-dark"
                    >
                      Ver detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppLayout>
  )
}
