import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: 'The name of the user' , example: 'John Doe' }) // Swagger property
    name: string; 
    @ApiProperty({ description: 'The email of the user' , example: 'john.doe@example.com' }) // Swagger property
    email: string; 
}
