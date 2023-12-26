import { Injectable } from '@nestjs/common'
import { Payment } from './payment.entity'
import { Repository } from 'typeorm'
import { GenericService } from 'src/generic/generic.service'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class PaymentService extends GenericService<Payment> {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {
    super()
  }

  getRepository(): Repository<Payment> {
    return this.paymentRepository
  }
}
