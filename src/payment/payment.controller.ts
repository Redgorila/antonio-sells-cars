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
import { PaymentDto } from './payment.dto'
import { validate } from 'class-validator'

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
  async createPayment(@Body() paymentDto: PaymentDto) {
    const errors = await validate(paymentDto)
    if (errors.length > 0) {
      return errors
    }
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
