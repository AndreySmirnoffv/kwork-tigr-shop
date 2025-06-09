import { TypeUser } from "#types/type.user.js";
import { createOrUpdateUser, findUserByIdentifier } from "@models/user.model.js";
import { Request, Response } from "express";

export async function getUser(req: Request, res: Response): Promise<Response | any> {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
        return res.status(400).json({ error: "Invalid or missing userId" });
    }

    try {
        const user: TypeUser | null = await findUserByIdentifier("userId", userId);
        console.log(user)
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({ user });
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export async function updateUser(req: Request, res: Response): Promise<Response | any>{
    const { data } = req.body

    try {
        await createOrUpdateUser(data)

        return { message: "User updated successfully" }

    } catch (error) {
        console.error(error)
    }
   
}

export async function logoutUser(req: Request, res: Response): Promise<Response | any> {
    try {
      res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: "/"
      });
  
      res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        path: "/"
      });
  
      return res.status(200).json({ 
        success: true,
        message: "Успешный выход",
        clearClientData: true // Флаг для клиента
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false,
        message: 'Ошибка сервера при выходе' 
      });
    }
  }