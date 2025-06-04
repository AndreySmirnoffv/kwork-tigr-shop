import { google } from 'googleapis';
import { auth } from '@services/google.sheets.js';
import { prisma } from '@services/prisma.service.js';

async function parseSheets() {
    const spreadsheetId = "1naTkxDrQFfj_d7Q2U46GOj24hSqTAqrt_Yz1ImaKyVc";
    const googleSheets = google.sheets({ version: "v4" });

    try {
        const { data: { values } } = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "Продукция"
        });

        if (!values || values.length === 0) {
            console.log("🟠 Нет данных для обработки");
            return;
        }


        if (values[0][0] === 'Добавление товара') {
            values.shift();
        }
        
        if (values[0][0] === 'Артикул') {
            values.shift();
        }
        
        values.pop();

        const filteredData = values.filter(row => 
            row.length >= 19 && row.some(cell => cell.trim() !== '')
        );

        for (const [index, product] of filteredData.entries()) {
            try {
                const productData: any = {
                    article: product[0].trim(),
                    brand: product[1].trim(),
                    title: product[2].trim(),
                    category: product[4].trim(),
                    gender: product[5].trim(),
                    price: String(product[6]) || 0,
                    description: product[7].trim(),
                    isNew: product[8].toUpperCase() === 'TRUE',
                    isHit: product[9].toUpperCase() === 'TRUE',
                    isCollab: product[10].toUpperCase() === 'TRUE',
                    originalTitle: product[11].trim(),
                    isFirstPhoto: product[12].toUpperCase() === 'TRUE',
                    isSecondPhoto: product[13].toUpperCase() === 'TRUE',
                    isThirdPhoto: product[14].toUpperCase() === 'TRUE',
                    isFourthPhoto: product[15].toUpperCase() === 'TRUE',
                    isFifthPhoto: product[16].toUpperCase() === 'TRUE',
                    isSixthPhoto: product[17].toUpperCase() === 'TRUE',
                    photoName: product[18].trim()
                };

                if (!productData.article || !productData.brand || !productData.title) {
                    console.log(`🟡 Пропущен товар ${index + 1}: отсутствуют обязательные поля`);
                    continue;
                }

                await prisma.product.upsert({
                    where: { article: productData.article },
                    create: productData,
                    update: productData
                });

                console.log(`🟢 Успех: ${productData.article} - ${productData.title}`);

            } catch (error) {
                console.error(`🔴 Ошибка в товаре ${index + 1}:`, product[0], error);
            }
        }

        console.log("✅ Синхронизация завершена. Обработано:", filteredData.length, "товаров");

    } catch (error) {
        console.error("🔴 Критическая ошибка:", error);
    } finally {
        await prisma.$disconnect();
    }
}

// Запускаем синхронизацию
parseSheets().catch(error => {
    console.error("🔴 Необработанная ошибка:", error);
    process.exit(1);
});