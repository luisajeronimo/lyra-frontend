import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const postDadosTarot = async (userData) => {

  const response = await axios.post(`${apiUrl}/api/interpretacao/informarDados`, userData);
  return response.data;
};