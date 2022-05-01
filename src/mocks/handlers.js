import { rest } from "msw";
import mockData from "./data.json";

const mockEndPoint = "https://opentdb.com/api.php";

export const handlers = [
  rest.get(mockEndPoint, (request, response, context) => {
    return response(context.status(200), context.json(mockData));
  }),
];
