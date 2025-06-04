import { TypeProducts } from '#types/type.products.js'
import { getProductsModel } from '@models/product.model.js'
import { stringifyBigInt } from '@utils/stringifyBigInt.js'
import { Request, Response } from 'express'

export async function getProductsByFilter(req: Request, res: Response): Promise<Response | any>{
    const { categories } = req.body

    const products: TypeProducts = await getProductsModel(categories, 5)

    return res.json({ products })
}



export async function getLastProducts(req: Request, res: Response): Promise<Response | any> {
    const { categories } = req.body;
    const products: TypeProducts = await getProductsModel(categories, 5);

    const sanitized = stringifyBigInt(products);

    return res.json({ sanitized });
}


