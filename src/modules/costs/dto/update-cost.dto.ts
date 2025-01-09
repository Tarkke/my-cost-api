import { PartialType } from '@nestjs/mapped-types'
import { CreateCostDto } from '@/modules/costs/dto/create-cost.dto'

export class UpdateCostDto extends PartialType(CreateCostDto) {}
