import * as argon2 from 'argon2';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/modules/users/users.service';
import { RegisterAccount, LoginCredentials } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async hashPassword(password: string) {
    return await argon2.hash(password);
  }

  // private async verifyPassword(raw: string, hashed: string) {
  //   return await argon2.verify(hashed, raw);
  // }

  async authenticate(credentials: LoginCredentials) {
    // const user = await this.usersService.findByUsername(username);

    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }

    // const { password, ...userDetails } = user;
    // const payload = { sub: 1, username: userDetails.username };
    // const token = await this.jwtService.signAsync(payload);

    // return {
    //   user: userDetails,
    //   token,
    // };

    return null;
  }

  async registerAccount(data: RegisterAccount) {
    data.password = await this.hashPassword(data.password);

    const createdAccount = await this.usersService.create({
      ...data,
      userRoleId: 3, // Default to customer account
    });

    return createdAccount;
  }
}
