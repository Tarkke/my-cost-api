import { CostType } from '@/enums'

export class CreateCostDto {
  type: CostType
  amount: number
  time: Date
  remark?: string
}
