import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

/**
 * Plugin Vite pour inliner le CSS critique dans le HTML
 * Cela réduit le temps de First Contentful Paint (FCP) et Largest Contentful Paint (LCP)
 */
export function inlineCriticalCSS(): Plugin {
  return {
    name: 'inline-critical-css',
    apply: 'build', // Appliqué uniquement en mode build
    
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        // Lire le CSS critique
        const criticalCSSPath = path.resolve(__dirname, 'src/critical.css');
        
        if (!fs.existsSync(criticalCSSPath)) {
          console.warn('⚠️ Fichier critical.css introuvable. Ignoré.');
          return html;
        }
        
        const criticalCSS = fs.readFileSync(criticalCSSPath, 'utf-8');
        
        // Minifier le CSS critique (simple)
        const minifiedCSS = criticalCSS
          .replace(/\/\*[\s\S]*?\*\//g, '') // Supprimer les commentaires
          .replace(/\s+/g, ' ') // Réduire les espaces multiples
          .replace(/\s*([{}:;,>+~])\s*/g, '$1') // Supprimer les espaces autour des symboles
          .trim();
        
        // Injecter le CSS critique dans le <head>
        const criticalStyle = `<style>${minifiedCSS}</style>`;
        
        // Insérer juste après la balise <head> ou avant la première <link>
        const headEndIndex = html.indexOf('</head>');
        if (headEndIndex !== -1) {
          html = html.slice(0, headEndIndex) + criticalStyle + html.slice(headEndIndex);
        }
        
        return html;
      }
    }
  };
}

/**
 * Plugin pour précharger les ressources critiques
 */
export function preloadCriticalAssets(): Plugin {
  return {
    name: 'preload-critical-assets',
    apply: 'build',
    
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const preloads: string[] = [];
        
        // Trouver les chunks CSS et JS critiques
        if (ctx.bundle) {
          for (const [fileName, chunk] of Object.entries(ctx.bundle)) {
            if (chunk.type === 'chunk' && chunk.isEntry) {
              // Précharger le JS principal
              preloads.push(`<link rel="preload" href="/${fileName}" as="script" crossorigin>`);
            } else if (chunk.type === 'asset' && fileName.endsWith('.css')) {
              // Précharger le CSS principal
              preloads.push(`<link rel="preload" href="/${fileName}" as="style">`);
            }
          }
        }
        
        // Insérer les preloads dans le <head>
        if (preloads.length > 0) {
          const headEndIndex = html.indexOf('</head>');
          if (headEndIndex !== -1) {
            html = html.slice(0, headEndIndex) + preloads.join('') + html.slice(headEndIndex);
          }
        }
        
        return html;
      }
    }
  };
}

/**
 * Plugin pour charger les CSS non critiques de manière asynchrone
 */
export function asyncNonCriticalCSS(): Plugin {
  return {
    name: 'async-non-critical-css',
    apply: 'build',
    
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        // Convertir les <link rel="stylesheet"> en chargement asynchrone
        html = html.replace(
          /<link([^>]*rel=["']stylesheet["'][^>]*)>/gi,
          (match, attrs) => {
            // Ne pas modifier les liens externes (Google Fonts, etc.)
            if (attrs.includes('fonts.googleapis.com')) {
              return match;
            }
            
            // Ajouter media="print" onload="this.media='all'" pour chargement async
            if (!attrs.includes('media=')) {
              return `<link${attrs} media="print" onload="this.media='all'"><noscript><link${attrs}></noscript>`;
            }
            return match;
          }
        );
        
        return html;
      }
    }
  };
}
