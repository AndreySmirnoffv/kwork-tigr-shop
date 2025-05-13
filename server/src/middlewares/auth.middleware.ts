import { findUserByEmailOrPhone } from '@models/user.model';
import { generateAuthTokens, setAuthCookies } from '@utils/jwt';
import { Request, Response, NextFunction } from 'express';
import { tokenConfig } from 'src/configs/jwt.token.config';
import jwt from 'jsonwebtoken';

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<any> {
    const authHeader = req.headers.authorization;
  
    const accessToken = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : req.cookies.access_token;
  
    const refreshToken = req.headers['x-refresh-token'] as string || req.cookies.refresh_token;
  
    if (!accessToken) {
      return res.status(401).json({ message: 'Access token не предоставлен' });
    }
  
    console.log('Received access token:', accessToken);
  
    try {
      const decoded = jwt.verify(accessToken, tokenConfig.access.secret);
      (req as any).user = decoded;
      return next();
    } catch (error: any) {
      console.error('Error verifying access token:', error); // Логируем ошибку
      if (error.name !== 'TokenExpiredError') {
        return res.status(403).json({ message: 'Неверный access token' });
      }
  
      if (!refreshToken) {
        return res.status(403).json({ message: 'Access token истёк. Отсутствует refresh token.' });
      }
  
      try {
        const decodedRefresh = jwt.verify(refreshToken, tokenConfig.refresh.secret) as any;
  
        const user = await findUserByEmailOrPhone(decodedRefresh.email);
        if (!user) {
          return res.status(403).json({ message: 'Неверный refresh token' });
        }
  
        const newTokens = await generateAuthTokens({ email: user.email });
  
        setAuthCookies(res, { accessToken: newTokens.accessToken });
  
        if (authHeader?.startsWith('Bearer ')) {
          res.setHeader('x-access-token', newTokens.accessToken);
        }
  
        (req as any).user = jwt.decode(newTokens.accessToken);
        return next();
      } catch (refreshError) {
        return res.status(403).json({ message: 'Неверный или просроченный refresh token' });
      }
    }
  }
  