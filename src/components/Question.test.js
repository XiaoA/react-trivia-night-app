import { render, screen } from '@testing-library/react';
import Question from './Question';

it('displays question correctly', async () => {
  const question = "To the nearest minute, how long does it take for light to travel from the Sun to the Earth?"

  const { getByText } = render(<Question question={question} />);
  const questionText = screen.getByText(/to the nearest minute/i);
  expect(questionText).toBeInTheDocument();
})
