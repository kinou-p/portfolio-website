import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, '..', 'public', 'images');

// Liste des images utilisées dans les cartes projet (miniatures)
const thumbnailImages = [
  'projects/homemade_nas.webp',
  'projects/pong.webp',
  'projects/cloud_1.webp',
  'projects/minishell.webp',
  'projects/cub3d.webp',
  'sites/avopieces/mookup/3-devices-white (1).webp',
  'sites/etsidemain/mookup/3-devices-white.webp'
];

async function createThumbnail(filePath, size = 128) {
  const ext = extname(filePath);
  const dir = dirname(filePath);
  const name = basename(filePath, ext);
  const thumbnailPath = join(dir, `${name}_thumb${ext}`);

  try {
    const stats = await stat(filePath);
    const originalSize = stats.size;

    // Créer une miniature carrée de 128x128
    await sharp(filePath)
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      })
      .webp({
        quality: 85,
        effort: 6
      })
      .toFile(thumbnailPath);

    const newStats = await stat(thumbnailPath);
    const newSize = newStats.size;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(2);

    console.log(`✅ ${basename(filePath)}`);
    console.log(`   Original: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`   Miniature: ${(newSize / 1024).toFixed(2)} KB`);
    console.log(`   Réduction: ${reduction}%\n`);

    return { originalSize, newSize };
  } catch (error) {
    console.error(`❌ Erreur avec ${filePath}:`, error.message);
    return { originalSize: 0, newSize: 0 };
  }
}

async function main() {
  console.log('🖼️  Création des miniatures pour les cartes projet...\n');

  let totalOriginal = 0;
  let totalNew = 0;

  for (const imagePath of thumbnailImages) {
    const fullPath = join(publicDir, imagePath);
    const { originalSize, newSize } = await createThumbnail(fullPath);
    totalOriginal += originalSize;
    totalNew += newSize;
  }

  const totalReduction = ((totalOriginal - totalNew) / totalOriginal * 100).toFixed(2);

  console.log('=' .repeat(50));
  console.log(`📊 RÉSUMÉ DES MINIATURES:`);
  console.log(`   Taille originale: ${(totalOriginal / 1024).toFixed(2)} KB`);
  console.log(`   Taille miniatures: ${(totalNew / 1024).toFixed(2)} KB`);
  console.log(`   Économie totale: ${totalReduction}%`);
  console.log(`   ${(totalOriginal - totalNew) / 1024} KB économisés! 🎉`);
}

main().catch(console.error);
