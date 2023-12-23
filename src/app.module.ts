import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { SaleModule } from './sale/sale.module'
import { PaymentModule } from './payment/payment.module'
import { CarModule } from './car/car.module'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user/user.entity'
import { Car } from './car/car.entity'
import { Payment } from './payment/payment.entity'
import { Sale } from './sale/sale.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'antonio2',
      password: 'password',
      database: 'antonio_sells_cars',
      entities: [User, Car, Payment, Sale],
      synchronize: true,
    }),
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
