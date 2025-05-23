import { findUserByUserId } from '@models/user.model';
import { removeCookie } from '@utils/jwt';
import { Request, Response } from 'express'


export async function getUser(req: Request, res: Response): Promise<Response | any> {
    const { userId } = req.params;

    console.log("getUser userId:", userId);

    try {
        const user = await findUserByUserId(userId); // добавлен await

        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        return res.status(200).json({
            message: 'Пользователь успешно получен',
            user,
        });
    } catch (error) {
        console.error("Ошибка при получении пользователя:", error);
        return res.status(500).json({ message: "Ошибка сервера" });
    }
}


export async function logoutUser(req: Request, res: Response): Promise<Response | any>{
    try {
        removeCookie(res);
        return res.status(200).json({ message: 'Пользователь успешно вышел' });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Ошибка сервера" });
    }
   
}