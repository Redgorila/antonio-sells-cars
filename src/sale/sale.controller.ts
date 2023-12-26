import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { Sale } from './sale.entity'
import { SaleService } from './sale.service'

@Controller('sales')
export class SaleController {
  constructor(private readonly SaleService: SaleService) {}
  @Get()
  getAllSale() {
    return this.SaleService.findAll()
  }

  @Get(':id')
  getOneSale(@Param('id') id: number) {
    return this.SaleService.findOneById(+id)
  }

  @Post()
  createSale(@Body() saleDto: Omit<Sale, 'id'>) {
    return this.SaleService.createOne(saleDto)
  }

  @Patch(':id')
  modifySale(@Body() saleDto: Partial<Sale>, @Param('id') id: number) {
    return this.SaleService.updateOne(saleDto, +id)
  }

  @Delete(':id')
  deleteSale(@Param('id') id: number) {
    return this.SaleService.deleteOne(+id)
  }
}
