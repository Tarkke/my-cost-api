import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const userFactory = (
  data: never,
  ctx: ExecutionContext,
): [number, number] => {
  const request = ctx.switchToHttp().getRequest()

  let { page, pageSize } = request.query

  page = parseInt(page) || 1
  pageSize = parseInt(pageSize) || 20

  page = page < 1 ? 1 : page
  pageSize = pageSize < 1 ? 20 : pageSize

  return [page, pageSize]
}

export const Page = createParamDecorator(userFactory)
