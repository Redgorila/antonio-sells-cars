import { PaymentService } from './payment.service'
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
  constructor(private readonly paymentService: PaymentService) {}
  @Get()
  getAllPayment() {
    return this.paymentService.findAll()
  }

  @Get(':id')
  getOnePayment(@Param('id') id: number) {
    return this.paymentService.findOneById(+id)
  }

  @Post()
  createPayment(@Body() paymentDto: Payment) {
    return this.paymentService.createOne(paymentDto)
  }

  @Patch(':id')
  modifyPayment(
    @Body() paymentData: Partial<Payment>,
    @Param('id') id: number,
  ) {
    return this.paymentService.updateOne(paymentData, +id)
  }

  @Delete(':id')
  deletePayment(@Param('id') id: number) {
    return this.paymentService.deleteOne(+id)
  }
}
