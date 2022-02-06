export const mergeAnswerLists = (question) => {
  const unmergedAnswerLists = [
    question.correctAnswer,
    ...question.incorrectAnswers
  ];

  // Replaced Fisher-Yates with Schwartzian Transform
  // https://en.wikipedia.org/wiki/Schwartzian_transform

  return unmergedAnswerLists
    .map((answer) => ({
      sort: Math.random(),
      value: answer
    }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};

export const decodeApiText = (apiQuestions) => {
  return apiQuestions.map((apiQuestion) => {
    const incorrectAnswers = apiQuestion.incorrect_answers.map(
      (incorrectAnswer) => decodeURIComponent(incorrectAnswer)
    );

    return {
      correctAnswer: decodeURIComponent(apiQuestion.correct_answer),
      question: decodeURIComponent(apiQuestion.question),
      incorrectAnswers
    }
  })
}

export const displayAnswers = () => {
  
}
