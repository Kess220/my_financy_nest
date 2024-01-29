import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }

    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized - Invalid token format' });
    }

    try {
      const user = await this.authService.validateToken(token);
      req['user'] = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
  }
}
