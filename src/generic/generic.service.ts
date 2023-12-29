import { Logger } from '@nestjs/common'
import { DeepPartial, DeleteResult, Repository } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export abstract class GenericService<T> {
  private readonly logger = new Logger(GenericService.name)
  abstract getRepository(): Repository<T>

  async findAll(): Promise<T[]> {
    this.logger.log(`GenericService: will fetch all items`)
    return this.getRepository().find()
  }

  async findOneById(id: number): Promise<T> {
    this.logger.log(`GenericService: will fetch data for id ${id}`)
    return this.getRepository().findOne({ where: { id: id } } as any)
  }

  async findOneByName(user: string): Promise<T> {
    this.logger.log(`GenericService: will find user by name ${user}`)
    return this.getRepository().findOne({ where: { user: user } } as any)
  }

  async createOne(params: DeepPartial<T>): Promise<T> {
    this.logger.log(`GenericService: will create new item`)
    return this.getRepository().save(params)
  }

  async updateOne(params: DeepPartial<T>, id: any): Promise<T> {
    this.logger.log(`GenericService: will update item by id ${id}`)
    return this.getRepository().update(
      { id: id },
      params as QueryDeepPartialEntity<T>,
    ) as T
  }

  async deleteOne(id: number): Promise<DeleteResult> {
    this.logger.log(`GenericService: will delete item by id ${id}`)
    return await this.getRepository().delete(id)
  }
}
