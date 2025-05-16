import { TypeUser } from '#types/type.user';
import { createOrUpdateUser, findUserByIdentifier } from '@models/user.model';
import { comparePassword, hashPassword } from '@utils/bcrypt';
import { generateAuthTokens, setAuthCookies } from '@utils/jwt';
import { Request, Response } from 'express';
import { tokenConfig } from 'src/configs/jwt.token.config';
import { v7 } from 'uuid';
import jwt from 'jsonwebtoken'

export async function register(req: Request, res: Response): Promise<Response | any> {
    try {
        const { email, phone, password } = req.body;
        const userExists: TypeUser | null = await findUserByIdentifier("email", email);
        console.log(userExists)
        if (userExists) {
            return res.status(409).json({ message: 'Пользователь уже существует' });
        }

        const hashedPassword = await hashPassword(password);

        const newUser: TypeUser = {
          email,
          phone,
          userId: v7(),
          password: hashedPassword,
        };
        
        await createOrUpdateUser(newUser);
        
        const { accessToken, refreshToken } = await generateAuthTokens({
          email: newUser.email,
          userId: newUser?.userId,
        });
        setAuthCookies(res, { accessToken, refreshToken });

        const { password: _, ...user } = newUser;


        return res.json({ message: 'Пользователь успешно зарегистрирован', user, accessToken, refreshToken });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Ошибка регистрации пользователя' });
    }
}

export async function login(req: Request, res: Response): Promise<Response | any> {
  try {
      const { email, phone, password } = req.body;

      const identifier = email || phone;
      const identifierType = email ? "email" : phone ? "phone" : null;

      if (!identifier || !password || !identifierType) {
        return res.status(400).json({ message: 'Email или телефон и пароль обязательны' });
      }

      const user: TypeUser | null = await findUserByIdentifier(identifierType, identifier);

      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Неверный пароль' });
      }

      if (!user.userId) {
        return res.status(500).json({ message: 'У пользователя отсутствует userId' });
      }

      const { accessToken, refreshToken } = await generateAuthTokens({
        email: user.email,
        userId: user.userId,
      });

      console.log("accessToken login: " + accessToken, "\n" + "refreshToken login: " + refreshToken)
      setAuthCookies(res, { accessToken, refreshToken });
      return res.status(200).json({
        message: 'Успешный вход',
        user: {
          email: user.email,
          phone: user.phone,
          userId: user.userId,
          accessToken,
        },
      });
  } catch (error) {
    console.error(error)
  }

}


export async function checkAuth (req: Request, res: Response): Promise<Response | any> {
  try {
    const accessToken = req.cookies['access_token'];
    console.log("accessToken checkAuth" +  JSON.stringify(req.cookies))
    if (!accessToken) {
      console.log("accessToken from if: " + accessToken)
      return res.status(401).json({ isAuthenticated: false });
    }

    const user = jwt.verify(accessToken, tokenConfig.access.secret) as any;
    res.json({ isAuthenticated: true, user });
    
  } catch (error) {
    console.error(error)
    res.status(401).json({ isAuthenticated: false });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
};