import React from 'react'

const Timer = ({ timeLeft }) => {
  const calculateTimeFraction = () => {
    return timeLeft / 60
  };

  const setCircleDasharray = () => {
    const circleDasharray = (calculateTimeFraction() * 283).toFixed(0);
    return `${circleDasharray} 283`
  };

  const remainingPathColor = () => {
    if (timeLeft <= 15) return 'red';
    if (timeLeft <= 30) return 'orange'
    return 'green'
  };

  return (
    <div className="base-timer translate-x-[24rem] translate-y-[-3rem]">
      <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g className="base-timer__circle">
          <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            id="base-timer-path-remaining"
            stroke-dasharray={setCircleDasharray()}
            className={`base-timer__path-remaining ${remainingPathColor()}`}
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" className="base-timer__label">
        {timeLeft}s
      </span>
    </div>
  );
};

export default Timer
