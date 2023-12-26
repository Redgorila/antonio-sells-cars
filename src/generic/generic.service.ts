import { Inject, Injectable } from '@nestjs/common'
import { DeepPartial, DeleteResult, FindOneOptions, Repository } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export abstract class GenericService<T> {
  abstract getRepository(): Repository<T>

  async findAll(): Promise<T[]> {
    return this.getRepository().find()
  }

  async findOneById(id: number): Promise<T> {
    return this.getRepository().findOne({ where: { id: id } } as any)
  }

  async createOne(params: DeepPartial<T>): Promise<T> {
    return this.getRepository().save(params)
  }

  async updateOne(params: DeepPartial<T>, id: any): Promise<T> {
    return this.getRepository().update(
      { id: id },
      params as QueryDeepPartialEntity<T>,
    ) as T
  }

  async deleteOne(id: number): Promise<DeleteResult> {
    return await this.getRepository().delete(id)
  }
}
