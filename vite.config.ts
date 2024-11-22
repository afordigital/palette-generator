import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src").toString(),
      "@components": path.resolve(__dirname, "./src/components/").toString(),
      "@assets": path.resolve(__dirname, "./src/assets/").toString(),
      "@layouts": path.resolve(__dirname, "./src/layout/").toString(),
      "@lib": path.resolve(__dirname, "./src/lib/").toString(),
      "@utils": path.resolve(__dirname, "./src/utils/").toString(),
    },
  },
});
