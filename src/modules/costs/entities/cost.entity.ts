import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CostType } from '@/enums'

@Entity()
export class Cost {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'tinyint',
    unsigned: true,
  })
  type: CostType

  @Column({
    type: 'int',
    unsigned: true,
  })
  amount: number

  @Column({
    type: 'datetime',
  })
  time: Date

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  remark?: string
}
