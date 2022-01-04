import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);
});

test('renders title', () => {
  const {getByText } = render(<App />);
  const title = screen.getByText(/Trivia Night/i);
  expect(title).toBeInTheDocument();
});
