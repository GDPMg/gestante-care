// Tela cheia mostrada no instante entre abrir o app e saber se há sessão
// (ver AuthContext / guards em App.tsx). É um piscar rápido, já que a checagem
// da sessão é local (localStorage), não uma ida à rede.
export default function Splash() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-brand-cream">
      <svg viewBox="0 0 24 24" className="h-12 w-12 animate-pulse fill-brand-green">
        <path d="M12 21s-6.7-4.35-9.5-8.28C.7 10.1 1 6.6 3.6 4.9 6 3.3 8.9 4.1 12 7.3c3.1-3.2 6-4 8.4-2.4 2.6 1.7 2.9 5.2 1.1 7.82C18.7 16.65 12 21 12 21z" />
      </svg>
    </div>
  )
}
