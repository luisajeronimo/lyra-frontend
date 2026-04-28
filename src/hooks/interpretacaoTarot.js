import { useState, useCallback } from "react";
import axios from "axios";

export const interpretacaoTarot = () => {
  const [resultado, setResultado] = useState(null);
  const [mensagemErro, setMensagemErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const consultarEnergias = useCallback(async (user) => {
    setIsLoading(true);
    setMensagemErro("");
    setResultado(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      const response = await axios.post(
        `${apiUrl}/api/interpretacao/informarDados`,
        user,
      );
      setResultado(response.data);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Erro na consulta mística:", error);
      setMensagemErro(
        "As correntes de energia estão instáveis. Certifique-se de que o Backend está ligado.",
      );
      setIsLoading(false);
      return false;
    }
  }, []);

  const resetarConsulta = useCallback(() => {
    setResultado(null);
    setMensagemErro("");
  }, []);

  return {
    consultarEnergias,
    resultado,
    isLoading,
    mensagemErro,
    resetarConsulta,
  };
};
