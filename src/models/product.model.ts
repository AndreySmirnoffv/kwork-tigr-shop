import { prisma } from "@services/prisma.service.js";

export async function getProductsModel(categories: string[], limit: number = 5): Promise<Response | any> {
    return prisma.product.findMany({
        where: {
            category: {
                in: categories
            }
        },
        take: limit
    });
}


