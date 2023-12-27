import { IsString } from 'class-validator'

export class UserDto {
  @IsString()
  user: string

  @IsString()
  password: string
}
