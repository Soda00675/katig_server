import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class UserRolesService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAll() {
    return await this.prismaService.userRole.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }

  public async get(id: number) {
    const userRole = await this.prismaService.userRole.findUnique({
      where: {
        id,
      },
    });

    if (!userRole) throw new NotFoundException('Role not found');

    return userRole;
  }

  public async create(data: UserRole) {
    return await this.prismaService.userRole.create({
      data,
    });
  }

  public async update(id: number, data: UserRole) {
    return await this.prismaService.userRole.update({
      where: {
        id,
      },
      data,
    });
  }

  public async destroy(id: number) {
    return await this.prismaService.userRole.delete({
      where: {
        id,
      },
    });
  }
}
