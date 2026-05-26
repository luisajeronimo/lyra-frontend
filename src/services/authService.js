import api from "./api";

export const authService = {
  async register(userData) {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || "Erro ao registrar o usuário.");
      }
      throw new Error("Não foi possível conectar ao servidor. Tente novamente mais tarde.");
    }
  },

  async login(credentials) {
    try {
      const response = await api.post("/auth/login", credentials);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("E-mail ou senha incorretos.");
      }
      throw new Error("Erro inesperado ao realizar login.");
    }
  },

  logout() {
    localStorage.removeItem("token");
  }
};
