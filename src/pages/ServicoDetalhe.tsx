import { useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import { ServicosIcon } from '../components/navIcons'
import { WhatsAppIcon } from '../components/icons'
import { disclaimerServicoDetalhe, servicosMock } from '../data/mock'

export default function ServicoDetalhe() {
  const navigate = useNavigate()
  const { id } = useParams()
  const servico = servicosMock.find((item) => item.id === id)

  if (!servico) {
    return (
      <AppLayout>
        <button
          onClick={() => navigate('/servicos')}
          className="flex w-fit items-center gap-1 text-sm font-medium text-brand-green"
        >
          <span aria-hidden>‹</span> Serviços
        </button>
        <p className="text-brand-muted">Serviço não encontrado.</p>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <button
        onClick={() => navigate('/servicos')}
        className="flex w-fit items-center gap-1 text-sm font-medium text-brand-green"
      >
        <span aria-hidden>‹</span> Serviços
      </button>

      <div className="flex h-40 items-center justify-center rounded-3xl bg-brand-green-tint">
        <ServicosIcon className="h-12 w-12 text-brand-green" />
      </div>

      <div>
        <span className="inline-block rounded-full bg-brand-green-tint px-3 py-1 text-xs font-semibold text-brand-green">
          {servico.quando}
        </span>
        <h1 className="mt-3 font-serif text-3xl text-brand-ink">{servico.nome}</h1>
        <p className="mt-1 text-brand-muted">{servico.descricao}</p>
      </div>

      <div className="rounded-2xl border border-brand-border bg-white p-4">
        <p className="text-xs font-semibold tracking-wide text-brand-green">PARA QUEM É INDICADO</p>
        <p className="mt-2 text-brand-ink">{servico.paraQuemEhIndicado}</p>

        <hr className="my-4 border-brand-border" />

        <p className="text-xs font-semibold tracking-wide text-brand-green">QUANDO COSTUMA SER FEITO</p>
        <p className="mt-2 text-brand-ink">{servico.quandoDetalhe}</p>
      </div>

      <div className="flex items-start gap-2 rounded-2xl bg-brand-green-tint p-4">
        <span className="mt-0.5" aria-hidden>
          ℹ️
        </span>
        <p className="text-sm text-brand-ink">{disclaimerServicoDetalhe}</p>
      </div>

      {/* Sem número de WhatsApp definido ainda — botão fica sem destino (ver PENDENCIAS.md) */}
      <Button className="flex items-center justify-center gap-2">
        <WhatsAppIcon className="h-4 w-4" />
        Tenho interesse
      </Button>
    </AppLayout>
  )
}
