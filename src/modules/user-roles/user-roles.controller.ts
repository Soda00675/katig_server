import {
  Controller,
  Body,
  Post,
  Get,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
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
  })
  @HttpCode(HttpStatus.OK)
  @Get('/')
  async getAllHandler() {
    return this.userRolesService.getAll();
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/')
  async createHandler(@Body() payload: UserRoleDTO) {
    return this.userRolesService.create(payload as UserRole);
  }
}
