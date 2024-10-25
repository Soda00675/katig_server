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
    status: HttpStatus.OK,
    description: 'Authenticate user credentials success',
  })
  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  async signinHandler(@Body() payload: LoginDTO) {
    return this.authService.authenticate(payload);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Register user account',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('/sign-up')
  async signupHandler(@Body() payload: RegisterAccountDTO) {
    return this.authService.registerAccount(payload);
  }
}
