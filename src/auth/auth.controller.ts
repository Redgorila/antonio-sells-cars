import { Body, Controller, Logger, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from 'src/user/user.entity'

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)
  constructor(private authService: AuthService) {}

  @Post()
  async logIn(@Body() user: User) {
    this.logger.log(`AuthController: recieved username and password`)
    return this.authService.signIn(user.user, user.password)
  }
}
