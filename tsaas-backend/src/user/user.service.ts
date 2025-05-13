import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from '../../generated/prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async create(data: { name: string; email: string }): Promise<User> {
    return prisma.user.create({ data });
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    return prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, data: { name?: string; email?: string }): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  }

  async remove(id: number): Promise<User> {
    return prisma.user.delete({ where: { id } });
  }
}
