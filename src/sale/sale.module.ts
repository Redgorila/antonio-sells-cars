import { Module } from '@nestjs/common'
import { SaleService } from './sale.service'
import { SaleController } from './sale.controller'
import { Sale } from './sale.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Sale])],
  providers: [SaleService],
  controllers: [SaleController],
  exports: [SaleService],
})
export class SaleModule {}
