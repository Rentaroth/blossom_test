import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  if(command === 'build') {
    return { plugins: [react()] }
  } else {
    return { plugins: [react(), postcss(), autoprefixer(), tailwindcss()] }
  }
})
