import { IsNumber } from 'class-validator'
import { Sale } from 'src/sale/sale.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, type: 'int' })
  @IsNumber()
  sale_id: number

  @Column({ nullable: false, type: 'int' })
  @IsNumber()
  value: number
}
