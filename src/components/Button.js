const Button = (props) => {
  return (
    <div className="buttons is-centered">
      <button className="button is-large is-success" onClick={props.nextQuestion}>Submit</button>
    </div>
  )
}

export default Button;
