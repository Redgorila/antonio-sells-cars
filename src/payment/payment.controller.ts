import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { Payment } from './payment.entity'

@Controller('payments')
export class PaymentController {
  @Get()
  getAllPayment() {
    return 'Get all payments'
  }

  @Get(':id')
  getOnePayment() {
    return 'Get one payment'
  }

  @Post()
  createPayment(@Body() paymentDto) {
    return 'Create one payment'
  }

  @Patch(':id')
  modifyPayment(
    @Body() paymentData: Partial<Payment>,
    @Param('id') id: number,
  ) {
    return 'Modify one payment'
  }

  @Delete(':id')
  deletePayment(@Param('id') id: number) {
    return 'Delete one payment'
  }
}
