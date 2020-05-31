import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';
import { JwtException } from '../exceptions/JwtException';
import { config } from '../config/config';
import { AuthenticatedRequest } from '../domains/AuthenticatedRequest';

export function verifyAccessToken(req: Request, res: Response, next: NextFunction) {
  const accessToken: string | null = req.headers.authorization ? req.headers.authorization : null;
  if (accessToken) {
    const token: string = accessToken.split(' ')[1];
    jwt.verify(token, config.jwt.accessToken.secret, (error, user) => {
      if (error) {
        throw new JwtException(error.message);
      }
      next();
    });
  } else {
    throw new UnauthorizedException('Unauthorized');
  }
}

export function verifyRefreshToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const refreshToken: string | null = req.body.refreshToken;
  if (refreshToken) {
    jwt.verify(refreshToken.split(' ')[1], config.jwt.refreshToken.secret, (err, user: any) => {
      if (err) {
        throw new JwtException(err.message);
      }
      req.users = user.data;
      next();
    });
  } else {
    throw new UnauthorizedException('Unauthorized');
  }
}