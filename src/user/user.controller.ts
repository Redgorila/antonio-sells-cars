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

@Controller('users')
export class UserController {
  @Get()
  getAllUser() {
    return 'Get all users'
  }

  @Get(':id')
  getOneUser() {
    return 'Get one user'
  }

  @Post()
  createUser(@Body() userDto) {
    return 'Create one user'
  }

  @Patch(':id')
  modifyUser(@Body() userData: Partial<User>, @Param('id') id: number) {
    return 'Modify one user'
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return 'Delete one user'
  }
}
