// já no padrão RHF
import { Button } from "@/components/Button";
import { Input } from "@/components/InputComponent";
import { useAuth } from "@/contexts/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {

  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation();
  const from = (location.state)?.from?.pathname || "/guests";
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [from, isAuthenticated, navigate])
  const onSubmit = async (data: LoginForm) => {
    await login(data.email, data.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-amber-600">Acessar sistema</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email"
            placeholder="seu@email.com"
            error={!!errors.email}
            infoText={errors.email?.message}
            control={control}
            fieldName="email"
            value={watch("email")}
          />

          <Input
            label="Senha"
            placeholder="••••••••"
            error={!!errors.password}
            infoText={errors.password?.message}
            control={control}
            fieldName="password"
            value={watch("password")}
            type={"password"}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-md transition"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
