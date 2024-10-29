import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { User } from '@prisma/client';

type ExtendedUserCreate = User & {
  userRole?: {
    connect: { id: number };
  };
};

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }

  async create(data: ExtendedUserCreate) {
    const checkUserExists = await this.findByEmail(data.email);

    if (checkUserExists) {
      throw new BadRequestException('User e-mail already in use');
    }

    const user = await this.prismaService.user.create({
      data: {
        ...(data as User),
      },
      include: {
        userRole: true,
      },
    });

    delete user.password;

    return user;
  }
}
