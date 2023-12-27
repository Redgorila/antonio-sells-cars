import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { User } from './user.entity'
import { UserService } from './user.service'
import { UserDto } from './user.dto'
import { validate } from 'class-validator'

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Get()
  getAllUser(): Promise<User[]> {
    return this.UserService.findAll()
  }

  @Get(':id')
  getOneUser(@Param('id') id: number) {
    return this.UserService.findOneById(+id)
  }

  @Post()
  async createUser(@Body() userDto: UserDto) {
    const errors = await validate(userDto)
    if (errors.length > 0) {
      return errors
    }
    return this.UserService.createOne(userDto)
  }

  @Patch(':id')
  modifyUser(@Body() userDto: Partial<User>, @Param('id') id: number) {
    return this.UserService.updateOne(userDto, +id)
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.UserService.deleteOne(+id)
  }
}
