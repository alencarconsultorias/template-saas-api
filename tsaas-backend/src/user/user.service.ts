import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DecodedIdToken } from 'firebase-admin/auth';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOrCreateFromFirebase(
    decoded: DecodedIdToken,
  ) {
    const { uid, email, name, picture } = decoded;
    let user = await this.prisma.user.findUnique({
      where: { firebaseUid: uid },
    });
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          firebaseUid: uid,
          name: name ?? '',
          email: email ?? '',
        },
      });
    }
    return user;
  }

  // create user on Firebase and Prisma
  create(data: CreateUserDto) {
    console.log("User created successfully!", data);
    return this.prisma.user.create({ 
      data: {
        name: data.name,
        email: data.email,
      },
    });
  }

  findAll() {
    console.log("Finding all users successfully!"); // message to console
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    console.log("Finding user by id successfully! id:", id);  // message to console
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateUserDto) {
    console.log("Updating user by id successfully! id:", id);  // message to console
    return this.prisma.user.update({ where: { id }, data });
  }

  remove(id: number) {
    console.log("Deleting user by id successfully! id:", id);  // message to console
    return this.prisma.user.delete({ where: { id } });
  }
}
