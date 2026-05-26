import api from "./api";

export const postDadosTarot = async () => {
  const response = await api.post("/api/interpretacao/gerar-leitura-do-dia");
  return response.data;
};