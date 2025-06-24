import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  esbuild: {
    treeShaking: true,
  },
  // base: "https://emoease.b-cdn.net/", // 👈 Sửa ở đây để trỏ về CDN
  base: "/", // Ensure this is set correctly for Vercel
});
