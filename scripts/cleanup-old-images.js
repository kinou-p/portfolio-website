import { unlink } from 'fs/promises';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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

async function main() {
  console.log('🗑️  Suppression des anciennes images PNG/JPG...\n');

  const imageFiles = await getAllImageFiles(publicDir);
  console.log(`📊 ${imageFiles.length} images à supprimer\n`);

  let deletedCount = 0;
  for (const file of imageFiles) {
    try {
      await unlink(file);
      console.log(`✅ Supprimé: ${file}`);
      deletedCount++;
    } catch (error) {
      console.error(`❌ Erreur avec ${file}:`, error.message);
    }
  }

  console.log(`\n✨ ${deletedCount} image(s) supprimée(s)!`);
}

main().catch(console.error);
