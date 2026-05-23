import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const apiUrl =
    mode === "production"
      ? env.VITE_API_PROD || "https://devconnect-1-sl2s.onrender.com"
      : env.VITE_API_LOCAL || "http://localhost:8080"

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      "import.meta.env.VITE_API_URL": JSON.stringify(apiUrl),
    },
  }
})