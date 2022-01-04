import { render, screen } from '@testing-library/react';
import Answer from './Answer';

it('displays answer correctly', async () => {
  const answer = "8 minutes"

  const { getByText } = render(<Answer answer={answer} />);
  const answerText = screen.getByText(/8 minutes/i);
  expect(answerText).toBeInTheDocument();
})
