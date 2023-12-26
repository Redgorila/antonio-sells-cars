import { Inject, Injectable } from '@nestjs/common'
import { GenericService } from 'src/generic/generic.service'
import { Repository } from 'typeorm'
import { Sale } from './sale.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class SaleService extends GenericService<Sale> {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
  ) {
    super()
  }

  getRepository(): Repository<Sale> {
    return this.saleRepository
  }
}
