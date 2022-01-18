import React from 'react';

const Answer = (props) => {
  const answer = props.answers.map((answer, index) => <button className="button is-large is-fullwidth is-link mb-5" key={index} onClick={props.onAnswer}>{answer}</button>);

  return (
    <div>
      {answer}
    </div>
  )
}

export default Answer;
