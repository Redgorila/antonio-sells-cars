import { PaymentService } from './payment.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { Payment } from './payment.entity'
import { PaymentDto } from './payment.dto'
import { validate } from 'class-validator'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('payments')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name)
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllPayment() {
    this.logger.log(
      `UserController: fetch all payment request received by controller`,
    )
    return this.paymentService.findAll()
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getOnePayment(@Param('id') id: number) {
    this.logger.log(
      `UserController: fetch payment by id ${id} request received by controller`,
    )
    return this.paymentService.findOneById(+id)
  }

  @UseGuards(AuthGuard)
  @Post()
  async createPayment(@Body() paymentDto: PaymentDto) {
    this.logger.log(
      `UserController: request to create a payment received by the controller, will try to pass validation of body`,
    )
    const errors = await validate(paymentDto)
    if (errors.length > 0) {
      this.logger.log(`UserController: Validation errors found`)
      return errors
    }
    this.logger.log(
      `UserController: body is valid, will pass payment data to service`,
    )
    return this.paymentService.createOne(paymentDto)
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  modifyPayment(
    @Body() paymentData: Partial<Payment>,
    @Param('id') id: number,
  ) {
    this.logger.log(
      `UserController: request to update payment by id ${id} received`,
    )
    return this.paymentService.updateOne(paymentData, +id)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deletePayment(@Param('id') id: number) {
    this.logger.log(
      `UserController: request to delete payment by id ${id} received`,
    )
    return this.paymentService.deleteOne(+id)
  }
}
