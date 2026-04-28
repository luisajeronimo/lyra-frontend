export default function Sidebar({ abaAtiva, setAbaAtiva, onLogout }) {
  return (
    <nav className="w-20 md:w-64 bg-slate-900/50 border-r border-white/5 flex flex-col p-6 z-30 transition-all duration-300">

      <div className="flex-1 space-y-4 w-full">
        <button
          onClick={() => setAbaAtiva("home")}
          className={`w-full flex items-center justify-center md:justify-start gap-4 p-3 
            rounded-2xl transition-all ${
            abaAtiva === "home"
              ? "bg-purple-500/10 text-purple-300"
              : "text-slate-500 hover:text-slate-300"
          }`}
          aria-label="Ir para Consultas"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="hidden md:block text-xs font-bold uppercase tracking-widest">
            Consultar
          </span>
        </button>

        <button
          onClick={() => setAbaAtiva("historico")}
          className={`w-full flex items-center justify-center md:justify-start gap-4 p-3 
            rounded-2xl transition-all ${
            abaAtiva === "historico"
              ? "bg-purple-500/10 text-purple-300"
              : "text-slate-500 hover:text-slate-300"
          }`}
          aria-label="Ir para Histórico"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="hidden md:block text-xs font-bold uppercase tracking-widest">
            Histórico
          </span>
        </button>
      </div>

      <button
        onClick={onLogout}
        className="mt-auto pt-6 border-t border-white/5 opacity-40 text-[10px] text-center 
        uppercase tracking-[0.2em] hover:opacity-100 transition-opacity"
        aria-label="Sair"
      >
        Sair
      </button>
    </nav>
  );
}
