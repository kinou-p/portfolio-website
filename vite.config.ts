import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      "alexandre-pommier.com",
      "www.alexandre-pommier.com",
      "localhost",
      "127.0.0.1",
      "0.0.0.0"
    ]
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimisations pour la production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Retire les console.log en production
        drop_debugger: true,
      },
    },
    // Chunking optimal pour de meilleures performances
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'particles': ['@tsparticles/react', '@tsparticles/slim'],
          'radix-ui': Object.keys(require('./package.json').dependencies).filter(key => key.startsWith('@radix-ui')),
        },
      },
    },
    // Optimisation des assets
    assetsInlineLimit: 4096, // Images < 4kb seront inline en base64
    chunkSizeWarningLimit: 1000, // Augmenter la limite d'avertissement
    sourcemap: false, // Désactiver les sourcemaps en production
  },
}));
