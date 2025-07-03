import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './modules/prisma/prisma.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [LoggerModule, UserModule, RoleModule], 
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})

export class AppModule {}
