import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { LyraConstellation } from "../components/icons/LyraConstellation";
import { interpretacaoTarot } from "../hooks/interpretacaoTarot";

export default function Dashboard({ user, onLogout }) {
  const [abaAtiva, setAbaAtiva] = useState("home");

  const {
    consultarEnergias,
    resultado,
    isLoading,
    mensagemErro,
    resetarConsulta,
  } = interpretacaoTarot();

  const handleSidebarNav = (novaAba) => {
    setAbaAtiva(novaAba);
    if (novaAba === "home") {
      resetarConsulta();
    }
  };

  const handleStartConsult = async () => {
    await consultarEnergias(user);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex overflow-hidden 
    selection:bg-purple-500/30 font-sans antialiased">
      {/* SIDEBAR */}
      <Sidebar
        abaAtiva={abaAtiva}
        setAbaAtiva={handleSidebarNav}
        onLogout={onLogout}
      />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 relative flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 
        bg-purple-900/20 blur-[120px] pointer-events-none" />

        <div className="w-full max-w-2xl z-10 space-y-12">
          {abaAtiva === "home" ? (
            <div className="space-y-12 animate-in fade-in duration-1000">
              <header className="text-center space-y-2">
                <h2 className="text-4xl font-serif italic text-purple-100">
                  Bem-vindo, {user.nome.split(" ")[0]}
                </h2>
                <p className="text-slate-500 text-xs uppercase tracking-[0.3em]">
                  O que o Tarot e os astros revelam para você hoje?
                </p>
              </header>

              <section className="bg-slate-900/40 border border-white/5 p-12 rounded-[3rem] 
              shadow-2xl backdrop-blur-md text-center">
                {!isLoading && !resultado && !mensagemErro && (
                  <div className="animate-in zoom-in duration-700 flex flex-col items-center">
                    <LyraConstellation />
                    <div className="space-y-1 mb-8">
                      <h3 className="text-2xl font-light text-purple-100 tracking-widest 
                      italic">
                        Sintonize a sua Intenção
                      </h3>
                      <p className="text-slate-500 text-xs font-normal max-w-xs mx-auto 
                      italic">
                        Leitura da carta que definirá a energia do seu dia.
                        Clique no botão abaixo.
                      </p>
                    </div>
                    <button
                      onClick={handleStartConsult}
                      className="group relative px-20 py-5 bg-transparent overflow-hidden 
                      rounded-full transition-all duration-700 border border-purple-500/40 
                      hover:border-purple-400 shadow-2xl shadow-purple-950/50 active:scale-95"
                      aria-label="Realizar leitura do Oráculo"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r 
                      from-purple-600/70 to-indigo-600/70 group-hover:opacity-100 
                      opacity-70 transition-opacity"></div>
                      <span className="relative text-white uppercase tracking-[0.5em] 
                      text-[10px] font-bold drop-shadow-sm">
                        Realizar leitura
                      </span>
                    </button>
                  </div>
                )}

                {isLoading && (
                  <div
                    className="animate-in fade-in duration-1000 space-y-8 py-12 text-center"
                    aria-live="polite"
                  >
                    <div className="h-24 flex items-center justify-center">
                      <div className="w-16 h-16 border-2 border-purple-500/10 
                      border-t-purple-500 rounded-full animate-spin"></div>
                    </div>
                    <p className="text-purple-300 italic font-light tracking-widest text-lg">
                      Consultando as energias do dia...
                    </p>
                  </div>
                )}

                {resultado && !isLoading && (
                  <div className="animate-in zoom-in duration-1000 space-y-8 text-left">
                    <div className="text-[10px] uppercase tracking-[0.5em] text-purple-400 
                    font-bold text-center">
                      A sua Interpretação
                    </div>
                    <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 
                    shadow-inner">
                      <p className="text-lg text-slate-200 font-light leading-relaxed italic">
                        "{resultado}"
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={resetarConsulta}
                        className="text-[10px] text-slate-500 hover:text-purple-300 
                        uppercase tracking-[0.3em] transition-all border-b 
                        border-transparent hover:border-purple-500/30 pb-1"
                        aria-label="Fazer uma Nova Leitura"
                      >
                        Nova Leitura
                      </button>
                    </div>
                  </div>
                )}

                {mensagemErro && !isLoading && (
                  <div className="py-8 space-y-6 text-center" role="alert">
                    <p className="text-red-400 text-sm font-light italic">
                      {mensagemErro}
                    </p>
                    <button
                      onClick={resetarConsulta}
                      className="text-[10px] text-slate-400 uppercase tracking-widest 
                      border border-white/10 px-6 py-2 rounded-full mx-auto block"
                      aria-label="Tentar Novamente a Consulta"
                    >
                      Tentar Novamente
                    </button>
                  </div>
                )}
              </section>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-700 space-y-10">
              <header className="border-b border-white/5 pb-6 flex justify-between items-end">
                <h2 className="text-4xl font-serif italic tracking-widest text-purple-100">
                  Histórico de Leituras
                </h2>
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-600">
                  Sessão de {user.nome.split(" ")[0]}
                </span>
              </header>
              <div className="grid gap-4">
                <div className="p-6 bg-slate-900/30 border border-white/5 rounded-[1.5rem] 
                hover:bg-slate-900/50 hover:border-purple-500/20 transition-all 
                cursor-pointer group">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] text-purple-400 font-bold uppercase 
                    tracking-widest">
                      Leitura Realizada
                    </span>
                    <span className="text-[10px] text-slate-600 italic">
                      Hoje
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 font-light italic line-clamp-2 
                  leading-relaxed group-hover:text-slate-200">
                    "
                    {resultado ||
                      "A sua primeira leitura aparecerá aqui após a consulta."}
                    "
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
