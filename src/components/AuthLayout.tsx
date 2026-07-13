import type { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="lg:flex lg:min-h-svh">
      <div className="hidden lg:flex lg:w-1/2 lg:items-center lg:justify-center lg:bg-brand-green-tint lg:px-12">
        <div className="flex max-w-sm flex-col items-center gap-10 text-center">
          <div className="relative flex h-48 w-48 items-center justify-center overflow-visible">
            <div className="absolute -top-6 -right-8 h-32 w-32 rounded-full bg-white/50" />
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-brand-green-tint/80 ring-8 ring-white/30" />
            <div className="relative flex flex-col items-center gap-3">
              <span className="h-4 w-4 rounded-full bg-brand-gold" />
              <svg viewBox="0 0 24 24" className="h-16 w-16 fill-brand-green">
                <path d="M12 21s-6.7-4.35-9.5-8.28C.7 10.1 1 6.6 3.6 4.9 6 3.3 8.9 4.1 12 7.3c3.1-3.2 6-4 8.4-2.4 2.6 1.7 2.9 5.2 1.1 7.82C18.7 16.65 12 21 12 21z" />
              </svg>
            </div>
          </div>
          <div>
            <h2 className="font-serif text-3xl text-brand-ink">Gestante Care</h2>
            <p className="mt-2 text-brand-muted">
              Consultas, exames e orientações do pré-natal, tudo em um só lugar.
            </p>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2">{children}</div>
    </div>
  )
}
