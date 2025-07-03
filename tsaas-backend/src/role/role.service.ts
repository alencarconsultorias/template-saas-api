import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../modules/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  create(createRoleDto: CreateRoleDto) {
    console.log("Role created successfully!", createRoleDto);
    return this.prisma.role.create({ data: createRoleDto });
  }

  findAll() {
    console.log("Finding roles successfully!"); 
    return this.prisma.role.findMany();
  }

  findOne(id: number) {
    console.log("Finding role by id successfully! id:", id); 
    return this.prisma.role.findUnique({ where: { id } });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    console.log("Updating role by id successfully! id:", id);
    return this.prisma.role.update({ where: { id }, data: updateRoleDto });
  }

  remove(id: number) {
    console.log("Deleting role by id successfully! id:", id);
    return this.prisma.role.delete({ where: { id } });
  }
}
