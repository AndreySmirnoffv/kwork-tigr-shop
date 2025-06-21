import { tokenConfig } from 'src/configs/jwt.token.config.js'
import { Response } from 'express'
import jwt from 'jsonwebtoken'

export function generateAccessToken(payload: { email: string, userId: string }) {
  try {
    return jwt.sign(payload, tokenConfig.access.secret, { expiresIn: "15m" });
  } catch (error) {
    console.error('JWT sign error:', error);
    throw new Error('Ошибка при генерации access токена');
  }
}

export async function generateAuthTokens(payload: { email: string, userId: string;}) {
    try {
        const accessToken = jwt.sign(payload, tokenConfig.access.secret, { expiresIn: "15m" });
        const refreshToken = jwt.sign(payload, tokenConfig.refresh.secret, { expiresIn: "7d" });
        return { accessToken, refreshToken };
      } catch (error) {
        console.error('JWT sign error:', error);
        throw new Error('Ошибка при генерации токенов');
      }
      
}

export function setAuthCookies(res: Response, tokens: { accessToken: string, refreshToken?: string }) {
  res.cookie("access_token", tokens.accessToken, {
    httpOnly: true,
    secure: true, 
    sameSite: "none",
    maxAge: Number(new Date(Date.now() + 15 * 60 * 1000)),
  });

  if (tokens.refreshToken) {
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: Number(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
    });
  }
}

