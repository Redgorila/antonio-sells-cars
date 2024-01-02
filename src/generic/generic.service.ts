import { HttpException, HttpStatus, Logger } from '@nestjs/common'
import { DeepPartial, DeleteResult, FindManyOptions, Repository } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export abstract class GenericService<T> {
  private readonly logger = new Logger(GenericService.name)
  abstract getRepository(): Repository<T>

  async findAll(): Promise<T[]> {
    this.logger.log(`GenericService: will fetch all items`)
    return this.getRepository().find()
  }

  async findManyByOptions(findOptions: FindManyOptions): Promise<T[]> {
    this.logger.log('GenericService: will find items based on query')
    return this.getRepository().find(findOptions)
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
    try {
      return this.getRepository().save(params)
    } catch (error) {
      throw new HttpException('Invalid format of data', HttpStatus.BAD_REQUEST)
    }
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
