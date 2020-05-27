import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedException } from '../middlewares/UnauthorizedException';
import { JwtException } from '../middlewares/JwtException';

export function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization: string | null = req.headers.authorization
    ? req.headers.authorization
    : null;
  if (authorization) {
    const token: string = authorization.split(' ')[1];
    jwt.verify(token, 'express-secret', (error, user) => {
      if (error) {
        throw new JwtException(error.message);
      }
      next();
    });
  } else {
    throw new UnauthorizedException('Unauthorized');
  }
}