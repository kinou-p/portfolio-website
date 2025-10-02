import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, '..', 'public', 'images');

async function getAllImageFiles(dir) {
  const files = [];
  const items = await readdir(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const itemStat = await stat(fullPath);

    if (itemStat.isDirectory()) {
      files.push(...(await getAllImageFiles(fullPath)));
    } else if (['.png', '.jpg', '.jpeg'].includes(extname(item).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  const dir = dirname(filePath);
  const name = basename(filePath, ext);
  const webpPath = join(dir, `${name}.webp`);

  try {
    const stats = await stat(filePath);
    const originalSize = stats.size;

    // Convertir en WebP avec optimisation
    await sharp(filePath)
      .webp({ 
        quality: 85, 
        effort: 6 
      })
      .toFile(webpPath);

    const newStats = await stat(webpPath);
    const newSize = newStats.size;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(2);

    console.log(`✅ ${basename(filePath)}`);
    console.log(`   Original: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`   WebP: ${(newSize / 1024).toFixed(2)} KB`);
    console.log(`   Réduction: ${reduction}%\n`);

    return { originalSize, newSize };
  } catch (error) {
    console.error(`❌ Erreur avec ${filePath}:`, error.message);
    return { originalSize: 0, newSize: 0 };
  }
}

async function main() {
  console.log('🖼️  Optimisation des images...\n');

  const imageFiles = await getAllImageFiles(publicDir);
  console.log(`📊 ${imageFiles.length} images trouvées\n`);

  let totalOriginal = 0;
  let totalNew = 0;

  for (const file of imageFiles) {
    const { originalSize, newSize } = await optimizeImage(file);
    totalOriginal += originalSize;
    totalNew += newSize;
  }

  const totalReduction = ((totalOriginal - totalNew) / totalOriginal * 100).toFixed(2);

  console.log('=' .repeat(50));
  console.log(`📊 RÉSUMÉ TOTAL:`);
  console.log(`   Taille originale: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Taille optimisée: ${(totalNew / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Économie totale: ${totalReduction}%`);
  console.log(`   ${(totalOriginal - totalNew) / 1024 / 1024} MB économisés! 🎉`);
}

main().catch(console.error);
