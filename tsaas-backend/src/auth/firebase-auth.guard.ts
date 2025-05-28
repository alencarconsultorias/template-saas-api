// src/auth/firebase-auth.guard.ts
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { FirebaseService } from '../firebase/firebase.service';
  
  @Injectable()
  export class FirebaseAuthGuard implements CanActivate {
    constructor(private readonly firebaseService: FirebaseService) {}
  
    async canActivate(ctx: ExecutionContext): Promise<boolean> {
      const req = ctx.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Authorization header faltando');
      }
  
      const token = authHeader.split(' ')[1];
      try {
        const decoded = await this.firebaseService.verifyToken(token);
        req.user = decoded;
        return true;
      } catch (err) {
        throw new UnauthorizedException('Token inválido');
      }
    }
  }
  