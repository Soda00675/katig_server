import { Controller, Body, Post, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDTO } from './payments.dto';

@ApiTags('Payments API')
@Controller({
  path: 'payments',
  version: '1',
})
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create payment to paymongo',
  })
  @HttpCode(HttpStatus.OK)
  @Post('/')
  async createPaymentHandler(@Body() payload: CreatePaymentDTO) {
    try {
      return this.paymentsService.createPayment(payload);
    } catch (error) {
      return error;
    }
  }
}
