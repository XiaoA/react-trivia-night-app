import { render, screen } from '@testing-library/react';
import App from './App';
import Game from './components/Game';

test('renders App component', () => {
  render(<App />);
});

test('renders title', () => {
  const { getByText } = render(<App />);
  const title = screen.getByText(/Trivia Night/i);
  expect(title).toBeInTheDocument();
});

test('displays game', () => {
  const { getByText } = render(<Game />);
  const gameComponent = screen.getByText(/Game/i);
  expect(gameComponent).toBeInTheDocument();
})
