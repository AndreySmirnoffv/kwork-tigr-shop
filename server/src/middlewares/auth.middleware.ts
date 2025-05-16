import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { findUserByIdentifier } from '@models/user.model';
import { tokenConfig } from 'src/configs/jwt.token.config';
import { generateAccessToken, setAuthCookies } from '@utils/jwt';

dotenv.config();

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<any> {
  const accessToken = req.cookies['access_token'];
  const refreshToken = req.cookies['refresh_token'];
  const decoded = jwt.verify(refreshToken, tokenConfig.refresh.secret) as any;

  console.log(decoded)

  console.log('accessToken middleware:', accessToken);
  console.log('refreshToken:', refreshToken);

  if (!accessToken && !refreshToken) {
    console.error('❌ Токены отсутствуют');
    return res.status(401).json({ valid: false, message: 'Токены отсутствуют' });
  }

  // ✅ Проверка accessToken
  if (accessToken) {
    try {
      jwt.verify(accessToken, tokenConfig.access.secret);
      return next(); // Всё ок — пускаем дальше
    } catch (err) {
      console.error(err)
      console.warn('⚠️ Access token истёк или невалиден');
    }
  }

  // ✅ Проверка refreshToken и восстановление accessToken
  if (refreshToken) {
    try {


      if (!decoded) {
        console.error('❌ Пользователь не найден по refresh token');
        return res.status(401).json({ valid: false, message: 'Пользователь не найден' });
      }

      // Генерируем новый accessToken
      const newAccessToken = generateAccessToken({ email: decoded.email, userId: decoded.userId });

      // Обновляем куку
      setAuthCookies(res, { accessToken: newAccessToken });

      console.log('🔄 Access token обновлён через refresh');
      return next(); // Пускаем дальше

    } catch (refreshError) {
      console.error('❌ Refresh token недействителен');
      return res.status(401).json({ valid: false, message: 'Refresh token недействителен' });
    }
  }

  return res.status(401).json({ valid: false, message: 'Не удалось авторизоваться' });
}