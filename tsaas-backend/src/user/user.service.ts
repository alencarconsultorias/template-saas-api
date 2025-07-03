import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../modules/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private prisma: PrismaService) {}
  
  // find or create user by firebaseUid
  async findOrCreateByFirebaseUid(firebaseUid: string, email: string, name: string) {
    this.logger.log(`Finding or creating user by Firebase UID: ${firebaseUid}`, 'findOrCreateByFirebaseUid');
    
    let user = await this.prisma.user.findUnique({ where: { firebaseUid } });
    if (!user) {
      this.logger.log(`Creating new user for Firebase UID: ${firebaseUid}`, 'findOrCreateByFirebaseUid');
      user = await this.prisma.user.create({
        data: { firebaseUid, email, name },
      });
    } else {
      this.logger.log(`User found for Firebase UID: ${firebaseUid}`, 'findOrCreateByFirebaseUid');
    }
    return user;
  }

  // create user on Prisma
  create(data: CreateUserDto) {
    this.logger.log(`Creating new user: ${data.email}`, 'create');
    return this.prisma.user.create({ 
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }

  findAll() {
    this.logger.log('Finding all users', 'findAll');
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    this.logger.log(`Finding user by id: ${id}`, 'findOne');
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateUserDto) {
    this.logger.log(`Updating user by id: ${id}`, 'update');
    return this.prisma.user.update({ where: { id }, data });
  }

  remove(id: number) {
    this.logger.log(`Deleting user by id: ${id}`, 'remove');
    return this.prisma.user.delete({ where: { id } });
  }
}
