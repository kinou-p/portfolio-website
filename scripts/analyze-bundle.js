import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distDir = join(__dirname, '..', 'dist');

async function getFileSize(filePath) {
  const stats = await stat(filePath);
  return stats.size;
}

async function analyzeDirectory(dir, prefix = '') {
  const files = await readdir(dir);
  const results = [];

  for (const file of files) {
    const fullPath = join(dir, file);
    const stats = await stat(fullPath);

    if (stats.isDirectory()) {
      results.push(...(await analyzeDirectory(fullPath, prefix + file + '/')));
    } else {
      const size = await getFileSize(fullPath);
      results.push({
        path: prefix + file,
        size,
        sizeKB: (size / 1024).toFixed(2),
        ext: extname(file)
      });
    }
  }

  return results;
}

async function main() {
  console.log('📊 Analyse du bundle de production...\n');

  try {
    const files = await analyzeDirectory(distDir);
    
    // Grouper par type
    const byType = files.reduce((acc, file) => {
      if (!acc[file.ext]) acc[file.ext] = [];
      acc[file.ext].push(file);
      return acc;
    }, {});

    // Afficher les statistiques
    console.log('📦 Taille par type de fichier:\n');
    
    Object.keys(byType).sort().forEach(ext => {
      const totalSize = byType[ext].reduce((sum, f) => sum + f.size, 0);
      const count = byType[ext].length;
      console.log(`${ext || 'no-ext'}: ${(totalSize / 1024).toFixed(2)} KB (${count} fichier${count > 1 ? 's' : ''})`);
    });

    // Fichiers les plus lourds
    console.log('\n🔝 10 fichiers les plus lourds:\n');
    files
      .sort((a, b) => b.size - a.size)
      .slice(0, 10)
      .forEach((file, i) => {
        console.log(`${i + 1}. ${file.path}: ${file.sizeKB} KB`);
      });

    // Taille totale
    const totalSize = files.reduce((sum, f) => sum + f.size, 0);
    console.log(`\n💾 Taille totale: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);

    // Avertissements
    console.log('\n⚠️  Avertissements:');
    const largeFiles = files.filter(f => f.size > 500 * 1024); // > 500KB
    if (largeFiles.length > 0) {
      console.log(`\n${largeFiles.length} fichier(s) de plus de 500 KB détecté(s):`);
      largeFiles.forEach(f => {
        console.log(`  - ${f.path}: ${f.sizeKB} KB`);
      });
    } else {
      console.log('✅ Aucun fichier trop lourd détecté!');
    }

  } catch (error) {
    console.error('❌ Erreur lors de l\'analyse:', error.message);
  }
}

main().catch(console.error);
