import { IsNumber, IsString } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, type: 'varchar' })
  @IsString()
  model: string

  @Column({ nullable: false, type: 'int' })
  @IsNumber()
  price: number

  @Column({ nullable: false, type: 'int' })
  @IsNumber()
  owner: number
}
