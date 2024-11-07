import * as argon2 from 'argon2';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/modules/users/users.service';
import { RegisterAccount, LoginCredentials } from './auth.dto';
import { User } from '@prisma/client';

type VerifyPassword = {
  raw: string;
  hashed: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async hashPassword(password: string) {
    return await argon2.hash(password);
  }

  private async verifyPassword(passwords: VerifyPassword) {
    return await argon2.verify(passwords.hashed, passwords.raw);
  }

  private async checkAuthUser(user: User, passwords: VerifyPassword) {
    if (!user || !(await this.verifyPassword(passwords))) {
      return false;
    }

    return true;
  }

  async authenticate(credentials: LoginCredentials) {
    const user = await this.usersService.findByEmail(credentials.email);
    const isCredentialsValid = await this.checkAuthUser(user, {
      raw: credentials.password,
      hashed: user.password,
    });

    if (!isCredentialsValid) {
      throw new UnauthorizedException();
    }

    delete user.password;
    const payload = { sub: 1, username: user };
    const token = await this.jwtService.signAsync(payload);

    return {
      user,
      token,
    };
  }

  async registerAccount(data: RegisterAccount) {
    data.password = await this.hashPassword(data.password);

    // @ts-ignore
    const createdAccount = await this.usersService.create({
      ...data,
      userRole: {
        connect: { id: 3 },
      },
    });

    return createdAccount;
  }
}
