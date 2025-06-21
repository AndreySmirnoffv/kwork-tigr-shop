import { getProductByIdModel, getProductsByFilterModel, getProductsModel } from '@models/product.model.js'
import { serializeBigInts, stringifyBigInt } from '@utils/stringifyBigInt.js'
import { Request, Response } from 'express'

export async function getProductsByFilter(req: Request, res: Response): Promise<Response | any> {
  try {
    const {
      minPrice,
      maxPrice,
      brand,
      name
    } = req.query;

    const filters = {
      minPrice: minPrice ? stringifyBigInt(minPrice) : undefined,
      maxPrice: maxPrice ? stringifyBigInt(maxPrice) : undefined,
      brand: typeof brand === 'string' ? brand : undefined,
      name: typeof name === 'string' ? name : undefined,
    };

    const products = await getProductsByFilterModel(filters);

    const serializedProducts = serializeBigInts(products);

    return res.json({ products: serializedProducts });
  } catch (error) {
    console.error('Ошибка при получении товаров:', error);
    return res.status(500).json({ error: 'Ошибка сервера' });
  }
}


export async function getLastProducts(req: Request, res: Response): Promise<Response | any> {
  try {
    const { categories } = req.body;

    const allProducts = await Promise.all(
      categories.map((category: any) => 
        getProductsModel([category], 4) 
      )
    );

    const sanitized = stringifyBigInt(allProducts);

    return res.json({ sanitized });
  } catch (error) {
    console.error("Error in getLastProducts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getProductById(req: Request, res: Response): Promise<Response | any>{
  try {
    const { id } = req.params

    const prodict = await getProductByIdModel(BigInt(id))

    return res.json({ prodict })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}