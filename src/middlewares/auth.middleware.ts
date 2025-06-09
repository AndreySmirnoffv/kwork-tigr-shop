import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { findUserByIdentifier } from '@models/user.model.js';
import { tokenConfig } from 'src/configs/jwt.token.config.js';

dotenv.config();

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<any> {
  console.log(`[AUTH MIDDLEWARE] triggered on: ${req.method} ${req.originalUrl}`);
  const authHeader = req.headers.authorization;
    const accessToken = authHeader?.startsWith('Bearer ') 
      ? authHeader.split(' ')[1] 
      : req.cookies.accessToken;

    const refreshToken = req.cookies.refreshToken || 
                       (req.headers['x-refresh-token'] as string | undefined);

    if (!accessToken && !refreshToken) {
      return res.status(401).json({ valid: false, message: 'Токены отсутствуют' });
    }

    if (accessToken) {
      try {
        jwt.verify(accessToken, tokenConfig.access.secret);
        return res.status(200).json({ valid: true, message: 'Access token действителен' });
      } catch (accessError) {
        console.error(accessError)
      }
    }

    if (refreshToken) {
      try {
        const decoded = jwt.verify(refreshToken, tokenConfig.refresh.secret) as any;
        const user = await findUserByIdentifier('email', decoded.email);
        
        if (!user) {
          return res.status(401).json({ valid: false, message: 'Пользователь не найден' });
        }

        return res.status(200).json({ 
          valid: true, 
          message: 'Refresh token действителен',
          canRefresh: true 
        });
      } catch (refreshError) {
        return res.status(401).json({ valid: false, message: 'Refresh token недействителен' });
      }
    }

    return res.status(401).json({ valid: false, message: 'Токены недействительны' });
}
