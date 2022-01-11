import { render } from '@testing-library/react';
import Game from './Game';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import dataMock from '../mocks/data.json';

const endPoint = "http://localhost:3000/data"
const server = setupServer(
  rest.get(endPoint, (_request, response, context) => {
    return response(
      context.status(200),
      context.json()
    )
  })
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders Game component', () => {
  render(<Game />);
});

test('should display green when correct answer is clicked', () => {})

test('should display red when incorrect answer is clicked', () => {})

test('should disable the ability to click after choice has been made', () => {})

test('should display stats offer a new game when game ends', () => {})




