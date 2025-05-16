import { TypeUser } from "#types/type.user";
import { createOrUpdateUser, findUserByIdentifier } from "@models/user.model";
import { removeCookie } from "@utils/jwt";
import { Request, Response } from "express";

export async function getUser(req: Request, res: Response): Promise<Response | any> {
    const { userId } = req.params;
    console.log("getUser: " + userId)

    // Проверка на правильность userId
    if (!userId || typeof userId !== "string") {
        return res.status(400).json({ error: "Invalid or missing userId" });
    }

    try {
        const user: TypeUser | null = await findUserByIdentifier("userId", userId);

        console.log("getuser log user: " + JSON.stringify(user))
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({ user });
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export async function logoutUser(req: Request, res: Response): Promise<Response | any> {
    try {
      // Очищаем куки
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