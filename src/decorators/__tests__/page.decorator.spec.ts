import { ExecutionContext } from '@nestjs/common'
import { userFactory } from '@/decorators/page.decorator'
import { HttpArgumentsHost } from '@nestjs/common/interfaces'

const mockExecutionContexts: ExecutionContext = {
  getType: jest.fn(),
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getClass: jest.fn(),
  getHandler: jest.fn(),
  switchToHttp: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
}

const mockHttpArgumentsHosts: HttpArgumentsHost = {
  getRequest: jest.fn(),
  getResponse: jest.fn(),
  getNext: jest.fn(),
}

describe('PageDecorator', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return the correct page and pageSize.', () => {
    jest
      .spyOn(mockExecutionContexts, 'switchToHttp')
      .mockReturnValue(mockHttpArgumentsHosts)
    jest.spyOn(mockHttpArgumentsHosts, 'getRequest').mockReturnValue({
      query: {
        page: '1',
        pageSize: '20',
      },
    })

    const result = userFactory('' as never, mockExecutionContexts)

    expect(result).toStrictEqual([1, 20])
  })

  it('should return [1, 20] when not provided.', () => {
    jest
      .spyOn(mockExecutionContexts, 'switchToHttp')
      .mockReturnValue(mockHttpArgumentsHosts)
    jest.spyOn(mockHttpArgumentsHosts, 'getRequest').mockReturnValue({
      query: {},
    })

    const result = userFactory('' as never, mockExecutionContexts)

    expect(result).toStrictEqual([1, 20])
  })

  it('should return [1, 20] when 0 or a negative number is provided.', () => {
    jest
      .spyOn(mockExecutionContexts, 'switchToHttp')
      .mockReturnValue(mockHttpArgumentsHosts)
    jest.spyOn(mockHttpArgumentsHosts, 'getRequest').mockReturnValue({
      query: {
        page: '0',
        pageSize: '-1',
      },
    })

    const result = userFactory('' as never, mockExecutionContexts)

    expect(result).toStrictEqual([1, 20])
  })

  it('should return [1, 20] when a decimal number is provided.', () => {
    jest
      .spyOn(mockExecutionContexts, 'switchToHttp')
      .mockReturnValue(mockHttpArgumentsHosts)
    jest.spyOn(mockHttpArgumentsHosts, 'getRequest').mockReturnValue({
      query: {
        page: '0.1',
        pageSize: '-1.1',
      },
    })

    const result = userFactory('' as never, mockExecutionContexts)

    expect(result).toStrictEqual([1, 20])
  })

  it('should return [1, 20] when a non-numeric value is provided.', () => {
    jest
      .spyOn(mockExecutionContexts, 'switchToHttp')
      .mockReturnValue(mockHttpArgumentsHosts)
    jest.spyOn(mockHttpArgumentsHosts, 'getRequest').mockReturnValue({
      query: {
        page: '1',
        pageSize: 'abc',
      },
    })

    const result = userFactory('' as never, mockExecutionContexts)

    expect(result).toStrictEqual([1, 20])
  })
})
