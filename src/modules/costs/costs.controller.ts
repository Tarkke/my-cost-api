import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { CostsService } from './costs.service'
import { CreateCostDto } from '@/modules/costs/dto/create-cost.dto'
import { UpdateCostDto } from '@/modules/costs/dto/update-cost.dto'
import { Page } from '@/decorators/page.decorator'

@Controller('costs')
export class CostsController {
  constructor(private readonly costsService: CostsService) {}

  @Get()
  async getCosts(@Page() [page, pageSize]: [number, number]) {
    const [items, totalItems] = await this.costsService.getCosts(page, pageSize)
    const totalPages = Math.ceil(totalItems / pageSize)

    return {
      items,
      pagination: {
        currentPage: page,
        pageSize,
        totalItems,
        totalPages,
      },
    }
  }

  @Post()
  addCost(@Body() createCostDto: CreateCostDto) {
    return this.costsService.addCost(createCostDto)
  }

  @Delete(':id')
  async removeCost(@Param('id') id: number) {
    await this.costsService.removeCost(id)
  }

  @Patch(':id')
  async updateCost(
    @Param('id') id: number,
    @Body() updateCostDto: UpdateCostDto,
  ) {
    await this.costsService.updateCost(id, updateCostDto)
  }

  @Get(':id')
  getCost(@Param('id') id: number) {
    return this.costsService.getCost(id)
  }
}
