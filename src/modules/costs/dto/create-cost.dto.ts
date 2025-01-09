import { CostType } from '@/enums'
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator'

export class CreateCostDto {
  @IsEnum(CostType, { message: '类型值无效' })
  type: CostType

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: '金额必须是数字' },
  )
  amount: number

  @IsDate({ message: '时间格式错误' })
  time: Date

  @MaxLength(100, { message: '备注最多100个字符' })
  @IsOptional()
  remark?: string
}
