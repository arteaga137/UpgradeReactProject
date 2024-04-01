import React from "react";

function Buttons({ onStart, onStop, onReset }) {
  // Inline styles for the buttons container
  const buttonsContainerStyle = {
    display: 'flex',
    justifyContent: 'center', // Centers the buttons container
    gap: '10px', // Creates space between the buttons
    margin: '20px 0', // Adds margin above and below the buttons container
  };

  return (
    <div style={buttonsContainerStyle}>
      <button onClick={onStart}>Start</button>
      <button onClick={onStop}>Pause</button>
      <button onClick={onReset}>Finish</button>
    </div>
  );
}
export default Buttons;
