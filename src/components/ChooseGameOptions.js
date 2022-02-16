import React from 'react';
import axios from 'axios';

const ChooseGameOptions = () => {

  function handleOptionsClick(event) {
    
    event.preventDefault();
  }

  return (
    <div className="container">
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
                <form className="form-api">

                  <div className="field">
                    <label className="label">Number of Questions:</label>
                    <input type="number" name="trivia_amount" id="trivia_amount" className="input control" min="1" max="50" defaultValue="10" />
                  </div>

                  <div className="field">
                    <label className="label">Select Category: </label>
                    <select name="trivia_category" className="input control">
                      <option defaultValue="any">Any Category</option>
                      <option defaultValue="9">General Knowledge</option><option defaultValue="10">Entertainment: Books</option><option defaultValue="11">Entertainment: Film</option><option defaultValue="12">Entertainment: Music</option><option defaultValue="13">Entertainment: Musicals &amp; Theatres</option><option defaultValue="14">Entertainment: Television</option><option defaultValue="15">Entertainment: Video Games</option><option defaultValue="16">Entertainment: Board Games</option><option defaultValue="17">Science &amp; Nature</option><option defaultValue="18">Science: Computers</option><option defaultValue="19">Science: Mathematics</option><option defaultValue="20">Mythology</option><option defaultValue="21">Sports</option><option defaultValue="22">Geography</option><option defaultValue="23">History</option><option defaultValue="24">Politics</option><option defaultValue="25">Art</option><option defaultValue="26">Celebrities</option><option defaultValue="27">Animals</option><option defaultValue="28">Vehicles</option><option defaultValue="29">Entertainment: Comics</option><option defaultValue="30">Science: Gadgets</option><option defaultValue="31">Entertainment: Japanese Anime &amp; Manga</option><option defaultValue="32">Entertainment: Cartoon &amp; Animations</option>
                    </select>

                  </div>
                  <div className="field">
                    <label className="label">Select Difficulty: </label>
                    <select name="trivia_difficulty" className="input control">
                      <option defaultValue="any">Any Difficulty</option>
                      <option defaultValue="easy">Easy</option>
                      <option defaultValue="medium">Medium</option>
                      <option defaultValue="hard">Hard</option>
                    </select>
                  </div>


                  <div className="field">
                    <label className="label">Select Type: </label>
                    <select name="trivia_type" className="input control">
                      <option defaultValue="any">Any Type</option>
                      <option>Multiple Choice</option>
                      <option>True / False</option>
                    </select>
                  </div>

                    <button className="button is-primary" type="submit" onClick={handleOptionsClick}>Get Questions</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ChooseGameOptions;
