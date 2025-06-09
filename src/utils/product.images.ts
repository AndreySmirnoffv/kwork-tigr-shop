import { prisma } from '@services/prisma.service.js';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

const PHOTOS_BASE_PATH = path.resolve('images/Фото товара');
const PHOTOS_PREVIEW_BASE_PATH = path.resolve('images/Обложки')

interface SyncResult {
  totalProducts: number;
  matchedProducts: number;
  createdImages: number;
  errors: number;
}

async function syncProductImages() {
  const result: SyncResult = {
    totalProducts: 0,
    matchedProducts: 0,
    createdImages: 0,
    errors: 0
  };

  try {
    console.log(chalk.bold.cyan('\n🔄 Синхронизация фотографий товаров\n'));
    console.log(chalk.gray('='.repeat(60)));

    const products = await prisma.product.findMany({
      select: {
        id: true,
        brand: true,
        originalTitle: true
      }
    });

    result.totalProducts = products.length;

    await prisma.productImage.deleteMany();

    for (const product of products) {
      try {
        if (!product.originalTitle) {
          console.log(chalk.yellow(`⚠️ Товар ${product.id} без originalTitle`));
          continue;
        }

        const brandPath = path.join(PHOTOS_BASE_PATH, product.brand);
        const productPath = path.join(brandPath, product.originalTitle);

        if (!fs.existsSync(productPath)) {
          console.log(chalk.yellow(`⚠️ Папка не найдена: ${productPath}`));
          continue;
        }

        const imageFiles = fs.readdirSync(productPath)
          .filter(file => ['.jpg', '.jpeg', '.png', '.webp']
            .includes(path.extname(file).toLowerCase()))
          .map(file => path.join(productPath, file));

        if (imageFiles.length === 0) {
          console.log(chalk.yellow(`⚠️ Нет изображений в: ${productPath}`));
          continue;
        }

        for (const imagePath of imageFiles) {
          try {
            const imageData = fs.readFileSync(imagePath);
            await prisma.productImage.create({
              data: {
                data: imageData.toString('base64'),
                mimeType: getMimeType(imagePath),
                productId: product.id
              }
            });
            result.createdImages++;
          } catch (error) {
            console.log(chalk.red(`❌ Ошибка добавления: ${path.basename(imagePath)}`), error);
            result.errors++;
          }
        }

        console.log(chalk.green(`✅ ${product.originalTitle}: ${imageFiles.length} изображений`));
        result.matchedProducts++;

      } catch (error) {
        console.log(chalk.red(`❌ Ошибка товара ${product.id}`), error);
        result.errors++;
      }
    }

    printSyncResult(result);

  } catch (error) {
    console.error(chalk.red('❌ Ошибка синхронизации:'), error);
  } finally {
    await prisma.$disconnect();
  }
}

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.png': return 'image/png';
    case '.webp': return 'image/webp';
    default: return 'image/jpeg';
  }
}

function printSyncResult(result: SyncResult) {
  console.log(chalk.bold.cyan('\n' + '='.repeat(60)));
  console.log(chalk.bold('📊 Итоги:'));
  console.log(`   Всего товаров: ${result.totalProducts}`);
  console.log(`   Обработано: ${result.matchedProducts}`);
  console.log(chalk.green(`   Изображений: ${result.createdImages}`));
  console.log(chalk.red(`   Ошибок: ${result.errors}`));
  console.log(chalk.gray('='.repeat(60)));
}


async function insertProductPreviewImages() {
  try {
    console.log(chalk.cyan('\n🔄 Синхронизация обложек товаров'));
    console.log(chalk.gray('='.repeat(60)));

    await prisma.productPreviewImage.deleteMany();

    const products = await prisma.product.findMany({
      select: {
        id: true,
        brand: true,
        originalTitle: true
      }
    });

    for (const product of products) {
      if (!product.originalTitle || !product.brand) {
        console.log(chalk.yellow(`⚠️ Пропуск: отсутствует originalTitle или brand у товара ${product.id}`));
        continue;
      }

      const brandFolder = path.join(PHOTOS_PREVIEW_BASE_PATH, product.brand);

      if (!fs.existsSync(brandFolder)) {
        console.log(chalk.red(`❌ Папка бренда не найдена: ${brandFolder}`));
        continue;
      }

      let cleanTitle = product.originalTitle.trim();

      // Удаляем бренд из начала строки, если он там есть
      if (cleanTitle.toLowerCase().startsWith(product.brand.toLowerCase())) {
        cleanTitle = cleanTitle.substring(product.brand.length).trim();
      }

      const previewFileBase = `${cleanTitle} 0`;
      const possibleExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP'];

      let previewPath: string | null = null;

      for (const ext of possibleExtensions) {
        const candidatePath = path.join(brandFolder, previewFileBase + ext);
        if (fs.existsSync(candidatePath)) {
          previewPath = candidatePath;
          break;
        }
      }

      if (!previewPath) {
        console.log(chalk.yellow(`⚠️ Обложка не найдена для: ${product.originalTitle}`));
        console.log(chalk.gray(`📂 Содержимое папки ${brandFolder}:`));
        const files = fs.readdirSync(brandFolder);
        for (const file of files) console.log('   -', file);
        continue;
      }

      try {
        const imageData = fs.readFileSync(previewPath);
        await prisma.productPreviewImage.create({
          data: {
            data: imageData.toString('base64'),
            mimeType: getMimeType(previewPath),
            productId: product.id
          }
        });
        console.log(chalk.green(`✅ Обложка добавлена: ${product.originalTitle}`));
      } catch (error) {
        console.log(chalk.red(`❌ Ошибка при сохранении обложки: ${product.originalTitle}`), error);
      }
    }

    console.log(chalk.cyan('\n✔️ Синхронизация обложек завершена.'));
    console.log(chalk.gray('='.repeat(60)));
  } catch (error) {
    console.error(chalk.red('❌ Ошибка в insertProductPreviewImages:'), error);
  } finally {
    await prisma.$disconnect();
  }
}

await insertProductPreviewImages()

await syncProductImages()
  .then(() => console.log(chalk.green('\n✔ Готово')))
  .catch(err => console.error(chalk.red('✖ Ошибка:'), err));