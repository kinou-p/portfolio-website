/**
 * Script pour extraire le CSS critique
 * Utilise Puppeteer pour analyser la page et extraire uniquement le CSS nécessaire au rendu initial
 * 
 * Installation requise:
 * npm install --save-dev puppeteer critical
 * 
 * Utilisation:
 * node scripts/extract-critical-css.js
 */

import { generate } from 'critical';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function extractCriticalCSS() {
  try {
    console.log('🔍 Extraction du CSS critique...');
    
    const { css, html } = await generate({
      // Chemin vers le fichier HTML de build
      base: path.join(__dirname, '../dist/'),
      src: 'index.html',
      
      // Dimensions pour le CSS critique (above the fold)
      dimensions: [
        {
          width: 375,
          height: 667
        }, // Mobile
        {
          width: 1920,
          height: 1080
        }, // Desktop
      ],
      
      // Options d'extraction
      inline: false, // Ne pas inliner automatiquement
      extract: true,
      
      // Ignorer les erreurs de ressources externes
      ignore: {
        atrule: ['@font-face', '@import'],
        rule: [/^\.tsparticles/],
      },
      
      // Pourcentage de couverture CSS
      penthouse: {
        timeout: 60000,
        maxEmbeddedBase64Length: 1000,
        renderWaitTime: 500,
      }
    });
    
    console.log('✅ CSS critique extrait avec succès!');
    console.log(`📊 Taille: ${(css.length / 1024).toFixed(2)} KB`);
    
    // Sauvegarder le CSS critique
    const fs = await import('fs');
    const criticalPath = path.join(__dirname, '../src/critical.css');
    
    // Ajouter un commentaire en haut du fichier
    const header = `/* Critical CSS - Généré automatiquement le ${new Date().toISOString()} */\n/* Ne pas modifier manuellement - Utiliser npm run extract-critical-css */\n\n`;
    
    fs.writeFileSync(criticalPath, header + css);
    console.log(`💾 Sauvegardé dans: ${criticalPath}`);
    
    return css;
  } catch (error) {
    console.error('❌ Erreur lors de l\'extraction du CSS critique:', error);
    process.exit(1);
  }
}

// Exécuter si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  extractCriticalCSS();
}

export { extractCriticalCSS };
