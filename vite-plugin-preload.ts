import type { Plugin } from 'vite';

export function preloadPlugin(): Plugin {
  return {
    name: 'vite-plugin-preload',
    transformIndexHtml(html) {
      // Ajouter des preload hints pour les chunks critiques
      const preloadLinks = `
    <!-- Preload critical resources -->
    <link rel="modulepreload" href="/src/main.tsx" />
    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
    <link rel="dns-prefetch" href="https://fonts.gstatic.com" />`;
      
      return html.replace('</head>', `${preloadLinks}\n  </head>`);
    },
  };
}
