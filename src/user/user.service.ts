import { Injectable } from '@nestjs/common'
import { GenericService } from 'src/generic/generic.service'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserService extends GenericService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super()
  }

  getRepository(): Repository<User> {
    return this.userRepository
  }
}
