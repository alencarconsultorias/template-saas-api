import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseStrategy } from './firebase.strategy';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PassportModule, PrismaModule],
  providers: [AuthService, FirebaseStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {} 