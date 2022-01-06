import { render, screen } from '@testing-library/react';
import App from './App';
import Game from './components/Game';

test('renders App component', () => {
  render(<App />);
});

test('renders title', () => {
  render(<App />);
  const title = screen.getByText(/Trivia Night/i);
  expect(title).toBeInTheDocument();
});

test('displays game card', () => {
  render(<Game />);
  expect(screen.getAllByRole('article').length).toBe(1);
})
