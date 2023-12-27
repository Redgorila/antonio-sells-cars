import { IsBoolean, IsNumber } from 'class-validator'

export class SaleDto {
  @IsNumber()
  car_id: number
  @IsNumber()
  seller_id: number
  @IsNumber()
  buyer_id: number
}
