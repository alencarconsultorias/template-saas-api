import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [UserModule, RoleModule, FirebaseModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})

export class AppModule {}
