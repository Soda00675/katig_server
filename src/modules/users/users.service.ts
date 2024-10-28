import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { User } from '@prisma/client';

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

  async findByEmail(email: string) {
    return await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }

  async create(data: User) {
    const checkUserExists = await this.findByEmail(data.email);

    if (checkUserExists) {
      throw new BadRequestException('User e-mail already in use');
    }

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
