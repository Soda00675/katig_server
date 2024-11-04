import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class UserRolesService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(data: UserRole) {
    return await this.prismaService.userRole.create({
      data,
    });
  }
}
