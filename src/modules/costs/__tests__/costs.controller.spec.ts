import { Test, TestingModule } from '@nestjs/testing'
import { CostsController } from '../costs.controller'
import { describe } from 'node:test'
import { CostsService } from '@/modules/costs/costs.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Cost } from '@/modules/costs/entities/cost.entity'

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('CostsController', () => {
  let controller: CostsController
  let service: CostsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CostsController],
      providers: [
        CostsService,
        {
          provide: getRepositoryToken(Cost),
          useValue: {},
        },
      ],
    }).compile()

    controller = module.get<CostsController>(CostsController)
    service = module.get<CostsService>(CostsService)
  })

  describe('get costs list', () => {
    it('should return an object containing a list and pagination.', async () => {
      const items = ['test']
      const result = {
        items,
        pagination: {
          currentPage: 1,
          pageSize: 10,
          totalItems: 21,
          totalPages: 3,
        },
      }

      jest
        .spyOn(service, 'getCosts')
        .mockImplementation(async () => [items, 21] as any)
      expect(await controller.getCosts([1, 10])).toStrictEqual(result)
    })
  })
})
