import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const filesToUpdate = [
  'src/components/sections/ProjectsSection.tsx',
  'src/data/projects.ts'
];

async function updateFile(filePath) {
  try {
    let content = await readFile(filePath, 'utf-8');
    const originalContent = content;
    
    // Remplacer .png, .jpg, .jpeg par .webp
    content = content.replace(/\.(png|jpg|jpeg)"/g, '.webp"');
    content = content.replace(/\.(png|jpg|jpeg)'/g, ".webp'");
    
    if (content !== originalContent) {
      await writeFile(filePath, content, 'utf-8');
      console.log(`✅ ${filePath} mis à jour`);
      return true;
    } else {
      console.log(`⏭️  ${filePath} - aucun changement nécessaire`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erreur avec ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🔄 Mise à jour des références d\'images...\n');
  
  let updatedCount = 0;
  for (const file of filesToUpdate) {
    const updated = await updateFile(file);
    if (updated) updatedCount++;
  }
  
  console.log(`\n✨ ${updatedCount} fichier(s) mis à jour!`);
}

main().catch(console.error);
