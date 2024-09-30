import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANTS } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '@/modules/users/users.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANTS.secret,
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
