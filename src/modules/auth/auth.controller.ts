import { Controller, Body, Post, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth API')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: 'Authenticate user credentials success',
  })
  @Post('/login')
  async signinHandler(@Body() paylaod: Record<string, any>) {
    return this.authService.authenticate(paylaod.username, paylaod.password);
  }
}
