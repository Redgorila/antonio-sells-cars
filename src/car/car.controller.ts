import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { Car } from './car.entity'
import { CarService } from './car.service'
import { carDto } from './car.dto'
import { validate } from 'class-validator'

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}
  @Get()
  getAllCar() {
    return this.carService.findAll()
  }

  @Get(':id')
  getOneCar(@Param('id') id: number) {
    return this.carService.findOneById(+id)
  }

  @Post()
  async createCar(@Body() carDto: carDto) {
    const errors = await validate(carDto)
    if (errors.length > 0) {
      return errors
    }
    return this.carService.createOne(carDto)
  }

  @Patch(':id')
  modifyCar(@Body() carDto: Partial<Car>, @Param('id') id: number) {
    return this.carService.updateOne(carDto, +id)
  }

  @Delete(':id')
  deleteCar(@Param('id') id: number) {
    return this.carService.deleteOne(+id)
  }
}
