import { Controller, Body, Post, HttpStatus } from '@nestjs/common';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  @Post('/login')
  async loginHandler(@Body() paylaod: any) {
    return null;
  }
}
