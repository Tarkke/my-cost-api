import { Injectable } from '@nestjs/common'
import { Cost } from '@/modules/costs/entities/cost.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCostDto } from '@/modules/costs/dto/create-cost.dto'
import { UpdateCostDto } from '@/modules/costs/dto/update-cost.dto'

@Injectable()
export class CostsService {
  constructor(
    @InjectRepository(Cost)
    private readonly cost: Repository<Cost>,
  ) {}

  getCosts(page: number, pageSize: number) {
    return this.cost.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    })
  }

  addCost(createCostDto: CreateCostDto) {
    return this.cost.save(createCostDto)
  }

  removeCost(id: number) {
    return this.cost.delete(id)
  }

  updateCost(id: number, updateCostDto: UpdateCostDto) {
    return this.cost.update(id, updateCostDto)
  }

  getCost(id: number) {
    return this.cost.findOneBy({ id })
  }
}
