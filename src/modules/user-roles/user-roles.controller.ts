import { Controller, Body, Post, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserRolesService } from './user-roles.service';
import { UserRoleDTO } from './user-roles.dto';
import { UserRole } from '@prisma/client';

@ApiTags('User Roles API')
@Controller({
  path: 'user-roles',
  version: '1',
})
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Authenticate user credentials success',
  })
  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  async createHandler(@Body() payload: UserRoleDTO) {
    return this.userRolesService.create(payload as UserRole);
  }
}
