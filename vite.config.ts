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
    minify: 'esbuild', // Utiliser esbuild au lieu de terser (plus rapide, déjà inclus)
    target: 'esnext', // Code plus moderne et plus petit
    cssMinify: true,
    // Chunking optimal pour de meilleures performances
    rollupOptions: {
      output: {
        // Split vendors pour améliorer le cache
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'particles': ['@tsparticles/react', '@tsparticles/slim', '@tsparticles/engine'],
        },
        // Nommer les chunks de manière cohérente pour le cache
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Optimisation des assets
    assetsInlineLimit: 4096, // Images < 4kb seront inline en base64
    chunkSizeWarningLimit: 500, // Limite plus stricte pour éviter les gros bundles
    sourcemap: false, // Désactiver les sourcemaps en production
    // Compression CSS supplémentaire
    cssCodeSplit: true,
    // Minification supplémentaire
    reportCompressedSize: true,
  },
}));
