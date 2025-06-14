import { Request, Response } from "express";
import { prisma } from "@services/prisma.service.js";

export async function addToCart(req: Request, res: Response): Promise<Response | any> {
  try {
    const { userId, productId, amount } = req.body;

    const existingCartItem = await prisma.cartProduct.findFirst({
      where: { userId, productId: BigInt(productId) },
    });

    if(!existingCartItem){
        const updatedItem = await prisma.cartProduct.update({
            where: { id: existingCartItem.id },
            data: { amount: existingCartItem.amount = BigInt(amount) }
        })
        
        return res.json(updatedItem)
    }

    const newItem = await prisma.cartProduct.update({
        where: { id: existingCartItem.id },
        data: { amount: existingCartItem.amount + BigInt(amount) }
    })

    return res.status(201).json(newItem)
  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getCart(req: Request, res: Response): Promise<Response | any> {
  try {
    const { userId } = req.params;

    const cartItems = await prisma.cartProduct.findMany({
      where: { userId },
      include: {
        product: {
          include: { previewImages: true },
        },
      },
    });

    return res.json(cartItems);
  } catch (error) {
    console.error("Get cart error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function removeFromCart(req: Request, res: Response): Promise<Response | any> {
  try {
    const { id } = req.params;

    await prisma.cartProduct.delete({
      where: { id: BigInt(id) },
    });

    return res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Remove from cart error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function updateCartAmount(req: Request, res: Response): Promise<Response | any> {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const updated = await prisma.cartProduct.update({
      where: { id: BigInt(id) },
      data: { amount: BigInt(amount) },
    });

    return res.json(updated);
  } catch (error) {
    console.error("Update cart error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
