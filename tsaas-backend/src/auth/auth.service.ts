import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(token: string): Promise<any> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      return null;
    }
  }

  async createUser(email: string, password: string, name?: string): Promise<any> {
    try {
      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName: name || '',
      });
      if (!userRecord.email) {
        throw new Error('O usuário do Firebase não possui e-mail.');
      }
      await this.prisma.user.create({
        data: {
          email: userRecord.email,
          name: userRecord.displayName || '',
        },
      });
      return userRecord;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await admin.auth().generatePasswordResetLink(email);
    } catch (error) {
      throw error;
    }
  }
} 