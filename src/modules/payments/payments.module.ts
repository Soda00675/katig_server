import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaymentsService as PaymongoPaymentsService } from '@/payments.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymongoPaymentsService],
})
export class PaymentsModule {}
