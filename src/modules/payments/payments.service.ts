import { Injectable } from '@nestjs/common';
import { PaymentsService as PaymongoPaymentsService } from '@/payments.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymongoPaymentsService: PaymongoPaymentsService,
  ) {}

  async getList() {
    //
  }

  async create() {
    const payment = await this.paymongoPaymentsService.createPaymentLink({
      amount: 500,
      description: '',
    });
  }

  async get() {
    //
  }
}
