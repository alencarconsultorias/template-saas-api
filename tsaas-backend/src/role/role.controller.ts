import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard';

@ApiTags('role') // Swagger tag
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // protect all routes with firebase auth guard
  @UseGuards(FirebaseAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new role' }) // Swagger operation
  @ApiResponse({ status: 201, description: 'Return the created role' }) // Swagger response
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' }) // Swagger operation
  @ApiResponse({ status: 200, description: 'Return all roles' }) // Swagger response
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a role by id' }) // Swagger operation
  @ApiResponse({ status: 200, description: 'Return the role' }) // Swagger response
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @UseGuards(FirebaseAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a role by id' }) // Swagger operation
  @ApiResponse({ status: 200, description: 'Return the updated role' }) // Swagger response
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @UseGuards(FirebaseAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a role by id' }) // Swagger operation
  @ApiResponse({ status: 200, description: 'Return the deleted role' }) // Swagger response
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
