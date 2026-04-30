import React, { useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [user, setUser] = useState({ nome: "", dataNascimento: "" });
  const [erro, setErro] = useState(""); 

  const handleLogin = (e) => {
    e.preventDefault();
    setErro(""); 

    const dataInput = new Date(user.dataNascimento);
    const birthYear = dataInput.getFullYear();
    const currentYear = new Date().getFullYear();

    if (user.nome.trim().length < 3) {
      setErro("Por favor, insira um nome válido.");
      return;
    }

    if (birthYear > currentYear || birthYear < 1900 || user.dataNascimento.length > 10) {
      setErro("Por favor, insira um ano de nascimento entre 1900 e " + currentYear + ").");
      return;
    }

    if (isNaN(dataInput.getTime())) {
      setErro("Data de nascimento inválida.");
      return;
    }

    onLoginSuccess(user);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center p-6 font-sans antialiased">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-purple-900/20 blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md z-10 space-y-12 animate-in fade-in zoom-in duration-1000">
        <header className="text-center space-y-4">
          <h1 className="text-7xl font-serif font-extralight tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-b from-purple-100 to-purple-500 italic uppercase">
            Lyra
          </h1>
          <p className="text-slate-500 font-normal tracking-[0.4em] uppercase text-xs">
            Leitura de Tarot personalizada
          </p>
        </header>

        <form
          onSubmit={handleLogin}
          className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-md space-y-6"
        >
          {erro && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] uppercase tracking-widest p-3 rounded-xl text-center animate-in slide-in-from-top-2">
              {erro}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="nome" className="text-[10px] uppercase tracking-[0.2em] text-slate-500 ml-2 font-bold cursor-pointer">
              Nome Completo
            </label>
            <input
              id="nome"
              required
              type="text"
              value={user.nome}
              onChange={(e) => setUser({ ...user, nome: e.target.value })}
              className={`w-full bg-slate-950/50 border ${erro && user.nome.length < 3 ? 'border-red-500/50' : 'border-white/5'} rounded-2xl p-4 focus:border-purple-500/50 outline-none transition-all text-slate-200 placeholder:text-slate-800`}
              placeholder="Ex: Seu Nome Completo"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="dataNascimento" className="text-[10px] uppercase tracking-[0.2em] text-slate-500 ml-2 font-bold cursor-pointer">
              Data de Nascimento
            </label>
            <input
              id="dataNascimento"
              required
              type="date"
              value={user.dataNascimento}
              onChange={(e) => setUser({ ...user, dataNascimento: e.target.value })}
              className={`w-full bg-slate-950/50 border ${erro && erro.includes('ano') ? 'border-red-500/50' : 'border-white/5'} rounded-2xl p-4 focus:border-purple-500/50 outline-none transition-all text-slate-200`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-purple-900/20 transition-all active:scale-[0.98]"
          >
            Acessar o Oráculo
          </button>
        </form>
      </div>
    </div>
  );
}