import { Controller, Body, Post, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterAccountDTO } from './auth.dto';

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
  @Post('/sign-in')
  async signinHandler(@Body() payload: LoginDTO) {
    return this.authService.authenticate(payload);
  }

  @ApiResponse({
    status: 200,
    description: 'Register user account',
  })
  @Post('/sign-up')
  async signupHandler(@Body() payload: RegisterAccountDTO) {
    return this.authService.registerAccount(payload);
  }
}
