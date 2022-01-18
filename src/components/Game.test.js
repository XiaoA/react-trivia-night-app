import React from 'react';
import { render, screen } from '@testing-library/react';
import Game from './Game';

const gameData = {
  "response_code": 0,
  "results": [
    {
      "category": "History",
      "question": "When did the French Revolution begin?",
      "correct_answer": "1789",
      "incorrect_answers": [
        "1823",
        "1756",
        "1799"
      ]
    }
  ]
}

test('render Game', async () => {
  render(<Game {...gameData} />);
  expect(screen.getByRole('article')).toBeVisible()
});




