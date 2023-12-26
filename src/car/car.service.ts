import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Car } from './car.entity'
import { GenericService } from 'src/generic/generic.service'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class CarService extends GenericService<Car> {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {
    super()
  }

  getRepository(): Repository<Car> {
    return this.carRepository
  }
}
