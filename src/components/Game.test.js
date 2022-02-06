import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import Game from './Game';

const gameData = {
  "response_code": 0,
  "results": [
    {
      "category": "Mythology",
      "question": "In Norse mythology, Thor once dressed as a woman.",
      "correct_answer": "True",
      "incorrect_answers": ["False"]
    }
  ]
}

test('render Game', async () => {
  render(<Game {...gameData} />);
  expect(screen.getByRole('article')).toBeVisible()
});





