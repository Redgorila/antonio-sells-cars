import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { SaleModule } from './sale/sale.module'
import { PaymentModule } from './payment/payment.module'
import { CarModule } from './car/car.module'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [
    UserModule,
    SaleModule,
    PaymentModule,
    CarModule,
    AuthModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
