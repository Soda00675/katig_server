import { Module } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';
import { PrismaService } from '@/prisma.service';

@Module({
  providers: [UserRolesService, PrismaService],
  controllers: [UserRolesController],
})
export class UserRolesModule {}
