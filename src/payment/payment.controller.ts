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
import { SaleService } from 'src/sale/sale.service'
import { Sale } from 'src/sale/sale.entity'

@Controller('payments')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name)
  constructor(
    private readonly paymentService: PaymentService,
    readonly saleService: SaleService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllPayment() {
    this.logger.log(
      `PaymentController: fetch all payment request received by controller`,
    )
    return this.paymentService.findAll()
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getOnePayment(@Param('id') id: number) {
    this.logger.log(
      `PaymentController: fetch payment by id ${id} request received by controller`,
    )
    return this.paymentService.findOneById(+id)
  }

  @UseGuards(AuthGuard)
  @Post()
  async createPayment(@Body() paymentDto: PaymentDto) {
    this.logger.log(
      `PaymentController: request to create a payment received by the controller, will try to pass validation of body`,
    )
    const errors = await validate(paymentDto) //Validation still not discerning properly which is the validation error

    if (errors.length > 0) {
      this.logger.log(`PaymentController: Validation errors found`)
      return errors
    }
    this.logger.log(
      `PaymentController: body is valid, will pass payment data to service`,
    )
    let saleUpdatedToPaid: boolean = false
    const saleFound: Sale = await this.saleService.findOneById(
      paymentDto.sale_id,
    )

    if (saleFound.is_paid) {
      this.logger.warn(
        'PaymentController: could not create a payment for a sale that has already been payed',
      )
      return {
        error:
          'could not create a payment for a sale that has already been payed',
      }
    }

    const salePayments = await this.paymentService.findManyByOptions({
      where: { sale_id: paymentDto.sale_id },
    })

    if (salePayments.length > 0) {
      this.logger.log('PaymentController: Found payments for this sale')
      const amountPaidOfSale: number = salePayments.reduce(
        (a, b) => a + b.value,
        0,
      )

      if (amountPaidOfSale == saleFound.total) {
        this.logger.warn(
          'PaymentController: this sale has already been payed fully',
        )
        return { error: `sale with id ${saleFound.id} has already been paid` }
      }
      if (amountPaidOfSale + Number(paymentDto.value) > saleFound.total) {
        this.logger.warn(
          `PaymentController: payment exceed the maximum value, the remaining payment accounts for ${
            saleFound.total - amountPaidOfSale
          }`,
        )
        return {
          error: `remaining payment should fulfill the precise amount of ${
            saleFound.total - amountPaidOfSale
          }`,
        }
      }
      if (amountPaidOfSale + Number(paymentDto.value) == saleFound.total) {
        this.logger.log(
          'PaymentController: payment will fulfill the total amount of the sale and will set the sale to paid',
        )
        this.saleService.updateOne({ is_paid: true }, saleFound.id)
        saleUpdatedToPaid = true
      }
      this.logger.log(
        'PaymentController: no conflict with the existing payments',
      )
    }

    if (saleUpdatedToPaid) {
      return {
        paymentCreated: await this.paymentService.createOne(paymentDto),
        saleUpdated: await this.saleService.findOneById(paymentDto.sale_id),
      }
    }
    return this.paymentService.createOne(paymentDto)
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  modifyPayment(
    @Body() paymentData: Partial<Payment>,
    @Param('id') id: number,
  ) {
    this.logger.log(
      `PaymentController: request to update payment by id ${id} received`,
    )
    return this.paymentService.updateOne(paymentData, +id)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deletePayment(@Param('id') id: number) {
    this.logger.log(
      `PaymentController: request to delete payment by id ${id} received`,
    )
    return this.paymentService.deleteOne(+id)
  }
}
