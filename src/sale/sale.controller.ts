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

@Controller('sales')
export class SaleController {
  @Get()
  getAllSale() {
    return 'Get all sales'
  }

  @Get(':id')
  getOneSale() {
    return 'Get one sale'
  }

  @Post()
  createSale(@Body() saleDto) {
    return 'Create one sale'
  }

  @Patch(':id')
  modifySale(@Body() saleData: Partial<Sale>, @Param('id') id: number) {
    return 'Modify one sale'
  }

  @Delete(':id')
  deleteSale(@Param('id') id: number) {
    return 'Delete one sale'
  }
}
