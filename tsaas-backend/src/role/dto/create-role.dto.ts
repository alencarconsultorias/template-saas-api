import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({ description: 'The label of the role' , example: 'admin' }) // Swagger property
    label: string;
}
