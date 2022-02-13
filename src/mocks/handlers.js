import { rest } from "msw";
import mockData from "./data.json";

const mockEndPoint = "https://opentdb.com/api.php";
//const mockEndPoint = "https://opentdb.com/api.php?amount=10&encode=url3986"

export const handlers = [
  rest.get(mockEndPoint, (request, response, context) => {
    return response(context.status(200), context.json(mockData));
  }),
//  rest.get('*', (req, res, ctx) => res(ctx.status(200), ctx.json({}))),
//  rest.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup', (request, response, context) => response(context.status(200), context.json({})))
];
