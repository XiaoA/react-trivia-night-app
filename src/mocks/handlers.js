import { rest } from 'msw';
import mockData from './data.json';

const mockEndPoint = "https://opentdb.com/api.php"
//const mockEndPoint = "https://opentdb.com/api.php?amount=10&encode=url3986"

export const handlers = [
  rest.get(mockEndPoint, (request, response, context) => {
    return response(
      context.status(200),
      context.json(mockData)
    )
  }),
  //rest.get('*', (req, res, ctx) => res(ctx.status(200), ctx.json({}))),
]
