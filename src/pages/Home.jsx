import { LyraConstellation } from "../components/icons/LyraConstellation";
import { useInterpretacaoTarot } from "../hooks/useInterpretacaoTarot";

export default function Home({ user }) {
  const {
    consultarEnergias,
    resultado,
    isLoading,
    mensagemErro,
    resetarConsulta,
  } = useInterpretacaoTarot();

  const handleStartConsult = async () => {
    await consultarEnergias(user);
  };

  return (
    <div className="w-full max-w-2xl mx-auto z-10 space-y-12 py-12">
      <header className="text-center space-y-2">
        <h2 className="text-4xl font-serif italic text-purple-100">
          Bem-vindo, {user?.nome?.split(" ")[0] || "Viajante"}
        </h2>
        <p className="text-slate-500 text-xs uppercase tracking-[0.3em]">
          O que o Tarot e os astros revelam para você hoje?
        </p>
      </header>

      <section className="bg-slate-900/40 border border-white/5 p-12 rounded-[3rem] shadow-2xl backdrop-blur-md text-center">
        {!isLoading && !resultado && !mensagemErro && (
          <div className="animate-in zoom-in duration-700 flex flex-col items-center">
            <LyraConstellation />
            <div className="space-y-1 mb-8">
              <h3 className="text-2xl font-light text-purple-100 tracking-widest italic">
                Sintonize a sua Intenção
              </h3>
              <p className="text-slate-500 text-xs font-normal max-w-xs mx-auto italic">
                Leitura da carta que definirá a energia do seu dia. Clique no botão abaixo.
              </p>
            </div>
            <button
              onClick={handleStartConsult}
              className="group relative px-20 py-5 bg-transparent overflow-hidden rounded-full transition-all duration-700 border border-purple-500/40 hover:border-purple-400 shadow-2xl shadow-purple-950/50 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/70 to-indigo-600/70 group-hover:opacity-100 opacity-70 transition-opacity"></div>
              <span className="relative text-white uppercase tracking-[0.5em] text-[10px] font-bold">
                Realizar leitura
              </span>
            </button>
          </div>
        )}

        {isLoading && (
          <div className="animate-in fade-in duration-1000 space-y-8 py-12 text-center">
            <div className="h-24 flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-purple-500/10 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
            <p className="text-purple-300 italic font-light tracking-widest text-lg">
              Consultando as energias do dia...
            </p>
          </div>
        )}

        {resultado && !isLoading && (
          <div className="animate-in zoom-in duration-1000 space-y-8 text-left">
            <div className="text-[10px] uppercase tracking-[0.5em] text-purple-400 font-bold text-center">
              A sua Interpretação
            </div>
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 shadow-inner">
              {resultado.split('\n').map((paragrafo, index) => (
              <p key={index} className="mb-4">{paragrafo}</p>
            ))}
            </div>
            <div className="flex justify-center">
              <button
                onClick={resetarConsulta}
                className="text-[10px] text-slate-500 hover:text-purple-300 uppercase tracking-[0.3em] transition-all border-b border-transparent hover:border-purple-500/30 pb-1"
              >
                Nova Leitura
              </button>
            </div>
          </div>
        )}

        {mensagemErro && !isLoading && (
          <div className="py-8 space-y-6 text-center">
            <p className="text-red-400 text-sm font-light italic">{mensagemErro}</p>
            <button
              onClick={resetarConsulta}
              className="text-[10px] text-slate-400 uppercase tracking-widest border border-white/10 px-6 py-2 rounded-full mx-auto block"
            >
              Tentar Novamente
            </button>
          </div>
        )}
      </section>
    </div>
  );
}