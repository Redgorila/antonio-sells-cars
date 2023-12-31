import { IsBoolean, IsNumber } from 'class-validator'
import { Payment } from 'src/payment/payment.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, type: 'int' })
  @IsNumber()
  car_id: number

  @Column({ nullable: false, type: 'int' })
  @IsNumber()
  seller_id: number

  @Column({ nullable: false, type: 'int' })
  @IsNumber()
  buyer_id: number

  @Column({ nullable: false, type: 'tinyint', default: '0' }) //Will only be updated once all collected payments fulfill the total
  @IsBoolean()
  is_paid: boolean

  @Column({ nullable: false, type: 'int' })
  @IsNumber()
  total: number
}
