import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import admin from './firebase-admin.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      request.user = decodedToken; // Anexe as infos do usuário à requisição
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
