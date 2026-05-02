import React, { useState } from "react";

const BRAZILIAN_STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export default function SignUp({ onLoginSuccess }) {
  const [user, setUser] = useState({ 
    nome: "", 
    email: "", 
    dataNascimento: "", 
    horarioNascimento: "", 
    estado: "", 
    cidade: "", 
    senha: "" 
  });
  const [erros, setErros] = useState({}); 

  const handleSignUp = (e) => {
    e.preventDefault();
    const novosErros = {}; 

    if (user.nome.trim().length < 3) {
      novosErros.nome = "Por favor, insira um nome válido.";
    }

    if (user.email.trim().length < 3 || !user.email.includes('@')) {
      novosErros.email = "Por favor, insira um email válido.";
    }

    if (!user.estado) {
      novosErros.estado = "Selecione um estado.";
    }
    
    if (user.cidade.trim().length < 2) {
      novosErros.cidade = "Preencha uma cidade válida.";
    }

    const dataInput = new Date(user.dataNascimento + "T00:00:00");
    const birthYear = dataInput.getFullYear();
    const currentYear = new Date().getFullYear();

    if (birthYear > currentYear || birthYear < 1900 || user.dataNascimento.length > 10 || isNaN(dataInput.getTime())) {
      novosErros.dataNascimento = "Insira um ano de nascimento válido.";
    }

    if (!user.horarioNascimento) {
      novosErros.horarioNascimento = "Insira o horário de nascimento.";
    }

    if (user.senha.length < 6) {
      novosErros.senha = "A senha deve ter no mínimo 6 caracteres.";
    }

    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) {
      return;
    }

    // Aqui você pode integrar com a API de cadastro do seu backend no futuro
    // ex: await api.post('/register', user);
    
    onLoginSuccess(user);
  };

  const getInputClass = (hasError) => 
    `w-full bg-slate-950/50 border ${hasError ? 'border-red-500/50' : 'border-white/5'} rounded-2xl p-4 focus:border-purple-500/50 outline-none transition-all text-slate-200 placeholder:text-slate-800`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center p-6 font-sans antialiased">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-purple-900/20 blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md z-10 space-y-12 animate-in fade-in zoom-in duration-1000">
        <header className="text-center space-y-4">
          <h1 className="text-7xl font-serif font-extralight tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-b from-purple-100 to-purple-500 italic uppercase">
            Lyra
          </h1>
        </header>

        <form
          onSubmit={handleSignUp}
          noValidate
          className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-md space-y-6"
        >
          {Object.keys(erros).length > 0 && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] uppercase tracking-widest p-3 rounded-xl text-center animate-in slide-in-from-top-2">
              Por favor, preencha corretamente os campos destacados.
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
              className={getInputClass(erros.nome)}
              placeholder="Ex: Seu Nome Completo"
            />
            {erros.nome && <p className="text-red-400 text-[10px] ml-2">{erros.nome}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] text-slate-500 ml-2 font-bold cursor-pointer">
              Email
            </label>
            <input
              id="email"
              required
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className={getInputClass(erros.email)}
              placeholder="Ex: seu.email@dominio.com"
            />
            {erros.email && <p className="text-red-400 text-[10px] ml-2">{erros.email}</p>}
          </div>
            
          <div className="space-y-2 w-full">
            <label htmlFor="estado" className="text-[10px] uppercase tracking-[0.2em] text-slate-500 ml-2 font-bold cursor-pointer">
              Local de Nascimento
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <select
                  id="estado"
                  required
                  value={user.estado}
                  onChange={(e) => setUser({ ...user, estado: e.target.value })}
                  className={`${getInputClass(erros.estado)} ${!user.estado ? 'text-slate-800' : ''}`}
                >
                  <option value="" disabled>
                    UF
                  </option>
                  {BRAZILIAN_STATES.map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>

              <div className="w-full md:w-2/3">
                <input
                  id="cidade"
                  required
                  type="text"
                  value={user.cidade}
                  onChange={(e) => setUser({ ...user, cidade: e.target.value })}
                  className={getInputClass(erros.cidade)}
                  placeholder=" Cidade"
                />            
              </div>
              
            </div>
            {erros.estado && <p className="text-red-400 text-[10px] ml-2">{erros.estado}</p>}
            {erros.cidade && !erros.estado && <p className="text-red-400 text-[10px] ml-2">{erros.cidade}</p>}
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
              className={getInputClass(erros.dataNascimento)}
            />
            {erros.dataNascimento && <p className="text-red-400 text-[10px] ml-2">{erros.dataNascimento}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="horarioNascimento" className="text-[10px] uppercase tracking-[0.2em] text-slate-500 ml-2 font-bold cursor-pointer">
              Horário de Nascimento
            </label>
            <input
              id="horarioNascimento"
              required
              type="time"
              value={user.horarioNascimento}
              onChange={(e) => setUser({ ...user, horarioNascimento: e.target.value })}
              className={getInputClass(erros.horarioNascimento)}
            />
            {erros.horarioNascimento && <p className="text-red-400 text-[10px] ml-2">{erros.horarioNascimento}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="senha" className="text-[10px] uppercase tracking-[0.2em] text-slate-500 ml-2 font-bold cursor-pointer">
              Senha
            </label>
            <input
              id="senha"
              required
              type="password"
              value={user.senha}
              onChange={(e) => setUser({ ...user, senha: e.target.value })}
              className={getInputClass(erros.senha)}
            />
            {erros.senha && <p className="text-red-400 text-[10px] ml-2">{erros.senha}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl shadow-purple-900/20 transition-all active:scale-[0.98]"
          >
            Criar conta
          </button>
        </form>
      </div>
    </div>
  );
}