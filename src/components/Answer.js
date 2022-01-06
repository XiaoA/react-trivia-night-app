const Answer = ({ answerText }) => {
  return (
    <div>
      <button className="button is-large is-fullwidth is-link mb-5">
        {answerText}
      </button>
    </div>
  )
}

export default Answer;
