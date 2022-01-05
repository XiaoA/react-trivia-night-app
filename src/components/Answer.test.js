import { render, screen } from '@testing-library/react';
import Answer from './Answer';

it('renders answer props correctly', () => {
 const answers = ["8 Minutes", "6 Minutes", "2 Minutes", "12 Minutes"]
  const answerText = answers.map((answer) => (
    <Answer answer={answer} key={answer}/>
  ))
  expect(answerText[0].props.answer).toBe("8 Minutes")
  expect(answerText[1].props.answer).toBe("6 Minutes")
  expect(answerText[2].props.answer).toBe("2 Minutes")
  expect(answerText[3].props.answer).toBe("12 Minutes")
})

