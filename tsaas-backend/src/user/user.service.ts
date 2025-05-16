import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  
  create(data: CreateUserDto) {
    if (!data.email) {
      throw new Error('Email is required');
    }
    return this.prisma.user.create({ data: { ...data, email: data.email } });
  }

  findAll() {
    //return `This action returns all user`;
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    //return `This action returns a #${id} user`;
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
