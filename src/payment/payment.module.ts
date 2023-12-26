import { Module } from '@nestjs/common'
import { PaymentService } from './payment.service'
import { PaymentController } from './payment.controller'
import { Car } from 'src/car/car.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Payment } from './payment.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
