import { TypeProductFilter } from "#types/type.filters.js";
import { prisma } from "@services/prisma.service.js";

export async function getProductsModel(categories: string[], limit: number = 5): Promise<any> {
    return prisma.product.findMany({
        where: {
            category: {
                in: categories
            }
        },
        take: limit,
        include: {
            previewImages: true
        }
    });
}


export async function getProductsByFilterModel(filters: TypeProductFilter) {
  const { minPrice, maxPrice, brand, name } = filters;

  const where: any = {};

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) where.price.gte = minPrice;
    if (maxPrice !== undefined) where.price.lte = maxPrice;
  }

  if (brand) {
    where.brand = { equals: brand, mode: 'insensitive' };
  }

  if (name) {
    where.name = { contains: name, mode: 'insensitive' };
  }

  return await prisma.product.findMany({ where, include: {
    previewImages: true
  }});

}

export async function getProductByIdModel(id: bigint){
  return await prisma.product.findFirst({
    where: { id },
    include: {
      images: true
    }
  })
}