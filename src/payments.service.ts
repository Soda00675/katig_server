import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type CreatePaymentLinkPayload = {
  amount: number;
  description: string;
};

@Injectable()
export class PaymentsService {
  constructor(private readonly configService: ConfigService) {}

  private get paymongo() {
    const paymongoInstance = require('paymongo-node')(
      this.configService.get<string>('APP_PAYMONGO_PRIVATE'),
    );

    return paymongoInstance;
  }

  async createPaymentLink(payload: CreatePaymentLinkPayload) {
    const formattedAmount: string = `${payload.amount.toFixed(2)}`;

    const link = await this.paymongo.links.create({
      amount: +formattedAmount,
      description: payload.description,
    });

    return link;
  }

  async getPaymentLinkByReference(referenceId: string) {
    const link = await this.paymongo.links.getLinkByReferenceNumber({
      reference_number: referenceId,
    });

    return link;
  }
}
