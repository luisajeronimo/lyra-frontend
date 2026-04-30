export default function History({ user }) {

  return (
    <div className="w-full max-w-2xl mx-auto z-10 space-y-10 py-12 animate-in fade-in slide-in-from-right-4 duration-700">
      <header className="border-b border-white/5 pb-6 flex justify-between items-end">
        <h2 className="text-4xl font-serif italic tracking-widest text-purple-100">
          Histórico de Leituras
        </h2>
        <span className="text-[10px] uppercase tracking-[0.3em] text-slate-600">
          Sessão de {user?.nome?.split(" ")[0] || "Usuário"}
        </span>
      </header>

      <div className="grid gap-4">
        {/* Este card será mapeado (map) quando você tiver a lista do backend */}
        <div className="p-6 bg-slate-900/30 border border-white/5 rounded-[1.5rem] hover:bg-slate-900/50 hover:border-purple-500/20 transition-all cursor-pointer group">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">
              Leitura Realizada
            </span>
            <span className="text-[10px] text-slate-600 italic">Hoje</span>
          </div>
          <p className="text-sm text-slate-400 font-light italic line-clamp-2 leading-relaxed group-hover:text-slate-200">
            "A sua primeira leitura aparecerá aqui após a consulta."
          </p>
        </div>
      </div>
    </div>
  );
}