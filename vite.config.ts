import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { cjsInterop } from "vite-plugin-cjs-interop";

export default defineConfig({
  plugins: [react(), cjsInterop({
    dependencies: ['src/helpers/latexCompilation/DvipdfmxEngine']
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
