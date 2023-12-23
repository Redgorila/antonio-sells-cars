import { IsNumber } from 'class-validator'
import { Sale } from 'src/sale/sale.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Sale, (sale) => sale.payment)
  @IsNumber()
  sale_: Sale

  @Column()
  @IsNumber()
  value: number
}
