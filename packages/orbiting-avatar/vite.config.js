import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'OrbitingAvatar',
      formats: ['es', 'cjs'],
      fileName: (format) => `orbiting-avatar.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      // No empaquetar estas dependencias — el consumidor las provee
      external: ['react', 'react-dom', 'framer-motion', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'framer-motion': 'FramerMotion',
        },
      },
    },
    // Generar sourcemaps para debugging
    sourcemap: true,
    // Limpiar dist antes de cada build
    emptyOutDir: true,
  },
  css: {
    modules: {
      // Mantener los nombres de clase predecibles en desarrollo
      localsConvention: 'camelCaseOnly',
    },
  },
});
