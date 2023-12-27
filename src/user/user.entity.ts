import { IsString } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, type: 'varchar' })
  @IsString()
  user: string

  @Column({ nullable: false, type: 'varchar' })
  @IsString()
  password: string

  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date
}
