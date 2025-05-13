import { TypeUser } from '#types/TypeUser';
import { createOrUpdateUser, findUserByEmailOrPhone } from '@models/user.model';
import { comparePassword, hashPassword } from '@utils/bcrypt';
import { generateAuthTokens, setAuthCookies } from '@utils/jwt';
import { Request, Response } from 'express';

export async function register(req: Request, res: Response): Promise<Response | any> {
    try {
        const { email, phone, password } = req.body;
        const userExists = await findUserByEmailOrPhone(email);
        console.log(userExists)
        if (userExists) {
            return res.status(409).json({ message: 'Пользователь уже существует' });
        }

        const hashedPassword = await hashPassword(password);

        const newUser: TypeUser = {
            email,
            phone,
            password: hashedPassword,
        };

        await createOrUpdateUser(newUser)

        const { accessToken, refreshToken } = await generateAuthTokens({ email });

        setAuthCookies(res, { accessToken, refreshToken });

        const { password: _, ...user } = newUser;


        return res.json({ message: 'Пользователь успешно зарегистрирован', user, accessToken });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Ошибка регистрации пользователя' });
    }
}

export async function login(req: Request, res: Response): Promise<Response | any> {
  const { email, phone, password } = req.body;

  const identifier = email || phone;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Email или телефон и пароль обязательны' });
  }

  const user = await findUserByEmailOrPhone(identifier);

  if (!user) {
    return res.status(401).json({ message: 'Пользователь не найден' });
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Неверный пароль' });
  }

  const { accessToken, refreshToken } = await generateAuthTokens({ email: user.email });

  setAuthCookies(res, { accessToken, refreshToken });

  return res.status(200).json({
    message: 'Успешный вход',
    user: {
      email: user.email,
      phone: user.phone,
      accessToken
    },
  });
}
