import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthcheck(): boolean {
    return true;
  }
}
