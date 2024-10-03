import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const { password, ...userDetails } = user;
    const payload = { sub: 1, username: userDetails.username };
    const token = await this.jwtService.signAsync(payload);

    return {
      user: userDetails,
      token,
    };
  }
}
