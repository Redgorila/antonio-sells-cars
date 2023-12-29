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
import { ConfigModule } from '@nestjs/config'
import config from './config'
import { LoggerModule } from 'nestjs-pino'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './utils/constants'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
        redact: ['req', 'res'],
      },
    }),
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Car, Payment, Sale],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    SaleModule,
    PaymentModule,
    CarModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
