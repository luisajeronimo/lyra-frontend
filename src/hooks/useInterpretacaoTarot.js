import { useState, useCallback } from "react";
import { postDadosTarot } from "../services/tarotService";

export const useInterpretacaoTarot = () => {
  const [resultado, setResultado] = useState(null);
  const [mensagemErro, setMensagemErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const consultarEnergias = useCallback(async (user) => {
    setIsLoading(true);
    setMensagemErro("");
    setResultado(null);

    try {
      const data = await postDadosTarot(user);
      setResultado(data);
      return true;
    } catch (error) {
      console.error("Erro na consulta:", error);
      setMensagemErro(
        "As correntes de energia estão instáveis. Certifique-se de que o Backend está ligado."
      );
      return false;
    } finally {
      setIsLoading(false);
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
