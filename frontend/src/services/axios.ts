import axios from "axios";

// Criando a instância do Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Adicionando o token JWT ao cabeçalho Authorization
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Obtendo o token do localStorage
    if (config.headers && token) {
      config.headers.Authorization = `Bearer ${token}`; // Adicionando o token no cabeçalho
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Adicionando um interceptor para o tratamento de erro
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      console.error(error.response.data.message || error.message);
    }
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        localStorage.removeItem("token"); // Remove o token inválido

        // Opcional: redirecionar para a página de login
        window.location.href = "/login";
      } else {
        console.error(error.response.data.message || error.message);
      }
    } else {
      console.error(error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
