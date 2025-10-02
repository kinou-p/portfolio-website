#!/usr/bin/env node

/**
 * Script pour analyser les bundles JavaScript et calculer les économies
 * Lance après npm run build
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const DIST_DIR = './dist/assets/js';
const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  red: '\x1b[31m',
};

function formatSize(bytes) {
  const kb = bytes / 1024;
  return kb.toFixed(2) + ' KiB';
}

function analyzeBundle() {
  console.log(`\n${COLORS.bright}${COLORS.blue}📊 Analyse du Bundle JavaScript${COLORS.reset}\n`);
  console.log('━'.repeat(80));

  try {
    const files = readdirSync(DIST_DIR);
    const jsFiles = files.filter(f => f.endsWith('.js'));
    
    let totalSize = 0;
    const chunks = [];

    jsFiles.forEach(file => {
      const filePath = join(DIST_DIR, file);
      const stats = statSync(filePath);
      totalSize += stats.size;
      
      // Extraire le nom du chunk
      const chunkName = file.split('-')[0];
      
      chunks.push({
        name: file,
        chunkName,
        size: stats.size,
      });
    });

    // Trier par taille décroissante
    chunks.sort((a, b) => b.size - a.size);

    // Afficher les chunks
    console.log(`${COLORS.bright}Fichiers JavaScript générés :${COLORS.reset}\n`);
    
    chunks.forEach((chunk, index) => {
      const bar = '█'.repeat(Math.ceil(chunk.size / (totalSize / 50)));
      const percentage = ((chunk.size / totalSize) * 100).toFixed(1);
      
      let color = COLORS.green;
      if (chunk.size > 100 * 1024) color = COLORS.red;
      else if (chunk.size > 50 * 1024) color = COLORS.yellow;
      
      console.log(
        `${index + 1}. ${COLORS.bright}${chunk.name}${COLORS.reset}`
      );
      console.log(
        `   ${color}${bar}${COLORS.reset} ${formatSize(chunk.size)} (${percentage}%)`
      );
      console.log();
    });

    console.log('━'.repeat(80));
    console.log(
      `${COLORS.bright}Total JavaScript:${COLORS.reset} ${COLORS.green}${formatSize(totalSize)}${COLORS.reset}`
    );

    // Calculer les économies estimées
    const beforeOptimization = 231 * 1024; // 231 KiB avant
    const savings = beforeOptimization - totalSize;
    const savingsPercent = ((savings / beforeOptimization) * 100).toFixed(1);

    if (savings > 0) {
      console.log(
        `${COLORS.bright}Économies:${COLORS.reset} ${COLORS.green}${formatSize(savings)} (-${savingsPercent}%)${COLORS.reset}`
      );
    }

    console.log('━'.repeat(80));

    // Recommandations
    console.log(`\n${COLORS.bright}${COLORS.blue}💡 Recommandations${COLORS.reset}\n`);
    
    const largeChunks = chunks.filter(c => c.size > 100 * 1024);
    if (largeChunks.length > 0) {
      console.log(`${COLORS.yellow}⚠️  Chunks volumineux détectés (> 100 KiB):${COLORS.reset}`);
      largeChunks.forEach(chunk => {
        console.log(`   - ${chunk.name}: ${formatSize(chunk.size)}`);
      });
      console.log(`   ${COLORS.bright}→ Considérez le lazy loading ou le code splitting${COLORS.reset}\n`);
    } else {
      console.log(`${COLORS.green}✓ Tous les chunks sont optimisés${COLORS.reset}\n`);
    }

    // Vérifications de performance
    console.log(`${COLORS.bright}Performance Checklist:${COLORS.reset}`);
    console.log(`${totalSize < 150 * 1024 ? COLORS.green + '✓' : COLORS.red + '✗'} Bundle total < 150 KiB ${COLORS.reset}`);
    console.log(`${chunks[0].size < 100 * 1024 ? COLORS.green + '✓' : COLORS.red + '✗'} Plus gros chunk < 100 KiB ${COLORS.reset}`);
    console.log(`${chunks.length > 3 ? COLORS.green + '✓' : COLORS.yellow + '⚠'} Code splitting activé (${chunks.length} chunks) ${COLORS.reset}`);
    
    console.log();

  } catch (error) {
    console.error(`${COLORS.red}Erreur lors de l'analyse:${COLORS.reset}`, error.message);
    console.log(`\n${COLORS.yellow}💡 Assurez-vous d'avoir lancé 'npm run build' d'abord${COLORS.reset}\n`);
  }
}

// Lancer l'analyse
analyzeBundle();
