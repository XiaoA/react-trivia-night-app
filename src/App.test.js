import React from 'react';
import { render, screen } from './test-utils';
import App from './App';
import Dashboard from './components/Dashboard';
import { BrowserRouter } from 'react-router-dom';

test('Renders App Component', () => {
  render(
    <App />
  );
})

test('Displays welcome text', () => {
  render(
    <App />
  );
  const titleText = screen.getByText(/trivia night/i);
  const subTitleText = screen.getByText(/test your knowledge alone or with friends/i);

  expect(titleText).toBeInTheDocument();
  expect(subTitleText).toBeInTheDocument();

})

test('Displays Dashboard Data', async () => {
  render(
    <BrowserRouter >
      <Dashboard />
    </BrowserRouter>
  )

  const myStatsTitle = screen.getByText("My Stats");
  const myStatsTotalQuestions = screen.getByText("Total Questions");
  const myStatsTotalCorrectQuestions = screen.getByText("Correct Questions");
  const myStatsTotalIncorrectQuestions = screen.getByText("Incorrect Questions");
  const playTriviaButton = screen.getByRole('button', { name: "Play Trivia!" })

  expect(myStatsTitle).toBeInTheDocument();
  expect(myStatsTotalQuestions).toBeInTheDocument();
  expect(myStatsTotalCorrectQuestions).toBeInTheDocument();
  expect(myStatsTotalIncorrectQuestions).toBeInTheDocument();
  expect(playTriviaButton).toBeInTheDocument();
});

