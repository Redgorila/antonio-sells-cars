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
import { Car } from './car.entity'
import { CarService } from './car.service'
import { carDto } from './car.dto'
import { validate } from 'class-validator'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('cars')
export class CarController {
  private readonly logger = new Logger(CarController.name)
  constructor(private readonly carService: CarService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllCar() {
    this.logger.log(
      `UserController: fetch all cars request received by controller`,
    )
    return this.carService.findAll()
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getOneCar(@Param('id') id: number) {
    this.logger.log(
      `UserController: fetch car by id ${id} request received by controller`,
    )
    return this.carService.findOneById(+id)
  }

  @UseGuards(AuthGuard)
  @Post()
  async createCar(@Body() carDto: carDto) {
    this.logger.log(
      `UserController: request to create a car received by the controller, will try to pass validation of body`,
    )
    const errors = await validate(carDto)
    if (errors.length > 0) {
      this.logger.log(`UserController: Validation errors found`)
      return errors
    }
    this.logger.log(
      `UserController: body is valid, will pass car data to service`,
    )
    return this.carService.createOne(carDto)
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  modifyCar(@Body() carDto: Partial<Car>, @Param('id') id: number) {
    this.logger.log(
      `UserController: request to update car by id ${id} received`,
    )
    return this.carService.updateOne(carDto, +id)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteCar(@Param('id') id: number) {
    this.logger.log(
      `UserController: request to delete car by id ${id} received`,
    )
    return this.carService.deleteOne(+id)
  }
}
