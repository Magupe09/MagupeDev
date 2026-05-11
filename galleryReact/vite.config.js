import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.gltf'], // Incluye archivos GLB y GLTF como assets
  base: './',
  resolve: {
    // Evita múltiples instancias de React en el bundle.
    // El paquete linkeado tiene su propia copia en node_modules → forzamos
    // una sola instancia desde el proyecto principal.
    dedupe: ['react', 'react-dom', 'framer-motion'],
  },
  // -------------------------
})
