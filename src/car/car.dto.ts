import { IsNumber, IsString } from 'class-validator'

export class carDto {
  @IsString()
  model: string

  @IsNumber()
  price: number
}
