import api from "../axios";

// Tipo para o retorno de login
interface LoginResponse {
  token: string;
  user: User;
}

const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response: DataResponse<LoginResponse> = await api.post(
      "/auth/login",
      {
        email,
        password
      }
    );

    const { token, user } = response.data;

    // Armazenando o token no localStorage
    localStorage.setItem("token", token);

    return { token, user };
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export { login };
