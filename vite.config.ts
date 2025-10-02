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
    minify: 'terser', // Utiliser Terser pour une meilleure compression que esbuild
    target: 'esnext', // Code plus moderne et plus petit
    cssMinify: 'esbuild', // Garder esbuild pour CSS (plus rapide)
    // Chunking optimal pour de meilleures performances
    rollupOptions: {
      output: {
        // Split vendors pour améliorer le cache et réduire les tailles
        manualChunks: (id) => {
          // React et core
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
            return 'react-vendor';
          }
          // UI libraries
          if (id.includes('framer-motion') || id.includes('lucide-react') || id.includes('@radix-ui')) {
            return 'ui-vendor';
          }
          // Particles (lazy loaded anyway)
          if (id.includes('@tsparticles') || id.includes('particles')) {
            return 'particles';
          }
          // Autres node_modules dans un chunk séparé
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Nommer les chunks de manière cohérente pour le cache
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Optimisation des assets
    assetsInlineLimit: 2048, // Réduire pour inliner moins d'assets
    chunkSizeWarningLimit: 300, // Limite encore plus stricte
    sourcemap: false, // Désactiver les sourcemaps en production
    // Compression CSS supplémentaire
    cssCodeSplit: true,
    // Minification supplémentaire avec Terser
    terserOptions: {
      compress: {
        drop_console: true, // Supprimer les console.log en production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      mangle: {
        safari10: true,
      },
    },
    // Optimisations supplémentaires
    reportCompressedSize: true,
  },
}));
