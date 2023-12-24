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

@Controller('cars')
export class CarController {
  @Get()
  getAllCar() {
    return 'Get all cars'
  }

  @Get(':id')
  getOneCar() {
    return 'Get one car'
  }

  @Post()
  createCar(@Body() carDto) {
    return 'Create one car'
  }

  @Patch(':id')
  modifyCar(@Body() carData: Partial<Car>, @Param('id') id: number) {
    return 'Modify one car'
  }

  @Delete(':id')
  deleteCar(@Param('id') id: number) {
    return 'Delete one car'
  }
}
