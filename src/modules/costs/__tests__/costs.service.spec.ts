import { Test, TestingModule } from '@nestjs/testing'
import { CostsService } from '../costs.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Cost } from '@/modules/costs/entities/cost.entity'

describe('CostsService', () => {
  let service: CostsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CostsService,
        {
          provide: getRepositoryToken(Cost),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<CostsService>(CostsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
