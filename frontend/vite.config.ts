import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src") // Isso mapeia o alias "@" para a pasta "src"
    }
  },
  build: {
    target: "esnext", // Definir para 'esnext' garante que os módulos sejam gerados corretamente
    outDir: "dist", // Diretório de saída, verifique se está apontando para a pasta correta
    modulePreload: true // Garante que o preload de módulos seja feito corretamente
  }
});
