import { Injectable } from '@nestjs/common';
import {
  PaymongoService,
  type CreatePaymentLinkPayload,
} from '@/paymongo.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly paymongoService: PaymongoService) {}

  async createPayment(payload: CreatePaymentLinkPayload) {
    const paymongoPayment = await this.paymongoService.createPaymentLink({
      amount: Number('75000'),
      description: '[BOAT-TICKET] BYD > MNGPNG (Ticket(s) payment)',
    });

    return paymongoPayment;
  }
}
