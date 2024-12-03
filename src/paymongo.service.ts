import axios from 'axios';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

export type CreatePaymentLinkPayload = {
  amount: number;
  description: string;
};

@Injectable()
export class PaymongoService {
  createHeaders() {
    return {
      accept: 'application/json',
      authorization: 'Basic c2tfdGVzdF9Gb0VqR0NHZ0x5aDlxV01WQmV2Zjk5cFY6',
      'content-type': 'application/json',
    };
  }

  async createPaymentLink(payload: CreatePaymentLinkPayload) {
    const url = 'https://api.paymongo.com/v1/links';
    const headers = this.createHeaders();
    const data = {
      data: {
        attributes: payload,
      },
    };

    const paymongoPaymentLink = axios
      .post(url, data, { headers })
      .then((response) => response.data.data);

    return paymongoPaymentLink;
  }
}
