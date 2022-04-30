import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ChooseGameOptions = () => {
  const [amount, setAmount] = useState(5);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [customGameUrl, setCustomGameUrl] = useState(`https://opentdb.com/api.php?amount=5&type=${questionType}&encode=url3986`)


  const { push } = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    push({
      pathname: '/game',
      state: { customGameUrl }
    })
  }

  useEffect(() => {
    setCustomGameUrl(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${questionType}`);
    window.localStorage.setItem('customGameUrl', JSON.stringify(customGameUrl));

  }, [amount, category, questionType, difficulty, customGameUrl])

  return (
      <section className="hero is-dark is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="column is-8 is-offset-2">
              <h3 className="title has-text-centered has-text-white">Game Options</h3>
              <hr className="login-hr" />
              <p className="subtitle has-text-centered has-text-white">
                Please Select Your Game Options
              </p>
              <div className="box">
                <form className="form-api" onSubmit={handleSubmit}>

                  <div className="field">
                    <label className="label">Number of Questions (1 - 50):</label>
                    <input type="number" className="input control" min="1" max="50" defaultValue="5"
                      onChange={(event) => setAmount(event.target.value)} />
                  </div>

                  <div className="field">
                    <label className="label">Select Category:</label>
                    <select className="input control"
                      onChange={(event) => setCategory(event.target.value)}>

                      <option value="">Any Category</option>
                      <option value="9">General Knowledge</option>
                      <option value="10">Entertainment: Books</option>
                      <option value="11">Entertainment: Film</option>
                      <option value="12">Entertainment: Music</option>
                      <option value="13">Entertainment: Musicals &amp; Theatres</option>
                      <option value="14">Entertainment: Television</option>
                      <option value="15">Entertainment: Video Games</option>
                      <option value="16">Entertainment: Board Games</option>
                      <option value="17">Science &amp; Nature</option>
                      <option value="18">Science: Computers</option>
                      <option value="19">Science: Mathematics</option>
                      <option value="20">Mythology</option>
                      <option value="21">Sports</option>
                      <option value="22">Geography</option>
                      <option value="23">History</option>
                      <option value="24">Politics</option>
                      <option value="25">Art</option>
                      <option value="26">Celebrities</option>
                      <option value="27">Animals</option>
                      <option value="28">Vehicles</option>
                      <option value="29">Entertainment: Comics</option>
                      <option value="30">Science: Gadgets</option>
                      <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                      <option value="32">Entertainment: Cartoon &amp; Animations</option>
                    </select>
                  </div>

                  <div className="field">
                    <label className="label">Select Difficulty: </label>
                    <select className="input control"
                      onChange={(event) => setDifficulty(event.target.value)}>
                      <option value="">Any Difficulty</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>

                  <div className="field">
                    <label className="label">Select Question Type: </label>
                    <select value={questionType} className="input control"
                      onChange={(event) => { setQuestionType(event.target.value) }}>
                      <option value="any">Any Type</option>
                      <option value="multiple">Multiple Choice</option>
                      <option value="boolean">True / False</option>
                    </select>
                  </div>

                  <button className="button is-primary" type="submit">Get Questions</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

  )
}

export default ChooseGameOptions;
