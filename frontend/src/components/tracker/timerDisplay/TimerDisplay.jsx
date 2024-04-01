import React from "react";

function TimerDisplay({ timer }) {
  const timerDisplay = timer;

  return (
    <div className="container">
      <div className="digital-clock">{timerDisplay}</div>
    </div>
  );
}

export default TimerDisplay;
