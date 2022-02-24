import React, { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './ProgressBar.css'

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 10) {
    return <div className="timer">Better hurry!</div>;
  }
  if (remainingTime === 1) {
    return <div className="timer">Last Chance...</div>;
  }
  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
};

const ProgressBar = () => {
  const [gameState, dispatch] = useContext(GameContext);
  return (
    <>
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="timer-wrapper">
            <CountdownCircleTimer
              isPlaying
              duration={20}
              colors={["#00FF00", "#0000FF", "#A30000", "#FF0000"]}
              colorsTime={[15, 10, 5, 0]}
              onComplete={() => ({ shouldRepeat: true, delay: 0 })}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-header-title">
                Score: {gameState.correctAnswersCount}
                <br />
                Question {gameState.currentQuestionIndex + 1}/
                {gameState.questions.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
