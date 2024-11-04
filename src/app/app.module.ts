import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserRolesModule } from '@/modules/user-roles/user-roles.module';

@Module({
  imports: [AuthModule, UserRolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
