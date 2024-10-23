import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { RegisterAccount } from '@/modules/auth/auth.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  async create(data: RegisterAccount & { userRoleId: number }) {
    const user = await this.prismaService.user.create({
      data: {
        ...data,
      },
      include: {
        userRole: true,
      },
    });

    delete user.password;

    return user;
  }
}
