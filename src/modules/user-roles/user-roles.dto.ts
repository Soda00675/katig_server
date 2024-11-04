import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class UserRoleDTO implements Pick<UserRole, 'name'> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
