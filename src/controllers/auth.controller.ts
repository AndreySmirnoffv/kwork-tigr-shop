import { TypeUser } from '#types/type.user'
import { createUser, findUserByEmail, findUserByPhone, updateUserModel } from '../models/user.model'
import { comparePassword, hashPassword } from '@utils/bcrypt'
import { generateAuthTokens, setAuthCookies } from '@utils/jwt'
import { Request, Response } from 'express'
import { tokenConfig } from 'src/configs/jwt.token.config'
import { v7 } from 'uuid'
import jwt from 'jsonwebtoken'

export async function register(req: Request, res: Response): Promise<Response | any> {
  const { email, phone, password } = req.body;

  const userExists: TypeUser | null = await findUserByEmail(email);

  if (userExists) {
    return res.status(409).json({ message: "Пользователь уже существует" });
  }

  const hashedPassword = await hashPassword(password);

  const newUser: TypeUser = {
    email,
    phone,
    userId: v7(),
    password: hashedPassword,
  };
    console.log('New User to be created/updated:', newUser);

  await createUser(newUser);

  const { accessToken, refreshToken } = await generateAuthTokens({
    email: newUser.email,
    userId: newUser?.userId,
  });

  setAuthCookies(res, { accessToken, refreshToken });

  const { password: _, ...user } = newUser;

  return res.status(200).json({ message: "Пользователь успешно зарегистрирован", user });
}


export async function login(req: Request, res: Response): Promise<Response | any> {
  try {
    const { email, phone, password } = req.body;

    if (!password || (!email && !phone)) {
      return res.status(400).json({ message: 'Email или телефон и пароль обязательны' });
    }

    let user = null;

    if (email) {
      user = await findUserByEmail(email);
    } else {
      user = await findUserByPhone(phone);
    }

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Неверный пароль' });
    }

    const { accessToken, refreshToken } = await generateAuthTokens({
      email: user.email,
      userId: user.userId,
    });

    setAuthCookies(res, { accessToken, refreshToken });

    const { password: _, ...safeUser } = user;

    return res.status(200).json({
      message: 'Успешный вход',
      user: safeUser,
      accessToken,
      refreshToken,
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Ошибка при входе' });
  }
}

export async function checkAuth (req: Request, res: Response): Promise<Response | any> {
  try {
    console.log(req.cookies)
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

export async function updateUser(req: Request, res: Response): Promise<Response | any>{
  const { data } = req.body;

  try {
      const user = await updateUserModel(data);

      return res.json({ message: "Пользователь был успешно обнавлен", user })

  } catch (error) {
    res.status(500).json({ message: "Ошибка обновления пользователя" })
    throw new Error("Ошибка при обновлении пользователя" + error)
  }

}

export async function logout (req: Request, res: Response): Promise<Response | any>{
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
};

