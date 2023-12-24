import { Controller, Post } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  @Post()
  logIn() {
    return 'This function would return the jwt'
  }
}
