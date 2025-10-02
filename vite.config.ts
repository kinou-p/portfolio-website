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
        // Split vendors pour améliorer le cache et réduire le code inutilisé
        manualChunks: (id) => {
          // Ignorer les node_modules non critiques
          if (id.includes('node_modules')) {
            // React core - bundle séparé pour un meilleur cache
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) {
              return 'react-core';
            }
            
            // React Router - souvent utilisé
            if (id.includes('/react-router-dom/') || id.includes('/@remix-run/')) {
              return 'react-router';
            }
            
            // Radix UI - grouper tous les composants ensemble avec tree-shaking
            if (id.includes('@radix-ui/')) {
              return 'radix-ui';
            }
            
            // Framer Motion - animations (peut être volumineux)
            if (id.includes('/framer-motion/')) {
              return 'animations';
            }
            
            // Lucide React - icônes (volumineux)
            if (id.includes('/lucide-react/')) {
              return 'icons';
            }
            
            // tsparticles - animations de fond (optionnel)
            if (id.includes('@tsparticles/') || id.includes('/tsparticles/')) {
              return 'particles';
            }
            
            // TanStack Query
            if (id.includes('@tanstack/')) {
              return 'tanstack';
            }
            
            // Autres dépendances moins critiques
            return 'vendor';
          }
        },
        // Nommer les chunks de manière cohérente pour le cache
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
      // Optimisations supplémentaires pour le tree-shaking
      treeshake: {
        moduleSideEffects: 'no-external', // Pas d'effets de bord pour les modules externes
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
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
