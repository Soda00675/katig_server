import { Controller, Body, Post, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth API')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  @ApiResponse({
    status: 200,
    description: 'Authenticate user credentials success',
  })
  @Post('/login')
  async signinHandler(@Body() paylaod: any) {
    return null;
  }
}
