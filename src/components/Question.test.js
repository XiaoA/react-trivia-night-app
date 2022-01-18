import React from 'react';
import { render, screen } from '@testing-library/react';
import Question from './Question';

const questionProps = {
  category: "History",
  type: "multiple",
  difficulty: "hard",
  question: "When did the French Revolution begin?",
  answerOptions: ["1789", "1823", "1756", "1799"],
  correctAnswer: "1789"
}

test('renders question correctly', async () => {
  render(<Question {...questionProps} />)
  expect(screen.getByText(/french revolution begin/i)).toBeInTheDocument();
});









