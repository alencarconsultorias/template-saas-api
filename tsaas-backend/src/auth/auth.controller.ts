import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string; name?: string }) {
    return this.authService.createUser(body.email, body.password, body.name);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { email: string }) {
    return this.authService.resetPassword(body.email);
  }

  @Get('verify')
  @UseGuards(AuthGuard('firebase'))
  async verifyToken() {
    return { message: 'Token válido' };
  }

  @Post('refresh-token')
  async refreshToken(@Body('token') token: string) {
    return this.authService.validateUser(token);
  }

  @Post('logout')
  async logout() {
    return { message: 'Logout realizado no client. Nenhuma ação no backend.' };
  }
} 