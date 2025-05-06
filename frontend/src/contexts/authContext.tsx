import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login as loginService } from "../services/auth/login"; // Importe o seu serviço de login

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  token: string;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

// Provedor do contexto de autenticação
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setToken(token)
    }
  }, []);


  // Função de login (chama o serviço de login)
  const login = async (email: string, password: string) => {
    try {
      const { token, user } = await loginService(email, password);
      localStorage.setItem("token", token);
      setToken(token)
      setIsAuthenticated(true);
      setUser(user);
      console.log('LOGADO')
      navigate("/guests");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(`Erro ao fazer login. ${(error as { response: { data: { message: string } } }).response.data.message}`);
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login"); // Redireciona para a página de login após logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto de autenticação em outros componentes
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return useContext(AuthContext);
};
