import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard';

@ApiTags('user') // Swagger tag
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // test guards implements fail idToken is not valid
  // @UseGuards(FirebaseAuthGuard) 
  @Post()
  @ApiOperation({ summary: 'Create a new user' }) // Swagger operation
  @ApiResponse({ status: 201, description: 'Return the created user' }) // Swagger response
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' }) // Swagger operation
  @ApiResponse({ status: 200, description: 'Return all users' }) // Swagger response
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' }) // Swagger operation
  @ApiResponse({ status: 200, description: 'Return the user' }) // Swagger response
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by id' }) // Swagger operation
  @ApiResponse({ status: 200, description: 'Return the updated user' }) // Swagger response
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by id' }) // Swagger operation
  @ApiResponse({ status: 200, description: 'Return the deleted user' }) // Swagger response
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
