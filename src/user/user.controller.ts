import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Logger,
  UseGuards,
} from '@nestjs/common'
import { User } from './user.entity'
import { UserService } from './user.service'
import { UserDto } from './user.dto'
import { validate } from 'class-validator'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name)
  constructor(private readonly UserService: UserService) {}
  @UseGuards(AuthGuard)
  @Get()
  getAllUser(): Promise<User[]> {
    this.logger.log(
      `UserController: fetch all users request received by controller`,
    )
    return this.UserService.findAll()
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getOneUser(@Param('id') id: number) {
    this.logger.log(
      `UserController: fetch user by id ${id} request received by controller`,
    )
    return this.UserService.findOneById(+id)
  }

  @Post()
  async createUser(@Body() userDto: UserDto) {
    this.logger.log(
      `UserController: request to create a user received by the controller, will try to pass validation of body`,
    )
    const errors = await validate(userDto)
    if (errors.length > 0) {
      this.logger.log(`UserController: Validation errors found`)
      return errors
    }
    this.logger.log(
      `UserController: body is valid, will pass user data to service`,
    )
    return this.UserService.createOne(userDto)
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  modifyUser(@Body() userDto: Partial<User>, @Param('id') id: number) {
    this.logger.log(
      `UserController: request to update user by id ${id} received`,
    )
    return this.UserService.updateOne(userDto, +id)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    this.logger.log(
      `UserController: request to delete user by id ${id} received`,
    )
    return this.UserService.deleteOne(+id)
  }
}
