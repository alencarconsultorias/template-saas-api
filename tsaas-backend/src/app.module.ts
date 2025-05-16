import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './user/user.service';
import { UsersController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [UserModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, PrismaService], 
  exports: [PrismaService], // Export PrismaService to be used in other modules
})
export class AppModule {}
