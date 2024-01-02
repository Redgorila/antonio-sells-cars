import { Module } from '@nestjs/common'
import { PaymentService } from './payment.service'
import { PaymentController } from './payment.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Payment } from './payment.entity'
import { SaleService } from 'src/sale/sale.service'
import { Sale } from 'src/sale/sale.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Sale])],
  providers: [PaymentService, SaleService],
  controllers: [PaymentController],
})
export class PaymentModule {}
