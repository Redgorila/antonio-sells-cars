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
import { Sale } from './sale.entity'
import { SaleService } from './sale.service'
import { SaleDto } from './sale.dto'
import { validate } from 'class-validator'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('sales')
export class SaleController {
  private readonly logger = new Logger(SaleController.name)
  constructor(private readonly SaleService: SaleService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllSale() {
    this.logger.log(
      `UserController: fetch all sales request received by controller`,
    )
    return this.SaleService.findAll()
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getOneSale(@Param('id') id: number) {
    this.logger.log(
      `UserController: fetch sale by id ${id} request received by controller`,
    )
    return this.SaleService.findOneById(+id)
  }

  @UseGuards(AuthGuard)
  @Post()
  async createSale(@Body() saleDto: SaleDto) {
    this.logger.log(
      `UserController: request to create a sale received by the controller, will try to pass validation of body`,
    )
    const errors = await validate(saleDto)
    if (errors.length > 0) {
      this.logger.log(`UserController: Validation errors found`)
      return errors
    }
    this.logger.log(
      `UserController: body is valid, will pass sale data to service`,
    )
    return this.SaleService.createOne(saleDto)
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  modifySale(@Body() saleDto: Partial<Sale>, @Param('id') id: number) {
    this.logger.log(
      `UserController: request to update sale by id ${id} received`,
    )
    return this.SaleService.updateOne(saleDto, +id)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteSale(@Param('id') id: number) {
    this.logger.log(
      `UserController: request to delete sale by id ${id} received`,
    )
    return this.SaleService.deleteOne(+id)
  }
}
