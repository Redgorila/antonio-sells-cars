import { IsNumber } from 'class-validator'

export class PaymentDto {
  @IsNumber()
  value: number

  @IsNumber()
  sale_id: number
}
