import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { User } from '../user/user.entity'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(user: string, pass: string): Promise<any> {
    this.logger.log(
      `AuthService: will find user to compare username and password`,
    )
    const foundUser = await this.userService.findOneByName(user)
    if (foundUser?.password !== pass) {
      this.logger.log(`AuthService: wrong password for user provided`)
      throw new UnauthorizedException()
    }
    this.logger.log('Returning JWT token ')
    const payload = { sub: foundUser.id, username: foundUser.user }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
