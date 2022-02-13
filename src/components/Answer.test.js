import React from "react";
import Question from "./Question";
import Answer from "./Answer";
import { render, screen } from '../test-utils'

test("render Answer", async () => {
  return render(
    <Answer />
  );
});



const answerProps = {
  answers: ["1789", "1823", "1756", "1799"],
  correctAnswer: "1789"
}

test('renders answers correctly', async () => {
  const answer = await answerProps.answers.map((answer, index) => <button className="button is-large is-fullwidth is-link mb-5" key={index} onClick={answerProps.onAnswer}>{answer}</button>);

  const firstAnswer_1789 = answer[0].props.children;
  const secondAnswer_1823 = answer[1].props.children;
  const thirdAnswer_1756 = answer[2].props.children;
  const fourthAnswer_1799 = answer[3].props.children;

  expect(firstAnswer_1789).toBe('1789')
  expect(secondAnswer_1823).toBe('1823')
  expect(thirdAnswer_1756).toBe('1756')
  expect(fourthAnswer_1799).toBe('1799')
});

test('should track correct answer', async () => {
  const answer = await answerProps.answers.map((answer, index) => <button className="button is-large is-fullwidth is-link mb-5" key={index} onClick={answerProps.onAnswer}>{answer}</button>);

  const correctAnswer = await answerProps.correctAnswer;

  const firstAnswer_1789 = answer[0].props.children;
  const secondAnswer_1823 = answer[1].props.children;
  const thirdAnswer_1756 = answer[2].props.children;
  const fourthAnswer_1799 = answer[3].props.children;

  expect(firstAnswer_1789).toEqual(correctAnswer);
  expect(secondAnswer_1823).not.toEqual(correctAnswer);
  expect(thirdAnswer_1756).not.toEqual(correctAnswer);
  expect(fourthAnswer_1799).not.toEqual(correctAnswer);
});
